import {   CommandDialog, CommandInput, CommandResponsiveDialog } from "@/components/ui/command"
import { CommandItem, CommandList } from "cmdk"
interface props{
    open:boolean
    setopen:React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardCommand =({open,setopen}:props)=>{
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setopen}>
        <CommandInput
        placeholder="find a meeting or agent"
        
        />
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
        </CommandResponsiveDialog>
        
    )
}