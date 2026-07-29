import { createFileRoute } from "@tanstack/react-router";
import { Bus, Clock, MapPin, Users, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/transportasi")({
  head: () => ({
    meta: [
      { title: "Transportasi Darat — UmrahPro" },
      { name: "description", content: "Jadwal bus, handling bandara, dan armada rombongan umroh." },
      { property: "og:title", content: "Transportasi Darat — UmrahPro" },
      { property: "og:description", content: "Jadwal bus, handling bandara, dan armada rombongan umroh." },
    ],
  }),
  component: Page,
});

const ARMADA = [
  { kode: "BUS-01", vendor: "Saptco", tipe: "Bus 45 Seat", kapasitas: 45, terisi: 42, sopir: "Abdullah Al-Harbi", status: "Terkonfirmasi" },
  { kode: "BUS-02", vendor: "Rawahel", tipe: "Bus 45 Seat", kapasitas: 45, terisi: 38, sopir: "Salim Al-Otaibi", status: "Terkonfirmasi" },
  { kode: "BUS-03", vendor: "Saptco", tipe: "Bus 30 Seat", kapasitas: 30, terisi: 27, sopir: "Faisal Al-Zahrani", status: "Menunggu" },
  { kode: "VAN-01", vendor: "Al Mashaer", tipe: "Hiace 12 Seat", kapasitas: 12, terisi: 9, sopir: "Nasser Al-Qahtani", status: "Terkonfirmasi" },
  { kode: "VAN-02", vendor: "Al Mashaer", tipe: "GMC 7 Seat", kapasitas: 7, terisi: 4, sopir: "Majed Al-Ghamdi", status: "Menunggu" },
];

const JADWAL = [
  { waktu: "05.30 KSA", rute: "Bandara Jeddah → Hotel Makkah", armada: "BUS-01, BUS-02", durasi: "1j 30m", status: "Terkonfirmasi" },
  { waktu: "08.00 KSA", rute: "Hotel Makkah → Ziarah Jabal Nur", armada: "BUS-01", durasi: "3j", status: "Terkonfirmasi" },
  { waktu: "21.00 KSA", rute: "Hotel Makkah → Miqat Ji'ranah", armada: "BUS-02, VAN-01", durasi: "1j", status: "Menunggu" },
  { waktu: "07.00 KSA", rute: "Makkah → Madinah", armada: "BUS-01, BUS-02, BUS-03", durasi: "6j", status: "Terkonfirmasi" },
  { waktu: "14.00 KSA", rute: "Madinah → Bandara Madinah", armada: "BUS-03, VAN-02", durasi: "45m", status: "Menunggu" },
];

function Page() {
  const kapasitas = ARMADA.reduce((a, x) => a + x.kapasitas, 0);
  const terisi = ARMADA.reduce((a, x) => a + x.terisi, 0);

  return (
    <AppShell>
      <PageHeader
        title="Transportasi Darat"
        description="Jadwal bus, handling bandara, dan armada rombongan."
        actions={<Button><Plus className="size-4" /> Tambah Jadwal</Button>}
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Armada Aktif" value={ARMADA.length} icon={Bus} />
        <StatCard label="Kapasitas Total" value={kapasitas} icon={Users} hint={`${terisi} terisi`} />
        <StatCard label="Utilisasi" value={`${Math.round((terisi / kapasitas) * 100)}%`} icon={Clock} tone="success" />
        <StatCard label="Jadwal Hari Ini" value={JADWAL.length} icon={MapPin} tone="gold" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Jadwal Perjalanan Darat</CardTitle></CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Rute</TableHead>
                    <TableHead className="hidden sm:table-cell">Armada</TableHead>
                    <TableHead className="hidden md:table-cell">Durasi</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {JADWAL.map((j) => (
                    <TableRow key={j.rute}>
                      <TableCell className="whitespace-nowrap font-mono text-xs">{j.waktu}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{j.rute}</TableCell>
                      <TableCell className="hidden text-xs sm:table-cell">{j.armada}</TableCell>
                      <TableCell className="hidden md:table-cell">{j.durasi}</TableCell>
                      <TableCell><StatusBadge status={j.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Armada & Sopir</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {ARMADA.map((a) => (
              <div key={a.kode} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{a.kode} · {a.tipe}</span>
                  <Badge variant="outline" className="shrink-0 text-[10px]">{a.vendor}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">Sopir: {a.sopir}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>{a.terisi}/{a.kapasitas} penumpang</span>
                  <StatusBadge status={a.status} />
                </div>
                <Progress className="mt-1.5" value={Math.round((a.terisi / a.kapasitas) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
