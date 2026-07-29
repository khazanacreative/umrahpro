import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BOOKING, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking & Reservasi — UmrahPro" },
      { name: "description", content: "Kelola booking, reservasi kursi, waiting list, dan invoice." },
      { property: "og:title", content: "Booking & Reservasi — UmrahPro" },
      { property: "og:description", content: "Reservasi kursi, konfirmasi, dan invoice jamaah." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const nilai = BOOKING.reduce((a, b) => a + b.nilai, 0);
  return (
    <AppShell>
      <PageHeader
        title="Booking & Reservasi"
        description={`${BOOKING.length} booking tercatat`}
        actions={<Button>Booking Baru</Button>}
      />
      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Booking" value={BOOKING.length} icon={ShoppingCart} />
        <StatCard label="Terkonfirmasi" value={BOOKING.filter((b) => b.status === "Terkonfirmasi").length} icon={ShoppingCart} tone="success" />
        <StatCard label="Waiting List" value={BOOKING.filter((b) => b.status === "Waiting List").length} icon={ShoppingCart} tone="warning" />
        <StatCard label="Nilai Booking" value={formatRupiah(nilai)} icon={ShoppingCart} tone="gold" />
      </section>

      <Card className="card-elevated">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Jamaah</TableHead>
                <TableHead>Paket</TableHead>
                <TableHead className="text-right">Kursi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BOOKING.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell className="font-medium">{b.jamaah}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{b.paket}</TableCell>
                  <TableCell className="text-right">{b.kursi}</TableCell>
                  <TableCell>
                    <StatusBadge status={b.status} />
                  </TableCell>
                  <TableCell className="text-right">{formatRupiah(b.nilai)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
