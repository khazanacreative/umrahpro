import { createFileRoute } from "@tanstack/react-router";
import { Building2, Bell, Database, ScrollText, Save } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KATEGORI_PAKET, AKTIVITAS } from "@/data/mock";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({
    meta: [
      { title: "Pengaturan Sistem — UmrahPro" },
      { name: "description", content: "Profil perusahaan, master data, template notifikasi, dan log aktivitas sistem." },
      { property: "og:title", content: "Pengaturan Sistem — UmrahPro" },
      { property: "og:description", content: "Profil perusahaan, master data, notifikasi, dan log sistem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const NOTIFIKASI = [
  { nama: "Pengingat pembayaran cicilan", ket: "H-7 sebelum jatuh tempo", aktif: true },
  { nama: "Notifikasi visa terbit", ket: "Otomatis saat status berubah", aktif: true },
  { nama: "Pengingat manasik", ket: "H-3 sebelum jadwal manasik", aktif: true },
  { nama: "Pengingat keberangkatan", ket: "H-1 sebelum berangkat", aktif: false },
  { nama: "Ucapan kepulangan & survei", ket: "H+1 setelah tiba", aktif: false },
];

function Page() {
  return (
    <AppShell>
      <PageHeader
        title="Pengaturan Sistem"
        description="Profil perusahaan, master data, template notifikasi, dan log sistem."
        actions={<Button className="w-full sm:w-auto"><Save className="size-4" /> Simpan Perubahan</Button>}
      />

      <Tabs defaultValue="profil">
        <TabsList className="mb-4 flex w-full flex-wrap justify-start">
          <TabsTrigger value="profil"><Building2 className="size-4" /> Profil</TabsTrigger>
          <TabsTrigger value="master"><Database className="size-4" /> Master Data</TabsTrigger>
          <TabsTrigger value="notifikasi"><Bell className="size-4" /> Notifikasi</TabsTrigger>
          <TabsTrigger value="log"><ScrollText className="size-4" /> Log Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Profil Perusahaan</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="nama">Nama Travel</Label>
                <Input id="nama" defaultValue="PT UmrahPro Barokah Wisata" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="izin">No. Izin PPIU</Label>
                <Input id="izin" defaultValue="PPIU/2024/DKI/00871" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telp">Telepon</Label>
                <Input id="telp" defaultValue="021-5566778" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="info@umrahpro.id" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="alamat">Alamat Kantor Pusat</Label>
                <Textarea id="alamat" rows={3} defaultValue="Jl. Kramat Raya No. 45, Senen, Jakarta Pusat 10450" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="master">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Kategori Paket</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {KATEGORI_PAKET.map((k) => (
                  <Badge key={k} variant="secondary">{k}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Master Lainnya</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Maskapai", "Hotel Makkah & Madinah", "Bandara Keberangkatan", "Metode Pembayaran", "Skema Komisi", "Bank Rekanan"].map((m) => (
                  <div key={m} className="flex items-center justify-between rounded-lg border p-2.5">
                    <span>{m}</span>
                    <Button variant="ghost" size="sm">Kelola</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifikasi">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Template Notifikasi Otomatis</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {NOTIFIKASI.map((n) => (
                <div key={n.nama} className="flex items-center justify-between gap-3 rounded-xl border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{n.nama}</p>
                    <p className="text-xs text-muted-foreground">{n.ket}</p>
                  </div>
                  <Switch defaultChecked={n.aktif} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Log Aktivitas Sistem</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {AKTIVITAS.map((a) => (
                <div key={a.teks} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-sm">{a.teks}</p>
                    <p className="text-xs text-muted-foreground">{a.waktu}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
