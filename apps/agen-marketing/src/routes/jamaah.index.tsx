import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Plus, Search, Users } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, initRole } from "@umrahpro/shared";
import { Button } from "@umrahpro/shared";
import { Input } from "@umrahpro/shared";
import { Card, CardContent } from "@umrahpro/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@umrahpro/shared";
import { JAMAAH, formatRupiah } from "@umrahpro/shared";

export const Route = createFileRoute("/jamaah/")({
  head: () => ({
    meta: [
      { title: "Jamaah Saya — UmrahPro" },
      { name: "description", content: "Daftar jamaah yang Anda daftarkan." },
    ],
  }),
  component: JamaahPage,
});

function JamaahPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      JAMAAH.filter(
        (j) =>
          j.nama.toLowerCase().includes(q.toLowerCase()) ||
          j.id.toLowerCase().includes(q.toLowerCase())
      ),
    [q],
  );

  return (
    <>
      <PageHeader
        title="Jamaah Saya"
        description={`${rows.length} jamaah terdaftar`}
        actions={
          <Button asChild size="sm">
            <Link to="/jamaah"><Plus className="size-4" /> Daftarkan</Link>
          </Button>
        }
      />

      <Card className="card-elevated mb-4">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cari nama atau ID jamaah…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Komisi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.slice(0, 20).map((j, i) => (
                  <TableRow key={j.id}>
                    <TableCell className="font-mono text-xs">{j.id}</TableCell>
                    <TableCell className="font-medium">{j.nama}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{j.paket}</TableCell>
                    <TableCell><StatusBadge status={j.status} /></TableCell>
                    <TableCell className="text-right text-sm">{formatRupiah(500_000 + i * 100_000)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}