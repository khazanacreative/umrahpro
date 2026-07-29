import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITINERARI } from "@/data/mock";

export const Route = createFileRoute("/itinerari")({
  head: () => ({
    meta: [
      { title: "Itinerari Harian — UmrahPro" },
      { name: "description", content: "Timeline kegiatan harian jamaah selama perjalanan umroh, lengkap dengan titik kumpul." },
      { property: "og:title", content: "Itinerari Harian — UmrahPro" },
      { property: "og:description", content: "Timeline kegiatan harian selama perjalanan umroh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [aktif, setAktif] = useState(ITINERARI[0].hari);
  const detail = ITINERARI.find((i) => i.hari === aktif)!;

  return (
    <AppShell>
      <PageHeader
        title="Itinerari Harian"
        description="Timeline kegiatan harian selama perjalanan umroh."
        actions={<Button variant="outline" className="w-full sm:w-auto"><CalendarDays className="size-4" /> Ekspor Jadwal</Button>}
      />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {ITINERARI.map((i) => (
          <button
            key={i.hari}
            onClick={() => setAktif(i.hari)}
            className={
              "shrink-0 rounded-xl border px-4 py-2 text-sm transition " +
              (i.hari === aktif
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted")
            }
          >
            Hari {i.hari}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Rangkaian Kegiatan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l pl-6">
              {ITINERARI.map((i) => (
                <li key={i.hari} className="relative">
                  <span
                    className={
                      "absolute -left-[31px] top-1 grid size-5 place-items-center rounded-full border-2 border-background text-[10px] font-bold " +
                      (i.hari <= aktif ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
                    }
                  >
                    {i.hari}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{i.judul}</p>
                    <Badge variant="secondary">{i.jam}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.lokasi}</p>
                  <p className="mt-1 text-xs">{i.catatan}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Detail Hari {detail.hari}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-display text-lg leading-tight">{detail.judul}</p>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{detail.lokasi}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{detail.jam}</span>
            </div>
            <div className="flex items-start gap-2">
              <Users className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Titik kumpul: {detail.titikKumpul}</span>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
              {detail.catatan}
            </div>
            <Button className="w-full">Kirim Pengingat ke Jamaah</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
