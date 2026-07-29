import { Link } from "@tanstack/react-router";
import {
  Building2, Crown, Target, TrendingUp, Users, Wallet, PiggyBank, Percent,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AGEN, CHART_PENDAPATAN, CHART_PENDAFTARAN, formatAngka, formatRupiah, statistik } from "@/data/mock";

const CABANG = [
  { nama: "Pusat Jakarta", jamaah: 412, target: 500, omzet: 11_400_000_000, margin: 22 },
  { nama: "Cabang Bandung", jamaah: 236, target: 300, omzet: 6_150_000_000, margin: 19 },
  { nama: "Cabang Surabaya", jamaah: 198, target: 260, omzet: 5_320_000_000, margin: 17 },
  { nama: "Cabang Medan", jamaah: 121, target: 200, omzet: 3_080_000_000, margin: 14 },
  { nama: "Cabang Makassar", jamaah: 96, target: 180, omzet: 2_410_000_000, margin: 12 },
];

const MARGIN = CHART_PENDAPATAN.map((d, i) => ({
  bulan: d.bulan,
  margin: 12 + i * 1.4,
  biaya: Math.round(d.pendapatan * (0.76 - i * 0.008)),
  pendapatan: d.pendapatan,
}));

const RISIKO = [
  { judul: "Tunggakan jamaah Agustus", level: "Tinggi", detail: "Rp 1,8 M belum tertagih H-30 keberangkatan" },
  { judul: "Kuota visa Ramadhan", level: "Sedang", detail: "Kuota muassasah baru terisi 62%" },
  { judul: "Fluktuasi kurs SAR", level: "Sedang", detail: "Biaya darat naik 6% QoQ" },
  { judul: "Ketergantungan 1 maskapai", level: "Rendah", detail: "48% seat dari satu maskapai" },
];

export function DirekturDashboard() {
  const totalOmzet = CABANG.reduce((a, c) => a + c.omzet, 0);
  const totalJamaah = CABANG.reduce((a, c) => a + c.jamaah, 0);
  const totalTarget = CABANG.reduce((a, c) => a + c.target, 0);

  return (
    <>
      <PageHeader
        title="Dashboard Direktur"
        description="Kinerja perusahaan, cabang, profitabilitas, dan risiko operasional"
        actions={
          <>
            <Button variant="outline" asChild><Link to="/laporan">Laporan Konsolidasi</Link></Button>
            <Button asChild><Link to="/laporan-keuangan">Laporan Keuangan</Link></Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Omzet YTD" value={formatRupiah(totalOmzet)} icon={Wallet} tone="gold" hint="5 cabang" />
        <StatCard label="Laba Kotor" value={formatRupiah(Math.round(totalOmzet * 0.19))} icon={PiggyBank} tone="success" hint="Margin 19%" />
        <StatCard label="Pencapaian Target" value={`${Math.round((totalJamaah / totalTarget) * 100)}%`} icon={Target} hint={`${formatAngka(totalJamaah)} / ${formatAngka(totalTarget)} jamaah`} />
        <StatCard label="Tunggakan" value={formatRupiah(statistik.tunggakan)} icon={Percent} tone="destructive" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Pendapatan vs Biaya</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MARGIN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1_000_000_000} M`} />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Area isAnimationActive={false} type="monotone" dataKey="pendapatan" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.18} strokeWidth={2} />
                <Area isAnimationActive={false} type="monotone" dataKey="biaya" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.12} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Tren Margin (%)</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MARGIN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line isAnimationActive={false} type="monotone" dataKey="margin" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Building2 className="size-4 text-primary" /> Kinerja Cabang</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {CABANG.map((c) => (
              <div key={c.nama} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{c.nama}</span>
                  <span className="text-sm text-muted-foreground">{formatRupiah(c.omzet)} · margin {c.margin}%</span>
                </div>
                <Progress className="mt-2" value={Math.round((c.jamaah / c.target) * 100)} />
                <p className="mt-1 text-xs text-muted-foreground">{c.jamaah} dari target {c.target} jamaah</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Crown className="size-4 text-gold-foreground" /> Top Agen</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {AGEN.slice(0, 6).map((a, i) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border p-2.5 text-sm">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i < 3 ? "bg-gold text-gold-foreground" : "bg-muted"}`}>{i + 1}</span>
                  <span className="truncate">{a.nama}</span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{a.referral} jamaah</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="size-4 text-primary" /> Pertumbuhan Jamaah</CardTitle></CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_PENDAFTARAN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area isAnimationActive={false} type="monotone" dataKey="jamaah" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Users className="size-4" /> Peta Risiko</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {RISIKO.map((r) => (
              <div key={r.judul} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{r.judul}</p>
                  <Badge
                    variant="outline"
                    className={
                      r.level === "Tinggi"
                        ? "bg-destructive/12 text-destructive border-destructive/30"
                        : r.level === "Sedang"
                          ? "bg-warning/25 text-warning-foreground border-warning/40"
                          : "bg-success/15 text-success border-success/30"
                    }
                  >
                    {r.level}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
