import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, FileCheck2, FileClock, Printer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { JAMAAH } from "@/data/mock";

export const Route = createFileRoute("/dokumen")({
  head: () => ({
    meta: [
      { title: "Dokumen Jamaah — UmrahPro" },
      { name: "description", content: "Kelengkapan paspor, KTP, KK, foto, vaksin, serta cetak invoice dan manifest." },
      { property: "og:title", content: "Dokumen Jamaah — UmrahPro" },
      { property: "og:description", content: "Kelengkapan dokumen jamaah dan generator berkas keberangkatan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const TEMPLATE = [
  { nama: "Invoice Pembayaran", ket: "Tagihan & bukti bayar jamaah" },
  { nama: "Manifest Keberangkatan", ket: "Daftar penumpang per kloter" },
  { nama: "Rooming List Hotel", ket: "Pembagian kamar Makkah & Madinah" },
  { nama: "Kartu Identitas Jamaah", ket: "Kartu cetak + QR verifikasi" },
  { nama: "Label Bagasi", ket: "Label koper dengan kode rombongan" },
  { nama: "Surat Rekomendasi Visa", ket: "Berkas pengajuan visa umroh" },
];

const JENIS = ["KTP", "Kartu Keluarga", "Paspor", "Pas Foto", "Buku Nikah", "Vaksin Meningitis"];

function Page() {
  const rows = JAMAAH.slice(0, 12).map((j, i) => ({
    ...j,
    berkas: JENIS.map((jenis, k) => ({
      jenis,
      status: (i + k) % 7 === 0 ? "Belum" : (i + k) % 5 === 0 ? "Menunggu" : "Lengkap",
    })),
  }));

  const lengkap = rows.filter((r) => r.berkas.every((b) => b.status === "Lengkap")).length;

  return (
    <AppShell>
      <PageHeader
        title="Dokumen Jamaah"
        description="Kelengkapan berkas jamaah dan pembuatan dokumen keberangkatan."
        actions={
          <>
            <Button variant="outline" className="hidden sm:inline-flex"><Printer className="size-4" /> Cetak Massal</Button>
            <Button className="w-full sm:w-auto"><Download className="size-4" /> Unduh Rekap</Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Berkas Lengkap" value={lengkap} icon={FileCheck2} tone="success" />
        <StatCard label="Menunggu Verifikasi" value={rows.length - lengkap} icon={FileClock} tone="warning" />
        <StatCard label="Total Dokumen" value={rows.length * JENIS.length} icon={FileText} />
        <StatCard label="Template Tersedia" value={TEMPLATE.length} icon={Printer} tone="gold" />
      </section>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Checklist Berkas per Jamaah</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jamaah</TableHead>
                  {JENIS.map((j) => <TableHead key={j}>{j}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.nama}</TableCell>
                    {r.berkas.map((b) => (
                      <TableCell key={b.jenis}><StatusBadge status={b.status} /></TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {rows.map((r) => (
              <div key={r.id} className="rounded-xl border p-3">
                <p className="text-sm font-medium">{r.nama}</p>
                <p className="mb-2 text-xs text-muted-foreground">{r.paket}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.berkas.map((b) => (
                    <span key={b.jenis} className="text-[11px]">
                      <StatusBadge status={b.status} /> <span className="text-muted-foreground">{b.jenis}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Generator Dokumen</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {TEMPLATE.map((t) => (
            <div key={t.nama} className="flex items-start gap-3 rounded-xl border p-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{t.nama}</p>
                <p className="text-xs text-muted-foreground">{t.ket}</p>
                <Button variant="outline" size="sm" className="mt-2">Buat</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
