import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Search, UserRound } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BottomNav } from "./BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_LABELS, type Role } from "@/lib/roles";
import { initRole, setRole, useRole } from "@/lib/role-store";

export function AppShell({ children }: { children: ReactNode }) {
  const role = useRole();
  useEffect(() => {
    initRole();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-card/85 px-3 backdrop-blur sm:px-5">
            <SidebarTrigger />
            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari jamaah, paket, invoice…"
                className="h-9 max-w-md pl-9"
                aria-label="Pencarian global"
              />
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="h-9 w-[150px] sm:w-[190px]" aria-label="Peran aktif">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Profil" asChild>
                <Link to="/pengaturan">
                  <UserRound className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Keluar" asChild>
                <Link to="/auth">
                  <LogOut className="size-4" />
                </Link>
              </Button>
            </div>
          </header>
          <main className="min-w-0 flex-1 p-4 pb-24 sm:p-6 md:pb-6">{children}</main>
          <footer className="hidden border-t px-4 py-3 text-xs text-muted-foreground sm:px-6 md:block">
            UmrahPro · Data yang ditampilkan adalah data contoh{" "}
            <Badge variant="secondary" className="ml-1 align-middle">
              Demo
            </Badge>
          </footer>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
