import {   CommandDialog, CommandInput } from "@/components/ui/command"
import { CommandItem, CommandList } from "cmdk"
interface props{
    open:boolean
    setopen:React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardCommand =({open,setopen}:props)=>{
    return (
        <CommandDialog open={open} onOpenChange={setopen}>
        <CommandInput
        placeholder="find a meeting or agent"
        className="w-full"
        />
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
        </CommandDialog>
        
    )
}