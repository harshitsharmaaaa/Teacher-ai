"use client";

import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface CallViewProps{
    meetingId:string;
}



export const CallView=({meetingId}:CallViewProps)=>{
    const trpc = useTRPC();

    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}));

    if(data.status==="completed"){
        return(
            <div className="flex h-screen items-center justify-center">
                <ErrorState 
                title="Meeting has ended"
                description="You can not join this meeting anymore"
                />
            </div>
        )
    }
    return(
        <CallProvider meetingId={meetingId} meetingName={data.name}/>
    )
}