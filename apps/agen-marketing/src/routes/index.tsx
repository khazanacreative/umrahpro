import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Users, Wallet, Share2, Trophy, TrendingUp, UserPlus, Award, Gift, Download, Copy, LinkIcon,
  ChevronDown, Check, Building2,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge, initRole, useRole, ROLE_LABELS } from "@umrahpro/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@umrahpro/shared";
import { Button } from "@umrahpro/shared";
import { Badge } from "@umrahpro/shared";
import { Input } from "@umrahpro/shared";
import { Progress } from "@umrahpro/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@umrahpro/shared";
import { AGEN, CHART_PENDAFTARAN, JAMAAH, PAKET, formatRupiah } from "@umrahpro/shared";
import { cn } from "@umrahpro/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@umrahpro/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Agen — UmrahPro" },
      { name: "description", content: "Dashboard mitra agen travel umroh." },
    ],
  }),
  component: AgenMarketingPage,
});

function MobileLayout({ children }: { children: ReactNode }) {
  useEffect(() => { initRole(); }, []);
  const role = useRole();
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background pb-24">
      <header className="sticky top-0 z-30 border-b bg-card/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">AP</div>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">Agen & Marketing</p>
              <p className="truncate text-[11px] text-muted-foreground">Mitra UmrahPro</p>
            </div>
          </div>
          
          {/* Role Switcher */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                <span className="truncate max-w-[80px]">{ROLE_LABELS[role]}</span>
                <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => { 
                    import("@umrahpro/shared").then(({ setRole }) => setRole(value as any)); 
                    setOpen(false); 
                  }}
                  className={cn("gap-2 text-sm", value === role && "bg-primary-soft font-medium text-primary")}
                >
                  {value === role && <Check className="size-3.5 text-primary" />}
                  <span className="flex-1">{label}</span>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              {/* App Switcher */}
              <DropdownMenuLabel className="px-2 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Aplikasi Lain
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <a href="/admin" className="flex items-center gap-2 text-sm">
                  <Building2 className="size-4" />
                  <span className="flex-1">Manajemen Internal</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/jamaah" className="flex items-center gap-2 text-sm">
                  <Users className="size-4" />
                  <span className="flex-1">Jamaah & Tim Lapangan</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="px-4 py-4">{children}</main>
    </div>
  );
}

function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  
  const items = [
    { icon: TrendingUp, label: "Dashboard", href: "/", match: (p: string) => p === "/" },
    { icon: Users, label: "Jamaah", href: "/jamaah", match: (p: string) => p.startsWith("/jamaah") },
    { icon: Share2, label: "Referral", href: "/referral", match: (p: string) => p.startsWith("/referral") },
    { icon: Wallet, label: "Komisi", href: "/komisi", match: (p: string) => p.startsWith("/komisi") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.label}>
              <Link to={item.href} className={cn("flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground")}>
                <item.icon className={cn("size-5", active && "stroke-[2.4]")} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AgenMarketingPage() {
  const me = AGEN[2];
  const rank = AGEN.findIndex((a) => a.id === me.id) + 1;
  const target = 30;
  const targetPct = Math.min(100, Math.round((me.referral / target) * 100));
  const komisiBulanan = CHART_PENDAFTARAN.map((d) => ({ bulan: d.bulan, komisi: Math.round((d.jamaah / 6) * 750_000) }));
  const referralJamaah = JAMAAH.slice(0, 6);
  const referralLink = `https://umrahpro.id/daftar?ref=${me.id}`;

  return (
    <MobileLayout>
      <PageHeader
        title={`Halo, ${me.nama.split(" ")[0]} 👋`}
        description={`${me.cabang} · Level ${me.level}`}
        actions={
          <Button asChild size="sm">
            <Link to="/jamaah"><UserPlus className="size-4" /> Daftarkan</Link>
          </Button>
        }
      />

      <section className="mb-4 grid grid-cols-2 gap-2">
        <StatCard label="Total Referral" value={me.referral} icon={Users} hint={`Target ${target}`} />
        <StatCard label="Komisi" value={formatRupiah(me.komisi)} icon={Wallet} tone="success" />
      </section>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Progres Level</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end justify-between text-xs"><span className="text-muted-foreground">{me.referral} / {target}</span><span className="font-display text-primary">{targetPct}%</span></div>
          <Progress value={targetPct} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="card-elevated mb-4 bg-gradient-to-r from-gold-soft to-card">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Gift className="size-4 text-gold-foreground" /> Bonus Bulan Ini</CardTitle></CardHeader>
        <CardContent>
          <p className="font-display text-2xl text-gold-foreground">{formatRupiah(Math.round(me.komisi * 0.15))}</p>
          <p className="text-xs text-muted-foreground">Insentif closing paket Premium</p>
        </CardContent>
      </Card>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Komisi 6 Bulan</CardTitle></CardHeader>
        <CardContent className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={komisiBulanan}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="bulan" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1_000_000}jt`} />
              <Tooltip formatter={(v: number) => formatRupiah(v)} />
              <Bar isAnimationActive={false} dataKey="komisi" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><LinkIcon className="size-4" /> Link Referral</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Input readOnly value={referralLink} className="font-mono text-xs" />
            <Button size="icon" variant="outline" aria-label="Salin"><Copy className="size-4" /></Button>
          </div>
          <Button className="w-full" size="sm"><Share2 className="size-4" /> Bagikan via WA</Button>
        </CardContent>
      </Card>

      <Card className="card-elevated mb-4">
        <CardHeader className="pb-2 flex items-center justify-between"><CardTitle className="text-sm">Jamaah Saya</CardTitle><Button variant="ghost" size="sm" asChild><Link to="/jamaah">Semua</Link></Button></CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Komisi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralJamaah.map((j, i) => (
                <TableRow key={j.id}>
                  <TableCell className="text-sm">{j.nama}</TableCell>
                  <TableCell><StatusBadge status={j.status} /></TableCell>
                  <TableCell className="text-right text-sm">{formatRupiah(500_000 + i * 100_000)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Trophy className="size-4 text-gold-foreground" /> Peringkat Agen</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {AGEN.slice(0, 5).map((a, i) => (
            <div key={a.id} className={`flex items-center justify-between rounded-lg border p-2.5 text-sm ${a.id === me.id ? "border-primary bg-primary-soft" : ""}`}>
              <div className="flex items-center gap-2">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i < 3 ? "bg-gold text-gold-foreground" : "bg-muted"}`}>{i + 1}</span>
                <span className="truncate">{a.nama}{a.id === me.id ? " (Anda)" : ""}</span>
              </div>
              <span className="font-semibold">{a.referral}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Nav */}
      <BottomNav />
    </MobileLayout>
  );
}
