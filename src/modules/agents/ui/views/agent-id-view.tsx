"use client";
import { useState } from "react";
import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-header";
import { AvatarGenerator } from "../components/AvatarGenerator";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "../components/update-agent-dialoge";

interface AgentIdViewProps{
    agentId:string
}

export const AgentIdView=({
    agentId
}:AgentIdViewProps)=>{
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [updateAgentDial,setUpdateAgentDial] = useState(false);

    const {data}=useSuspenseQuery(trpc.agents.getOne.queryOptions({
        id:agentId
    }));
    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess:async()=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getmany.queryOptions({})
                )
                router.push("/agents");
            },
            onError:(error)=>{
                toast.error(error.message)
            }
        })
    )

    const  [Removeconfirmation,confirmRemove] = useConfirm("Are you sure?",`This will permanently delete the agent and ${data.meetingCount} meetings associated with it.`);

    const handleRemoveAgent=async()=>{
        const ok = await confirmRemove();
        if(!ok){
            return;
        }
        await removeAgent.mutateAsync({
            id:agentId
        });
    }

    return(
        <>
            <Removeconfirmation/>
            <UpdateAgentDialog
                open={updateAgentDial}
                
                onOpenChange={(open)=>{
                    setUpdateAgentDial(open);
                }}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={()=>{
                    setUpdateAgentDial(true);
                }}
                onRemove={handleRemoveAgent}/>
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
        </>
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