import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import {DashboardNavbar} from "@/modules/dashboard/ui/components/dashboard-Navbar";
interface LayoutProps {
  children: React.ReactNode;
}



const layout=({children}:LayoutProps)=>{
    return (
            <SidebarProvider>
                <DashboardSidebar/>
                <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar/>
                    
                    {children}
                </main>
            </SidebarProvider>
    )
}   

export default layout;