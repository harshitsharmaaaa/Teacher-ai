import {createTRPCRouter,baseProcedure} from "@/trpc/init";
import {agents} from "@/db/schema";
import { db } from "@/db";
import { promise } from "zod";
import { resolve } from "path";
import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
    getmany:baseProcedure.query(async ()=>{
        const data = await db.select().from(agents);
        
        return data;
    })
});