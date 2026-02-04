import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userRoles } from "@/constants/userRoles";
import { multiRoleGuard } from "@/lib/auth.guard";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  seller,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {
  const session = await multiRoleGuard([userRoles.admin, userRoles.seller]);

  const userInfo = session.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo?.role === userRoles.admin ? admin : seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
