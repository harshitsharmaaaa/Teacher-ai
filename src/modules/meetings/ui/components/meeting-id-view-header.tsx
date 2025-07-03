import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRightIcon ,TrashIcon,PencilIcon,MoreVerticalIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props{
    meetingId:string,
    meetingName:string,
    onEdit:()=>void,
    onRemove:()=>void
}

export const MeetingIdViewHeader=({
    meetingId,
    meetingName,
    onEdit,
    onRemove
}:Props)=>{
        return(
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-xl font-medium">
                                <Link href="/meetings">
                                    My Meetings
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-xl font-medium text-foreground">
                                <Link href={`/meetings/${meetingId}`}>
                                    {meetingName}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MoreVerticalIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>
                                <PencilIcon className="size-4 text-black"/>
                                Edit Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onRemove}>
                                <TrashIcon className="size-4 text-black"/>
                                Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>

            </div>
        )
}