"use client";
import { useTRPC } from '@/app/api/trpc/client';
import { ErrorState } from '@/components/Error-state';
import { LoadingState } from '@/components/loading-state';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

function MeetingsView() {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getmany.queryOptions({}));
  return (
    <div className='overflow-x-scroll'>
        {/* {JSON.stringify(data)} */}
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
