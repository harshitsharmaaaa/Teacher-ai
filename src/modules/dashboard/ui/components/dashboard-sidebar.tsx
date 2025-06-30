"use client";
import { SidebarContent, SidebarFooter, SidebarHeader ,SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, Sidebar, SidebarGroupContent } from "@/components/ui/sidebar";
import {  BotIcon,  SettingsIcon,  Star, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { use } from "react";
import { usePathname } from "next/navigation";
import { DashBoardUserButton } from "./dashboard-user-button";

const  firstSection=[
    {
        icon:VideoIcon,
        label:"Meetings",
        href:"/meetings",
    },{
        icon:BotIcon,
        label:"Agents",
        href:"/agents",
    }

]
const  SecondSection=[
    {
        icon:StarIcon,
        label:"Upgrade",
        href:"/upgrade",
    }
]

export const DashboardSidebar = () => {
    const pathName = usePathname();
  return (
    <Sidebar>
        <SidebarHeader className="text-sidebar-accent-foreground">
            <Link href="/" className="flex items-center gap-2 px-2 pt-2">
            <Image src="/logo.svg" height={36} width={36} alt="Logo"  />
            <p className="text-2xl font-semibold">Meet.AI</p>
            </Link>
        </SidebarHeader>
        <div className="px-4 py-2">
          <Separator className="opacity-50 text-[#5D6B68]" />
        </div>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent> 
                    <SidebarMenu>
                        {firstSection.map((item)=>(
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild
                                className={cn(
                                    "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                     pathName==item.href  && "bg-liner-to-r/oklch border-[#5D6B68]/10"
                                )}
                                isActive={pathName==item.href}
                                >
                                    <Link href={item.href}>
                                    <item.icon  className="size-5" />
                                    <span className="text-sm font-medium tracking-tight">
                                        {item.label}
                                    </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-4 py-2">
          <Separator className="opacity-50 text-[#5D6B68]" />
        </div>
            <SidebarGroup>
                <SidebarGroupContent> 
                    <SidebarMenu>
                        {SecondSection.map((item)=>(
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild
                                className={cn(
                                    "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                     pathName==item.href  && "bg-liner-to-r/oklch border-[#5D6B68]/10"
                                )}
                                isActive={pathName==item.href}
                                >
                                    <Link href={item.href}>
                                    <item.icon  className="size-5" />
                                    <span className="text-sm font-medium tracking-tight">
                                        {item.label}
                                    </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="text-white">
            <DashBoardUserButton/>
        </SidebarFooter>
    </Sidebar>
  )
}