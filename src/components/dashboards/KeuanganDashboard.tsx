import { Link } from "@tanstack/react-router";
import {
  AlertTriangle, BadgePercent, Banknote, FileSpreadsheet, Receipt, TrendingDown, Wallet,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { AGEN, CHART_PENDAPATAN, JAMAAH, PEMBAYARAN, formatRupiah, statistik } from "@/data/mock";

const KAS = [
  { nama: "Bank Syariah Indonesia", saldo: 4_820_000_000 },
  { nama: "Bank Muamalat (Operasional)", saldo: 1_240_000_000 },
  { nama: "Rekening Valas (SAR)", saldo: 860_000_000 },
  { nama: "Kas Kecil", saldo: 62_000_000 },
];

const BIAYA = [
  { nama: "Tiket & Maskapai", value: 42 },
  { nama: "Hotel & Akomodasi", value: 28 },
  { nama: "Visa & Muassasah", value: 14 },
  { nama: "Operasional & Gaji", value: 16 },
];

const PIE_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

export function KeuanganDashboard() {
  const jatuhTempo = JAMAAH.filter((j) => j.terbayar < j.totalTagihan).slice(0, 6);
  const komisiTertunda = AGEN.reduce((a, x) => a + x.komisiTertunda, 0);
  const totalKas = KAS.reduce((a, k) => a + k.saldo, 0);

  return (
    <>
      <PageHeader
        title="Dashboard Keuangan"
        description="Arus kas, penerimaan, tunggakan, pengeluaran, dan komisi"
        actions={
          <>
            <Button variant="outline" asChild><Link to="/pengeluaran">Catat Pengeluaran</Link></Button>
            <Button asChild><Link to="/laporan-keuangan">Laporan Keuangan</Link></Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Saldo Kas & Bank" value={formatRupiah(totalKas)} icon={Banknote} tone="success" />
        <StatCard label="Penerimaan YTD" value={formatRupiah(statistik.pendapatan)} icon={Wallet} tone="gold" />
        <StatCard label="Piutang Jamaah" value={formatRupiah(statistik.tunggakan)} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Komisi Tertunda" value={formatRupiah(komisiTertunda)} icon={BadgePercent} tone="warning" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Penerimaan Bulanan</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_PENDAPATAN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1_000_000_000} M`} />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Bar isAnimationActive={false} dataKey="pendapatan" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><TrendingDown className="size-4 text-destructive" /> Komposisi Biaya</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false} data={BIAYA} dataKey="value" nameKey="nama" innerRadius={48} outerRadius={78}>
                  {BIAYA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Banknote className="size-4 text-primary" /> Saldo Kas & Bank</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {KAS.map((k) => (
              <div key={k.nama} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <span className="min-w-0 truncate">{k.nama}</span>
                <span className="shrink-0 font-semibold">{formatRupiah(k.saldo)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base"><Receipt className="size-4 text-primary" /> Transaksi Terakhir</CardTitle>
            <Button size="sm" variant="ghost" asChild><Link to="/pembayaran">Lihat semua</Link></Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Jamaah</TableHead>
                    <TableHead className="hidden sm:table-cell">Metode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEMBAYARAN.slice(0, 7).map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.id}</TableCell>
                      <TableCell className="max-w-[140px] truncate">{p.jamaah}</TableCell>
                      <TableCell className="hidden sm:table-cell">{p.metode}</TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                      <TableCell className="text-right">{formatRupiah(p.jumlah)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="size-4 text-destructive" /> Tagihan Jatuh Tempo</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {jatuhTempo.map((j) => (
              <div key={j.id} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{j.nama}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.paket}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-destructive">
                  {formatRupiah(j.totalTagihan - j.terbayar)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-3">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><FileSpreadsheet className="size-4 text-primary" /> Ringkasan Laba Rugi Berjalan</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { l: "Pendapatan", v: statistik.pendapatan, t: "text-foreground" },
              { l: "Harga Pokok Perjalanan", v: Math.round(statistik.pendapatan * 0.74), t: "text-destructive" },
              { l: "Beban Operasional", v: Math.round(statistik.pendapatan * 0.09), t: "text-destructive" },
              { l: "Laba Bersih", v: Math.round(statistik.pendapatan * 0.17), t: "text-success" },
            ].map((r) => (
              <div key={r.l} className="rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{r.l}</p>
                <p className={`mt-1 font-display text-lg ${r.t}`}>{formatRupiah(r.v)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
