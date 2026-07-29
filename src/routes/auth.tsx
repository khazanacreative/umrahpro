import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Moon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS, type Role } from "@/lib/roles";
import { setRole, USERS } from "@/lib/role-store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Pilih Peran — UmrahPro" },
      { name: "description", content: "Pilih peran untuk mengakses panel manajemen travel umroh UmrahPro." },
    ],
  }),
  component: AuthPage,
});

const GROUP_LABELS: Record<string, string> = {
  internal: "Manajemen Internal",
  marketing: "Marketing & Agen",
  lapangan: "Jamaah & Tim Lapangan",
};

const ROLE_GROUPS: Record<string, Role[]> = {
  internal: ["super_admin", "direktur", "operasional", "keuangan", "customer_service"],
  marketing: ["marketing", "agen"],
  lapangan: ["tour_leader", "guide", "jamaah"],
};

function AuthPage() {
  const navigate = useNavigate();

  const handleSelect = (role: Role) => {
    setRole(role);
    navigate({ to: "/" });
  };

  return (
    <div className="pattern-islamic flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Moon className="size-7" />
          </div>
          <h1 className="font-display text-3xl text-foreground">UmrahPro</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sistem Manajemen Travel Umroh</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Pilih peran untuk masuk sebagai user demo
          </p>
        </div>

        {Object.entries(ROLE_GROUPS).map(([groupKey, roles]) => (
          <section key={groupKey} className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {GROUP_LABELS[groupKey]}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {roles.map((role) => {
                const user = USERS[role];
                return (
                  <button
                    key={role}
                    onClick={() => handleSelect(role)}
                    className="group flex items-center gap-3 rounded-xl border bg-card p-3 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {user.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {ROLE_LABELS[role]}
                        </Badge>
                        <span className="truncate text-[10px] text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        <p className="text-center text-xs text-muted-foreground">
          Data yang ditampilkan adalah data contoh untuk keperluan demo.
        </p>
      </div>
    </div>
  );
}
