"use client";
import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import  {useRouter}  from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialoge";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface MeetingIdViewProps{
    meetingId:string
}

export const MeetingIdView=({meetingId}:MeetingIdViewProps)=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [UpdateMeetingDialogOpen,setUpdateMeetingDialogOpen] = useState(false);

    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({
            id:meetingId
        }) 
    )
    const [Removeconfirmation,confirmRemove] = useConfirm("Are you sure?",`This will permanently delete the meeting `);

    const removeMeeting = useMutation(
        trpc.meetings.delete.mutationOptions({
            onSuccess:async()=>{
                await queryClient.invalidateQueries(
                    trpc.meetings.getmany.queryOptions({})
                )
                router.push("/meetings");
            },
            
        })
    )

    const HandleRemoveMeeting = async()=>{
        const ok = await confirmRemove();
        if(!ok){
            return;
        }
        await removeMeeting.mutateAsync({
            id:meetingId
        });
    }

    const isActive = data.status === "active";
    const isCompleted = data.status === "completed";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isProcessing = data.status === "processing";

    return(
        <>  
            <Removeconfirmation/>
            <UpdateMeetingDialog
            open={UpdateMeetingDialogOpen}
            onOpenChange={setUpdateMeetingDialogOpen}
            initialValues={data}
            />
            <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 overflow-hidden">
                <MeetingIdViewHeader
                meetingId={meetingId}
                meetingName={data.name}
                onEdit={()=>{
                    setUpdateMeetingDialogOpen(true);
                }}
                onRemove={HandleRemoveMeeting}
                />
                {isActive && <ActiveState
                meetingId={meetingId}
                />}
                {isCompleted && <div>Completed</div>}
                {isUpcoming && (<UpcomingState
                    meetingId={meetingId}
                    onCancelMeeting={()=>{}}
                    isCancelling={false}
                />)}
                {isCancelled && <CancelledState/>}
                {isProcessing && <ProcessingState/>}
            </div>
        </>
    )
}

export const MeetingIdViewLoading=()=>{
    return(
        <LoadingState title="Loading Meeting" description="Please wait while we fetch your data"/>
    )
}

export const MeetingIdViewError=()=>{
    return(
        <ErrorState title="Failed to Load Meeing" description="An error occurred while fetching data"/>
    )
}