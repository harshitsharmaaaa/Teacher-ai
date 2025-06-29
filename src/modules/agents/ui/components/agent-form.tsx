import { useTRPC } from "@/app/api/trpc/client"
import { AgentGetOne } from "../../types"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, useWatch } from "react-hook-form"
import  {   
    AvatarGenerator ,
} from "./AvatarGenerator"
import { z } from "zod"
import { agentInputSchema } from "../../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
} from "@/components/ui/form";
import { useState } from "react"
import { toast } from "sonner"

interface AgentInterfaceProps{
    onSucess?:()=>void
    onCancel?:()=>void
    intialValues?:AgentGetOne    
}
 
export const AgentForm=({onSucess,onCancel,intialValues}:AgentInterfaceProps)=>{
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient =useQueryClient();
    
   const  createAgent = useMutation(
    trpc.agents.create.mutationOptions({
        onSuccess:()=>{
            queryClient.invalidateQueries(
                trpc.agents.getmany.queryOptions()
            )
            if(intialValues?.id){
                queryClient.invalidateQueries(
                    trpc.agents.getOne.queryOptions({
                        id:intialValues?.id
                    })
                )
            }
            onSucess?.();
        }
        ,onError:(error)=>{
            toast.error(error.message)
        }
    })
   )

   const form = useForm<z.infer<typeof agentInputSchema>>({
    resolver: zodResolver(agentInputSchema),
    defaultValues:{
        name:intialValues?.name ?? "",
        instructions:intialValues?.instructions ?? "",
    }    
   })

   const isEdit = !!intialValues?.id;
   const isPending = createAgent.isPending;
   const onSubmit = async (data:z.infer<typeof agentInputSchema>) => {
        if(isEdit){
            console.log("Todo :update agent");
        }else{
            await createAgent.mutateAsync(data)
        }
    };

     

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <AvatarGenerator
                seed={form.watch("name")}
                Varient="bottsNeutral"
                className="border size-16"
                />

                <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input {...field} placeholder="Enter your name" />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />
                <FormField 
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} 
                                 placeholder="Enter your instructions" 
                                 />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-x-2">
                    {onCancel &&
                    (<Button
                        variant="ghost"
                        disabled={isPending}    
                        type="button"
                        onClick={()=>onCancel()}
                    >
                        Cancel
                    </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );


}