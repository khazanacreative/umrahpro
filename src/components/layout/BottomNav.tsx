import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, UserCog, Smartphone, Menu, Wallet, BookOpen,
  MapPin, Building2, Share2, ClipboardCheck, type LucideIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useRole } from "@/lib/role-store";
import type { Role } from "@/lib/roles";
import { cn } from "@/lib/utils";

type Item = { title: string; url: string; icon: LucideIcon; match: (p: string) => boolean };

const HOME: Item = { title: "Dasbor", url: "/", icon: LayoutDashboard, match: (p) => p === "/" };

const NAV_BY_ROLE: Partial<Record<Role, Item[]>> = {
  agen: [
    HOME,
    { title: "Jamaah", url: "/jamaah", icon: Users, match: (p) => p.startsWith("/jamaah") },
    { title: "Referral", url: "/referral", icon: Share2, match: (p) => p.startsWith("/referral") },
    { title: "Komisi", url: "/komisi", icon: Wallet, match: (p) => p.startsWith("/komisi") },
  ],
  tour_leader: [
    HOME,
    { title: "Rombongan", url: "/tour-leader", icon: ClipboardCheck, match: (p) => p.startsWith("/tour-leader") },
    { title: "Itinerari", url: "/itinerari", icon: MapPin, match: (p) => p.startsWith("/itinerari") },
    { title: "Panduan", url: "/panduan", icon: BookOpen, match: (p) => p.startsWith("/panduan") },
  ],
  jamaah: [
    HOME,
    { title: "Itinerari", url: "/itinerari", icon: MapPin, match: (p) => p.startsWith("/itinerari") },
    { title: "Panduan", url: "/panduan", icon: BookOpen, match: (p) => p.startsWith("/panduan") },
    { title: "Portal", url: "/portal-jamaah", icon: Smartphone, match: (p) => p.startsWith("/portal-jamaah") },
  ],
};

const DEFAULT_NAV: Item[] = [
  HOME,
  { title: "Jamaah", url: "/jamaah", icon: Users, match: (p) => p.startsWith("/jamaah") },
  { title: "Agen", url: "/agen", icon: UserCog, match: (p) => p === "/agen" || p.startsWith("/agen/") },
  { title: "Agensi", url: "/agensi", icon: Building2, match: (p) => p.startsWith("/agensi") },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { toggleSidebar } = useSidebar();
  const role = useRole();
  const items = NAV_BY_ROLE[role] ?? DEFAULT_NAV;

  return (
    <nav
      aria-label="Navigasi utama seluler"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.url}>
              <Link
                to={item.url}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className={cn("size-5", active && "stroke-[2.4]")} />
                <span className="truncate">{item.title}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium text-muted-foreground hover:text-foreground"
            aria-label="Buka menu lengkap"
          >
            <Menu className="size-5" />
            <span>Menu</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
