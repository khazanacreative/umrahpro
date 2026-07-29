import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, Package, Plane, MapPin, CheckCircle2, Wallet, AlertTriangle, Stamp,
  CalendarDays, Hotel as HotelIcon, FileText, Bell,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AppShell } from "@umrahpro/shared";
import { PageHeader, StatCard, StatusBadge } from "@umrahpro/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@umrahpro/shared";
import { Button } from "@umrahpro/shared";
import { Progress } from "@umrahpro/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@umrahpro/shared";
import {
  AKTIVITAS, CHART_DEMOGRAFI, CHART_PAKET, CHART_PENDAFTARAN, CHART_PENDAPATAN,
  PENERBANGAN, PENGUMUMAN, formatAngka, formatRupiah, statistik,
} from "@umrahpro/shared";
import { useRole } from "@umrahpro/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Eksekutif — UmrahPro" },
      { name: "description", content: "Ringkasan operasional travel umroh." },
    ],
  }),
  component: Dashboard,
});

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title="Dashboard Eksekutif"
        description="Ringkasan operasional agensi umroh hari ini"
        actions={
          <Button asChild>
            <Link to="/jamaah">Daftarkan Jamaah</Link>
          </Button>
        }
      />

      {/* Stat Cards */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jamaah" value={formatAngka(statistik.totalJamaah)} icon={Users} hint="Seluruh angkatan" />
        <StatCard label="Paket Aktif" value={statistik.paketAktif} icon={Package} tone="gold" hint="Tersedia untuk dijual" />
        <StatCard label="Keberangkatan" value={statistik.keberangkatanMendatang} icon={Plane} hint="30 hari ke depan" />
        <StatCard label="Jamaah di Saudi" value={statistik.diSaudi} icon={MapPin} tone="success" />
        <StatCard label="Selesai" value={statistik.selesai} icon={CheckCircle2} tone="success" />
        <StatCard label="Pendapatan" value={formatRupiah(statistik.pendapatan)} icon={Wallet} tone="gold" />
        <StatCard label="Tunggakan" value={formatRupiah(statistik.tunggakan)} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Visa Terbit" value={statistik.visaTerbit} icon={Stamp} hint={`${statistik.visaDiproses} diproses`} />
      </section>

      {/* Charts */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Pendapatan Bulanan</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_PENDAPATAN}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickFormatter={(v: number) => `${v / 1_000_000_000}M`} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Area isAnimationActive={false} type="monotone" dataKey="pendapatan" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader><CardTitle className="text-base">Pendaftaran</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_PENDAFTARAN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="jamaah" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* More Stats */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated">
          <CardHeader><CardTitle className="text-base">Popularitas Paket</CardTitle></CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_PAKET} layout="vertical" margin={{ left: 24 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="kategori" type="category" width={80} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="jumlah" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader><CardTitle className="text-base">Demografi Jamaah</CardTitle></CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false} data={CHART_DEMOGRAFI} dataKey="value" nameKey="nama" innerRadius={50} outerRadius={80}>
                  {CHART_DEMOGRAFI.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><HotelIcon className="size-4 text-primary" /> Okupansi Hotel</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[{ nama: "Swissotel Al Maqam", v: 88 }, { nama: "Pullman ZamZam", v: 72 }, { nama: "Movenpick Madinah", v: 64 }, { nama: "Dar Al Taqwa", v: 45 }].map((h) => (
              <div key={h.nama}>
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{h.nama}</span><span className="font-semibold">{h.v}%</span></div>
                <Progress value={h.v} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Aktivitas */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="card-elevated">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Plane className="size-4 text-primary" /> Penerbangan Terdekat</CardTitle></CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Maskapai</TableHead><TableHead>No.</TableHead><TableHead>Rute</TableHead><TableHead>Tanggal</TableHead><TableHead className="text-right">Kursi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENERBANGAN.slice(0, 5).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.maskapai}</TableCell>
                      <TableCell>{f.nomor}</TableCell>
                      <TableCell>{f.dari} → {f.ke}</TableCell>
                      <TableCell>{f.tanggal} · {f.jam}</TableCell>
                      <TableCell className="text-right">{f.kursi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="size-4 text-primary" /> Aktivitas Terkini</CardTitle></CardHeader>
          <CardContent>
            <ol className="relative space-y-4 border-l pl-4">
              {AKTIVITAS.map((a) => (
                <li key={a.teks} className="relative">
                  <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-gold" />
                  <p className="text-sm leading-snug">{a.teks}</p>
                  <p className="text-xs text-muted-foreground">{a.waktu}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
