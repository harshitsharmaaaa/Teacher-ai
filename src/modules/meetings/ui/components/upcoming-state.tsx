import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoIcon,BanIcon, Ban } from "lucide-react"

interface Props{
    meetingId:string,
    onCancelMeeting:()=>void
    isCancelling:boolean
}

export const UpcomingState=({
    meetingId,
    onCancelMeeting,
    isCancelling
}:Props)=>{
    return(
        <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-6 py-8 shadow-md max-w-md mx-auto">
            <EmptyState
            image="/upcoming.svg"
            title="Not Started Yet"
            description="Once you start this meeting, a summary will be generated up here."
            />
            <div className="flex flex-col gap-3 w-full mt-4 sm:flex-row sm:justify-center">
            <Button
                variant="secondary"
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={onCancelMeeting}
                disabled={isCancelling}
            >
                <BanIcon className="w-4 h-4" />
                Cancel Meeting
            </Button>
            <Link href={`/call/${meetingId}`} className="w-full sm:w-auto">
                <Button
                className="w-full sm:w-auto flex items-center gap-2"
                disabled={isCancelling}
                >
                <VideoIcon className="w-4 h-4" />
                Start Meeting
                </Button>
            </Link>
            </div>
        </div>
    )
}