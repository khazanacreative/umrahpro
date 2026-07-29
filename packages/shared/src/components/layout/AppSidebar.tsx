import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Moon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { NAV_GROUPS } from "../../lib/nav";
import { ROLE_GROUPS } from "../../lib/roles";
import { useRole } from "../../lib/role-store";
import logoUmrahPro from "../../assets/logo-umrah-pro.png";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const role = useRole();
  const allowed = ROLE_GROUPS[role];
  const pathname = useRouterState({select: (r: any) => r.location.pathname,});
  const groups = NAV_GROUPS.filter((g) => allowed === "*" || allowed.includes(g.label));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex min-w-0 items-center gap-2 px-1 py-2">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl text-sidebar-primary-foreground overflow-hidden">
            <img
              src={logoUmrahPro}
              alt="Umrah Pro"
              className="size-7 object-contain"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-display text-base leading-tight text-sidebar-foreground">
                UmrahPro
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">
                Sistem Manajemen Umroh
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {groups.map((group) => (
          <NavGroupSection key={group.label} group={group} pathname={pathname} collapsed={collapsed} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function NavGroupSection({
  group,
  pathname,
  collapsed,
}: {
  group: (typeof NAV_GROUPS)[number];
  pathname: string;
  collapsed: boolean;
}) {
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));
  const hasActive = group.items.some((i) => isActive(i.url));
  const [open, setOpen] = useState(hasActive || group.items.length === 1);

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <Collapsible open={collapsed || open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger className="flex w-full items-center">
            {group.label}
            <ChevronRight
              className={
                "ml-auto size-3.5 transition-transform " + (open ? "rotate-90" : "")
              }
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
