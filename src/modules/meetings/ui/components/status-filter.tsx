import {
    CircleCheckIcon,
    CircleXIcon,
    ClockArrowUpIcon,
    ClockFadingIcon,
    VideoIcon,
    LoaderIcon
} from "lucide-react"
import { CommandSelect } from "@/components/command-select"
import { MeetingStatus } from "../../types"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"


export const options=[
    {
        id:MeetingStatus.upcoming,
        value:MeetingStatus.upcoming,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon className="text-blue-700"/>
                {MeetingStatus.upcoming}
                
            </div>
        )
    },
    {
        id:MeetingStatus.completed,
        value:MeetingStatus.completed,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon className="text-blue-700"/>
                {MeetingStatus.completed}
                
            </div>
        )
    },
    {
        id:MeetingStatus.active,
        value:MeetingStatus.active,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon className="text-blue-700"/>
                {MeetingStatus.active}
                
            </div>
        )
    },
    {
        id:MeetingStatus.cancelled,
        value:MeetingStatus.cancelled,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon className="text-blue-700"/>
                {MeetingStatus.cancelled}
                
            </div>
        )
    },
    {
        id:MeetingStatus.processing,
        value:MeetingStatus.processing,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon className="text-blue-700"/>
                {MeetingStatus.processing}
                
            </div>
        )
    }
]

export const MeetingsStatusFilter=()=>{
    const [filters,setfilters]= useMeetingsFilters();
    return(
        <CommandSelect
        options={options}
        onselect={(value)=>{
            setfilters({status:value as MeetingStatus})
        }}
        value={filters.status ?? ""}
        placeholder="Select a Status" 
        className="h-9"
        />
    )
}

