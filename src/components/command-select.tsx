import { useState,ReactNode } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import {cn} from "@/lib/utils";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

interface CommandSelectProps {
    options:Array<{
        id:string,
        value:string,
        childern:ReactNode
    }>;
    onselect:(value:string)=>void
    onSearch:(value:string)=>void
    value:string
    placeholder?:string
    isSearchable?:boolean
    className?:string
}

export const CommandSelect=({
    options,
    onselect,
    onSearch,
    value,
    placeholder="Select an option",
    isSearchable,
    className,
}:CommandSelectProps)=>{
    const [open,setOpen]=useState(false);
    const selectedOption = options.find((option)=>option.value===value);
    return(
        <>
        <Button
        onClick={()=>setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
            "h-9 justify-between font-normal px-2",
            !selectedOption && "text-muted-foreground",
            className
        )}
        >
            <div>
                {selectedOption?.childern ?? placeholder}
            </div>
            <ChevronsUpDownIcon/>
        </Button>
        <CommandResponsiveDialog
        shouldFilter= {!onSearch}
        open={open}
        onOpenChange={setOpen}
        >
            <CommandInput
            placeholder="search"
            onValueChange={onSearch}
            />
            <CommandList>
                <CommandEmpty>
                    <span className="text-muted-foreground">
                        No results found
                    </span> 
                </CommandEmpty>
                {options.map((option)=>(
                    <CommandItem
                        key={option.id}
                        onSelect={()=>{
                            onselect(option.value);
                            setOpen(false);
                        }}
                    
                    >
                        {option.childern}
                    </CommandItem>
                ))}
            </CommandList>
        </CommandResponsiveDialog>
        </>
    )
}