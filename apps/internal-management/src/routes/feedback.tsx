import { createFileRoute } from "@tanstack/react-router";
import { Star, MessageSquareQuote, ThumbsUp, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback & Survei — UmrahPro" },
      { name: "description", content: "Survei kepuasan jamaah pasca umroh, skor layanan, testimoni, dan komplain." },
      { property: "og:title", content: "Feedback & Survei — UmrahPro" },
      { property: "og:description", content: "Survei kepuasan, skor layanan, dan komplain jamaah." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ASPEK = [
  { nama: "Bimbingan Ibadah", skor: 4.8 },
  { nama: "Hotel Makkah", skor: 4.5 },
  { nama: "Hotel Madinah", skor: 4.6 },
  { nama: "Katering", skor: 4.2 },
  { nama: "Transportasi", skor: 4.4 },
  { nama: "Muthawif / Tour Leader", skor: 4.9 },
];

function Page() {
  const testimoni = JAMAAH.filter((j) => j.status === "Selesai").slice(0, 6).map((j, i) => ({
    nama: j.nama,
    paket: j.paket,
    rating: 5 - (i % 2),
    isi:
      i % 2 === 0
        ? "Alhamdulillah pelayanan sangat baik, pembimbing sabar dan hotel dekat dengan Masjidil Haram."
        : "Perjalanan lancar, jadwal tepat waktu. Semoga bisa berangkat lagi bersama keluarga.",
    status: i % 3 === 0 ? "Menunggu" : "Disetujui",
  }));

  return (
    <AppShell>
      <PageHeader
        title="Feedback & Survei"
        description="Survei kepuasan, skor layanan, dan formulir komplain jamaah."
        actions={<Button className="w-full sm:w-auto">Kirim Survei</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Skor Kepuasan" value="4,6 / 5" icon={Star} tone="gold" />
        <StatCard label="Responden" value={128} icon={MessageSquareQuote} />
        <StatCard label="Testimoni Disetujui" value={testimoni.filter((t) => t.status === "Disetujui").length} icon={ThumbsUp} tone="success" />
        <StatCard label="Komplain Terbuka" value={3} icon={AlertTriangle} tone="destructive" />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Skor per Aspek</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ASPEK.map((a) => (
              <div key={a.nama}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{a.nama}</span>
                  <span className="font-medium">{a.skor.toFixed(1)}</span>
                </div>
                <Progress value={(a.skor / 5) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Testimoni Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testimoni.map((t) => (
              <div key={t.nama} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.nama}</p>
                    <p className="text-xs text-muted-foreground">{t.paket}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={"size-3.5 " + (i < t.rating ? "fill-gold text-gold" : "text-muted-foreground/40")}
                        />
                      ))}
                    </span>
                    <StatusBadge status={t.status} />
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.isi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
