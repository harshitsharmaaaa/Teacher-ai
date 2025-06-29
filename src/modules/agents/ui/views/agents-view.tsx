"use client";
import { useTRPC } from "@/app/api/trpc/client";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/Columns";
import { EmptyState } from "@/components/empty-state";



export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery( trpc.agents.getmany.queryOptions());

    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            
            <DataTable columns={columns} data={data} />
            {data.length===0 && <EmptyState title="Create Your First Agent" description="Create your first agent to get started and join a meeting each agent will have a unique name and instructions"/>}
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