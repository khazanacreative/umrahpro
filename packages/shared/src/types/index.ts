export type Role =
  | "super_admin"
  | "direktur"
  | "operasional"
  | "keuangan"
  | "marketing"
  | "manajer_marketing"
  | "agen"
  | "tour_leader"
  | "guide"
  | "jamaah";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  direktur: "Direktur",
  operasional: "Staf Operasional",
  keuangan: "Keuangan",
  marketing: "Marketing",
  manajer_marketing: "Manajer Marketing",
  agen: "Agen",
  tour_leader: "Tour Leader (Muthawif)",
  guide: "Pembimbing Ibadah",
  jamaah: "Jamaah",
};

export const ROLE_GROUPS: Record<Role, string[] | "*"> = {
  super_admin: "*",
  direktur: "*",
  operasional: ["Utama", "Jamaah", "Operasional", "Layanan Jamaah", "Sistem"],
  keuangan: ["Utama", "Keuangan", "Jamaah", "Sistem"],
  marketing: ["Utama", "Penjualan", "Layanan Jamaah", "Sistem"],
  manajer_marketing: ["Utama", "Penjualan", "Layanan Jamaah", "Sistem"],
  agen: ["Utama", "Penjualan", "Jamaah"],
  tour_leader: ["Utama", "Jamaah", "Operasional", "Layanan Jamaah", "Pasca Umroh", "Sistem"],
  guide: ["Utama", "Layanan Jamaah"],
  jamaah: ["Layanan Jamaah", "Pasca Umroh"],
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["Akses penuh seluruh modul", "Kelola pengguna & hak akses", "Backup & restore"],
  direktur: ["Lihat seluruh laporan", "Persetujuan target & komisi", "Dashboard eksekutif"],
  operasional: ["Kelola jamaah, visa, hotel, penerbangan", "Checklist keberangkatan"],
  keuangan: ["Pembayaran, invoice, pengeluaran", "Laporan keuangan & komisi"],
  marketing: ["CRM lead & kampanye", "Paket promo & pengumuman"],
  manajer_marketing: ["Kelola agen & marketing", "Target & komisi", "Laporan performa"],
  agen: ["Daftarkan jamaah", "Lihat komisi & referral", "Share paket"],
  tour_leader: [
    "Absensi & monitoring jamaah rombongan",
    "Akses data jamaah, hotel, penerbangan, transportasi",
    "Itinerari, panduan ibadah, pengumuman & galeri",
    "Laporan insiden, feedback, dan sertifikat jamaah",
  ],
  guide: ["Panduan ibadah", "Itinerari harian"],
  jamaah: ["Portal jamaah", "Dokumen & pembayaran pribadi", "Itinerari & panduan"],
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}