import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ITINERARI, JAMAAH, PENGUMUMAN } from "@/data/mock";

export function MuthawifDashboard() {
  const rombongan = JAMAAH.slice(0, 42);
  const hadir = rombongan.filter((_, i) => i % 7 !== 0).length;
  const perluPerhatian = rombongan.filter(
    (j) => j.kursiRoda || j.catatanMedis !== "Tidak ada",
  );
  const hariIni = ITINERARI[2];
  const hadirPct = Math.round((hadir / rombongan.length) * 100);

  return (
    <>
      <PageHeader
        title="Assalamualaikum, Muthawif 👋"
        description="Rombongan Premium 12 Hari · Angkatan Agustus 2026"
        actions={
          <>
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <Link to="/itinerari">
                <CalendarDays className="size-4" /> Itinerari
              </Link>
            </Button>
            <Button asChild className="flex-1 sm:flex-none">
              <Link to="/tour-leader">
                <CheckCircle2 className="size-4" /> Absensi
              </Link>
            </Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Jamaah Bimbingan" value={rombongan.length} icon={Users} />
        <StatCard label="Hadir Terakhir" value={`${hadir}/${rombongan.length}`} icon={CheckCircle2} tone="success" />
        <StatCard label="Perlu Perhatian" value={perluPerhatian.length} icon={HeartPulse} tone="warning" hint="Medis / kursi roda" />
        <StatCard label="Hari Ke-" value={hariIni.hari} icon={MapPin} tone="gold" hint={hariIni.lokasi} />
      </section>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Agenda Hari Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="min-w-0">
            <p className="font-display text-lg leading-tight">{hariIni.judul}</p>
            <p className="mt-1 text-sm text-muted-foreground">{hariIni.lokasi}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-muted/60 p-2.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Jam</p>
              <p className="font-medium">{hariIni.jam}</p>
            </div>
            <div className="min-w-0 rounded-lg bg-muted/60 p-2.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Titik Kumpul</p>
              <p className="truncate font-medium">{hariIni.titikKumpul}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{hariIni.catatan}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Kehadiran rombongan</span>
              <span className="font-medium text-foreground">{hadirPct}%</span>
            </div>
            <Progress value={hadirPct} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="card-elevated">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Jamaah Perlu Perhatian</CardTitle>
            <Badge variant="secondary">{perluPerhatian.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {perluPerhatian.slice(0, 6).map((j) => (
              <Link
                key={j.id}
                to="/jamaah/$id"
                params={{ id: j.id }}
                className="flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/60"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                  {j.nama.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{j.nama}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {j.kursiRoda ? "Kursi roda · " : ""}
                    {j.catatanMedis} · Kamar {j.kamar}
                  </p>
                </div>
                <Phone className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PENGUMUMAN.slice(0, 4).map((p) => (
              <div key={p.judul} className="rounded-xl border p-3">
                <div className="flex min-w-0 items-start gap-2">
                  <Megaphone className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{p.judul}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.isi}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={p.kategori} />
                  <span className="text-[11px] text-muted-foreground">{p.tanggal}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { to: "/tour-leader" as const, icon: CheckCircle2, label: "Absensi" },
          { to: "/itinerari" as const, icon: CalendarDays, label: "Itinerari" },
          { to: "/panduan" as const, icon: MessageCircle, label: "Panduan" },
          { to: "/cs" as const, icon: AlertTriangle, label: "Lapor Insiden" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-center transition-colors hover:bg-muted/60"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <a.icon className="size-5" />
            </span>
            <span className="text-xs font-medium">{a.label}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
