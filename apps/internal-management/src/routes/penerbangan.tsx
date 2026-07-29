import { createFileRoute } from "@tanstack/react-router";
import { Plane, Users, Clock, Download } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PENERBANGAN, JAMAAH, formatAngka } from "@/data/mock";

export const Route = createFileRoute("/penerbangan")({
  head: () => ({
    meta: [
      { title: "Manajemen Penerbangan — UmrahPro" },
      { name: "description", content: "Maskapai, nomor penerbangan, transit, dan alokasi kursi." },
      { property: "og:title", content: "Manajemen Penerbangan — UmrahPro" },
      { property: "og:description", content: "Maskapai, nomor penerbangan, transit, dan alokasi kursi." },
    ],
  }),
  component: Page,
});

const BANDARA: Record<string, string> = {
  CGK: "Jakarta", SUB: "Surabaya", KNO: "Medan", UPG: "Makassar", JED: "Jeddah", MED: "Madinah",
};

function Page() {
  const totalKursi = PENERBANGAN.reduce((a, f) => a + f.kursi, 0);
  const terpakai = Math.round(totalKursi * 0.78);

  return (
    <AppShell>
      <PageHeader
        title="Manajemen Penerbangan"
        description="Maskapai, nomor penerbangan, transit, dan alokasi kursi rombongan."
        actions={<Button variant="outline"><Download className="size-4" /> Ekspor Manifest</Button>}
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Jadwal Aktif" value={PENERBANGAN.length} icon={Plane} />
        <StatCard label="Total Kursi" value={formatAngka(totalKursi)} icon={Users} hint={`${formatAngka(terpakai)} terisi`} />
        <StatCard label="Okupansi" value={`${Math.round((terpakai / totalKursi) * 100)}%`} icon={Clock} tone="success" />
        <StatCard label="Penerbangan Langsung" value={PENERBANGAN.filter((f) => f.transit === "Langsung").length} icon={Plane} tone="gold" />
      </section>

      <Card className="card-elevated mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Jadwal Penerbangan</CardTitle></CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Maskapai</TableHead>
                  <TableHead>Rute</TableHead>
                  <TableHead className="hidden sm:table-cell">Transit</TableHead>
                  <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                  <TableHead className="text-right">Kursi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PENERBANGAN.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-mono text-xs">{f.nomor}</TableCell>
                    <TableCell className="max-w-[140px] truncate">{f.maskapai}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {f.dari} → {f.ke}
                      <span className="block text-xs text-muted-foreground">{BANDARA[f.dari]} – {BANDARA[f.ke]}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{f.transit}</Badge>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap md:table-cell">{f.tanggal} · {f.jam}</TableCell>
                    <TableCell className="text-right">{f.kursi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Okupansi per Penerbangan</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {PENERBANGAN.slice(0, 5).map((f, i) => {
              const pct = 55 + ((i * 11) % 45);
              return (
                <div key={f.id}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="truncate">{f.nomor} · {f.dari}→{f.ke}</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <Progress value={pct} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Manifest Jamaah (contoh)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {JAMAAH.slice(0, 6).map((j, i) => (
              <div key={j.id} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{j.nama}</p>
                  <p className="truncate text-xs text-muted-foreground">Paspor {j.noPaspor} · Kursi {String.fromCharCode(65 + (i % 6))}{10 + i}</p>
                </div>
                <StatusBadge status={j.statusVisa} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
