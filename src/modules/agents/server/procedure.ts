import {createTRPCRouter, ProtectedProcedure} from "@/trpc/init";
import {agents} from "@/db/schema";
import { db } from "@/db";
import { promise,z } from "zod";
import { resolve } from "path";
import { TRPCError } from "@trpc/server";
import { agentInputSchema } from "../schema";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, MAX_PAGE_SIZE, MIN_PAGE_SIZE,DEFAULT_PAGE_SIZE } from "@/constants";


export const agentsRouter = createTRPCRouter({
    //
    getOne:ProtectedProcedure.input(z.object({id:z.string()})).query(async ({input,ctx})=>{
        const [existingagent] = await db
        .select({
            ...getTableColumns(agents),
            meetingCount:sql<number>`5`
        })
        .from(agents)
        .where(
            and(
                eq(agents.id,input.id),
                eq(agents.userId,ctx.auth.user.id)
            )
        );
        
        if(!existingagent){
            throw new TRPCError({
                code:"NOT_FOUND",
                message:"Agent not found"
            })
        }
        return existingagent;
    }),
    //
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
            meetingCount:sql<number>`7`,
            ...getTableColumns(agents),
        
        })
        .from(agents)
        .where(
            and(
                eq(agents.userId,ctx.auth.user.id),
                search ? ilike(agents.name,`%${search}%`) : undefined
            )
        )
        .orderBy(desc(agents.createdAt),desc(agents.id))
        .limit(pageSize)
        .offset(pageSize*(page-1))

        const [Total] = await db
        .select({count:count()})
        .from(agents)
        .where(
            and(
                eq(agents.userId,ctx.auth.user.id),
                search ? ilike(agents.name,`%${search}%`) : undefined
            )  
        )

        const totalPages= Math.ceil(Total.count/pageSize);

        
        return {
            items:data,
            total:Total.count,
            totalPages
        };
    }),

    create: ProtectedProcedure
        .input(agentInputSchema)
        .mutation(async ({input,ctx})=>{
            const [createdagent] = await db.insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
            })
            .returning();
        return createdagent;  
    })
});