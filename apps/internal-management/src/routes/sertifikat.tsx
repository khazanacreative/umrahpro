import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Search, Send } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/sertifikat")({
  head: () => ({
    meta: [
      { title: "Sertifikat Umroh — UmrahPro" },
      { name: "description", content: "Penerbitan sertifikat umroh digital, verifikasi QR, dan pengiriman ke jamaah." },
      { property: "og:title", content: "Sertifikat Umroh — UmrahPro" },
      { property: "og:description", content: "Penerbitan dan verifikasi sertifikat umroh digital." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const alumni = JAMAAH.filter((j) => j.status === "Selesai").slice(0, 10).map((j, i) => ({
    ...j,
    nomor: `SRT/2026/${String(1000 + i)}`,
    status: i % 5 === 0 ? "Menunggu" : "Terbit",
  }));

  return (
    <AppShell>
      <PageHeader
        title="Sertifikat Umroh"
        description="Terbitkan, unduh, dan kirim sertifikat digital untuk jamaah alumni."
        actions={<Button className="w-full sm:w-auto"><Award className="size-4" /> Terbitkan Massal</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Sertifikat Terbit" value={alumni.filter((a) => a.status === "Terbit").length} icon={Award} tone="success" />
        <StatCard label="Menunggu Terbit" value={alumni.filter((a) => a.status === "Menunggu").length} icon={Award} tone="warning" />
        <StatCard label="Alumni Terdaftar" value={JAMAAH.filter((j) => j.status === "Selesai").length} icon={Award} tone="gold" />
        <StatCard label="Diunduh Jamaah" value={64} icon={Download} />
      </section>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Daftar Sertifikat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Cari nama jamaah atau nomor sertifikat…" className="pl-9" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {alumni.map((a) => (
              <div key={a.id} className="rounded-xl border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.nama}</p>
                    <p className="text-xs text-muted-foreground">{a.nomor} · {a.paket}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm"><Download className="size-4" /> Unduh</Button>
                  <Button size="sm"><Send className="size-4" /> Kirim</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
