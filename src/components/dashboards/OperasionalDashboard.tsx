import { Link } from "@tanstack/react-router";
import {
  Bus, ClipboardCheck, Hotel as HotelIcon, Luggage, Plane, Stamp, Users, AlertTriangle,
} from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { HOTEL, JAMAAH, PENERBANGAN, statistik } from "@/data/mock";

const CHECKLIST_BERANGKAT = [
  { label: "Manifest penumpang final", pct: 100 },
  { label: "Rooming list Makkah & Madinah", pct: 82 },
  { label: "Perlengkapan jamaah dibagikan", pct: 67 },
  { label: "Tasreh Raudhah diajukan", pct: 45 },
  { label: "Bus & handling bandara", pct: 90 },
];

const TUGAS = [
  { tugas: "Kumpulkan paspor angkatan Agustus", pic: "Rina (Ops)", due: "2 hari lagi", status: "Diproses" },
  { tugas: "Konfirmasi ulang seat SV817", pic: "Yudi (Ops)", due: "Hari ini", status: "Menunggu" },
  { tugas: "Finalisasi rooming list Pullman", pic: "Dewi (Ops)", due: "3 hari lagi", status: "Diproses" },
  { tugas: "Serah terima koper 120 pax", pic: "Gudang", due: "5 hari lagi", status: "Menunggu" },
];

export function OperasionalDashboard() {
  const kursiRoda = JAMAAH.filter((j) => j.kursiRoda).length;
  const medis = JAMAAH.filter((j) => j.catatanMedis !== "Tidak ada").length;

  return (
    <>
      <PageHeader
        title="Dashboard Operasional"
        description="Kesiapan keberangkatan, dokumen, akomodasi, dan transportasi"
        actions={
          <>
            <Button variant="outline" asChild><Link to="/keberangkatan">Checklist Keberangkatan</Link></Button>
            <Button asChild><Link to="/visa">Papan Visa</Link></Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Keberangkatan 30 Hari" value={statistik.keberangkatanMendatang} icon={Plane} hint="6 rombongan" />
        <StatCard label="Paspor Diterima" value={`${statistik.pasporDiterima}/${JAMAAH.length}`} icon={Luggage} tone="success" />
        <StatCard label="Visa Diproses" value={statistik.visaDiproses} icon={Stamp} tone="warning" hint={`${statistik.visaTerbit} terbit`} />
        <StatCard label="Jamaah Perlu Perhatian" value={kursiRoda + medis} icon={AlertTriangle} tone="destructive" hint={`${kursiRoda} kursi roda · ${medis} catatan medis`} />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><ClipboardCheck className="size-4 text-primary" /> Kesiapan Keberangkatan Terdekat</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {CHECKLIST_BERANGKAT.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-semibold">{c.pct}%</span>
                </div>
                <Progress value={c.pct} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><HotelIcon className="size-4 text-primary" /> Alokasi Kamar</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {HOTEL.slice(0, 6).map((h) => (
              <div key={h.nama} className="flex items-center justify-between rounded-lg border p-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">{h.nama}</p>
                  <p className="text-xs text-muted-foreground">{h.kota} · {h.jarak}</p>
                </div>
                <Badge variant="outline">{h.kamar} kamar</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Plane className="size-4 text-primary" /> Penerbangan Terdekat</CardTitle></CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Maskapai</TableHead>
                    <TableHead>No.</TableHead>
                    <TableHead className="hidden sm:table-cell">Rute</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Kursi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENERBANGAN.slice(0, 6).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.maskapai}</TableCell>
                      <TableCell>{f.nomor}</TableCell>
                      <TableCell className="hidden sm:table-cell">{f.dari} → {f.ke}</TableCell>
                      <TableCell>{f.tanggal}</TableCell>
                      <TableCell className="text-right">{f.kursi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Users className="size-4" /> Tugas Tim Operasional</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {TUGAS.map((t) => (
              <div key={t.tugas} className="rounded-lg border p-3">
                <p className="font-medium">{t.tugas}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{t.pic} · {t.due}</span>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-3">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Bus className="size-4 text-primary" /> Armada & Handling</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { nama: "Bus Makkah–Madinah", detail: "4 unit · 45 seat", status: "Terkonfirmasi" },
              { nama: "Bus Ziarah Makkah", detail: "3 unit · 45 seat", status: "Terkonfirmasi" },
              { nama: "Handling Bandara JED", detail: "Muassasah Al Rajhi", status: "Diproses" },
              { nama: "Transfer Hotel Madinah", detail: "2 unit Hiace", status: "Menunggu" },
            ].map((a) => (
              <div key={a.nama} className="rounded-xl border p-4">
                <p className="font-medium">{a.nama}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                <div className="mt-2"><StatusBadge status={a.status} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
