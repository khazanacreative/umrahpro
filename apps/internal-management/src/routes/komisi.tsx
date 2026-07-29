import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgePercent, Clock, Download, TrendingUp, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { AGEN, JAMAAH, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/komisi")({
  head: () => ({
    meta: [
      { title: "Komisi Agen — UmrahPro" },
      { name: "description", content: "Perhitungan, riwayat, dan pencairan komisi agen serta cabang." },
      { property: "og:title", content: "Komisi Agen — UmrahPro" },
      { property: "og:description", content: "Riwayat & pencairan komisi agen dan cabang." },
    ],
  }),
  component: KomisiPage,
});

function KomisiPage() {
  const [tab, setTab] = useState("riwayat");

  const stats = useMemo(() => ({
    dibayar: AGEN.reduce((a, x) => a + x.komisi, 0),
    tertunda: AGEN.reduce((a, x) => a + x.komisiTertunda, 0),
    referral: AGEN.reduce((a, x) => a + x.referral, 0),
    rataRata: Math.round(AGEN.reduce((a, x) => a + x.komisi, 0) / AGEN.length),
  }), []);

  const riwayat = AGEN.slice(0, 12).map((a, i) => {
    const j = JAMAAH[i * 7];
    return {
      id: `KMS-2026${String(2000 + i)}`,
      agen: a.nama,
      jamaah: j.nama,
      paket: j.paket,
      nilai: Math.round(a.komisi / Math.max(a.referral, 1)),
      status: i % 4 === 0 ? "Menunggu" : i % 5 === 0 ? "Diproses" : "Lunas",
      tanggal: j.tglDaftar,
    };
  });

  return (
    <AppShell>
      <PageHeader
        title="Komisi Agen"
        description="Perhitungan otomatis, pencairan, dan laporan komisi agen & cabang."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Ekspor</Button>
            <Button><Wallet className="size-4" /> Proses Pencairan</Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Komisi Dibayar" value={formatRupiah(stats.dibayar)} icon={BadgePercent} tone="success" />
        <StatCard label="Komisi Tertunda" value={formatRupiah(stats.tertunda)} icon={Clock} tone="warning" />
        <StatCard label="Total Referral" value={stats.referral} icon={TrendingUp} tone="gold" />
        <StatCard label="Rata-rata / Agen" value={formatRupiah(stats.rataRata)} icon={Wallet} />
      </section>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="riwayat">Riwayat Transaksi</TabsTrigger>
          <TabsTrigger value="tertunda">Menunggu Pencairan</TabsTrigger>
          <TabsTrigger value="skema">Skema Komisi</TabsTrigger>
        </TabsList>

        <TabsContent value="riwayat">
          {/* Mobile: card list */}
          <div className="space-y-2 md:hidden">
            {riwayat.map((r) => (
              <Card key={r.id} className="card-elevated">
                <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.agen}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.jamaah}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{r.paket}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{r.id} · {r.tanggal}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-display text-base text-primary">{formatRupiah(r.nilai)}</span>
                    <StatusBadge status={r.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Desktop: table */}
          <Card className="card-elevated hidden md:block">
            <CardContent className="px-0 pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Agen</TableHead>
                      <TableHead className="hidden md:table-cell">Jamaah</TableHead>
                      <TableHead className="hidden lg:table-cell">Paket</TableHead>
                      <TableHead className="text-right">Nilai</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riwayat.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-xs">{r.id}</TableCell>
                        <TableCell className="font-medium">{r.agen}</TableCell>
                        <TableCell className="hidden md:table-cell">{r.jamaah}</TableCell>
                        <TableCell className="hidden max-w-[180px] truncate lg:table-cell">{r.paket}</TableCell>
                        <TableCell className="text-right">{formatRupiah(r.nilai)}</TableCell>
                        <TableCell><StatusBadge status={r.status} /></TableCell>
                        <TableCell className="hidden sm:table-cell">{r.tanggal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tertunda">
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Menunggu Pencairan</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {AGEN.filter((a) => a.komisiTertunda > 0).slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.nama}</p>
                    <p className="text-xs text-muted-foreground">{a.cabang} · {a.referral} referral</p>
                  </div>
                  <div className="ml-3 flex shrink-0 items-center gap-3">
                    <span className="font-semibold text-warning-foreground">{formatRupiah(a.komisiTertunda)}</span>
                    <Button size="sm">Cairkan</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skema">
          <Card className="card-elevated">
            <CardContent className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">
              {[
                { level: "Bronze", desc: "0 – 5 jamaah / tahun", nilai: "Rp 500.000 / jamaah" },
                { level: "Silver", desc: "6 – 15 jamaah / tahun", nilai: "Rp 750.000 / jamaah" },
                { level: "Gold", desc: "16 – 30 jamaah / tahun", nilai: "Rp 1.000.000 / jamaah" },
                { level: "Platinum", desc: "> 30 jamaah / tahun", nilai: "Rp 1.500.000 / jamaah" },
              ].map((s) => (
                <div key={s.level} className="rounded-xl border p-4">
                  <Badge variant="outline" className="bg-gold-soft text-gold-foreground">{s.level}</Badge>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <p className="mt-1 font-display text-lg text-primary">{s.nilai}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
