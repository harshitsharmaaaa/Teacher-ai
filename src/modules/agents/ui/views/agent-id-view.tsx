"use client";

import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-header";
import { AvatarGenerator } from "../components/AvatarGenerator";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface AgentIdViewProps{
    agentId:string
}

export const AgentIdView=({
    agentId
}:AgentIdViewProps)=>{
    const trpc = useTRPC();
    const {data}=useSuspenseQuery(trpc.agents.getOne.queryOptions({
        id:agentId
    }));
    return(
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <AgentIdViewHeader
            agentId={agentId}
            agentName={data.name}
            onEdit={()=>{

            }}
            onRemove={()=>{

            }}
            />
            <div className="bg-white rounded-lg border">
                <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                    <div className="flex items-center gap-x-3">
                        <AvatarGenerator
                            seed={data.name}
                            Varient="bottsNeutral"
                            className="border size-10"

                        />
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>
                    <Badge
                    variant={"outline"}
                    className="flex items-center gap-x-2 [&>svg]:size-4"
                    >
                        <VideoIcon className="text-blue-700"/>
                        {data.meetingCount} {data.meetingCount===1?"Meeting":"Meetings"}
                    </Badge>
                    <div className="flex flex-col gap-y-4">
                        <p className="text-lg font-medium">Instructions</p>
                        <p className="text-netural-foreground text-sm">{data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AgentsIdViewLoading=()=>{
    return(
        <LoadingState title="Loading Agent" description="Please wait while we fetch your data"/>
    )
}

export const AgentsIdViewError=()=>{
    return(
        <ErrorState title="Failed to Load Agent" description="An error occurred while fetching data"/>
    )
}