import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Plus, Send, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PENGUMUMAN } from "@/data/mock";

export const Route = createFileRoute("/pengumuman")({
  head: () => ({
    meta: [
      { title: "Pengumuman — UmrahPro" },
      { name: "description", content: "Kirim pengumuman agensi, promosi, dan pemberitahuan darurat ke jamaah." },
      { property: "og:title", content: "Pengumuman — UmrahPro" },
      { property: "og:description", content: "Pengumuman agensi, promosi, dan pemberitahuan darurat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const TONE: Record<string, string> = {
  Agensi: "bg-primary-soft text-primary",
  Penerbangan: "bg-info/15 text-info",
  Promo: "bg-gold-soft text-gold-foreground",
  Darurat: "bg-destructive/12 text-destructive",
};

function Page() {
  const [kat, setKat] = useState("Semua");
  const kategori = ["Semua", "Agensi", "Penerbangan", "Promo", "Darurat"];
  const list = PENGUMUMAN.filter((p) => kat === "Semua" || p.kategori === kat);

  return (
    <AppShell>
      <PageHeader
        title="Pengumuman"
        description="Pengumuman agensi, promosi, dan pemberitahuan darurat."
        actions={<Button className="w-full sm:w-auto"><Plus className="size-4" /> Buat Pengumuman</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Pengumuman" value={PENGUMUMAN.length} icon={Megaphone} />
        <StatCard label="Terkirim Bulan Ini" value={18} icon={Send} tone="success" />
        <StatCard label="Penerima" value="1.240" icon={Users} tone="gold" />
        <StatCard label="Darurat Aktif" value={1} icon={Megaphone} tone="destructive" />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {kategori.map((k) => (
              <button
                key={k}
                onClick={() => setKat(k)}
                className={
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition " +
                  (k === kat ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted")
                }
              >
                {k}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {list.map((p) => (
              <Card key={p.judul}>
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 font-medium">{p.judul}</p>
                    <Badge variant="outline" className={TONE[p.kategori]}>{p.kategori}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.tanggal}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.isi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Kirim Pengumuman Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Judul pengumuman" />
            <Textarea placeholder="Isi pengumuman…" rows={5} />
            <div className="flex flex-wrap gap-2">
              {["WhatsApp", "Email", "Portal Jamaah", "Push"].map((c) => (
                <Badge key={c} variant="secondary">{c}</Badge>
              ))}
            </div>
            <Button className="w-full"><Send className="size-4" /> Kirim Sekarang</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
