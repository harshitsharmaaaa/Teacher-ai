import {createTRPCRouter, ProtectedProcedure} from "@/trpc/init";
import {agents} from "@/db/schema";
import { db } from "@/db";
import { promise,z } from "zod";
import { resolve } from "path";
import { TRPCError } from "@trpc/server";
import { agentInputSchema } from "../schema";
import { eq, getTableColumns, sql } from "drizzle-orm";


export const agentsRouter = createTRPCRouter({
    //
    getOne:ProtectedProcedure.input(z.object({id:z.string()})).query(async ({input})=>{
        const [existingagent] = await db
        .select({
            ...getTableColumns(agents),
            meetingCount:sql<number>`5`
        })
        .from(agents)
        .where(eq(agents.id,input.id));
        
        return existingagent;
    }),
    //
    getmany:ProtectedProcedure.query(async ()=>{
        const data = await db.select().from(agents);
        
        return data;
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