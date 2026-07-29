import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardCheck, Luggage, Plane, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { PENERBANGAN, JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/keberangkatan")({
  head: () => ({
    meta: [
      { title: "Manajemen Keberangkatan — UmrahPro" },
      { name: "description", content: "Checklist keberangkatan, absensi rombongan, manifest, dan proses boarding." },
      { property: "og:title", content: "Manajemen Keberangkatan — UmrahPro" },
      { property: "og:description", content: "Checklist, absensi, dan boarding rombongan umroh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const CHECKLIST = [
  "Manifest final dikirim ke maskapai",
  "Rooming list hotel dikonfirmasi",
  "Visa seluruh jamaah terbit",
  "Tiket & boarding pass tercetak",
  "Perlengkapan jamaah dibagikan",
  "Briefing manasik terakhir",
  "Transportasi bandara dipesan",
  "Tour leader & muthawif ditugaskan",
];

function Page() {
  const kloter = PENERBANGAN.slice(0, 4).map((p, i) => ({
    ...p,
    kode: `KLT-2026${10 + i}`,
    jamaah: 40 + i * 5,
    siap: 32 + i * 6,
    status: i === 0 ? "Diproses" : i === 1 ? "Terkonfirmasi" : "Menunggu",
  }));

  return (
    <AppShell>
      <PageHeader
        title="Manajemen Keberangkatan"
        description="Checklist keberangkatan, absensi, dan boarding."
        actions={<Button className="w-full sm:w-auto"><ClipboardCheck className="size-4" /> Mulai Absensi</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Kloter Aktif" value={kloter.length} icon={Plane} />
        <StatCard label="Jamaah Berangkat" value={kloter.reduce((a, k) => a + k.jamaah, 0)} icon={Users} tone="gold" />
        <StatCard label="Sudah Check-in" value={kloter.reduce((a, k) => a + k.siap, 0)} icon={CheckCircle2} tone="success" />
        <StatCard label="Koper Terlabeli" value={`${JAMAAH.length * 1}`} icon={Luggage} tone="warning" />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Kloter Keberangkatan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {kloter.map((k) => (
              <div key={k.kode} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{k.kode} · {k.maskapai}</p>
                    <p className="text-xs text-muted-foreground">
                      {k.dari} → {k.ke} · {k.tanggal} · {k.jam}
                    </p>
                  </div>
                  <StatusBadge status={k.status} />
                </div>
                <Progress value={(k.siap / k.jamaah) * 100} className="mt-3 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {k.siap} dari {k.jamaah} jamaah sudah check-in
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Checklist Persiapan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CHECKLIST.map((c, i) => (
              <label key={c} className="flex items-start gap-3 text-sm">
                <Checkbox defaultChecked={i < 5} className="mt-0.5" />
                <span className="leading-snug">{c}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
