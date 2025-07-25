import { useState } from "react"
import {format} from "date-fns";
import { SearchIcon } from "lucide-react";
import  Highlighter  from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/app/api/trpc/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/Avatar";
interface TranscriptProps {
  meetingId: string
}
export const Trasncript = ({ meetingId }: TranscriptProps) => {
    const trpc = useTRPC();
    // const router = useRouter();
    const {data} = useQuery(trpc.meetings.getTranscript.queryOptions({
        id:meetingId
    }))
    const [search,setSearch] = useState("");
    const filterData = (data ?? []).filter((item)=>
        item.text.toLowerCase().includes(search.toLowerCase())
    )

    return(
        <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
            <p className="text-sm font-medium">Transcript</p>
            <div className="relative">
                <Input
                placeholder="search transcript"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="pl-7 h-9 w-[240px]"
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4"/>
            </div>
            <ScrollArea >
                <div className="flex flex-col gap-y-4">
                    {filterData.map((item,index)=>(
                        <div key={index} className="flex items-start gap-x-2">
                            <Avatar>
                                <AvatarImage
                                    src={item.user.image ?? generateAvatarUri({
                                        seed:item.user.name,
                                        varient:"initials"
                                    })}
                                />
                            </Avatar>
                            <p className="text-sm font-medium">
                                {item.user.name}
                            </p>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(item.start_ts),"hh:mm:ss a")}
                                </span>
                                <Highlighter
                                    highlightClassName="bg-yellow-200"
                                    searchWords={[search]}
                                    autoEscape={true}
                                    textToHighlight={item.text}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}