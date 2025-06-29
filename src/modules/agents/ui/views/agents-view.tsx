"use client";
import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data ,isLoading,isError} = useSuspenseQuery( trpc.agents.getmany.queryOptions());
    // if(isLoading) return(
    //     <LoadingState title="Loading Agents" description="Please wait while we fetch your data"/>
    // )

    // if(isError) return <ErrorState title="Failed to Load Agents" description="An error occurred while fetching data"/>
    return (
        <div>
            
            {JSON.stringify(data,null,2)}
        </div>
    )
}

export const AgentsViewLoading=()=>{
    return(
        <LoadingState title="Loading Agents" description="Please wait while we fetch your data"/>
    )
}

export const AgentsViewError=()=>{
    return(
        <ErrorState title="Failed to Load Agents" description="An error occurred while fetching data"/>
    )
}