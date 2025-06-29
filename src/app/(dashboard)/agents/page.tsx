import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient ,trpc} from '@/app/api/trpc/server';
import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingState } from '@/components/loading-state';
import { Listheader } from '@/modules/agents/ui/components/agent-List-headers';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),

    })
    if(!session) {
      redirect("/sign-in");
    }

    const queryclient = getQueryClient();
    void queryclient.prefetchQuery(trpc.agents.getmany.queryOptions());
  return (
    <>
    <Listheader/>
    <HydrationBoundary state={dehydrate(queryclient)}>
        <Suspense fallback={<AgentsViewLoading/>}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
      <AgentsView/>
      </ErrorBoundary>
      </Suspense> 
    </HydrationBoundary>
    </>
  )
}

export default page
