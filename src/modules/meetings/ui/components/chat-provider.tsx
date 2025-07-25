"use client"
import { authClient } from "@/lib/auth-client"
import { LoadingState } from "@/components/loading-state"
import { ChatUi } from "./chat-ui"

interface ChatProviderProps{
    meetingId:string,
    meetingName:string
}

export const ChatProvider = ({meetingId,meetingName}:ChatProviderProps)=>{
    const {data,isPending}= authClient.useSession();
    if(isPending||!data?.user){
        return(
            <LoadingState title="Loading Chat" description="Please wait while we fetch your data"/>
        )
    }

    return(
        <ChatUi 
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={data.user.image ?? ""}
        />
    )
}