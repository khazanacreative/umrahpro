import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Images, Upload, Video, Heart } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Media — UmrahPro" },
      { name: "description", content: "Album foto dan video dokumentasi perjalanan jamaah per rombongan." },
      { property: "og:title", content: "Galeri Media — UmrahPro" },
      { property: "og:description", content: "Foto, video, dan kenangan perjalanan jamaah." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ALBUM = [
  { judul: "Manasik Akbar Angkatan Juli", kategori: "Manasik", media: 48, jenis: "Foto" },
  { judul: "Keberangkatan Kloter KLT-202610", kategori: "Keberangkatan", media: 62, jenis: "Foto" },
  { judul: "Tawaf & Sai Rombongan Premium", kategori: "Ibadah", media: 84, jenis: "Foto" },
  { judul: "Ziarah Madinah — Raudhah", kategori: "Ziarah", media: 37, jenis: "Foto" },
  { judul: "Dokumentasi Video Muthawif", kategori: "Ibadah", media: 12, jenis: "Video" },
  { judul: "Penyambutan Kepulangan", kategori: "Kepulangan", media: 55, jenis: "Foto" },
  { judul: "City Tour Jeddah", kategori: "Ziarah", media: 29, jenis: "Foto" },
  { judul: "Testimoni Jamaah Alumni", kategori: "Testimoni", media: 8, jenis: "Video" },
];

const KATEGORI = ["Semua", "Manasik", "Keberangkatan", "Ibadah", "Ziarah", "Kepulangan", "Testimoni"];

function Page() {
  const [kat, setKat] = useState("Semua");
  const albums = ALBUM.filter((a) => kat === "Semua" || a.kategori === kat);

  return (
    <AppShell>
      <PageHeader
        title="Galeri Media"
        description="Foto, video, dan kenangan perjalanan jamaah."
        actions={<Button className="w-full sm:w-auto"><Upload className="size-4" /> Unggah Media</Button>}
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Album" value={ALBUM.length} icon={Images} />
        <StatCard label="Total Foto" value={ALBUM.filter((a) => a.jenis === "Foto").reduce((a, b) => a + b.media, 0)} icon={Images} tone="gold" />
        <StatCard label="Total Video" value={ALBUM.filter((a) => a.jenis === "Video").reduce((a, b) => a + b.media, 0)} icon={Video} tone="success" />
        <StatCard label="Disukai Jamaah" value="1.284" icon={Heart} tone="warning" />
      </section>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {KATEGORI.map((k) => (
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

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {albums.map((a) => (
          <Card key={a.judul} className="overflow-hidden">
            <div className="pattern-islamic grid h-36 place-items-center border-b bg-primary-soft">
              {a.jenis === "Video" ? (
                <Video className="size-8 text-primary" />
              ) : (
                <Images className="size-8 text-primary" />
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 text-sm font-medium">{a.judul}</p>
                <Badge variant="secondary" className="shrink-0">{a.jenis}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{a.kategori} · {a.media} media</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
