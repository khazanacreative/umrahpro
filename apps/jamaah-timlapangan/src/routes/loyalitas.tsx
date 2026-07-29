import { createFileRoute } from "@tanstack/react-router";
import { Gift, Crown, Share2, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JAMAAH, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/loyalitas")({
  head: () => ({
    meta: [
      { title: "Loyalitas & Referral — UmrahPro" },
      { name: "description", content: "Program poin alumni, tier keanggotaan, dan reward referral jamaah." },
      { property: "og:title", content: "Loyalitas & Referral — UmrahPro" },
      { property: "og:description", content: "Poin alumni, tier keanggotaan, dan reward referral." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const TIER = [
  { nama: "Silver", syarat: "1 kali umroh", benefit: "Diskon Rp 500.000", warna: "bg-muted text-foreground" },
  { nama: "Gold", syarat: "2 kali umroh / 3 referral", benefit: "Diskon Rp 1.500.000 + prioritas kamar", warna: "bg-gold-soft text-gold-foreground" },
  { nama: "Platinum", syarat: "4 kali umroh / 8 referral", benefit: "Diskon Rp 4.000.000 + upgrade hotel", warna: "bg-primary-soft text-primary" },
];

const REWARD = [
  { nama: "Voucher Perlengkapan Umroh", poin: 500 },
  { nama: "Diskon Paket Rp 1.000.000", poin: 1200 },
  { nama: "Upgrade Kamar Quad → Triple", poin: 900 },
  { nama: "Gratis Bagasi Tambahan 10kg", poin: 400 },
];

function Page() {
  const alumni = JAMAAH.filter((j) => j.status === "Selesai").slice(0, 8).map((j, i) => ({
    nama: j.nama,
    poin: 1800 - i * 170,
    referral: 9 - i,
    tier: i < 2 ? "Platinum" : i < 5 ? "Gold" : "Silver",
  }));

  return (
    <AppShell>
      <PageHeader
        title="Loyalitas & Referral"
        description="Program poin alumni, tier keanggotaan, dan reward referral."
        actions={<Button className="w-full sm:w-auto"><Share2 className="size-4" /> Bagikan Program</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Anggota Loyalitas" value={alumni.length * 6} icon={Users} />
        <StatCard label="Poin Beredar" value="128.400" icon={Gift} tone="gold" />
        <StatCard label="Referral Berhasil" value={alumni.reduce((a, b) => a + b.referral, 0)} icon={Share2} tone="success" />
        <StatCard label="Nilai Reward Ditukar" value={formatRupiah(42_500_000)} icon={Crown} tone="warning" />
      </section>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {TIER.map((t) => (
          <Card key={t.nama}>
            <CardContent className="p-4">
              <Badge className={t.warna}>{t.nama}</Badge>
              <p className="mt-2 text-sm font-medium">{t.benefit}</p>
              <p className="mt-1 text-xs text-muted-foreground">Syarat: {t.syarat}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Peringkat Anggota</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alumni.map((a, i) => (
              <div key={a.nama} className="flex items-center gap-3 rounded-xl border p-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">{a.nama}</p>
                    <Badge variant="secondary">{a.tier}</Badge>
                  </div>
                  <Progress value={(a.poin / 2000) * 100} className="mt-2 h-1.5" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.poin} poin · {a.referral} referral
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Katalog Reward</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {REWARD.map((r) => (
              <div key={r.nama} className="flex items-center justify-between gap-2 rounded-xl border p-3">
                <p className="min-w-0 text-sm">{r.nama}</p>
                <Badge variant="outline" className="shrink-0">{r.poin} poin</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
