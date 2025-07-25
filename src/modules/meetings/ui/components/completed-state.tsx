import { MeetingGetOne } from "../../types"
import Markdown from "react-markdown"
import { AvatarGenerator } from "@/modules/agents/ui/components/AvatarGenerator"
import Link from "next/link"
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import { SparklesIcon,
    BookOpenTextIcon,
    FileVideoIcon,
    ClockFadingIcon,
    FileTextIcon
    } from "lucide-react"
import { formatError } from "zod/v4/core"
import { format } from "date-fns"
import { formatDuration } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Trasncript } from "./transcript"
import { ChatProvider } from "./chat-provider"
interface MeetingIdViewProps{
    data:MeetingGetOne
}

export const CompletedState=({data}:MeetingIdViewProps)=>{
    return(
        <div className="flex flex-col gap-y-4 h-full pb-8">
             <div className="flex-1 min-h-0 overflow-y-auto">
            <Tabs defaultValue="summary" >
                <div className="bg-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13">
                            <TabsTrigger 
                            value="summary"
                            className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <BookOpenTextIcon />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger 
                            value="transcript"
                            className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileTextIcon />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger 
                            value="recording"
                            className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileVideoIcon />
                                Recording
                            </TabsTrigger>
                            <TabsTrigger 
                            value="chat"
                            className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <SparklesIcon />
                                Ask Ai
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>
                <TabsContent value="chat">
                    <ChatProvider meetingId={data.id} meetingName={data.name}/>
                </TabsContent>
                <TabsContent value="transcript">
                    <Trasncript meetingId={data.id} />
                </TabsContent>
                <TabsContent value="recording" >
                    <div className="bg-white rounded-lg border px-4 py-5">
                        <video
                            src={data.recordingUrl!}
                            controls
                            className="w-full h-full"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                            <h2 className="text-2xl font-medium capitalize">
                                {data.name}
                            </h2>
                            <div className="flex gap-x-2 items-center">
                                <Link href={`/meetings/${data.agent.id}`}
                                className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
                                <AvatarGenerator
                                Varient="bottsNeutral"
                                seed={data.agent.name}
                                className="size-5"
                                />
                                {data.agent.name}
                                </Link>{" "}
                                <p>{data.startedAt? format(data.startedAt,"PPP"):""}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparklesIcon className="size-4"/>
                                <p>General Summary</p>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
                                <ClockFadingIcon className="text-blue-700"/>
                                {data.duration? formatDuration(data.duration):"the meeting has no duration"}
                            </Badge>
                            <div>
                                <Markdown components={{
                                    h1: (props) => <h1 className="text-2xl font-bold" {...props} />,
                                    h2: (props) => <h2 className="text-xl font-bold" {...props} />,
                                    h3: (props) => <h3 className="text-lg font-bold" {...props} />,
                                    h4: (props) => <h4 className="text-base font-bold" {...props} />,
                                    p: (props) => <p className="text-sm" {...props} />,
                                    ul: (props) => <ul className="list-disc pl-6 space-y-1" {...props} />,
                                }}>
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    )    
}