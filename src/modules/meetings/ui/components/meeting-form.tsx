import { useTRPC } from "@/app/api/trpc/client"
// import { meetingGetOne } from "../../types"
import { CommandSelect } from "@/components/command-select"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm, useWatch } from "react-hook-form"
import  {   
    AvatarGenerator ,
} from "@/modules/agents/ui/components/AvatarGenerator"
import { z } from "zod"
import { meetingInsertSchema } from "../../schema"
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
    FormDescription,
} from "@/components/ui/form";
import { useState } from "react"
import { toast } from "sonner"
import { MeetingGetOne } from "@/modules/meetings/types"
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialoge"

interface MeetingInterfaceProps{
    onSucess?:(id:string)=>void
    onCancel?:()=>void
    intialValues?:MeetingGetOne    
}
 
export const MeetingForm=({onSucess,onCancel,intialValues}:MeetingInterfaceProps)=>{
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient =useQueryClient();
    const [openNewAgentDialog,setOpenNewAgentDialog]=useState(false);
    const [Agentsearch ,setAgentSearch]=useState("");
    const agents = useQuery(
        trpc.agents.getmany.queryOptions({
            pageSize:100,
            search:Agentsearch
        }),
    )
    
   const  createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
        onSuccess:async (data)=>{
            queryClient.invalidateQueries(
                trpc.meetings.getmany.queryOptions({})
            )
            
            onSucess?.(data.id);
        }
        ,onError:(error)=>{
            toast.error(error.message)
        }
    })
   )
   const  UpdateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
        onSuccess:async(data)=>{
            queryClient.invalidateQueries(
                trpc.meetings.getmany.queryOptions({})
            )
            if(intialValues?.id){
                queryClient.invalidateQueries(
                    trpc.meetings.getOne.queryOptions({
                        id:intialValues?.id
                    })
                )
            }
            onSucess?.(data.id);
        }
        ,onError:(error)=>{
            toast.error(error.message)
        }
    })
   )

   const form = useForm<z.infer<typeof meetingInsertSchema>>({
    resolver: zodResolver(meetingInsertSchema),
    defaultValues:{
        name:intialValues?.name ?? "",
        agentId:intialValues?.id ?? "",
    }    
   })

   const isEdit = !!intialValues?.id;
   const isPending = createMeeting.isPending || UpdateMeeting.isPending;
   const onSubmit = async (data:z.infer<typeof meetingInsertSchema>) => {
        if(isEdit){
            UpdateMeeting.mutate({...data,id:intialValues.id});
        }else{
            await createMeeting.mutateAsync(data)
        }
    };

     

    return (
    <>
        <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                

                <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input {...field} placeholder="Enter your Meetings Name" />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />
                <FormField 
                    name="agentId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent</FormLabel>
                            <FormControl>
                               <CommandSelect
                                options={(agents.data?.items??[]).map((agent)=>({
                                    id:agent.id,
                                    value:agent.id,
                                    children:(
                                        <div className="flex items-center gap-x-2">
                                            <AvatarGenerator
                                            seed={agent.name}
                                            Varient="bottsNeutral"
                                            className="border size-6"
                                            />
                                            <span>
                                                {agent.name}
                                            </span>
                                        </div>
                                    )
                                }))}
                                onselect={field.onChange}
                                onSearch={setAgentSearch}
                                value={field.value}
                                placeholder="Select an Agent" 
                                />
                            </FormControl>
                            <FormDescription>
                                Not Found what you&apos;re looking for?{""}
                                <Button
                                onClick={()=>setOpenNewAgentDialog(true)}
                                type="button"
                                variant="ghost"
                                className="text-primary hover-underline"
                                >
                                    Create New Agent
                                </Button>
                            </FormDescription>
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
    </>
    );


}