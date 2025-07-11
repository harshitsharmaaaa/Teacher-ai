import {
    CallEndedEvent,
    MessageNewEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantJoinedEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent
} from "@stream-io/node-sdk"
import {and, not,eq} from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
import { db } from "@/db"
import { streamVideo } from "@/lib/stream-video"
import { agents,meetings } from "@/db/schema"
import { unknown } from "zod"


function VerifySignatureWithSDK(body: string, signature: string) {
    return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apikey = req.headers.get("x-api-key");
    if(!signature || !apikey) return NextResponse.json({error:"Signature or API Key not found"},{status:400});


    const body = await req.text();

    if(!VerifySignatureWithSDK(body,signature)) return NextResponse.json({error:"Signature not match"},{status:400});

    let payload :unknown;
    try{
        payload = JSON.parse(body) as Record<string,unknown>;

    }
    catch{
        return NextResponse.json({error:"Invalid JSON"},{status:400});
    }

    const eventType = (payload as Record<string,unknown>)?.type;
    if(eventType==="call.session_started"){
        const event  = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId; 

        if(!meetingId){
            return NextResponse
            .json(
                {error:"Meeting ID not found"},
                {status:400}
            );
        }

        const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
           and(
            eq(meetings.id,meetingId),
            not(eq(meetings.status,"completed")),
            not(eq(meetings.status,"active")),
            not(eq(meetings.status,"cancelled")),
            not(eq(meetings.status,"processing"))
           )
        )

        if(!existingMeeting) {
            return NextResponse
                .json({
                    error:"Meeting not found"
                },{status:400}
            );
        }

        await db
        .update(meetings)
        .set({
            status:"active",
            startedAt:new Date()
        })
        .where(
            eq(
                meetings.id,
                existingMeeting.id
            )
        );

        const [existingMeetingAgent] = await db
        .select()
        .from(agents)
        .where(
           
            eq(agents.id,existingMeeting.agentId)
           
        )
        if(!existingMeetingAgent){
            return NextResponse
                .json({
                    error:"Agent not found"
                },{status:400}
            );
        }

        const call = streamVideo
        .video
        .call(
            "default",
            meetingId
        )

        const realtimeclient  = await streamVideo
        .video
        .connectOpenAi({
            call,
            openAiApiKey:process.env.OPEN_AI_API_KEY!,
            agentUserId:existingMeetingAgent.id,
        })

        realtimeclient.updateSession({
            instructions:existingMeetingAgent.instructions,
        })
    }
    else if(eventType==="call.session_participant_left"){
        const event  = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];

        if(!meetingId){
            return NextResponse
            .json(
                {error:"Meeting ID not found"},
                {status:400}
            );
        }
        const call = streamVideo
        .video
        .call(
            "default",
            meetingId
        )
        await call.end();
    }

    return NextResponse.json({status:"okk"}); 
}
