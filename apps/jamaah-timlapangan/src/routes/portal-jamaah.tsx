import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing, BookOpen, Cloud, Compass, CreditCard, FileText, MapPin,
  Phone, Plane, QrCode, Sparkles, Ticket,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ITINERARI, JAMAAH, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/portal-jamaah")({
  head: () => ({
    meta: [
      { title: "Portal Jamaah — UmrahPro" },
      { name: "description", content: "Itinerari, dokumen digital, jadwal shalat, kiblat, dan info darurat untuk jamaah." },
      { property: "og:title", content: "Portal Jamaah — UmrahPro" },
      { property: "og:description", content: "Aplikasi pribadi jamaah selama perjalanan umroh." },
    ],
  }),
  component: PortalJamaah,
});

const SHOLAT = [
  { nama: "Subuh", jam: "04:32" },
  { nama: "Dzuhur", jam: "12:14" },
  { nama: "Ashar", jam: "15:38" },
  { nama: "Maghrib", jam: "18:41" },
  { nama: "Isya", jam: "20:02" },
];

const KONTAK_DARURAT = [
  { label: "Tour Leader (H. Yusuf)", no: "+966 55 123 4567" },
  { label: "Kantor Pusat Jakarta", no: "+62 21 5567 1200" },
  { label: "KJRI Jeddah", no: "+966 12 660 1888" },
  { label: "Ambulans Saudi", no: "997" },
];

function PortalJamaah() {
  const jamaah = JAMAAH[0];
  const progress = Math.round((jamaah.terbayar / jamaah.totalTagihan) * 100);

  return (
    <AppShell>
      <PageHeader
        title="Portal Jamaah"
        description="Semua yang Anda butuhkan sebelum, selama, dan sesudah umroh."
      />

      {/* Kartu Digital */}
      <Card className="card-elevated mb-4 overflow-hidden border-primary/20 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <CardContent className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest opacity-80">Kartu Jamaah Digital</p>
            <p className="mt-1 font-display text-2xl">{jamaah.nama}</p>
            <p className="mt-1 text-sm opacity-90">{jamaah.id} · {jamaah.paket}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <Badge className="bg-primary-foreground/15 text-primary-foreground">Kamar {jamaah.kamar}</Badge>
              <Badge className="bg-primary-foreground/15 text-primary-foreground">Paspor {jamaah.noPaspor}</Badge>
              <Badge className="bg-gold text-gold-foreground">{jamaah.status}</Badge>
            </div>
          </div>
          <div className="grid size-24 shrink-0 place-items-center rounded-xl bg-primary-foreground/10 backdrop-blur">
            <QrCode className="size-16" />
          </div>
        </CardContent>
      </Card>

      {/* Menu utama */}
      <section className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {[
          { icon: Plane, label: "Jadwal Terbang", href: "/penerbangan" },
          { icon: Ticket, label: "E-Tiket", href: "/dokumen" },
          { icon: FileText, label: "Dokumen", href: "/dokumen" },
          { icon: CreditCard, label: "Pembayaran", href: "/pembayaran" },
          { icon: BookOpen, label: "Panduan", href: "/panduan" },
          { icon: MapPin, label: "Itinerari", href: "/itinerari" },
        ].map((m) => (
          <Link
            key={m.label}
            to={m.href}
            className="group flex flex-col items-center gap-1.5 rounded-xl border bg-card p-3 text-center transition hover:border-primary/40 hover:shadow-sm"
          >
            <div className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <m.icon className="size-5" />
            </div>
            <span className="text-[11px] font-medium leading-tight">{m.label}</span>
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Jadwal shalat + kiblat + cuaca */}
        <Card className="card-elevated lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Jadwal Shalat Makkah</span>
              <Badge variant="outline" className="text-[10px]">27 Jul</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {SHOLAT.map((s) => (
              <div key={s.nama} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span>{s.nama}</span>
                <span className="font-mono font-semibold text-primary">{s.jam}</span>
              </div>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border p-3 text-center">
                <Compass className="mx-auto size-6 text-primary" />
                <p className="mt-1 text-xs text-muted-foreground">Arah Kiblat</p>
                <p className="font-display text-base">292°</p>
              </div>
              <div className="rounded-xl border p-3 text-center">
                <Cloud className="mx-auto size-6 text-info" />
                <p className="mt-1 text-xs text-muted-foreground">Makkah</p>
                <p className="font-display text-base">38°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Itinerari terdekat */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Itinerari Terdekat</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-4 border-l pl-5">
              {ITINERARI.slice(0, 4).map((it) => (
                <li key={it.hari} className="relative">
                  <span className="absolute -left-[26px] top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {it.hari}
                  </span>
                  <p className="font-medium">{it.judul}</p>
                  <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{it.lokasi}</span>
                    <span>{it.jam}</span>
                  </p>
                  <p className="mt-1 text-xs">Kumpul: <strong>{it.titikKumpul}</strong> · {it.catatan}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Pembayaran */}
        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Ringkasan Pembayaran</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Tagihan</span>
              <span className="font-semibold">{formatRupiah(jamaah.totalTagihan)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Terbayar</span>
              <span className="font-semibold text-success">{formatRupiah(jamaah.terbayar)}</span>
            </div>
            <Progress value={progress} />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sisa</span>
              <span className="font-semibold text-destructive">{formatRupiah(jamaah.totalTagihan - jamaah.terbayar)}</span>
            </div>
            <Button className="w-full"><CreditCard className="size-4" /> Bayar Cicilan</Button>
          </CardContent>
        </Card>

        {/* Pengumuman */}
        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><BellRing className="size-4" /> Pengumuman Terbaru</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { j: "Kumpul manasik akbar", i: "Sabtu 08:00 WIB di Aula Pusat", s: "Menunggu" },
              { j: "E-visa Anda telah terbit", i: "Silakan unduh di menu Dokumen", s: "Terbit" },
              { j: "Cicilan jatuh tempo 5 Agu", i: "Sisa Rp 12.500.000", s: "Jatuh Tempo" },
            ].map((p) => (
              <div key={p.j} className="flex items-start justify-between gap-2 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.j}</p>
                  <p className="text-xs text-muted-foreground">{p.i}</p>
                </div>
                <StatusBadge status={p.s} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Kontak darurat */}
        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Phone className="size-4" /> Kontak Darurat</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {KONTAK_DARURAT.map((k) => (
              <a key={k.no} href={`tel:${k.no.replace(/\s/g, "")}`} className="flex items-center justify-between rounded-lg border p-3 transition hover:border-primary/40 hover:bg-primary-soft/40">
                <div className="min-w-0">
                  <p className="truncate font-medium">{k.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{k.no}</p>
                </div>
                <Phone className="size-4 text-primary" />
              </a>
            ))}
          </CardContent>
        </Card>

        {/* Frasa arab */}
        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Sparkles className="size-4" /> Frasa Arab Penting</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { ar: "كم السعر؟", id: "Berapa harganya?" },
              { ar: "أين الحمام؟", id: "Di mana toilet?" },
              { ar: "أنا تائه", id: "Saya tersesat" },
              { ar: "ساعدني من فضلك", id: "Tolong saya" },
            ].map((f) => (
              <div key={f.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span dir="rtl" className="font-display text-base">{f.ar}</span>
                <span className="text-xs text-muted-foreground">{f.id}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
