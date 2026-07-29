import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, PiggyBank, TrendingDown, Wallet } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CHART_PENDAPATAN, formatRupiah, statistik } from "@/data/mock";

export const Route = createFileRoute("/laporan-keuangan")({
  head: () => ({
    meta: [
      { title: "Laporan Keuangan — UmrahPro" },
      { name: "description", content: "Laba rugi, arus kas, dan neraca ringkas agensi umroh." },
      { property: "og:title", content: "Laporan Keuangan — UmrahPro" },
      { property: "og:description", content: "Laba rugi, arus kas, dan neraca ringkas agensi umroh." },
    ],
  }),
  component: Page,
});

const pendapatan = statistik.pendapatan;
const LABA_RUGI = [
  { akun: "Pendapatan Paket Umroh", nilai: pendapatan, jenis: "in" },
  { akun: "Pendapatan Layanan Tambahan", nilai: Math.round(pendapatan * 0.06), jenis: "in" },
  { akun: "Harga Pokok Perjalanan", nilai: -Math.round(pendapatan * 0.74), jenis: "out" },
  { akun: "Beban Pemasaran", nilai: -Math.round(pendapatan * 0.03), jenis: "out" },
  { akun: "Beban Gaji & Umum", nilai: -Math.round(pendapatan * 0.06), jenis: "out" },
  { akun: "Beban Lain-lain", nilai: -Math.round(pendapatan * 0.02), jenis: "out" },
];

const ARUS_KAS = CHART_PENDAPATAN.map((d, i) => ({
  bulan: d.bulan,
  masuk: d.pendapatan,
  keluar: Math.round(d.pendapatan * (0.82 - i * 0.01)),
}));

const NERACA = {
  aset: [
    { akun: "Kas & Setara Kas", nilai: 6_982_000_000 },
    { akun: "Piutang Jamaah", nilai: statistik.tunggakan },
    { akun: "Uang Muka Vendor", nilai: 2_140_000_000 },
    { akun: "Aset Tetap", nilai: 3_450_000_000 },
  ],
  kewajiban: [
    { akun: "Utang Vendor", nilai: 2_860_000_000 },
    { akun: "Pendapatan Diterima di Muka", nilai: 5_120_000_000 },
    { akun: "Utang Komisi Agen", nilai: 740_000_000 },
    { akun: "Ekuitas Pemilik", nilai: 3_852_000_000 },
  ],
};

function Page() {
  const laba = LABA_RUGI.reduce((a, x) => a + x.nilai, 0);
  const totalAset = NERACA.aset.reduce((a, x) => a + x.nilai, 0);

  return (
    <AppShell>
      <PageHeader
        title="Laporan Keuangan"
        description="Laba rugi, arus kas, dan neraca ringkas periode berjalan."
        actions={<Button variant="outline"><Download className="size-4" /> Unduh PDF</Button>}
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Pendapatan" value={formatRupiah(pendapatan)} icon={Wallet} tone="gold" />
        <StatCard label="Total Beban" value={formatRupiah(Math.abs(LABA_RUGI.filter((x) => x.jenis === "out").reduce((a, x) => a + x.nilai, 0)))} icon={TrendingDown} tone="destructive" />
        <StatCard label="Laba Bersih" value={formatRupiah(laba)} icon={PiggyBank} tone="success" hint={`Margin ${Math.round((laba / pendapatan) * 100)}%`} />
        <StatCard label="Total Aset" value={formatRupiah(totalAset)} icon={FileSpreadsheet} />
      </section>

      <Tabs defaultValue="laba" className="mt-4">
        <TabsList>
          <TabsTrigger value="laba">Laba Rugi</TabsTrigger>
          <TabsTrigger value="kas">Arus Kas</TabsTrigger>
          <TabsTrigger value="neraca">Neraca</TabsTrigger>
        </TabsList>

        <TabsContent value="laba" className="mt-3">
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Laporan Laba Rugi</CardTitle></CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Akun</TableHead><TableHead className="text-right">Nilai</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {LABA_RUGI.map((x) => (
                    <TableRow key={x.akun}>
                      <TableCell>{x.akun}</TableCell>
                      <TableCell className={`whitespace-nowrap text-right ${x.jenis === "out" ? "text-destructive" : ""}`}>
                        {formatRupiah(x.nilai)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-semibold">Laba Bersih</TableCell>
                    <TableCell className="whitespace-nowrap text-right font-semibold text-success">{formatRupiah(laba)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kas" className="mt-3 space-y-4">
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Kas Masuk vs Kas Keluar</CardTitle></CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ARUS_KAS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1_000_000_000} M`} />
                  <Tooltip formatter={(v: number) => formatRupiah(v)} />
                  <Legend />
                  <Bar isAnimationActive={false} name="Kas Masuk" dataKey="masuk" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar isAnimationActive={false} name="Kas Keluar" dataKey="keluar" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Arus Kas Bersih</CardTitle></CardHeader>
            <CardContent className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ARUS_KAS.map((d) => ({ bulan: d.bulan, bersih: d.masuk - d.keluar }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${Math.round(v / 1_000_000)} jt`} />
                  <Tooltip formatter={(v: number) => formatRupiah(v)} />
                  <Line isAnimationActive={false} type="monotone" dataKey="bersih" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neraca" className="mt-3">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="card-elevated">
              <CardHeader className="pb-2"><CardTitle className="text-base">Aset</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {NERACA.aset.map((a) => (
                  <div key={a.akun} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                    <span className="min-w-0 truncate">{a.akun}</span>
                    <span className="shrink-0 font-semibold">{formatRupiah(a.nilai)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg bg-primary-soft p-3 font-semibold text-primary">
                  <span>Total Aset</span><span>{formatRupiah(totalAset)}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader className="pb-2"><CardTitle className="text-base">Kewajiban & Ekuitas</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {NERACA.kewajiban.map((a) => (
                  <div key={a.akun} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                    <span className="min-w-0 truncate">{a.akun}</span>
                    <span className="shrink-0 font-semibold">{formatRupiah(a.nilai)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg bg-primary-soft p-3 font-semibold text-primary">
                  <span>Total</span><span>{formatRupiah(NERACA.kewajiban.reduce((a, x) => a + x.nilai, 0))}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
