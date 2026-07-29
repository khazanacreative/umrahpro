import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JAMAAH } from "@/data/mock";

const KOLOM = ["Belum Diajukan", "Diproses", "Disetujui", "Terbit", "Ditolak"] as const;

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Paspor & Visa — UmrahPro" },
      { name: "description", content: "Pantau pengumpulan paspor dan seluruh tahapan pengajuan visa umroh." },
      { property: "og:title", content: "Paspor & Visa — UmrahPro" },
      { property: "og:description", content: "Papan status pengajuan visa dan pengumpulan paspor." },
    ],
  }),
  component: VisaPage,
});

function VisaPage() {
  return (
    <AppShell>
      <PageHeader title="Paspor & Visa" description="Papan status proses visa jamaah" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KOLOM.map((k) => {
          const items = JAMAAH.filter((j) => j.statusVisa === k);
          return (
            <Card key={k} className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>{k}</span>
                  <StatusBadge status={String(items.length)} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.slice(0, 8).map((j) => (
                  <div key={j.id} className="rounded-lg border p-2">
                    <p className="truncate text-sm font-medium">{j.nama}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {j.noPaspor} · {j.kota}
                    </p>
                  </div>
                ))}
                {items.length > 8 && (
                  <p className="text-xs text-muted-foreground">+{items.length - 8} lainnya</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
