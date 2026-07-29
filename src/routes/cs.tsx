import { createFileRoute } from "@tanstack/react-router";
import { Headphones, MessageSquare, Clock, CheckCircle2, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/cs")({
  head: () => ({
    meta: [
      { title: "Customer Service — UmrahPro" },
      { name: "description", content: "Tiket dukungan jamaah, kanal live chat, FAQ, dan knowledge base agensi." },
      { property: "og:title", content: "Customer Service — UmrahPro" },
      { property: "og:description", content: "Tiket dukungan, live chat, FAQ, dan knowledge base." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const TOPIK = [
  "Perubahan jadwal keberangkatan",
  "Pertanyaan cicilan pembayaran",
  "Status pengajuan visa",
  "Permintaan ganti kamar hotel",
  "Kehilangan dokumen paspor",
  "Permintaan kursi roda",
  "Pertanyaan bagasi tambahan",
  "Komplain layanan katering",
];

const FAQ = [
  { q: "Berapa lama proses penerbitan visa umroh?", a: "Rata-rata 5–10 hari kerja setelah paspor dan foto diterima lengkap oleh tim operasional." },
  { q: "Apakah pembayaran bisa dicicil?", a: "Bisa. Uang muka minimal Rp 5.000.000 dan pelunasan paling lambat 30 hari sebelum keberangkatan." },
  { q: "Apa saja perlengkapan yang didapat jamaah?", a: "Koper, tas paspor, kain ihram/mukena, buku panduan, ID card, dan syal rombongan." },
  { q: "Bagaimana jika jamaah membatalkan keberangkatan?", a: "Berlaku ketentuan pembatalan sesuai kontrak; potongan tergantung jarak waktu ke tanggal berangkat." },
];

function Page() {
  const tiket = TOPIK.map((t, i) => ({
    id: `TKT-2026${String(400 + i)}`,
    topik: t,
    jamaah: JAMAAH[i * 5].nama,
    prioritas: i % 4 === 0 ? "Tinggi" : i % 3 === 0 ? "Sedang" : "Rendah",
    status: i % 4 === 0 ? "Menunggu" : i % 3 === 0 ? "Diproses" : "Selesai",
    waktu: `${i + 1} jam lalu`,
  }));

  return (
    <AppShell>
      <PageHeader
        title="Customer Service"
        description="Tiket dukungan, live chat, FAQ, dan knowledge base."
        actions={<Button className="w-full sm:w-auto"><MessageSquare className="size-4" /> Buka Live Chat</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Tiket Terbuka" value={tiket.filter((t) => t.status !== "Selesai").length} icon={Headphones} tone="warning" />
        <StatCard label="Tiket Selesai" value={tiket.filter((t) => t.status === "Selesai").length} icon={CheckCircle2} tone="success" />
        <StatCard label="Rata-rata Respons" value="12 menit" icon={Clock} />
        <StatCard label="Kepuasan" value="4,7 / 5" icon={MessageSquare} tone="gold" />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Antrean Tiket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari tiket atau jamaah…" className="pl-9" />
            </div>
            {tiket.map((t) => (
              <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.topik}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.id} · {t.jamaah} · {t.waktu} · Prioritas {t.prioritas}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">FAQ & Knowledge Base</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`f${i}`}>
                  <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
