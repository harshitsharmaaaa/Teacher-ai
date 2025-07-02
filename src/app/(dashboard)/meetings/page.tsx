import { getQueryClient, trpc } from "@/app/api/trpc/server";
import { auth } from "@/lib/auth";
import { MeetingsListheader } from "@/modules/meetings/ui/components/meeting-list-header";
import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadSearchParams } from "@/modules/agents/params";
import type{ SearchParams } from "nuqs";
 
interface props{
    searchParams:Promise<SearchParams>
}

const page = async({searchParams}:props) => {
    const filters = await LoadSearchParams(searchParams);
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        redirect("/sign-in");
    }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getmany.queryOptions({
        ...filters,
    }));
    return (
        <>
        <MeetingsListheader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading/>}>
                <ErrorBoundary fallback={<MeetingsViewError/>}>
                    <MeetingsView/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default page;