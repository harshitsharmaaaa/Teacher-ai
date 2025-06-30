import { ResponsiveDialog } from "@/components/responsive-dialoge";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?:AgentGetOne
}

export const UpdateAgentDialog=({
    open,
    onOpenChange,
    initialValues

}:UpdateAgentDialogProps)=>{
    return(
        <ResponsiveDialog
            title="UpdateAgent"
            description="Edit your Agent"
            open={open}
            onOpenChange={onOpenChange}
        >
         <AgentForm
            onSucess={()=>{
                onOpenChange(false);
            }}
            onCancel={()=>{
                onOpenChange(false);
            }}
            intialValues={initialValues}
         />
        </ResponsiveDialog>
    )
}