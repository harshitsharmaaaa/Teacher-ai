import { inferRouterOutputs } from "@trpc/server";
import type {AppRouter} from "@/trpc/router/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getmany"]["items"];
export enum MeetingStatus{
    upcoming="upcoming",
    completed="completed",
    active="active",
    cancelled="cancelled",
    processing="processing"
}