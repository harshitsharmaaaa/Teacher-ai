import {createTRPCRouter, ProtectedProcedure} from "@/trpc/init";
import { meetings} from "@/db/schema";
import { db } from "@/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { DEFAULT_PAGE, MAX_PAGE_SIZE, MIN_PAGE_SIZE,DEFAULT_PAGE_SIZE } from "@/constants";
import { meetingInsertSchema, meetingUpdateSchema } from "../schema";


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
            
        })
        .from(meetings)
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
            search:z.string().nullish()
        })
    )
        .query(async ({ctx,input})=>{
            const {search,page,pageSize}=input; 
            
        const data = await db.select({
            ...getTableColumns(meetings),
        
        })
        .from(meetings)
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) : undefined
            )
        )
        .orderBy(desc(meetings.createdAt),desc(meetings.id))
        .limit(pageSize)
        .offset(pageSize*(page-1))

        const [Total] = await db
        .select({count:count()})
        .from(meetings)
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) : undefined
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
            

   
});