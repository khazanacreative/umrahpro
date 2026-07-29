import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Package,
  Plane,
  MapPin,
  CheckCircle2,
  Wallet,
  AlertTriangle,
  Stamp,
  FileText,
  Hotel as HotelIcon,
  CalendarDays,
  Bell,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "../components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "../components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  AKTIVITAS,
  CHART_DEMOGRAFI,
  CHART_PAKET,
  CHART_PENDAFTARAN,
  CHART_PENDAPATAN,
  PENERBANGAN,
  PENGUMUMAN,
  formatAngka,
  formatRupiah,
  statistik,
} from "../data/mock";
import { useEffect } from "react";
import { useRole, initRole } from "../lib/role-store";
import { AgenDashboard } from "../components/dashboards/AgenDashboard";
import { JamaahDashboard } from "../components/dashboards/JamaahDashboard";
import { MuthawifDashboard } from "../components/dashboards/MuthawifDashboard";
import { DirekturDashboard } from "../components/dashboards/DirekturDashboard";
import { OperasionalDashboard } from "../components/dashboards/OperasionalDashboard";
import { KeuanganDashboard } from "../components/dashboards/KeuanganDashboard";
import { MarketingDashboard } from "../components/dashboards/MarketingDashboard";
import { CsDashboard } from "../components/dashboards/CsDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Eksekutif — UmrahPro" },
      {
        name: "description",
        content:
          "Ringkasan operasional travel umroh: jamaah, keberangkatan, pendapatan, visa, dan okupansi hotel.",
      },
      { property: "og:title", content: "Dashboard Eksekutif — UmrahPro" },
      {
        property: "og:description",
        content: "Ringkasan operasional travel umroh dalam satu layar.",
      },
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
  // Initialize role from URL parameter before rendering
  useEffect(() => {
    initRole();
  }, []);
  
  const role = useRole();
  if (role === "agen") return <AppShell><AgenDashboard /></AppShell>;
  if (role === "jamaah") return <AppShell><JamaahDashboard /></AppShell>;
  if (role === "tour_leader" || role === "guide") return <AppShell><MuthawifDashboard /></AppShell>;
  if (role === "direktur") return <AppShell><DirekturDashboard /></AppShell>;
  if (role === "operasional") return <AppShell><OperasionalDashboard /></AppShell>;
  if (role === "keuangan") return <AppShell><KeuanganDashboard /></AppShell>;
  if (role === "marketing" || role === "manajer_marketing") return <AppShell><MarketingDashboard /></AppShell>;
  return (
    <AppShell>
      <PageHeader
        title="Dashboard Eksekutif"
        description="Ringkasan operasional agensi umroh hari ini"
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/laporan">Lihat Laporan</Link>
            </Button>
            <Button asChild>
              <Link to="/jamaah">Daftarkan Jamaah</Link>
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jamaah" value={formatAngka(statistik.totalJamaah)} icon={Users} hint="Seluruh angkatan" />
        <StatCard label="Paket Aktif" value={statistik.paketAktif} icon={Package} tone="gold" hint="Tersedia untuk dijual" />
        <StatCard label="Keberangkatan Mendatang" value={statistik.keberangkatanMendatang} icon={Plane} hint="30 hari ke depan" />
        <StatCard label="Jamaah di Saudi" value={statistik.diSaudi} icon={MapPin} tone="success" hint="Sedang dalam perjalanan" />
        <StatCard label="Umroh Selesai" value={statistik.selesai} icon={CheckCircle2} tone="success" />
        <StatCard label="Total Pendapatan" value={formatRupiah(statistik.pendapatan)} icon={Wallet} tone="gold" />
        <StatCard label="Tunggakan" value={formatRupiah(statistik.tunggakan)} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Visa Terbit" value={statistik.visaTerbit} icon={Stamp} hint={`${statistik.visaDiproses} diproses · ${statistik.visaDitolak} ditolak`} />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Pendapatan Bulanan</CardTitle>
          </CardHeader>
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
                <YAxis
                  tickFormatter={(v: number) => `${v / 1_000_000_000} M`}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Area isAnimationActive={false}
                  type="monotone"
                  dataKey="pendapatan"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Pendaftaran per Bulan</CardTitle>
          </CardHeader>
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

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Popularitas Paket</CardTitle>
          </CardHeader>
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
          <CardHeader>
            <CardTitle className="text-base">Demografi Jamaah</CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false} data={CHART_DEMOGRAFI} dataKey="value" nameKey="nama" innerRadius={50} outerRadius={80}>
                  {CHART_DEMOGRAFI.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HotelIcon className="size-4 text-primary" /> Okupansi Hotel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { nama: "Swissotel Al Maqam (Makkah)", v: 88 },
              { nama: "Pullman ZamZam (Makkah)", v: 72 },
              { nama: "Movenpick (Madinah)", v: 64 },
              { nama: "Dar Al Taqwa (Madinah)", v: 45 },
            ].map((h) => (
              <div key={h.nama}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="truncate pr-2 text-muted-foreground">{h.nama}</span>
                  <span className="font-semibold">{h.v}%</span>
                </div>
                <Progress value={h.v} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Plane className="size-4 text-primary" /> Jadwal Penerbangan Terdekat
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Maskapai</TableHead>
                    <TableHead>No.</TableHead>
                    <TableHead>Rute</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Kursi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENERBANGAN.slice(0, 5).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.maskapai}</TableCell>
                      <TableCell>{f.nomor}</TableCell>
                      <TableCell>
                        {f.dari} → {f.ke}
                      </TableCell>
                      <TableCell>
                        {f.tanggal} · {f.jam}
                      </TableCell>
                      <TableCell className="text-right">{f.kursi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4 text-primary" /> Aktivitas Terkini
              </CardTitle>
            </CardHeader>
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

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4 text-primary" /> Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {PENGUMUMAN.slice(0, 3).map((p) => (
                <div key={p.judul} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{p.judul}</p>
                    <StatusBadge status={p.kategori} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.tanggal}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-4">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="size-4 text-primary" /> Kalender Keberangkatan
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PENERBANGAN.slice(0, 6).map((f) => (
              <div key={f.id} className="rounded-xl border p-3 text-center">
                <p className="font-display text-2xl">{f.tanggal.slice(-2)}</p>
                <p className="text-xs text-muted-foreground">{f.tanggal.slice(0, 7)}</p>
                <p className="mt-2 truncate text-xs font-medium">{f.nomor}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {f.dari} → {f.ke}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
