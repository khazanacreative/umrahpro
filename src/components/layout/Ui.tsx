import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl leading-tight text-foreground break-words sm:truncate sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2 sm:shrink-0">{actions}</div>}
    </header>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "gold" | "success" | "warning" | "destructive";
}) {
  const tones: Record<string, string> = {
    default: "bg-primary-soft text-primary",
    gold: "bg-gold-soft text-gold-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/12 text-destructive",
  };
  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="flex items-start gap-3 p-4">
        <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tones[tone])}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 font-display text-lg leading-tight text-foreground break-words sm:text-xl">
            {value}
          </p>
          {hint && <p className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="pattern-islamic grid size-16 place-items-center rounded-2xl border">
          <Icon className="size-7 text-primary" />
        </div>
        <h2 className="font-display text-lg">{title}</h2>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

const STATUS_TONE: Record<string, string> = {
  Lunas: "bg-success/15 text-success border-success/30",
  Selesai: "bg-success/15 text-success border-success/30",
  Disetujui: "bg-success/15 text-success border-success/30",
  Terbit: "bg-success/15 text-success border-success/30",
  Terkonfirmasi: "bg-success/15 text-success border-success/30",
  Diterima: "bg-success/15 text-success border-success/30",
  Lengkap: "bg-success/15 text-success border-success/30",
  Diproses: "bg-info/15 text-info border-info/30",
  Cicilan: "bg-info/15 text-info border-info/30",
  "Di Saudi": "bg-info/15 text-info border-info/30",
  Menunggu: "bg-warning/25 text-warning-foreground border-warning/40",
  "Menunggu Pembayaran": "bg-warning/25 text-warning-foreground border-warning/40",
  "Waiting List": "bg-warning/25 text-warning-foreground border-warning/40",
  Sebagian: "bg-warning/25 text-warning-foreground border-warning/40",
  Ditolak: "bg-destructive/12 text-destructive border-destructive/30",
  Dibatalkan: "bg-destructive/12 text-destructive border-destructive/30",
  "Jatuh Tempo": "bg-destructive/12 text-destructive border-destructive/30",
  Belum: "bg-destructive/12 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STATUS_TONE[status] ?? "bg-muted text-muted-foreground")}
    >
      {status}
    </Badge>
  );
}
