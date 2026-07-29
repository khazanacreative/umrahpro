import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Building2, MapPin, Star, Download } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HOTEL, JAMAAH, formatAngka } from "@/data/mock";

export const Route = createFileRoute("/hotel")({
  head: () => ({
    meta: [
      { title: "Manajemen Hotel & Kamar — UmrahPro" },
      { name: "description", content: "Alokasi hotel Makkah–Madinah, rooming list, dan okupansi kamar jamaah." },
      { property: "og:title", content: "Manajemen Hotel & Kamar — UmrahPro" },
      { property: "og:description", content: "Alokasi hotel Makkah–Madinah, rooming list, dan okupansi kamar jamaah." },
    ],
  }),
  component: Page,
});

function HotelGrid({ kota }: { kota: string }) {
  const list = HOTEL.filter((h) => h.kota === kota);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((h, i) => {
        const terisi = Math.min(h.kamar, Math.round(h.kamar * (0.5 + ((i * 7) % 45) / 100)));
        return (
          <Card key={h.nama} className="card-elevated">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 truncate font-medium">{h.nama}</p>
                <Badge className="shrink-0 bg-gold text-gold-foreground">{h.bintang}<Star className="size-3" /></Badge>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {h.jarak} dari {kota === "Makkah" ? "Masjidil Haram" : "Masjid Nabawi"}
              </p>
              <div className="mt-3 flex justify-between text-xs">
                <span className="text-muted-foreground">Kamar terisi</span>
                <span className="font-semibold">{terisi}/{h.kamar}</span>
              </div>
              <Progress className="mt-1" value={Math.round((terisi / h.kamar) * 100)} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function Page() {
  const totalKamar = HOTEL.reduce((a, h) => a + h.kamar, 0);
  const bintang5 = HOTEL.filter((h) => h.bintang === 5).length;

  return (
    <AppShell>
      <PageHeader
        title="Manajemen Hotel & Kamar"
        description="Alokasi hotel Makkah–Madinah, rooming list, dan okupansi kamar."
        actions={<Button variant="outline"><Download className="size-4" /> Ekspor Rooming List</Button>}
      />

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Hotel" value={HOTEL.length} icon={Building2} />
        <StatCard label="Total Kamar" value={formatAngka(totalKamar)} icon={BedDouble} tone="success" />
        <StatCard label="Hotel Bintang 5" value={bintang5} icon={Star} tone="gold" />
        <StatCard label="Jamaah Terakomodasi" value={formatAngka(JAMAAH.length)} icon={BedDouble} hint="Rombongan aktif" />
      </section>

      <Tabs defaultValue="Makkah" className="mt-4">
        <TabsList>
          <TabsTrigger value="Makkah">Makkah</TabsTrigger>
          <TabsTrigger value="Madinah">Madinah</TabsTrigger>
          <TabsTrigger value="rooming">Rooming List</TabsTrigger>
        </TabsList>
        <TabsContent value="Makkah" className="mt-3"><HotelGrid kota="Makkah" /></TabsContent>
        <TabsContent value="Madinah" className="mt-3"><HotelGrid kota="Madinah" /></TabsContent>
        <TabsContent value="rooming" className="mt-3">
          <Card className="card-elevated">
            <CardHeader className="pb-2"><CardTitle className="text-base">Pembagian Kamar Jamaah</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {JAMAAH.slice(0, 12).map((j) => (
                <div key={j.id} className="flex items-center justify-between gap-2 rounded-lg border p-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{j.nama}</p>
                    <p className="truncate text-xs text-muted-foreground">{j.jenisKelamin === "P" ? "Perempuan" : "Laki-laki"} · {j.kota}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">Kamar {j.kamar}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
