import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText, HeartPulse, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatusBadge } from "@/components/layout/Ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JAMAAH, STATUS_JAMAAH, formatRupiah } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jamaah/$id")({
  loader: ({ params }) => {
    const jamaah = JAMAAH.find((j) => j.id === params.id);
    if (!jamaah) throw notFound();
    return { jamaah };
  },
  head: ({ loaderData }) => {
    const nama = loaderData?.jamaah.nama ?? "Jamaah";
    return {
      meta: [
        { title: `${nama} — Detail Jamaah | UmrahPro` },
        { name: "description", content: `Profil, dokumen, dan status keberangkatan ${nama}.` },
        { property: "og:title", content: `${nama} — Detail Jamaah` },
        { property: "og:description", content: `Profil dan status keberangkatan ${nama}.` },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: JamaahDetail,
  errorComponent: () => (
    <AppShell>
      <PageHeader title="Data tidak dapat dimuat" description="Silakan coba lagi." />
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <PageHeader title="Jamaah tidak ditemukan" description="Data jamaah tidak tersedia." />
      <Button asChild>
        <Link to="/jamaah">Kembali ke Data Jamaah</Link>
      </Button>
    </AppShell>
  ),
});

function JamaahDetail() {
  const { jamaah } = Route.useLoaderData();
  const stepIndex = STATUS_JAMAAH.indexOf(jamaah.status);
  const progress = Math.round((jamaah.terbayar / jamaah.totalTagihan) * 100);

  const info: [string, string][] = [
    ["Jenis Kelamin", jamaah.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"],
    ["Usia", `${jamaah.usia} tahun`],
    ["Kota", jamaah.kota],
    ["Telepon", jamaah.telepon],
    ["Email", jamaah.email],
    ["NIK", jamaah.nik],
    ["No. Paspor", jamaah.noPaspor],
    ["Mahram", jamaah.mahram],
    ["Preferensi Kamar", jamaah.kamar],
    ["Kursi Roda", jamaah.kursiRoda ? "Ya" : "Tidak"],
    ["Agen", jamaah.agen],
    ["Tanggal Daftar", jamaah.tglDaftar],
  ];

  return (
    <AppShell>
      <Button variant="ghost" size="sm" className="mb-2" asChild>
        <Link to="/jamaah">
          <ArrowLeft className="size-4" /> Kembali
        </Link>
      </Button>
      <PageHeader
        title={jamaah.nama}
        description={`${jamaah.id} · ${jamaah.paket}`}
        actions={
          <>
            <StatusBadge status={jamaah.status} />
            <Button variant="outline">Cetak Kartu</Button>
            <Button>Edit Data</Button>
          </>
        }
      />

      <Card className="card-elevated mb-4">
        <CardHeader>
          <CardTitle className="text-base">Alur Status Jamaah</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex gap-2 overflow-x-auto pb-2">
            {STATUS_JAMAAH.map((s, i) => (
              <li key={s} className="min-w-[110px] flex-1">
                <div
                  className={cn(
                    "h-1.5 rounded-full",
                    i <= stepIndex ? "bg-primary" : "bg-muted",
                  )}
                />
                <p
                  className={cn(
                    "mt-2 text-xs",
                    i <= stepIndex ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s}
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Tabs defaultValue="profil">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="medis">Medis</TabsTrigger>
          <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <Card className="card-elevated">
            <CardContent className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {info.map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p>
                  <p className="mt-0.5 text-sm font-medium">{v}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dokumen">
          <Card className="card-elevated">
            <CardContent className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Paspor", jamaah.paspor],
                ["Visa", jamaah.statusVisa],
                ["Sertifikat Vaksin", jamaah.vaksin],
                ["KTP", "Diterima"],
                ["Kartu Keluarga", "Diterima"],
                ["Buku Nikah", jamaah.jenisKelamin === "P" ? "Diterima" : "Tidak diperlukan"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="flex items-center gap-2 text-sm">
                    <FileText className="size-4 text-primary" /> {k}
                  </span>
                  <StatusBadge status={v} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medis">
          <Card className="card-elevated">
            <CardContent className="space-y-3 p-5 text-sm">
              <p className="flex items-center gap-2">
                <HeartPulse className="size-4 text-primary" /> Riwayat medis:{" "}
                <strong>{jamaah.catatanMedis}</strong>
              </p>
              <p>Vaksinasi: <strong>{jamaah.vaksin}</strong></p>
              <p>Kursi roda: <strong>{jamaah.kursiRoda ? "Diperlukan" : "Tidak diperlukan"}</strong></p>
              <p>Preferensi makanan: <strong>Reguler</strong></p>
              <p>Kontak darurat: <strong>{jamaah.mahram !== "-" ? jamaah.mahram : "Keluarga inti"} · {jamaah.telepon}</strong></p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keuangan">
          <Card className="card-elevated">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm">
                <Wallet className="size-4 text-primary" /> Total tagihan{" "}
                <strong>{formatRupiah(jamaah.totalTagihan)}</strong>
              </div>
              <Progress value={progress} />
              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Terbayar</p>
                  <p className="font-semibold text-success">{formatRupiah(jamaah.terbayar)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sisa</p>
                  <p className="font-semibold text-destructive">
                    {formatRupiah(jamaah.totalTagihan - jamaah.terbayar)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Progres</p>
                  <p className="font-semibold">{progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
