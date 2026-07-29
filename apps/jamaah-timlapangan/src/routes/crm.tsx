import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Target, TrendingUp, UserPlus, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { LEADS, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM Marketing — UmrahPro" },
      { name: "description", content: "Pipeline lead, sumber prospek, kampanye, dan konversi penjualan umroh." },
      { property: "og:title", content: "CRM Marketing — UmrahPro" },
      { property: "og:description", content: "Pipeline lead, kampanye, dan konversi penjualan umroh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const TAHAP = ["Lead Baru", "Dihubungi", "Tertarik", "Penawaran Dikirim", "Negosiasi", "Terdaftar"];

const KAMPANYE = [
  { nama: "Promo Ramadhan 1448H", kanal: "Instagram Ads", budget: 25_000_000, lead: 184, konversi: 32 },
  { nama: "Open House Manasik", kanal: "Offline / Pameran", budget: 12_000_000, lead: 96, konversi: 21 },
  { nama: "Google Search Umroh Plus", kanal: "Google Ads", budget: 18_000_000, lead: 143, konversi: 18 },
  { nama: "Broadcast WhatsApp Alumni", kanal: "WhatsApp", budget: 3_000_000, lead: 210, konversi: 44 },
];

function Page() {
  const [q, setQ] = useState("");
  const leads = useMemo(
    () => LEADS.filter((l) => l.nama.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  const nilaiPipeline = LEADS.filter((l) => l.tahap !== "Hilang").reduce((a, l) => a + l.nilai, 0);

  return (
    <AppShell>
      <PageHeader
        title="CRM Marketing"
        description="Kelola lead, kampanye, dan konversi penjualan."
        actions={<Button className="w-full sm:w-auto"><Plus className="size-4" /> Tambah Lead</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Lead" value={LEADS.length * 89} icon={Users} />
        <StatCard label="Lead Bulan Ini" value={124} icon={UserPlus} tone="gold" />
        <StatCard label="Nilai Pipeline" value={formatRupiah(nilaiPipeline)} icon={TrendingUp} tone="success" />
        <StatCard label="Rasio Konversi" value="18,4%" hint="Naik 2,1% dari bulan lalu" icon={Target} tone="warning" />
      </section>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pipeline Penjualan</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {TAHAP.map((tahap) => {
            const items = LEADS.filter((l) => l.tahap === tahap);
            return (
              <div key={tahap} className="rounded-xl border bg-muted/30 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">{tahap}</p>
                  <Badge variant="secondary">{items.length}</Badge>
                </div>
                <div className="space-y-2">
                  {items.length === 0 && (
                    <p className="text-xs text-muted-foreground">Belum ada lead pada tahap ini.</p>
                  )}
                  {items.map((l) => (
                    <div key={l.nama} className="rounded-lg border bg-card p-2.5">
                      <p className="truncate text-sm font-medium">{l.nama}</p>
                      <p className="text-xs text-muted-foreground">{l.sumber}</p>
                      <p className="mt-1 text-xs font-semibold text-primary">{formatRupiah(l.nilai)}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Daftar Lead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Cari nama lead…" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="space-y-2">
              {leads.map((l) => (
                <div key={l.nama} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{l.nama}</p>
                    <p className="text-xs text-muted-foreground">{l.sumber} · {formatRupiah(l.nilai)}</p>
                  </div>
                  <StatusBadge status={l.tahap === "Hilang" ? "Dibatalkan" : l.tahap === "Terdaftar" ? "Selesai" : "Diproses"} />
                </div>
              ))}
              {leads.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">Lead tidak ditemukan.</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Kampanye Aktif</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {KAMPANYE.map((k) => (
              <div key={k.nama}>
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-1">
                  <p className="text-sm font-medium">{k.nama}</p>
                  <span className="text-xs text-muted-foreground">{k.kanal}</span>
                </div>
                <Progress value={(k.konversi / k.lead) * 100 * 4} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {k.lead} lead · {k.konversi} konversi · Budget {formatRupiah(k.budget)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
