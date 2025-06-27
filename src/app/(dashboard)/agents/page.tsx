import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient ,trpc} from '@/app/api/trpc/server';
import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingState } from '@/components/loading-state';

const page = async() => {
    const queryclient = getQueryClient();
    void queryclient.prefetchQuery(trpc.agents.getmany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
        <Suspense fallback={<AgentsViewLoading/>}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
      <AgentsView/>
      </ErrorBoundary>
      </Suspense> 
    </HydrationBoundary>
  )
}

export default page
