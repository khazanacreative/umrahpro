import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Plus, Search, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JAMAAH, STATUS_JAMAAH, formatRupiah, statistik } from "@/data/mock";

export const Route = createFileRoute("/jamaah/")({
  head: () => ({
    meta: [
      { title: "Data Jamaah — UmrahPro" },
      {
        name: "description",
        content: "CRM jamaah umroh: profil, dokumen, status keberangkatan, dan pembayaran.",
      },
      { property: "og:title", content: "Data Jamaah — UmrahPro" },
      { property: "og:description", content: "CRM lengkap untuk seluruh jamaah umroh." },
    ],
  }),
  component: JamaahList,
});

function JamaahList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("semua");

  const rows = useMemo(
    () =>
      JAMAAH.filter(
        (j) =>
          (status === "semua" || j.status === status) &&
          (j.nama.toLowerCase().includes(q.toLowerCase()) ||
            j.id.toLowerCase().includes(q.toLowerCase()) ||
            j.kota.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, status],
  );

  return (
    <AppShell>
      <PageHeader
        title="Data Jamaah"
        description={`${JAMAAH.length} jamaah terdaftar dalam sistem`}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Ekspor
            </Button>
            <Button>
              <Plus className="size-4" /> Tambah Jamaah
            </Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jamaah" value={JAMAAH.length} icon={Users} />
        <StatCard label="Di Saudi" value={statistik.diSaudi} icon={Users} tone="success" />
        <StatCard label="Visa Diproses" value={statistik.visaDiproses} icon={Users} tone="warning" />
        <StatCard label="Paspor Diterima" value={statistik.pasporDiterima} icon={Users} tone="gold" />
      </section>

      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari nama, ID, atau kota…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger aria-label="Filter status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Status</SelectItem>
                {STATUS_JAMAAH.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kota</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visa</TableHead>
                  <TableHead className="text-right">Sisa Tagihan</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.slice(0, 40).map((j) => (
                  <TableRow key={j.id}>
                    <TableCell className="font-mono text-xs">{j.id}</TableCell>
                    <TableCell className="font-medium">{j.nama}</TableCell>
                    <TableCell>{j.kota}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{j.paket}</TableCell>
                    <TableCell>
                      <StatusBadge status={j.status} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={j.statusVisa} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatRupiah(j.totalTagihan - j.terbayar)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/jamaah/$id" params={{ id: j.id }}>
                          Detail
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Menampilkan {Math.min(rows.length, 40)} dari {rows.length} jamaah.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
