import {createTRPCRouter, ProtectedProcedure} from "@/trpc/init";
import { agents, meetings} from "@/db/schema";
import { db } from "@/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, MAX_PAGE_SIZE, MIN_PAGE_SIZE,DEFAULT_PAGE_SIZE } from "@/constants";
import { meetingInsertSchema, meetingUpdateSchema } from "../schema";
import { MeetingStatus } from "../types";


export const meetingsRouter = createTRPCRouter({
    create: ProtectedProcedure
            .input(meetingInsertSchema)
            .mutation(async ({input,ctx})=>{
                const [createdMeeting] = await db.insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();
            return createdMeeting;  
    }),
    getOne:ProtectedProcedure.input(z.object({id:z.string()})).query(async ({input,ctx})=>{
        const [existingMeeting] = await db
        .select({
            ...getTableColumns(meetings),
            agent:agents,
            duration:sql<number>` EXTRACT(EPOCH FROM (meetings.ended_at - meetings.started_at))`.as("duration"),

        })
        .from(meetings)
        .innerJoin(agents,eq(meetings.agentId,agents.id))
        .where(
            and(
                eq(meetings.id,input.id),
                eq(meetings.userId,ctx.auth.user.id)
            )
        );
        
        if(!existingMeeting){
            throw new TRPCError({
                code:"NOT_FOUND",
                message:"Meeting not found"
            })
        }
        return existingMeeting;
    }),
    
    getmany:ProtectedProcedure
        .input(z.object({
            page:z.number().default(DEFAULT_PAGE),
            pageSize:z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search:z.string().nullish(),
            agentId:z.string().nullish(),
            status:z.enum([
                MeetingStatus.upcoming,
                MeetingStatus.completed,
                MeetingStatus.active,
                MeetingStatus.cancelled,
                MeetingStatus.processing
            ]).nullish()
        })
    )
        .query(async ({ctx,input})=>{
            const {search,page,pageSize,status,agentId}=input; 
            
        const data = await db.select({
            ...getTableColumns(meetings),
            agent:agents,
            duration:sql<number>` EXTRACT(EPOCH FROM (meetings.ended_at - meetings.started_at))`.as("duration"),
        
        })
        .from(meetings)
        .innerJoin(agents,eq(meetings.agentId,agents.id))
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) : undefined,
                status ? eq(meetings.status,status) : undefined,
                agentId ? eq(meetings.agentId,agentId) : undefined
            )
        )
        .orderBy(desc(meetings.createdAt),desc(meetings.id))
        .limit(pageSize)
        .offset(pageSize*(page-1))

        const [Total] = await db
        .select({count:count()})
        .from(meetings)
        .innerJoin(agents,eq(meetings.agentId,agents.id))
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) : undefined,
                status ? eq(meetings.status,status) : undefined,
                agentId ? eq(meetings.agentId,agentId) : undefined
            )  
        )

        const totalPages= Math.ceil(Total.count/pageSize);

        
        return {
            items:data,
            total:Total.count,
            totalPages
        };
    }),
    update:ProtectedProcedure
            .input(meetingUpdateSchema)
            .mutation(async ({input,ctx})=>{
                const [updatedMeeting] = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id,input.id),
                        eq(meetings.userId,ctx.auth.user.id)
                    )
                ).returning();
                if(!updatedMeeting){
                    throw new TRPCError({
                        code:"NOT_FOUND",
                        message:"Meeting not found"
                    })
                }
                return updatedMeeting;
    }),
    delete:ProtectedProcedure
            .input(z.object({id:z.string()}))
            .mutation(async ({input,ctx})=>{
                const [removedMeeting] = await db
                .delete(meetings)
                .where(
                    and(
                        eq(meetings.id,input.id),
                        eq(meetings.userId,ctx.auth.user.id)
                    )
                ).returning();
                if(!removedMeeting){
                    throw new TRPCError({
                        code:"NOT_FOUND",
                        message:"Meeting not found"
                    })
                }
                return removedMeeting;
    }),
            

   
});