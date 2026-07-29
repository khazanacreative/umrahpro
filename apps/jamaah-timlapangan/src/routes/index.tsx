import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  BellRing, BookOpen, Cloud, Compass, CreditCard, FileText, MapPin, Phone,
  Plane, QrCode, Award, MessageCircle, Sparkles,
} from "lucide-react";
import { PageHeader, StatusBadge, initRole } from "@umrahpro/shared";
import { Button } from "@umrahpro/shared";
import { Badge } from "@umrahpro/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@umrahpro/shared";
import { Progress } from "@umrahpro/shared";
import { ITINERARI, JAMAAH, formatRupiah } from "@umrahpro/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Jamaah — UmrahPro" },
      { name: "description", content: "Portal pribadi jamaah umroh." },
    ],
  }),
  component: JamaahPage,
});

const SHOLAT = [
  { nama: "Subuh", jam: "04:32" },
  { nama: "Dzuhur", jam: "12:14" },
  { nama: "Ashar", jam: "15:38" },
  { nama: "Maghrib", jam: "18:41" },
  { nama: "Isya", jam: "20:02" },
];

const KONTAK = [
  { label: "Tour Leader (H. Yusuf)", no: "+966 55 123 4567" },
  { label: "Kantor Pusat", no: "+62 21 5567 1200" },
  { label: "KJRI Jeddah", no: "+966 12 660 1888" },
  { label: "Ambulans", no: "997" },
];

const CHECKLIST = [
  { label: "Paspor & Visa", done: true },
  { label: "Vaksin Meningitis", done: true },
  { label: "Manasik akbar", done: true },
  { label: "Kelengkapan bagasi", done: false },
  { label: "Pelunasan tagihan", done: false },
];

function MobileLayout({ children }: { children: ReactNode }) {
  useEffect(() => { initRole(); }, []);
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background pb-24">
      <header className="sticky top-0 z-30 border-b bg-card/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">UP</div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">Jamaah & Tim Lapangan</p>
            <p className="truncate text-[11px] text-muted-foreground">Portal Perjalanan Umroh</p>
          </div>
        </div>
      </header>
      <main className="px-4 py-4">{children}</main>
    </div>
  );
}

