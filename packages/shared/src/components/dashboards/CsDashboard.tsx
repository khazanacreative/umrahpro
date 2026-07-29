import { Link } from "@tanstack/react-router";
import { Clock, Headphones, MessageCircle, Star, Ticket, ThumbsUp, PhoneCall } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JAMAAH } from "@/data/mock";

const TIKET = [
  { id: "TKT-2041", jamaah: "Siti Nurhayati", topik: "Perubahan tanggal keberangkatan", kanal: "WhatsApp", prioritas: "Tinggi", status: "Diproses" },
  { id: "TKT-2040", jamaah: "Ahmad Setiawan", topik: "Status visa belum terbit", kanal: "Telepon", prioritas: "Tinggi", status: "Menunggu" },
  { id: "TKT-2039", jamaah: "Rahma Putri", topik: "Permintaan kamar double", kanal: "Email", prioritas: "Sedang", status: "Diproses" },
  { id: "TKT-2038", jamaah: "Yusuf Hakim", topik: "Bukti transfer belum terverifikasi", kanal: "WhatsApp", prioritas: "Tinggi", status: "Menunggu" },
  { id: "TKT-2037", jamaah: "Halimah Safitri", topik: "Ganti nama di tiket", kanal: "Walk-in", prioritas: "Rendah", status: "Selesai" },
  { id: "TKT-2036", jamaah: "Bilal Firdaus", topik: "Info manasik akbar", kanal: "WhatsApp", prioritas: "Rendah", status: "Selesai" },
];

const VOLUME = [
  { jam: "08", tiket: 6 }, { jam: "10", tiket: 14 }, { jam: "12", tiket: 9 },
  { jam: "14", tiket: 18 }, { jam: "16", tiket: 12 }, { jam: "18", tiket: 7 },
];

const FAQ = [
  { q: "Bagaimana cara cicilan pembayaran?", dilihat: 1240 },
  { q: "Dokumen apa saja yang diperlukan?", dilihat: 980 },
  { q: "Berapa lama proses visa umroh?", dilihat: 862 },
  { q: "Apakah bisa ganti jadwal keberangkatan?", dilihat: 614 },
];

export function CsDashboard() {
  const perluTindak = JAMAAH.filter((j) => j.statusVisa === "Ditolak" || j.terbayar < j.totalTagihan).slice(0, 5);
  const terbuka = TIKET.filter((t) => t.status !== "Selesai").length;

  return (
    <>
      <PageHeader
        title="Dashboard Customer Service"
        description="Tiket dukungan, kanal komunikasi, dan kepuasan jamaah"
        actions={
          <>
            <Button variant="outline" asChild><Link to="/panduan">Knowledge Base</Link></Button>
            <Button asChild><Link to="/cs">Buka Semua Tiket</Link></Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Tiket Terbuka" value={terbuka} icon={Ticket} tone="warning" hint={`${TIKET.length} total hari ini`} />
        <StatCard label="Rata-rata Respons" value="8 menit" icon={Clock} tone="success" />
        <StatCard label="Tiket Selesai" value={TIKET.length - terbuka} icon={ThumbsUp} tone="success" />
        <StatCard label="Kepuasan Jamaah" value="4,7 / 5" icon={Star} tone="gold" hint="312 penilaian" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Headphones className="size-4 text-primary" /> Antrian Tiket</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {TIKET.map((t) => (
              <div key={t.id} className="rounded-lg border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="mt-1 font-medium">{t.topik}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">{t.jamaah}</span>
                  <Badge variant="outline" className="text-[10px]">{t.kanal}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      t.prioritas === "Tinggi"
                        ? "bg-destructive/12 text-destructive border-destructive/30 text-[10px]"
                        : t.prioritas === "Sedang"
                          ? "bg-warning/25 text-warning-foreground border-warning/40 text-[10px]"
                          : "text-[10px]"
                    }
                  >
                    {t.prioritas}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><MessageCircle className="size-4 text-primary" /> Volume Tiket Hari Ini</CardTitle></CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VOLUME}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="jam" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="tiket" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><PhoneCall className="size-4 text-primary" /> Jamaah Perlu Ditindak</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {perluTindak.map((j) => (
              <Link key={j.id} to="/jamaah/$id" params={{ id: j.id }} className="flex items-center justify-between gap-2 rounded-lg border p-3 transition hover:border-primary/40">
                <div className="min-w-0">
                  <p className="truncate font-medium">{j.nama}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.statusVisa === "Ditolak" ? "Visa ditolak" : "Tagihan belum lunas"}</p>
                </div>
                <Badge variant="outline" className="shrink-0 text-[10px]">{j.kota}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">FAQ Paling Sering Dibuka</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {FAQ.map((f) => (
              <div key={f.q}>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="truncate">{f.q}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{f.dilihat}x</span>
                </div>
                <Progress value={Math.round((f.dilihat / 1240) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
