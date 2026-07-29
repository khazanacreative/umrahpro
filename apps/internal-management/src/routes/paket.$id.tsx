import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, X } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PAKET, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/paket/$id")({
  loader: ({ params }) => {
    const paket = PAKET.find((p) => p.id === params.id);
    if (!paket) throw notFound();
    return { paket };
  },
  head: ({ loaderData }) => {
    const nama = loaderData?.paket.nama ?? "Paket Umroh";
    return {
      meta: [
        { title: `${nama} — UmrahPro` },
        { name: "description", content: `Detail ${nama}: hotel, maskapai, fasilitas, dan harga.` },
        { property: "og:title", content: `${nama} — UmrahPro` },
        { property: "og:description", content: `Detail fasilitas dan harga ${nama}.` },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: PaketDetail,
  errorComponent: () => (
    <AppShell>
      <PageHeader title="Paket tidak dapat dimuat" description="Silakan coba lagi." />
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <PageHeader title="Paket tidak ditemukan" description="Paket tidak tersedia." />
      <Button asChild>
        <Link to="/paket">Kembali ke Paket</Link>
      </Button>
    </AppShell>
  ),
});

function PaketDetail() {
  const { paket } = Route.useLoaderData();
  const detail: [string, string][] = [
    ["Durasi", `${paket.durasi} hari`],
    ["Maskapai", paket.maskapai],
    ["Hotel Makkah", paket.hotelMakkah],
    ["Hotel Madinah", paket.hotelMadinah],
    ["Bintang", `${paket.bintang}`],
    ["Keberangkatan", paket.berangkat],
    ["Kepulangan", paket.kembali],
    ["Kuota", `${paket.terisi}/${paket.kuota}`],
  ];

  return (
    <AppShell>
      <Button variant="ghost" size="sm" className="mb-2" asChild>
        <Link to="/paket">
          <ArrowLeft className="size-4" /> Kembali
        </Link>
      </Button>
      <PageHeader
        title={paket.nama}
        description={paket.deskripsi}
        actions={
          <>
            <Badge className="bg-gold-soft text-gold-foreground">{paket.kategori}</Badge>
            <Button>Booking Sekarang</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Informasi Paket</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.map(([k, v]) => (
              <div key={k}>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p>
                <p className="mt-0.5 text-sm font-medium">{v}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Harga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paket.promo && (
              <p className="text-sm text-muted-foreground line-through">
                {formatRupiah(paket.harga)}
              </p>
            )}
            <p className="font-display text-3xl text-primary">
              {formatRupiah(paket.promo ?? paket.harga)}
            </p>
            <Progress value={(paket.terisi / paket.kuota) * 100} />
            <p className="text-xs text-muted-foreground">
              Sisa kursi: {paket.kuota - paket.terisi}
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Fasilitas Termasuk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {paket.fasilitas.map((f: string) => (
              <p key={f} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-success" /> {f}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Tidak Termasuk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {paket.tidakTermasuk.map((f: string) => (
              <p key={f} className="flex items-center gap-2">
                <X className="size-4 shrink-0 text-destructive" /> {f}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base">Galeri</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pattern-islamic aspect-square rounded-xl border" />
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
