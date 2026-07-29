import { createFileRoute } from "@tanstack/react-router";
import { Plus, Receipt, TrendingDown, Wallet, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/pengeluaran")({
  head: () => ({
    meta: [
      { title: "Pengeluaran Operasional — UmrahPro" },
      { name: "description", content: "Pencatatan biaya operasional, vendor, dan persetujuan pengeluaran." },
      { property: "og:title", content: "Pengeluaran Operasional — UmrahPro" },
      { property: "og:description", content: "Pencatatan biaya operasional, vendor, dan persetujuan pengeluaran." },
    ],
  }),
  component: Page,
});

const PENGELUARAN = [
  { id: "EXP-3011", tanggal: "2026-07-24", kategori: "Tiket & Maskapai", vendor: "Garuda Indonesia", jumlah: 1_480_000_000, status: "Lunas" },
  { id: "EXP-3010", tanggal: "2026-07-23", kategori: "Hotel & Akomodasi", vendor: "Swissotel Al Maqam", jumlah: 620_000_000, status: "Menunggu" },
  { id: "EXP-3009", tanggal: "2026-07-22", kategori: "Visa & Muassasah", vendor: "Muassasah Adilla", jumlah: 310_000_000, status: "Lunas" },
  { id: "EXP-3008", tanggal: "2026-07-21", kategori: "Transportasi", vendor: "Saptco Bus", jumlah: 185_000_000, status: "Diproses" },
  { id: "EXP-3007", tanggal: "2026-07-20", kategori: "Konsumsi", vendor: "Catering Al Barakah", jumlah: 96_000_000, status: "Lunas" },
  { id: "EXP-3006", tanggal: "2026-07-19", kategori: "Perlengkapan", vendor: "CV Mitra Ihram", jumlah: 74_500_000, status: "Menunggu" },
  { id: "EXP-3005", tanggal: "2026-07-18", kategori: "Gaji & Honor", vendor: "Payroll Juli", jumlah: 268_000_000, status: "Lunas" },
  { id: "EXP-3004", tanggal: "2026-07-17", kategori: "Pemasaran", vendor: "Meta Ads", jumlah: 45_000_000, status: "Diproses" },
];

function Page() {
  const total = PENGELUARAN.reduce((a, x) => a + x.jumlah, 0);
  const menunggu = PENGELUARAN.filter((x) => x.status !== "Lunas");
  const perKategori = Object.entries(
    PENGELUARAN.reduce<Record<string, number>>((acc, x) => {
      acc[x.kategori] = (acc[x.kategori] ?? 0) + x.jumlah;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <AppShell>
      <PageHeader
        title="Pengeluaran Operasional"
        description="Pencatatan biaya, vendor, dan persetujuan pengeluaran."
        actions={<Button><Plus className="size-4" /> Catat Pengeluaran</Button>}
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Pengeluaran" value={formatRupiah(total)} icon={TrendingDown} tone="destructive" />
        <StatCard label="Menunggu Persetujuan" value={menunggu.length} icon={Receipt} tone="warning" hint={formatRupiah(menunggu.reduce((a, x) => a + x.jumlah, 0))} />
        <StatCard label="Sudah Dibayar" value={PENGELUARAN.length - menunggu.length} icon={CheckCircle2} tone="success" />
        <StatCard label="Kategori Terbesar" value={perKategori[0][0]} icon={Wallet} tone="gold" hint={formatRupiah(perKategori[0][1])} />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Daftar Pengeluaran</CardTitle></CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="hidden md:table-cell">Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENGELUARAN.map((x) => (
                    <TableRow key={x.id}>
                      <TableCell className="font-mono text-xs">{x.id}</TableCell>
                      <TableCell className="hidden whitespace-nowrap sm:table-cell">{x.tanggal}</TableCell>
                      <TableCell className="max-w-[140px] truncate">{x.kategori}</TableCell>
                      <TableCell className="hidden max-w-[160px] truncate md:table-cell">{x.vendor}</TableCell>
                      <TableCell><StatusBadge status={x.status} /></TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatRupiah(x.jumlah)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Komposisi per Kategori</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {perKategori.map(([k, v]) => (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="truncate text-muted-foreground">{k}</span>
                    <span className="shrink-0 font-semibold">{Math.round((v / total) * 100)}%</span>
                  </div>
                  <Progress value={Math.round((v / total) * 100)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Perlu Persetujuan</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {menunggu.map((x) => (
                <div key={x.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{x.vendor}</span>
                    <Badge variant="outline" className="shrink-0 text-[10px]">{x.kategori}</Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{formatRupiah(x.jumlah)}</span>
                    <Button size="sm" variant="outline">Setujui</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
