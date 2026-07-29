import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Download, FileSpreadsheet, TrendingUp, Users } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_PENDAFTARAN, CHART_PENDAPATAN, CHART_PAKET, CHART_DEMOGRAFI,
  formatRupiah, statistik,
} from "@/data/mock";

export const Route = createFileRoute("/laporan")({
  head: () => ({
    meta: [
      { title: "Pusat Laporan — UmrahPro" },
      { name: "description", content: "Laporan jamaah, keuangan, agen, visa, hotel, dan marketing dalam satu tempat." },
      { property: "og:title", content: "Pusat Laporan — UmrahPro" },
      { property: "og:description", content: "Laporan jamaah, keuangan, agen, visa, hotel, dan marketing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const UNDUHAN = [
  "Laporan Jamaah per Paket",
  "Laporan Keuangan Bulanan",
  "Laporan Komisi Agen",
  "Laporan Status Visa",
  "Laporan Okupansi Hotel",
  "Laporan Kinerja Marketing",
];

const PIE_COLORS = ["var(--color-primary)", "var(--color-gold)", "var(--color-info)", "var(--color-success)", "var(--color-warning)"];

function Page() {
  return (
    <AppShell>
      <PageHeader
        title="Pusat Laporan"
        description="Laporan jamaah, keuangan, agen, visa, hotel, dan marketing."
        actions={<Button className="w-full sm:w-auto"><Download className="size-4" /> Ekspor Semua</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Jamaah" value={statistik.totalJamaah} icon={Users} />
        <StatCard label="Pendapatan" value={formatRupiah(statistik.pendapatan)} icon={TrendingUp} tone="success" />
        <StatCard label="Tunggakan" value={formatRupiah(statistik.tunggakan)} icon={BarChart3} tone="destructive" />
        <StatCard label="Paket Aktif" value={statistik.paketAktif} icon={FileSpreadsheet} tone="gold" />
      </section>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Pendaftaran Jamaah</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_PENDAFTARAN}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="jamaah" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Tren Pendapatan</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_PENDAPATAN}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000_000}M`} />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Line type="monotone" dataKey="pendapatan" stroke="var(--color-gold)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Popularitas Paket</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_PAKET} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="kategori" fontSize={12} width={80} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="jumlah" fill="var(--color-info)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Demografi Usia Jamaah</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CHART_DEMOGRAFI} dataKey="value" nameKey="nama" innerRadius={50} outerRadius={85} paddingAngle={3}>
                  {CHART_DEMOGRAFI.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Unduh Laporan</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {UNDUHAN.map((u) => (
            <div key={u} className="flex items-center justify-between gap-2 rounded-xl border p-3">
              <p className="min-w-0 text-sm">{u}</p>
              <Button variant="outline" size="sm"><Download className="size-4" /> PDF</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
