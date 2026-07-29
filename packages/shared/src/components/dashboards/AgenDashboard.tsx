import { Link } from "@tanstack/react-router";
import {
  Award, Copy, Download, Gift, LinkIcon, Share2, TrendingUp, Trophy, UserPlus, Users, Wallet,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { AGEN, CHART_PENDAFTARAN, JAMAAH, PAKET, formatRupiah } from "@/data/mock";

export function AgenDashboard() {
  const me = AGEN[2];
  const rank = AGEN.findIndex((a) => a.id === me.id) + 1;
  const target = 30;
  const targetPct = Math.min(100, Math.round((me.referral / target) * 100));
  const komisiBulanan = CHART_PENDAFTARAN.map((d) => ({ bulan: d.bulan, komisi: Math.round((d.jamaah / 6) * 750_000) }));
  const referralJamaah = JAMAAH.slice(0, 8);
  const referralLink = `https://umrahpro.id/daftar?ref=${me.id}`;

  return (
    <>
      <PageHeader
        title={`Assalamualaikum, ${me.nama.split(" ")[0]} 👋`}
        description={`${me.cabang} · Level ${me.level} · Peringkat #${rank} dari ${AGEN.length} agen`}
        actions={
          <>
            <Button variant="outline" className="hidden sm:inline-flex"><Download className="size-4" /> Brosur</Button>
            <Button asChild className="w-full sm:w-auto"><Link to="/jamaah"><UserPlus className="size-4" /> Daftarkan Jamaah</Link></Button>
          </>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Referral" value={me.referral} icon={Users} hint={`Target ${target} jamaah`} />
        <StatCard label="Komisi Diterima" value={formatRupiah(me.komisi)} icon={Wallet} tone="success" />
        <StatCard label="Komisi Tertunda" value={formatRupiah(me.komisiTertunda)} icon={Wallet} tone="warning" />
        <StatCard label="Peringkat" value={`#${rank}`} icon={Trophy} tone="gold" hint={`Level ${me.level}`} />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Progres Menuju {me.level === "Platinum" ? "Diamond" : "Level Berikutnya"}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end justify-between text-sm">
              <span className="text-muted-foreground">{me.referral} / {target} jamaah</span>
              <span className="font-display text-xl text-primary">{targetPct}%</span>
            </div>
            <Progress value={targetPct} />
            <p className="text-xs text-muted-foreground">
              {target - me.referral > 0 ? `${target - me.referral} jamaah lagi untuk naik level & bonus Rp 5.000.000.` : "Selamat! Target level tercapai."}
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated bg-gradient-to-br from-gold-soft to-card">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Gift className="size-4 text-gold-foreground" /> Bonus Bulan Ini</CardTitle></CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-gold-foreground">{formatRupiah(Math.round(me.komisi * 0.15))}</p>
            <p className="mt-1 text-xs text-muted-foreground">Insentif closing paket Premium + Ramadhan</p>
            <Button className="mt-3 w-full" variant="outline"><Award className="size-4" /> Lihat Rincian</Button>
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Komisi 6 Bulan Terakhir</CardTitle></CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={komisiBulanan}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bulan" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1_000_000}jt`} />
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
                <Bar isAnimationActive={false} dataKey="komisi" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><LinkIcon className="size-4" /> Link Referral</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input readOnly value={referralLink} className="font-mono text-xs" />
              <Button size="icon" variant="outline" aria-label="Salin"><Copy className="size-4" /></Button>
            </div>
            <Button className="w-full"><Share2 className="size-4" /> Bagikan via WhatsApp</Button>
            <p className="text-xs text-muted-foreground">Setiap jamaah yang mendaftar via link ini otomatis tercatat sebagai referral Anda.</p>
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Jamaah Referral Saya</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/jamaah">Lihat semua</Link></Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead className="hidden sm:table-cell">Paket</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Komisi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralJamaah.map((j, i) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.nama}</TableCell>
                      <TableCell className="hidden max-w-[180px] truncate sm:table-cell">{j.paket}</TableCell>
                      <TableCell><StatusBadge status={j.status} /></TableCell>
                      <TableCell className="text-right">{formatRupiah(500_000 + i * 100_000)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Trophy className="size-4 text-gold-foreground" /> Leaderboard</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {AGEN.slice(0, 6).map((a, i) => (
              <div key={a.id} className={`flex items-center justify-between rounded-lg border p-2.5 text-sm ${a.id === me.id ? "border-primary bg-primary-soft" : ""}`}>
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i < 3 ? "bg-gold text-gold-foreground" : "bg-muted"}`}>{i + 1}</span>
                  <span className="truncate">{a.nama}{a.id === me.id ? " (Anda)" : ""}</span>
                </div>
                <span className="ml-2 shrink-0 font-semibold">{a.referral}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated lg:col-span-3">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="size-4 text-primary" /> Paket Terlaris untuk Ditawarkan</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PAKET.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl border p-4">
                <Badge variant="outline" className="bg-primary-soft text-primary">{p.kategori}</Badge>
                <p className="mt-2 line-clamp-2 font-medium">{p.nama}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.durasi} hari · {p.maskapai}</p>
                <p className="mt-2 font-display text-lg text-primary">{formatRupiah(p.promo ?? p.harga)}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1"><Download className="size-4" /> Brosur</Button>
                  <Button size="sm" className="flex-1"><Share2 className="size-4" /> Bagikan</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
