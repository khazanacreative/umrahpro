import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BottomNav } from "./BottomNav";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ROLE_LABELS, type Role } from "../../lib/roles";
import { initRole, setRole, useUser } from "../../lib/role-store";

export function AppShell({ children }: { children: ReactNode }) {
  const user = useUser();
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

            {/* Search */}
            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari jamaah, paket, invoice…"
                className="h-9 max-w-md pl-9"
                aria-label="Pencarian global"
              />
            </div>

            {/* Right section: User info + actions */}
            <div className="ml-auto flex shrink-0 items-center gap-3">
              {/* User avatar + name (desktop) */}
              <div className="hidden items-center gap-2 sm:flex">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-8 rounded-full ring-2 ring-border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
                <div className="min-w-0 max-w-[160px]">
                  <p className="truncate text-sm font-medium leading-tight text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">{user.jabatan}</p>
                </div>
              </div>

              {/* Avatar only (mobile) */}
              <div className="sm:hidden">
                <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.initials}
                </div>
              </div>

              {/* Role switcher */}
              <Select value={user.role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="h-8 w-[130px] border-dashed text-xs sm:w-[170px]" aria-label="Ganti peran">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="text-xs">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mx-1 h-6 w-px bg-border" />

              <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold" />
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
