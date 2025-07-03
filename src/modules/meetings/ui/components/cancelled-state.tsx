import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoIcon,BanIcon, Ban } from "lucide-react"

export const CancelledState=()=>{
    return(
        <div className="bg-white rounded-lg px-4 py-5  flex flex-col items-center justify-center gap-y-8 ">
            <EmptyState
            image="/cancelled.svg"
            title="Meeting Cancelled"
            description="This meeting has been cancelled."
            />
        </div>
    )
}