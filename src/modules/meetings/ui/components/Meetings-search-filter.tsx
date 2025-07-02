import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const Meetingssearchfilter=()=>{
    const [filters,setfilters]= useMeetingsFilters();
    return(
        <div className="relative ">
            <Input
                value={filters.search}
                onChange={(e)=>{
                    setfilters({search:e.target.value})
                }}
                placeholder="filter by Name"
                className="h-9 w-[200px] bg-white pl-7"
                
                
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        </div>
    )
}