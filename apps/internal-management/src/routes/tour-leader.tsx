import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Phone,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITINERARI, JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/tour-leader")({
  head: () => ({
    meta: [
      { title: "Modul Muthawif — UmrahPro" },
      { name: "description", content: "Absensi rombongan, monitoring kesehatan, laporan insiden, dan agenda harian muthawif." },
      { property: "og:title", content: "Modul Muthawif — UmrahPro" },
      { property: "og:description", content: "Absensi rombongan, monitoring kesehatan, dan agenda harian muthawif." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const INSIDEN = [
  { waktu: "07:20 KSA", judul: "Jamaah terpisah di pelataran Haram", status: "Selesai", oleh: "Ust. Fauzan" },
  { waktu: "Kemarin 21:10", judul: "Keluhan demam ringan (kamar 812)", status: "Dipantau", oleh: "Ust. Fauzan" },
  { waktu: "Kemarin 14:05", judul: "Koper tertinggal di bus 2", status: "Selesai", oleh: "Ust. Rahmat" },
];

function Page() {
  const rombongan = useMemo(() => JAMAAH.slice(0, 42), []);
  const [absen, setAbsen] = useState<Record<string, "hadir" | "absen">>(() =>
    Object.fromEntries(rombongan.map((j, i) => [j.id, i % 7 === 0 ? "absen" : "hadir"])),
  );
  const [q, setQ] = useState("");

  const hadir = rombongan.filter((j) => absen[j.id] === "hadir").length;
  const pct = Math.round((hadir / rombongan.length) * 100);
  const medis = rombongan.filter((j) => j.kursiRoda || j.catatanMedis !== "Tidak ada");
  const hariIni = ITINERARI[2];

  const filtered = rombongan.filter((j) =>
    j.nama.toLowerCase().includes(q.toLowerCase()) || j.kamar.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <PageHeader
        title="Modul Muthawif"
        description="Absensi rombongan, monitoring kesehatan, dan laporan lapangan"
        actions={
          <Button className="w-full sm:w-auto" onClick={() => setAbsen(Object.fromEntries(rombongan.map((j) => [j.id, "hadir" as const])))}>
            <CheckCircle2 className="size-4" /> Tandai Semua Hadir
          </Button>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Rombongan" value={rombongan.length} icon={Users} />
        <StatCard label="Hadir" value={`${hadir}/${rombongan.length}`} icon={CheckCircle2} tone="success" />
        <StatCard label="Perlu Perhatian" value={medis.length} icon={HeartPulse} tone="warning" />
        <StatCard label="Hari Ke-" value={hariIni.hari} icon={MapPin} tone="gold" hint={hariIni.lokasi} />
      </section>

      <Card className="card-elevated mb-4">
        <CardContent className="space-y-2 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Kehadiran saat ini</span>
            <span className="font-display text-xl text-primary">{pct}%</span>
          </div>
          <Progress value={pct} />
          <p className="text-xs text-muted-foreground">
            Titik kumpul: {hariIni.titikKumpul} · {hariIni.jam}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="absensi">
        <TabsList className="w-full">
          <TabsTrigger value="absensi" className="flex-1">Absensi</TabsTrigger>
          <TabsTrigger value="medis" className="flex-1">Kesehatan</TabsTrigger>
          <TabsTrigger value="insiden" className="flex-1">Insiden</TabsTrigger>
        </TabsList>

        <TabsContent value="absensi" className="mt-4 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama atau kamar…"
              className="pl-9"
              aria-label="Cari jamaah rombongan"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {filtered.map((j) => {
              const isHadir = absen[j.id] === "hadir";
              return (
                <div key={j.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {j.nama.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{j.nama}</p>
                      <p className="truncate text-xs text-muted-foreground">Kamar {j.kamar} · {j.kota}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <Button
                      size="icon"
                      variant={isHadir ? "default" : "outline"}
                      aria-label={`Tandai ${j.nama} hadir`}
                      onClick={() => setAbsen((s) => ({ ...s, [j.id]: "hadir" }))}
                    >
                      <CheckCircle2 className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={isHadir ? "outline" : "destructive"}
                      aria-label={`Tandai ${j.nama} tidak hadir`}
                      onClick={() => setAbsen((s) => ({ ...s, [j.id]: "absen" }))}
                    >
                      <XCircle className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="medis" className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {medis.map((j) => (
            <Link
              key={j.id}
              to="/jamaah/$id"
              params={{ id: j.id }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:bg-muted/60"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{j.nama}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {j.usia} th · {j.catatanMedis}
                  {j.kursiRoda ? " · Kursi roda" : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant="secondary">Kamar {j.kamar}</Badge>
                <Phone className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="insiden" className="mt-4 space-y-2">
          {INSIDEN.map((i) => (
            <Card key={i.judul} className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="flex min-w-0 items-start gap-2 text-sm font-medium">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span className="min-w-0">{i.judul}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant={i.status === "Selesai" ? "secondary" : "outline"}>{i.status}</Badge>
                <span>{i.waktu}</span>
                <span>· {i.oleh}</span>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full">
            <AlertTriangle className="size-4" /> Buat Laporan Insiden
          </Button>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
