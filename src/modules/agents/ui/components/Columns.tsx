 "use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { AvatarGenerator } from "./AvatarGenerator"
import { CornerDownRightIcon, CornerRightDownIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell:({row})=>(
        <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
                <AvatarGenerator
                Varient="bottsNeutral"
                seed={row.original.name}
                className="border size-7"
                />
                <span className="font-semibold text-capitalize text-sm">{row.original.name}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-1">
                    <CornerDownRightIcon className="size-3 text-muted-foreground"/>
                    <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
                        {row.original.instructions}
                    </span>
                </div>

            </div>

        </div>
    )
  },
  {
    accessorKey: "meetingCount",
    header:"Meetings",
    cell:()=>(
        <Badge
        variant="outline"
        className="flex items-center gap-x-2"
        >
            <VideoIcon className="text-blue-700 "/>
            5 Meetings
        </Badge>
    )
  }
  
]