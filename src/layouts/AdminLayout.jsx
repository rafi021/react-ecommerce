import { AppSidebar } from "@/components/app-sidebar.jsx"
import { SiteHeader } from "@/components/site-header.jsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.jsx"
import { Outlet } from "react-router"
export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                {/* <SiteHeader title=""/> */}
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}