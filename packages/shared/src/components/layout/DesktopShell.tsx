import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Settings, LogOut, Check, ChevronDown } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ROLE_LABELS, type Role } from "../../lib/roles";
import { initRole, setRole, useUser } from "../../lib/role-store";

export function DesktopShell({ children }: { children: ReactNode }) {
  const user = useUser();
  const [open, setOpen] = useState(false);
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
              <Bell className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari jamaah, paket, invoice…"
                className="h-9 max-w-md pl-9"
                aria-label="Pencarian global"
              />
            </div>

            {/* Right section */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* User Dropdown Menu */}
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 outline-none ring-ring transition-colors hover:bg-accent focus-visible:ring-2"
                    aria-label="Menu pengguna"
                  >
                    <div className="relative size-7 shrink-0 sm:size-8">
                      <div className="absolute inset-0 grid place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground sm:text-xs">
                        {user.initials}
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="absolute inset-0 size-full rounded-full ring-2 ring-border object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none" }}
                      />
                    </div>
                    <div className="hidden min-w-0 max-w-[120px] text-left sm:block">
                      <p className="truncate text-sm font-medium leading-tight text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">{user.jabatan}</p>
                    </div>
                    <ChevronDown className={`hidden size-3.5 shrink-0 text-muted-foreground transition-transform sm:block ${open ? "rotate-180" : ""}`} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  {/* User Info Header */}
                  <DropdownMenuLabel className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 shrink-0">
                        <div className="absolute inset-0 grid place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {user.initials}
                        </div>
                        <img
                          src={user.avatar}
                          alt=""
                          className="absolute inset-0 size-full rounded-full ring-2 ring-border object-cover"
                          onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        <Badge variant="secondary" className="mt-1 text-[10px]">
                          {user.jabatan}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* Role Switcher */}
                  <DropdownMenuLabel className="px-2 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Ganti Peran
                  </DropdownMenuLabel>
                  {Object.entries(ROLE_LABELS).map(([value, label]) => {
                    const isActive = value === user.role;
                    return (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => { setRole(value as Role); setOpen(false); }}
                        className={`gap-3 text-sm ${isActive ? "bg-primary-soft font-medium text-primary" : ""}`}
                      >
                        <div
                          className={`size-2 shrink-0 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground/30"}`}
                        />
                        <span className="flex-1">{label}</span>
                        {isActive && <Check className="size-3.5 text-primary" />}
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />

                  {/* Settings & Logout */}
                  <DropdownMenuItem asChild>
                    <Link to="/pengaturan" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                      <Settings className="size-4 text-muted-foreground" />
                      Pengaturan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                    <Link to="/auth" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                      <LogOut className="size-4" />
                      Keluar
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold" />
              </Button>
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 pb-6 sm:p-6 md:pb-6">{children}</main>

          <footer className="hidden border-t px-4 py-3 text-xs text-muted-foreground sm:px-6 md:block">
            UmrahPro · Data yang ditampilkan adalah data contoh{" "}
            <Badge variant="secondary" className="ml-1 align-middle">
              Demo
            </Badge>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}