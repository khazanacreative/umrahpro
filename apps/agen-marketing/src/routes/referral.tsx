import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck, Copy, Download, Facebook, Gift, Instagram, Link2, MessageCircle,
  QrCode, Share2, Sparkles, TrendingUp, Trophy, Users,
} from "lucide-react";
import { PageHeader, StatCard, StatusBadge, initRole } from "@umrahpro/shared";
import { Button } from "@umrahpro/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@umrahpro/shared";
import { Input } from "@umrahpro/shared";
import { Badge } from "@umrahpro/shared";
import { Progress } from "@umrahpro/shared";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@umrahpro/shared";
import { AGEN, JAMAAH, PAKET, formatRupiah } from "@umrahpro/shared";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Alat Referral — UmrahPro" },
      { name: "description", content: "Link referral, brosur digital, dan tracking konversi." },
    ],
  }),
  component: ReferralPage,
});

function ReferralPage() {
  const me = AGEN[2];
  const rank = AGEN.findIndex((a) => a.id === me.id) + 1;
  const target = 30;
  const targetPct = Math.min(100, Math.round((me.referral / target) * 100));
  const referralLink = `https://umrahpro.id/daftar?ref=${me.id}`;
  const konversi = useMemo(() => JAMAAH.slice(0, 10), []);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      judul: "Promo Ramadhan",
      isi: `Assalamualaikum 🌙 Ada promo umroh Ramadhan mulai ${formatRupiah(28_500_000)}. Daftar via link saya ya: ${referralLink}`,
    },
    {
      judul: "Follow-up Calon Jamaah",
      isi: `Bapak/Ibu, apakah sudah sempat melihat brosur paket umroh yang saya kirim? Saya siap bantu proses pendaftarannya. ${referralLink}`,
    },
    {
      judul: "Ajak Keluarga",
      isi: `Yuk ibadah umroh bareng keluarga 🕋 Saya bantu urus semua dokumen sampai kepulangan. Info & daftar: ${referralLink}`,
    },
  ];

  return (
    <>
      <PageHeader
        title="Alat Referral"
        description="Bagikan paket, pantau konversi, dan naik level agen."
        actions={
          <Button variant="outline" className="hidden sm:inline-flex">
            <Download className="size-4" /> Kit Marketing
          </Button>
        }
      />

      {/* HERO CARD */}
      <Card className="card-elevated mb-4 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Badge className="bg-white/20 text-primary-foreground hover:bg-white/25">
                <Sparkles className="size-3" /> Level {me.level}
              </Badge>
              <p className="mt-3 font-display text-2xl leading-tight">{me.nama}</p>
              <p className="text-xs opacity-90">Peringkat #{rank} dari {AGEN.length} agen</p>
            </div>
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <QrCode className="size-10" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/15 p-2 pl-3 backdrop-blur">
            <Link2 className="size-4 shrink-0 opacity-80" />
            <span className="truncate font-mono text-xs">{referralLink}</span>
            <Button
              size="icon"
              variant="secondary"
              className="ml-auto size-8 shrink-0"
              aria-label="Salin link"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(referralLink).catch(() => {});
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? <BadgeCheck className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <ShareBtn icon={MessageCircle} label="WA" />
            <ShareBtn icon={Instagram} label="IG" />
            <ShareBtn icon={Facebook} label="FB" />
            <ShareBtn icon={Share2} label="Lain" />
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Referral" value={me.referral} icon={Users} hint={`Target ${target}`} />
        <StatCard label="Komisi" value={formatRupiah(me.komisi)} icon={Gift} tone="success" />
        <StatCard label="Tertunda" value={formatRupiah(me.komisiTertunda)} icon={TrendingUp} tone="warning" />
        <StatCard label="Peringkat" value={`#${rank}`} icon={Trophy} tone="gold" />
      </section>

      {/* PROGRESS */}
      <Card className="card-elevated mb-4">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-end justify-between text-sm">
            <span className="font-medium">Progres ke level berikutnya</span>
            <span className="font-display text-xl text-primary">{targetPct}%</span>
          </div>
          <Progress value={targetPct} />
          <p className="text-xs text-muted-foreground">
            {target - me.referral > 0
              ? `${target - me.referral} jamaah lagi + bonus ${formatRupiah(5_000_000)}.`
              : "Target level tercapai — bonus siap dicairkan."}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="brosur">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="brosur">Brosur</TabsTrigger>
          <TabsTrigger value="template">Template Pesan</TabsTrigger>
          <TabsTrigger value="konversi">Konversi</TabsTrigger>
        </TabsList>

        <TabsContent value="brosur" className="mt-3 space-y-3">
          {PAKET.slice(0, 6).map((p) => {
            const harga = p.promo ?? p.harga;
            return (
              <Card key={p.id} className="card-elevated">
                <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-4">
                  <div className="min-w-0">
                    <Badge variant="outline" className="bg-primary-soft text-primary">
                      {p.kategori}
                    </Badge>
                    <p className="mt-1.5 truncate font-medium">{p.nama}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.durasi} hari · {p.maskapai} · ⭐ {p.bintang}
                    </p>
                    <p className="mt-1 font-display text-lg text-primary">{formatRupiah(harga)}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Estimasi komisi Anda: <span className="font-semibold text-gold-foreground">{formatRupiah(750_000)}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Button size="sm" variant="outline" aria-label="Unduh brosur">
                      <Download className="size-4" />
                    </Button>
                    <Button size="sm" aria-label="Bagikan brosur">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="template" className="mt-3 space-y-3">
          {templates.map((t) => (
            <Card key={t.judul} className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{t.judul}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="rounded-lg bg-muted p-3 text-sm leading-relaxed">{t.isi}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="size-4" /> Salin
                  </Button>
                  <Button size="sm">
                    <MessageCircle className="size-4" /> Kirim WA
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="card-elevated border-dashed">
            <CardContent className="p-4">
              <Input placeholder="Tulis template baru…" />
              <Button className="mt-2 w-full" variant="outline">
                <Sparkles className="size-4" /> Simpan Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="konversi" className="mt-3 space-y-2">
          {konversi.map((j, i) => (
            <Card key={j.id} className="card-elevated">
              <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{j.nama}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.paket}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Daftar {j.tglDaftar} · {j.kota}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <StatusBadge status={j.status} />
                  <span className="text-xs font-semibold text-gold-foreground">
                    +{formatRupiah(500_000 + i * 100_000)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}

function ShareBtn({ icon: Icon, label }: { icon: typeof MessageCircle; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 rounded-xl bg-white/15 py-2 text-xs font-medium backdrop-blur transition hover:bg-white/25"
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}