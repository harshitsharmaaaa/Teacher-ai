"use client";
import { useTRPC } from '@/app/api/trpc/client';
import { DataTable } from '@/components/data-tables';
import { ErrorState } from '@/components/Error-state';
import { LoadingState } from '@/components/loading-state';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useRouter } from 'next/navigation';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { DataPagination } from '@/components/data-pagination';

function MeetingsView() {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters,setfilters]= useMeetingsFilters();
    const {data} = useSuspenseQuery(trpc.meetings.getmany.queryOptions({
        ...filters,
    }));
  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 '>
        <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row)=>{
            router.push(`/meetings/${row.id}`)
        }}
        />
        <DataPagination
        page={filters.page}
        totalpages={data.totalPages ?? 0}
        onPageChange={(page)=>{
            setfilters({page})
        }}

        />
        {data.items.length===0 && 
            <EmptyState title="Create Your First Meeting"
            description="Schedule your first meeting to get started and join a meeting each agent will have a unique name and instructions"/>
        }
    </div>
  )
}
export const MeetingsViewLoading=()=>{
    return(
        <LoadingState title="Loading Meeting" description="Please wait while we fetch your data"/>
    )
}

export const MeetingsViewError=()=>{
    return(
        <ErrorState title="Failed to Load Meeing" description="An error occurred while fetching data"/>
    )
}

export default  MeetingsView;
