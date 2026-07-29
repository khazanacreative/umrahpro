import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROLE_GROUPS, ROLE_LABELS, ROLE_PERMISSIONS, type Role } from "@/lib/roles";

export const Route = createFileRoute("/hak-akses")({
  head: () => ({
    meta: [
      { title: "Hak Akses Peran — UmrahPro" },
      { name: "description", content: "Konfigurasi role based access control untuk seluruh peran pengguna." },
      { property: "og:title", content: "Hak Akses Peran — UmrahPro" },
      { property: "og:description", content: "Pengaturan hak akses 10 peran pengguna UmrahPro." },
    ],
  }),
  component: HakAksesPage,
});

function HakAksesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Hak Akses Peran"
        description="Ubah peran aktif di bar atas untuk melihat perbedaan menu"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(Object.keys(ROLE_LABELS) as Role[]).map((r) => {
          const groups = ROLE_GROUPS[r];
          return (
            <Card key={r} className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{ROLE_LABELS[r]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {(groups === "*" ? ["Semua Modul"] : groups).map((g) => (
                    <Badge key={g} variant="outline" className="bg-primary-soft text-primary">
                      {g}
                    </Badge>
                  ))}
                </div>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {ROLE_PERMISSIONS[r].map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
