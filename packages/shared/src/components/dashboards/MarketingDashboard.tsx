import { Link } from "@tanstack/react-router";
import { Megaphone, MousePointerClick, Target, TrendingUp, Users, Instagram, Percent } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CHART_PENDAFTARAN, LEADS, PAKET, formatRupiah } from "@/data/mock";

const TAHAP = ["Lead Baru", "Dihubungi", "Tertarik", "Penawaran Dikirim", "Negosiasi", "Terdaftar"];
const FUNNEL = [
  { tahap: "Lead Baru", jumlah: 480 },
  { tahap: "Dihubungi", jumlah: 320 },
  { tahap: "Tertarik", jumlah: 186 },
  { tahap: "Penawaran", jumlah: 112 },
  { tahap: "Negosiasi", jumlah: 68 },
  { tahap: "Closing", jumlah: 41 },
];

const KAMPANYE = [
  { nama: "Promo Ramadhan 1448H", kanal: "Instagram Ads", budget: 45_000_000, lead: 214, closing: 26 },
  { nama: "Umroh Keluarga Agustus", kanal: "Google Ads", budget: 32_000_000, lead: 168, closing: 19 },
  { nama: "Roadshow Masjid Bandung", kanal: "Offline", budget: 18_000_000, lead: 96, closing: 22 },
  { nama: "Konten TikTok Manasik", kanal: "TikTok", budget: 12_000_000, lead: 143, closing: 11 },
];

const SUMBER = [
  { nama: "Instagram", pct: 32 },
  { nama: "Referral Agen", pct: 26 },
  { nama: "Google Ads", pct: 18 },
  { nama: "WhatsApp Broadcast", pct: 14 },
  { nama: "Pameran & Offline", pct: 10 },
];

export function MarketingDashboard() {
  const totalBudget = KAMPANYE.reduce((a, k) => a + k.budget, 0);
  const totalLead = KAMPANYE.reduce((a, k) => a + k.lead, 0);
  const totalClosing = KAMPANYE.reduce((a, k) => a + k.closing, 0);

  return (
    <>
      <PageHeader
        title="Dashboard Marketing"
        description="Performa lead, kampanye, dan konversi penjualan paket"
        actions={
          <>
            <Button variant="outline" asChild><Link to="/pengumuman">Buat Pengumuman</Link></Button>
            <Button asChild><Link to="/crm">Buka CRM</Link></Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Lead Bulan Ini" value={totalLead} icon={Users} hint="4 kampanye aktif" />
        <StatCard label="Closing" value={totalClosing} icon={Target} tone="success" hint={`Konversi ${Math.round((totalClosing / totalLead) * 100)}%`} />
        <StatCard label="Belanja Iklan" value={formatRupiah(totalBudget)} icon={Megaphone} tone="gold" />
        <StatCard label="Biaya per Lead" value={formatRupiah(Math.round(totalBudget / totalLead))} icon={Percent} tone="warning" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Funnel Penjualan</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL} layout="vertical" margin={{ left: 30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="tahap" type="category" width={90} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="jumlah" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Instagram className="size-4 text-primary" /> Sumber Lead</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {SUMBER.map((s) => (
              <div key={s.nama}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{s.nama}</span>
                  <span className="font-semibold">{s.pct}%</span>
                </div>
                <Progress value={s.pct} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><MousePointerClick className="size-4 text-primary" /> Kampanye Aktif</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {KAMPANYE.map((k) => (
              <div key={k.nama} className="rounded-xl border p-4">
                <Badge variant="outline" className="bg-primary-soft text-primary">{k.kanal}</Badge>
                <p className="mt-2 font-medium">{k.nama}</p>
                <p className="mt-1 text-xs text-muted-foreground">Budget {formatRupiah(k.budget)}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>{k.lead} lead</span>
                  <span className="font-semibold text-success">{k.closing} closing</span>
                </div>
                <Progress className="mt-2" value={Math.round((k.closing / k.lead) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Pipeline Lead Terbaru</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {LEADS.map((l) => (
              <div key={l.nama} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium">{l.nama}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatRupiah(l.nilai)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">{l.tahap}</Badge>
                  <span className="truncate">{l.sumber}</span>
                </div>
              </div>
            ))}
            <p className="pt-1 text-xs text-muted-foreground">Tahapan: {TAHAP.join(" → ")}</p>
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="size-4 text-primary" /> Tren Pendaftaran</CardTitle></CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_PENDAFTARAN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line isAnimationActive={false} type="monotone" dataKey="jamaah" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Paket Paling Diminati</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {PAKET.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-lg border p-3">
                <p className="truncate font-medium">{p.nama}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.terisi}/{p.kuota} kursi</span>
                  <span className="font-semibold text-primary">{formatRupiah(p.promo ?? p.harga)}</span>
                </div>
                <Progress className="mt-2" value={Math.round((p.terisi / p.kuota) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
