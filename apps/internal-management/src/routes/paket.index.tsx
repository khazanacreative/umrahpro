import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Plus, Star } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { KATEGORI_PAKET, PAKET, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/paket/")({
  head: () => ({
    meta: [
      { title: "Paket Umroh — UmrahPro" },
      {
        name: "description",
        content: "Katalog paket umroh: kategori, hotel, maskapai, kuota, dan harga promo.",
      },
      { property: "og:title", content: "Paket Umroh — UmrahPro" },
      { property: "og:description", content: "Katalog lengkap paket umroh beserta kuota dan harga." },
    ],
  }),
  component: PaketList,
});

function PaketList() {
  const [kategori, setKategori] = useState<string>("Semua");
  const list = kategori === "Semua" ? PAKET : PAKET.filter((p) => p.kategori === kategori);

  return (
    <AppShell>
      <PageHeader
        title="Paket Umroh"
        description={`${PAKET.length} paket aktif siap dipasarkan`}
        actions={
          <Button>
            <Plus className="size-4" /> Tambah Paket
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Semua", ...KATEGORI_PAKET].map((k) => (
          <Button
            key={k}
            size="sm"
            variant={kategori === k ? "default" : "outline"}
            onClick={() => setKategori(k)}
          >
            {k}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id} className="card-elevated flex flex-col overflow-hidden">
            <div className="pattern-islamic h-24 border-b" />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-display text-lg leading-tight">{p.nama}</CardTitle>
                <Badge className="shrink-0 bg-gold-soft text-gold-foreground">{p.kategori}</Badge>
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Plane className="size-3" /> {p.maskapai}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="size-3 text-gold" /> {p.bintang} bintang
                </span>
                <span>{p.durasi} hari</span>
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm">
              <p className="text-muted-foreground">
                {p.hotelMakkah} · {p.hotelMadinah}
              </p>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Kuota terisi</span>
                  <span className="font-medium">
                    {p.terisi}/{p.kuota}
                  </span>
                </div>
                <Progress value={(p.terisi / p.kuota) * 100} />
              </div>
              <div>
                {p.promo ? (
                  <>
                    <p className="text-xs text-muted-foreground line-through">
                      {formatRupiah(p.harga)}
                    </p>
                    <p className="font-display text-xl text-primary">{formatRupiah(p.promo)}</p>
                  </>
                ) : (
                  <p className="font-display text-xl text-primary">{formatRupiah(p.harga)}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/paket/$id" params={{ id: p.id }}>
                  Detail
                </Link>
              </Button>
              <Button className="flex-1">Booking</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
