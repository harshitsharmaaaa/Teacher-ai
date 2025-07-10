import { LogInIcon } from "lucide-react";
import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    useCallStateHooks,
    VideoPreview,
    useCall
} from'@stream-io/video-react-sdk';
import Link  from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/Avatar";
import { streamVideo } from "@/lib/stream-video";
import "@stream-io/video-react-sdk/dist/css/styles.css";


interface Props{
    onJoin:()=>void;
}

const DisabledVideoPreview = () => {
    const {data} = authClient.useSession();

    return(
        <DefaultVideoPlaceholder
            participant = {
                {
                    name:data?.user.name ?? "",
                    image:data?.user.image ?? generateAvatarUri({seed:data?.user.name??"",varient:"initials"})
                }as StreamVideoParticipant
            }
        />   
    )
}

const AllowBrowserPermission = () => {
    return(
        <p className="text-sm">
            Please allow browser permissions to use your camera and microphone
        </p>
    )
}

export const CallLobby=({onJoin}:Props)=>{
   
   const call = useCall();
   if(!call){
    console.log("there is no call");
   }

    const { useMicrophoneState, useCameraState } = useCallStateHooks();
    const {hasBrowserPermission:hasMicPermission}= useMicrophoneState();
    const {hasBrowserPermission:hasCameraPermission}= useCameraState();

    const hasBrowserMediaPermission = hasMicPermission && hasCameraPermission;

    return(
        <div className="flex flex-col items-center justify-center h-full bg-redial from-sidebar-accent to-sidebar">
            <div className="flex flex-1 items-center justify-center py-8 px-8">
                 <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                     <div className="flex flex-col text-center gap-y-2">
                         <h6 className="text-lg font-medium">
                            Ready to join the call?
                         </h6>
                         <p className="text-sm">Setup your camera and microphone and join the call</p>
                     </div>
                       <VideoPreview
                        DisabledVideoPreview={
                            hasBrowserMediaPermission
                            ? DisabledVideoPreview
                            : AllowBrowserPermission
                        }
                        />
                     <div className="flex gap-x-2">
                             <ToggleVideoPreviewButton/> 
                             <ToggleAudioPreviewButton/> 
                     </div>
                     <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant="ghost">
                            <Link href="/meetings">
                            Cancel
                            </Link>
                        </Button>
                        <Button
                        onClick={onJoin}
                        >
                            <LogInIcon/>
                            Join Call
                        </Button>
                     </div>
                 </div>
            </div>

        </div>
    )
}