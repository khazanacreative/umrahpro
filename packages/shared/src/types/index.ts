export type Role =
  | "super_admin"
  | "direktur"
  | "operasional"
  | "keuangan"
  | "marketing"
  | "agen"
  | "tour_leader"
  | "guide"
  | "customer_service"
  | "jamaah";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  direktur: "Direktur",
  operasional: "Staf Operasional",
  keuangan: "Keuangan",
  marketing: "Marketing",
  agen: "Agen",
  tour_leader: "Tour Leader (Muthawif)",
  guide: "Pembimbing Ibadah",
  customer_service: "Customer Service",
  jamaah: "Jamaah",
};

export const ROLE_GROUPS: Record<Role, string[] | "*"> = {
  super_admin: "*",
  direktur: "*",
  operasional: ["Utama", "Jamaah", "Operasional", "Layanan Jamaah", "Sistem"],
  keuangan: ["Utama", "Keuangan", "Jamaah", "Sistem"],
  marketing: ["Utama", "Penjualan", "Layanan Jamaah", "Sistem"],
  agen: ["Utama", "Penjualan", "Jamaah"],
  tour_leader: ["Utama", "Jamaah", "Operasional", "Layanan Jamaah", "Pasca Umroh", "Sistem"],
  guide: ["Utama", "Layanan Jamaah"],
  customer_service: ["Utama", "Layanan Jamaah", "Jamaah"],
  jamaah: ["Layanan Jamaah", "Pasca Umroh"],
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["Akses penuh seluruh modul", "Kelola pengguna & hak akses", "Backup & restore"],
  direktur: ["Lihat seluruh laporan", "Persetujuan target & komisi", "Dashboard eksekutif"],
  operasional: ["Kelola jamaah, visa, hotel, penerbangan", "Checklist keberangkatan"],
  keuangan: ["Pembayaran, invoice, pengeluaran", "Laporan keuangan & komisi"],
  marketing: ["CRM lead & kampanye", "Paket promo & pengumuman"],
  agen: ["Daftarkan jamaah", "Lihat komisi & referral"],
  tour_leader: [
    "Absensi & monitoring jamaah rombongan",
    "Akses data jamaah, hotel, penerbangan, transportasi",
    "Itinerari, panduan ibadah, pengumuman & galeri",
    "Laporan insiden, feedback, dan sertifikat jamaah",
  ],
  guide: ["Panduan ibadah", "Itinerari harian"],
  customer_service: ["Tiket dukungan", "FAQ & knowledge base"],
  jamaah: ["Portal jamaah", "Dokumen & pembayaran pribadi"],
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