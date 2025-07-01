import { ResponsiveDialog } from "@/components/responsive-dialoge";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
interface NewMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog=({
    open,
    onOpenChange,

}:NewMeetingDialogProps)=>{
    const router = useRouter();
    return(
        <ResponsiveDialog
            title="New Meeting"
            description="Create a new Meeting"
            open={open}
            onOpenChange={onOpenChange}
        >
         <MeetingForm
         onSucess={(id)=>{
            router.push(`/meetings/${id}`)
            onOpenChange(false);
         }}
         onCancel={()=>{
            onOpenChange(false);
         }}
         />
        </ResponsiveDialog>
    )
}