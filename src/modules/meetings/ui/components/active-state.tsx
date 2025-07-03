import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoIcon,BanIcon, Ban } from "lucide-react"

interface Props{
    meetingId:string,
    
}

export const ActiveState=({
    meetingId,
    
}:Props)=>{
    return(
        <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-6 py-8 shadow-md max-w-md mx-auto">
            <EmptyState
            image="/upcoming.svg"
            title="Meeting is Active"
            description="Meeting will end once all the paticipants have left."
            />
            <div className="flex flex-col gap-3 w-full mt-4 sm:flex-row sm:justify-center">
                <Link href={`/call/${meetingId}`} className="w-full sm:w-auto">
                    <Button
                    className="w-full sm:w-auto flex items-center gap-2">
                    <VideoIcon className="w-4 h-4" />
                    Join Meeting
                    </Button>
                </Link>
            </div>
        </div>
    )
}