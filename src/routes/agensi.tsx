import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Phone, Target, TrendingUp, Users, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { AGEN, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/agensi")({
  head: () => ({
    meta: [
      { title: "Agensi & Cabang — UmrahPro" },
      { name: "description", content: "Profil agensi, kantor cabang, target penjualan, komisi, dan performa tim marketing." },
      { property: "og:title", content: "Agensi & Cabang — UmrahPro" },
      { property: "og:description", content: "Kelola cabang, target, dan komisi tim marketing agensi umroh." },
    ],
  }),
  component: AgensiPage,
});

const CABANG = [
  { nama: "Pusat Jakarta", kota: "Jakarta Selatan", telp: "021-5567 1200", manajer: "H. Abdul Rahman", target: 800, tercapai: 612 },
  { nama: "Cabang Bandung", kota: "Bandung", telp: "022-4223 8901", manajer: "Hj. Siti Nurhayati", target: 300, tercapai: 248 },
  { nama: "Cabang Surabaya", kota: "Surabaya", telp: "031-5978 3345", manajer: "H. Yusuf Maulana", target: 350, tercapai: 289 },
  { nama: "Cabang Medan", kota: "Medan", telp: "061-4520 7788", manajer: "H. Hamzah Firdaus", target: 220, tercapai: 154 },
  { nama: "Cabang Makassar", kota: "Makassar", telp: "0411-3488 220", manajer: "Hj. Rahma Putri", target: 200, tercapai: 178 },
];

function AgensiPage() {
  const totalTarget = CABANG.reduce((a, c) => a + c.target, 0);
  const totalTercapai = CABANG.reduce((a, c) => a + c.tercapai, 0);
  const totalKomisi = AGEN.reduce((a, x) => a + x.komisi, 0);

  return (
    <AppShell>
      <PageHeader
        title="Agensi & Cabang"
        description="Profil agensi induk, kantor cabang, tim marketing, target penjualan & komisi."
        actions={
          <>
            <Button variant="outline"><Building2 className="size-4" /> Tambah Cabang</Button>
            <Button><Target className="size-4" /> Atur Target</Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Cabang" value={CABANG.length} icon={Building2} />
        <StatCard label="Target Jamaah" value={totalTarget.toLocaleString("id-ID")} icon={Target} tone="gold" />
        <StatCard label="Tercapai" value={totalTercapai.toLocaleString("id-ID")} icon={TrendingUp} tone="success" hint={`${Math.round((totalTercapai/totalTarget)*100)}% dari target`} />
        <StatCard label="Total Komisi" value={formatRupiah(totalKomisi)} icon={Wallet} tone="warning" />
      </section>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Profil Agensi Induk</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div><p className="text-xs uppercase text-muted-foreground">Nama Legal</p><p className="font-medium">PT Umrah Pro Berkah Mulia</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Izin PPIU</p><p className="font-medium">No. 452/PPIU/2023</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">NPWP</p><p className="font-medium">02.345.678.9-012.000</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Direktur Utama</p><p className="font-medium">H. Abdul Rahman, MBA</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Berdiri</p><p className="font-medium">12 Rabiul Awal 1436 H</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Kantor Pusat</p><p className="font-medium">Jl. HR Rasuna Said Blok X-5, Jakarta Selatan</p></div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Daftar Cabang & Pencapaian</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {CABANG.map((c) => {
              const pct = Math.round((c.tercapai / c.target) * 100);
              return (
                <div key={c.nama} className="rounded-xl border p-4">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium">{c.nama}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{c.kota}</span>
                        <span className="inline-flex items-center gap-1"><Phone className="size-3" />{c.telp}</span>
                        <span className="inline-flex items-center gap-1"><Users className="size-3" />{c.manajer}</span>
                      </p>
                    </div>
                    <Badge variant="outline" className={pct >= 90 ? "bg-success/15 text-success border-success/30" : pct >= 70 ? "bg-info/15 text-info border-info/30" : "bg-warning/25 text-warning-foreground border-warning/40"}>
                      {pct}% target
                    </Badge>
                  </div>
                  <Progress value={pct} />
                  <p className="mt-1.5 text-xs text-muted-foreground">{c.tercapai} dari {c.target} jamaah</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="text-base">Pengaturan Komisi</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ["Bronze (0-5 jamaah)", "Rp 500.000 / jamaah"],
              ["Silver (6-15 jamaah)", "Rp 750.000 / jamaah"],
              ["Gold (16-30 jamaah)", "Rp 1.000.000 / jamaah"],
              ["Platinum (>30 jamaah)", "Rp 1.500.000 / jamaah"],
              ["Bonus Paket VIP", "+ Rp 500.000 / jamaah"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span>{k}</span>
                <span className="font-semibold text-primary">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="card-elevated mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Tim Marketing Teratas</CardTitle></CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden sm:table-cell">Cabang</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Referral</TableHead>
                  <TableHead className="text-right">Komisi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGEN.slice(0, 6).map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.nama}</TableCell>
                    <TableCell className="hidden sm:table-cell">{a.cabang}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-gold-soft text-gold-foreground">{a.level}</Badge></TableCell>
                    <TableCell className="text-right">{a.referral}</TableCell>
                    <TableCell className="text-right">{formatRupiah(a.komisi)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
