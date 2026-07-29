import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PEMBAYARAN, formatRupiah, statistik } from "@/data/mock";

export const Route = createFileRoute("/pembayaran")({
  head: () => ({
    meta: [
      { title: "Pembayaran — UmrahPro" },
      { name: "description", content: "Cicilan, pelunasan, tunggakan, dan riwayat transaksi jamaah." },
      { property: "og:title", content: "Pembayaran — UmrahPro" },
      { property: "og:description", content: "Kelola cicilan, pelunasan, dan tunggakan jamaah." },
    ],
  }),
  component: PembayaranPage,
});

function PembayaranPage() {
  return (
    <AppShell>
      <PageHeader title="Pembayaran" description="Transaksi masuk dari seluruh jamaah" />
      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Diterima" value={formatRupiah(statistik.pendapatan)} icon={Wallet} tone="success" />
        <StatCard label="Tunggakan" value={formatRupiah(statistik.tunggakan)} icon={Wallet} tone="destructive" />
        <StatCard label="Transaksi" value={PEMBAYARAN.length} icon={Wallet} />
        <StatCard label="Jatuh Tempo" value={PEMBAYARAN.filter((p) => p.status === "Jatuh Tempo").length} icon={Wallet} tone="warning" />
      </section>

      <Card className="card-elevated">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Jamaah</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PEMBAYARAN.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="font-medium">{p.jamaah}</TableCell>
                  <TableCell>{p.metode}</TableCell>
                  <TableCell>{p.tanggal}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="text-right">{formatRupiah(p.jumlah)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