function JamaahPage() {
  const jamaah = JAMAAH[0];
  const progress = Math.round((jamaah.terbayar / jamaah.totalTagihan) * 100);
  const doneCount = CHECKLIST.filter((c) => c.done).length;

  return (
    <MobileLayout>
      <PageHeader
        title={`Assalamualaikum, ${jamaah.nama.split(" ")[0]}`}
        description="Portal jamaah umroh Anda"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/cs"><MessageCircle className="size-4" /> CS</Link>
          </Button>
        }
      />

      {/* Kartu Digital */}
      <Card className="card-elevated mb-4 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest opacity-80">Kartu Jamaah</p>
            <p className="mt-1 font-display text-lg">{jamaah.nama}</p>
            <p className="text-xs opacity-90">{jamaah.id} · {jamaah.paket}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge className="bg-primary-foreground/15 text-[10px] text-primary-foreground">Kamar {jamaah.kamar}</Badge>
              <Badge className="bg-gold text-[10px] text-gold-foreground">{jamaah.status}</Badge>
            </div>
          </div>
          <QrCode className="size-16 shrink-0 opacity-80" />
        </CardContent>
      </Card>

      {/* Quick Menu */}
      <section className="mb-4 grid grid-cols-3 gap-2">
        {[
          { icon: Plane, label: "Jadwal", href: "/penerbangan" },
          { icon: FileText, label: "Dokumen", href: "/dokumen" },
          { icon: CreditCard, label: "Pembayaran", href: "/pembayaran" },
          { icon: BookOpen, label: "Panduan", href: "/panduan" },
          { icon: MapPin, label: "Itinerari", href: "/itinerari" },
          { icon: BellRing, label: "Info", href: "/pengumuman" },
        ].map((m) => (
          <Link key={m.label} to={m.href}
            className="flex flex-col items-center gap-1 rounded-xl border bg-card p-3 text-center transition hover:border-primary/40"
          >
            <div className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <m.icon className="size-4" />
            </div>
            <span className="text-[10px] font-medium">{m.label}</span>
          </Link>
        ))}
      </section>

      {/* Jadwal Sholat */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm"><span>Jadwal Shalat Makkah</span><Badge variant="outline" className="text-[10px]">27 Jul</Badge></CardTitle></CardHeader>
        <CardContent className="space-y-1.5">
          {SHOLAT.map((s) => (
            <div key={s.nama} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <span>{s.nama}</span>
              <span className="font-mono font-semibold text-primary">{s.jam}</span>
            </div>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl border p-3 text-center">
              <Compass className="mx-auto size-5 text-primary" />
              <p className="text-[10px] text-muted-foreground">Kiblat</p>
              <p className="font-display text-sm">292°</p>
            </div>
            <div className="rounded-xl border p-3 text-center">
              <Cloud className="mx-auto size-5 text-info" />
              <p className="text-[10px] text-muted-foreground">Cuaca</p>
              <p className="font-display text-sm">38°C</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Itinerari */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Itinerari Hari Ini</CardTitle></CardHeader>
        <CardContent>
          <ol className="relative space-y-3 border-l pl-4">
            {ITINERARI.slice(0, 3).map((it) => (
              <li key={it.hari} className="relative">
                <span className="absolute -left-[22px] top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">{it.hari}</span>
                <p className="text-sm font-medium">{it.judul}</p>
                <p className="text-xs text-muted-foreground">{it.lokasi} · {it.jam}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Pembayaran */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Pembayaran</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Tagihan</span><span className="font-semibold">{formatRupiah(jamaah.totalTagihan)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Terbayar</span><span className="font-semibold text-success">{formatRupiah(jamaah.terbayar)}</span></div>
          <Progress value={progress} />
          <Button className="w-full" size="sm"><CreditCard className="size-4" /> Bayar Cicilan</Button>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm"><span className="flex items-center gap-1"><Award className="size-4 text-gold-foreground" /> Persiapan</span><Badge variant="outline" className="text-[10px]">{doneCount}/{CHECKLIST.length}</Badge></CardTitle></CardHeader>
        <CardContent className="space-y-1.5 text-sm">
          {CHECKLIST.map((c) => (
            <label key={c.label} className="flex cursor-pointer items-center gap-2 rounded-lg border p-2.5">
              <input type="checkbox" defaultChecked={c.done} className="size-4 accent-primary" />
              <span className={c.done ? "text-muted-foreground line-through" : ""}>{c.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Kontak Darurat */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-1 text-sm"><Phone className="size-4" /> Kontak Darurat</CardTitle></CardHeader>
        <CardContent className="space-y-1.5 text-sm">
          {KONTAK.map((k) => (
            <a key={k.no} href={`tel:${k.no.replace(/\s/g, "")}`}
              className="flex items-center justify-between rounded-lg border p-3 transition hover:border-primary/40"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{k.label}</p>
                <p className="font-mono text-xs text-muted-foreground">{k.no}</p>
              </div>
              <Phone className="size-4 text-primary shrink-0" />
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Frasa Arab */}
      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-1 text-sm"><Sparkles className="size-4" /> Frasa Arab</CardTitle></CardHeader>
        <CardContent className="space-y-1.5 text-sm">
          {[
            { ar: "كم السعر؟", id: "Berapa harganya?" },
            { ar: "أين الحمام؟", id: "Di mana toilet?" },
            { ar: "ساعدني من فضلك", id: "Tolong saya" },
          ].map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <span dir="rtl" className="font-display text-base">{f.ar}</span>
              <span className="text-xs text-muted-foreground">{f.id}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {[
            { icon: MapPin, label: "Itinerari", href: "/", active: true },
            { icon: BookOpen, label: "Panduan", href: "/panduan", active: false },
            { icon: BellRing, label: "Info", href: "/pengumuman", active: false },
            { icon: Award, label: "Sertifikat", href: "/sertifikat", active: false },
          ].map((item) => (
            <li key={item.label}>
              <Link to={item.href} className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors ${item.active ? "text-primary" : "text-muted-foreground"}`}>
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </MobileLayout>
  );
}
