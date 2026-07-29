import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wallet,
  Plane,
  Hotel,
  Bus,
  ClipboardCheck,
  UserCog,
  Building2,
  BadgePercent,
  FileText,
  Stamp,
  BookOpen,
  CalendarDays,
  Megaphone,
  Headphones,
  Images,
  Star,
  Award,
  Gift,
  BarChart3,
  Settings,
  ShieldCheck,
  Smartphone,
  Receipt,
  TrendingDown,
  Target,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; url: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Utama",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Penjualan",
    items: [
      { title: "CRM Marketing", url: "/crm", icon: Target },
      { title: "Agen", url: "/agen", icon: UserCog },
      { title: "Agensi & Cabang", url: "/agensi", icon: Building2 },
      { title: "Booking", url: "/booking", icon: ShoppingCart },
    ],
  },
  {
    label: "Jamaah",
    items: [
      { title: "Data Jamaah", url: "/jamaah", icon: Users },
      { title: "Paket Umroh", url: "/paket", icon: Package },
      { title: "Paspor & Visa", url: "/visa", icon: Stamp },
      { title: "Dokumen", url: "/dokumen", icon: FileText },
    ],
  },
  {
    label: "Operasional",
    items: [
      { title: "Penerbangan", url: "/penerbangan", icon: Plane },
      { title: "Hotel", url: "/hotel", icon: Hotel },
      { title: "Transportasi", url: "/transportasi", icon: Bus },
      { title: "Keberangkatan", url: "/keberangkatan", icon: ClipboardCheck },
      { title: "Tour Leader", url: "/tour-leader", icon: Smartphone },
    ],
  },
  {
    label: "Keuangan",
    items: [
      { title: "Pembayaran", url: "/pembayaran", icon: Wallet },
      { title: "Pengeluaran", url: "/pengeluaran", icon: TrendingDown },
      { title: "Komisi", url: "/komisi", icon: BadgePercent },
      { title: "Laporan Keuangan", url: "/laporan-keuangan", icon: Receipt },
    ],
  },
  {
    label: "Layanan Jamaah",
    items: [
      { title: "Portal Jamaah", url: "/portal-jamaah", icon: Smartphone },
      { title: "Panduan Digital", url: "/panduan", icon: BookOpen },
      { title: "Itinerari Harian", url: "/itinerari", icon: CalendarDays },
      { title: "Pengumuman", url: "/pengumuman", icon: Megaphone },
      { title: "Customer Service", url: "/cs", icon: Headphones },
      { title: "Galeri Media", url: "/galeri", icon: Images },
    ],
  },
  {
    label: "Pasca Umroh",
    items: [
      { title: "Feedback & Survei", url: "/feedback", icon: Star },
      { title: "Sertifikat", url: "/sertifikat", icon: Award },
      { title: "Loyalitas & Referral", url: "/loyalitas", icon: Gift },
    ],
  },
  {
    label: "Sistem",
    items: [
      { title: "Laporan", url: "/laporan", icon: BarChart3 },
      { title: "Pengaturan", url: "/pengaturan", icon: Settings },
      { title: "Hak Akses Peran", url: "/hak-akses", icon: ShieldCheck },
    ],
  },
];
