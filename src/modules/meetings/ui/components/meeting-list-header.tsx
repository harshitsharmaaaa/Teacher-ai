"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon ,XCircleIcon} from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialoge"
import { useState } from "react"
import { Meetingssearchfilter } from "./Meetings-search-filter"
import { MeetingsStatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DEFAULT_PAGE } from "@/constants"


export const MeetingsListheader=()=>{
    const [filters,setfilters] = useMeetingsFilters();
    const [isdialogOpen,setIsdialogOpen]=useState(false);

    const isAnyfilterActive = !!filters.search || !!filters.status || !!filters.agentId;

    const onClearFilters=()=>{
        setfilters({
            search:"",
            status:null,
            agentId:"",
            page:DEFAULT_PAGE
        })
    }
    return(
        <>  
            <NewMeetingDialog
            open={isdialogOpen}
            onOpenChange={setIsdialogOpen}
            />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 ">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">
                        My Meetings
                    </h5>
                    <Button onClick={()=>setIsdialogOpen(true)}>
                        <PlusIcon />
                        New Meeting 
                    </Button>
                </div>
                <ScrollArea>
                    <div className="flex items-center gap-x-2 p-1 ">
                    <Meetingssearchfilter/>
                    <MeetingsStatusFilter/>
                    <AgentIdFilter/> 
                    {isAnyfilterActive && 
                    <Button
                        variant="ghost"
                        onClick={onClearFilters}
                        className="text-primary hover-underline"
                    >
                        <XCircleIcon/>
                        Clear Filters
                    </Button>
                    } 
                </div>
                <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </div>
        </>
    )
}