import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AGEN, formatRupiah } from "@/data/mock";

export const Route = createFileRoute("/agen")({
  head: () => ({
    meta: [
      { title: "Manajemen Agen — UmrahPro" },
      { name: "description", content: "Kelola agen, referral, komisi, dan leaderboard penjualan." },
      { property: "og:title", content: "Manajemen Agen — UmrahPro" },
      { property: "og:description", content: "Referral, komisi, dan performa agen umroh." },
    ],
  }),
  component: AgenPage,
});

function AgenPage() {
  const totalKomisi = AGEN.reduce((a, x) => a + x.komisi, 0);
  const totalReferral = AGEN.reduce((a, x) => a + x.referral, 0);
  const tertunda = AGEN.reduce((a, x) => a + x.komisiTertunda, 0);

  return (
    <AppShell>
      <PageHeader title="Manajemen Agen" description={`${AGEN.length} agen aktif`} />
      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Agen" value={AGEN.length} icon={UserCog} />
        <StatCard label="Total Referral" value={totalReferral} icon={UserCog} tone="gold" />
        <StatCard label="Komisi Dibayar" value={formatRupiah(totalKomisi)} icon={UserCog} tone="success" />
        <StatCard label="Komisi Tertunda" value={formatRupiah(tertunda)} icon={UserCog} tone="warning" />
      </section>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-base">Leaderboard Agen</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Cabang</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Referral</TableHead>
                  <TableHead className="text-right">Komisi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGEN.map((a, i) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{i + 1}</TableCell>
                    <TableCell className="font-medium">{a.nama}</TableCell>
                    <TableCell>{a.cabang}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gold-soft text-gold-foreground">
                        {a.level}
                      </Badge>
                    </TableCell>
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
