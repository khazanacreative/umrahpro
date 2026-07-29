/** Data contoh deterministik untuk UmrahPro (belum terhubung database). */

let seed = 20260727;
function rnd() {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}
function int(min: number, max: number) {
  return Math.floor(rnd() * (max - min + 1)) + min;
}

export const STATUS_JAMAAH = [
  "Inquiry",
  "Terdaftar",
  "Dokumen Lengkap",
  "Pembayaran",
  "Proses Visa",
  "Tiket Terbit",
  "Keberangkatan",
  "Di Saudi",
  "Selesai",
] as const;
export type StatusJamaah = (typeof STATUS_JAMAAH)[number];

export const KATEGORI_PAKET = [
  "Ekonomi",
  "Reguler",
  "Premium",
  "VIP",
  "Ramadhan",
  "Itikaf",
  "Plus Turki",
  "Plus Dubai",
  "Plus Aqsa",
] as const;

const NAMA_DEPAN = [
  "Ahmad","Siti","Muhammad","Fatimah","Abdul","Nurul","Hasan","Aisyah","Umar","Khadijah",
  "Ridwan","Maryam","Yusuf","Zahra","Ibrahim","Halimah","Bilal","Salma","Hamzah","Rahma",
];
const NAMA_BELAKANG = [
  "Setiawan","Nurhayati","Rahman","Wijaya","Hidayat","Kusuma","Maulana","Pratama","Anggraini","Saputra",
  "Ramadhan","Lestari","Firdaus","Syahputra","Handayani","Nugroho","Safitri","Alfarizi","Putri","Hakim",
];
const KOTA = [
  "Jakarta","Bandung","Surabaya","Medan","Makassar","Yogyakarta","Semarang","Palembang","Bekasi","Malang",
];

export type Jamaah = {
  id: string;
  nama: string;
  jenisKelamin: "L" | "P";
  usia: number;
  kota: string;
  telepon: string;
  email: string;
  noPaspor: string;
  nik: string;
  paket: string;
  status: StatusJamaah;
  statusVisa: "Belum Diajukan" | "Diproses" | "Disetujui" | "Ditolak" | "Terbit";
  paspor: "Belum Diterima" | "Diterima" | "Dikembalikan";
  totalTagihan: number;
  terbayar: number;
  mahram: string;
  kamar: "Quad" | "Triple" | "Double";
  kursiRoda: boolean;
  catatanMedis: string;
  vaksin: "Lengkap" | "Sebagian" | "Belum";
  agen: string;
  tglDaftar: string;
};

export type Paket = {
  id: string;
  nama: string;
  kategori: string;
  durasi: number;
  maskapai: string;
  hotelMakkah: string;
  hotelMadinah: string;
  bintang: number;
  harga: number;
  promo?: number;
  kuota: number;
  terisi: number;
  berangkat: string;
  kembali: string;
  deskripsi: string;
  fasilitas: string[];
  tidakTermasuk: string[];
};

const MASKAPAI = ["Garuda Indonesia", "Saudia", "Emirates", "Qatar Airways", "Etihad", "Lion Air"];
const HOTEL_MAKKAH = ["Swissotel Al Maqam", "Pullman ZamZam", "Hilton Suites", "Dar Al Tawhid", "Elaf Kinda"];
const HOTEL_MADINAH = ["Anwar Al Madinah Movenpick", "Frontel Al Harithia", "Dar Al Taqwa", "Shaza Al Madina", "Al Eiman Royal"];

export const PAKET: Paket[] = Array.from({ length: 15 }, (_, i) => {
  const kategori = KATEGORI_PAKET[i % KATEGORI_PAKET.length];
  const durasi = pick([9, 12, 14, 16]);
  const harga = int(24, 62) * 1_000_000;
  const kuota = int(40, 180);
  return {
    id: `PKG-${String(i + 1).padStart(3, "0")}`,
    nama: `Umroh ${kategori} ${durasi} Hari`,
    kategori,
    durasi,
    maskapai: pick(MASKAPAI),
    hotelMakkah: pick(HOTEL_MAKKAH),
    hotelMadinah: pick(HOTEL_MADINAH),
    bintang: int(3, 5),
    harga,
    promo: i % 3 === 0 ? harga - 2_500_000 : undefined,
    kuota,
    terisi: int(10, kuota),
    berangkat: `2026-${String(int(8, 12)).padStart(2, "0")}-${String(int(1, 28)).padStart(2, "0")}`,
    kembali: `2026-${String(int(8, 12)).padStart(2, "0")}-${String(int(1, 28)).padStart(2, "0")}`,
    deskripsi:
      "Paket umroh dengan bimbingan ibadah intensif, hotel dekat Masjidil Haram, dan pendampingan muthawif berpengalaman selama perjalanan.",
    fasilitas: [
      "Tiket pesawat PP",
      "Visa umroh",
      "Hotel bintang " + int(3, 5),
      "Makan 3x sehari",
      "Bus AC full trip",
      "Muthawif berbahasa Indonesia",
      "Perlengkapan umroh",
      "Air zamzam 5 liter",
    ],
    tidakTermasuk: ["Paspor", "Vaksin meningitis", "Pengeluaran pribadi", "Kelebihan bagasi"],
  };
});

export const AGEN = Array.from({ length: 20 }, (_, i) => {
  const nama = `${pick(NAMA_DEPAN)} ${pick(NAMA_BELAKANG)}`;
  const referral = int(3, 48);
  return {
    id: `AGN-${String(i + 1).padStart(3, "0")}`,
    nama,
    cabang: pick(["Pusat Jakarta", "Cabang Bandung", "Cabang Surabaya", "Cabang Medan", "Cabang Makassar"]),
    telepon: `0812${int(1000000, 9999999)}`,
    referral,
    komisi: referral * int(500, 1500) * 1000,
    komisiTertunda: int(1, 12) * 500_000,
    level: pick(["Bronze", "Silver", "Gold", "Platinum"]),
  };
}).sort((a, b) => b.komisi - a.komisi);

export const JAMAAH: Jamaah[] = Array.from({ length: 100 }, (_, i) => {
  const jk = rnd() > 0.45 ? "P" : "L";
  const paket = pick(PAKET);
  const total = paket.promo ?? paket.harga;
  const terbayar = pick([total, total, Math.round(total * 0.5), Math.round(total * 0.25), 5_000_000]);
  return {
    id: `JMH-${String(i + 1).padStart(4, "0")}`,
    nama: `${pick(NAMA_DEPAN)} ${pick(NAMA_BELAKANG)}`,
    jenisKelamin: jk as "L" | "P",
    usia: int(19, 72),
    kota: pick(KOTA),
    telepon: `0813${int(1000000, 9999999)}`,
    email: `jamaah${i + 1}@email.com`,
    noPaspor: `C${int(1000000, 9999999)}`,
    nik: `32${int(10000000000000, 99999999999999)}`,
    paket: paket.nama,
    status: pick(STATUS_JAMAAH as unknown as StatusJamaah[]),
    statusVisa: pick(["Belum Diajukan", "Diproses", "Disetujui", "Ditolak", "Terbit"]) as Jamaah["statusVisa"],
    paspor: pick(["Belum Diterima", "Diterima", "Dikembalikan"]) as Jamaah["paspor"],
    totalTagihan: total,
    terbayar,
    mahram: jk === "P" ? `${pick(NAMA_DEPAN)} ${pick(NAMA_BELAKANG)} (Suami)` : "-",
    kamar: pick(["Quad", "Triple", "Double"]) as Jamaah["kamar"],
    kursiRoda: rnd() > 0.92,
    catatanMedis: pick(["Tidak ada", "Hipertensi", "Diabetes", "Asma", "Tidak ada", "Tidak ada"]),
    vaksin: pick(["Lengkap", "Lengkap", "Sebagian", "Belum"]) as Jamaah["vaksin"],
    agen: pick(AGEN).nama,
    tglDaftar: `2026-${String(int(1, 7)).padStart(2, "0")}-${String(int(1, 28)).padStart(2, "0")}`,
  };
});

export const HOTEL = [
  ...HOTEL_MAKKAH.map((n) => ({ nama: n, kota: "Makkah", jarak: `${int(50, 800)} m`, bintang: int(4, 5), kamar: int(20, 90) })),
  ...HOTEL_MADINAH.map((n) => ({ nama: n, kota: "Madinah", jarak: `${int(80, 600)} m`, bintang: int(4, 5), kamar: int(20, 90) })),
];

export const PENERBANGAN = Array.from({ length: 8 }, (_, i) => ({
  id: `FL-${100 + i}`,
  maskapai: pick(MASKAPAI),
  nomor: `${pick(["GA", "SV", "EK", "QR"])}${int(100, 999)}`,
  dari: pick(["CGK", "SUB", "KNO", "UPG"]),
  ke: pick(["JED", "MED"]),
  transit: pick(["Langsung", "Dubai", "Doha", "Kuala Lumpur"]),
  tanggal: `2026-${String(int(8, 12)).padStart(2, "0")}-${String(int(1, 28)).padStart(2, "0")}`,
  jam: `${String(int(0, 23)).padStart(2, "0")}:${pick(["00", "15", "30", "45"])}`,
  kursi: int(40, 200),
}));

export const PEMBAYARAN = Array.from({ length: 24 }, (_, i) => {
  const j = JAMAAH[i * 3];
  return {
    id: `INV-2026${String(1000 + i)}`,
    jamaah: j.nama,
    paket: j.paket,
    metode: pick(["Transfer Bank", "Virtual Account", "QRIS", "Tunai"]),
    jumlah: pick([5_000_000, 10_000_000, 15_000_000, 25_000_000]),
    status: pick(["Lunas", "Cicilan", "Menunggu", "Jatuh Tempo"]),
    tanggal: `2026-0${int(1, 7)}-${String(int(1, 28)).padStart(2, "0")}`,
  };
});

export const BOOKING = Array.from({ length: 18 }, (_, i) => {
  const j = JAMAAH[i * 5];
  return {
    id: `BK-2026${String(500 + i)}`,
    jamaah: j.nama,
    paket: j.paket,
    kursi: int(1, 4),
    status: pick(["Terkonfirmasi", "Menunggu Pembayaran", "Waiting List", "Dibatalkan"]),
    nilai: j.totalTagihan,
    tanggal: j.tglDaftar,
  };
});

export const PENGUMUMAN = [
  { judul: "Jadwal Manasik Akbar Angkatan Agustus", kategori: "Agensi", tanggal: "2026-07-20", isi: "Manasik akbar dilaksanakan di Aula Pusat, pukul 08.00 WIB. Wajib hadir bagi seluruh jamaah keberangkatan Agustus." },
  { judul: "Perubahan Jadwal Penerbangan SV817", kategori: "Penerbangan", tanggal: "2026-07-22", isi: "Penerbangan dimajukan 2 jam. Kumpul di bandara pukul 19.00 WIB." },
  { judul: "Promo Umroh Ramadhan 1448H", kategori: "Promo", tanggal: "2026-07-24", isi: "Diskon Rp 3.000.000 untuk 50 pendaftar pertama paket Ramadhan." },
  { judul: "Pengingat Kelengkapan Dokumen", kategori: "Darurat", tanggal: "2026-07-26", isi: "Jamaah yang belum menyerahkan paspor harap segera menghubungi staf operasional." },
];

export const AKTIVITAS = [
  { waktu: "10 menit lalu", teks: "Visa 12 jamaah paket Premium 12 Hari telah terbit" },
  { waktu: "45 menit lalu", teks: "Pembayaran Rp 25.000.000 diterima dari Siti Nurhayati" },
  { waktu: "2 jam lalu", teks: "Agen Ridwan Hidayat mendaftarkan 3 jamaah baru" },
  { waktu: "5 jam lalu", teks: "Rooming list paket Reguler 9 Hari telah difinalisasi" },
  { waktu: "Kemarin", teks: "Tour Leader mengunggah 24 foto kegiatan di Madinah" },
];

export const ITINERARI = [
  { hari: 1, judul: "Keberangkatan Jakarta - Jeddah", lokasi: "Bandara Soekarno-Hatta", jam: "18.00 WIB", titikKumpul: "Terminal 3 Gate 5", catatan: "Berihram dari asrama, shalat sunnah ihram." },
  { hari: 2, judul: "Tiba di Jeddah & Umroh Pertama", lokasi: "Masjidil Haram, Makkah", jam: "14.00 KSA", titikKumpul: "Lobby Hotel", catatan: "Tawaf, Sai, lalu Tahallul." },
  { hari: 3, judul: "Ziarah Kota Makkah", lokasi: "Jabal Nur, Jabal Tsur, Arafah", jam: "08.00 KSA", titikKumpul: "Lobby Hotel", catatan: "Bawa air minum dan payung." },
  { hari: 4, judul: "Umroh Kedua (Miqat Ji'ranah)", lokasi: "Ji'ranah", jam: "21.00 KSA", titikKumpul: "Depan Hotel", catatan: "Berihram di hotel." },
  { hari: 5, judul: "Perjalanan ke Madinah", lokasi: "Madinah", jam: "07.00 KSA", titikKumpul: "Lobby Hotel", catatan: "Perjalanan bus ±6 jam." },
  { hari: 6, judul: "Raudhah & Ziarah Madinah", lokasi: "Masjid Nabawi", jam: "05.00 KSA", titikKumpul: "Pintu 21", catatan: "Bawa kartu tasreh Raudhah." },
];

export const LEADS = [
  { nama: "Budi Santoso", sumber: "Instagram Ads", tahap: "Lead Baru", nilai: 32_000_000 },
  { nama: "Rina Marlina", sumber: "Referral Agen", tahap: "Dihubungi", nilai: 28_000_000 },
  { nama: "Hendra Gunawan", sumber: "WhatsApp", tahap: "Tertarik", nilai: 45_000_000 },
  { nama: "Dewi Anggraini", sumber: "Pameran", tahap: "Penawaran Dikirim", nilai: 62_000_000 },
  { nama: "Tono Wijaya", sumber: "Google Ads", tahap: "Negosiasi", nilai: 38_000_000 },
  { nama: "Sri Wahyuni", sumber: "Website", tahap: "Terdaftar", nilai: 30_000_000 },
  { nama: "Agus Salim", sumber: "Facebook", tahap: "Hilang", nilai: 26_000_000 },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const formatAngka = (n: number) => new Intl.NumberFormat("id-ID").format(n);

export const statistik = {
  totalJamaah: JAMAAH.length,
  paketAktif: PAKET.length,
  keberangkatanMendatang: 6,
  diSaudi: JAMAAH.filter((j) => j.status === "Di Saudi").length,
  selesai: JAMAAH.filter((j) => j.status === "Selesai").length,
  pendapatan: JAMAAH.reduce((a, j) => a + j.terbayar, 0),
  tunggakan: JAMAAH.reduce((a, j) => a + (j.totalTagihan - j.terbayar), 0),
  visaTerbit: JAMAAH.filter((j) => j.statusVisa === "Terbit").length,
  visaDiproses: JAMAAH.filter((j) => j.statusVisa === "Diproses").length,
  visaDitolak: JAMAAH.filter((j) => j.statusVisa === "Ditolak").length,
  pasporDiterima: JAMAAH.filter((j) => j.paspor === "Diterima").length,
};

export const CHART_PENDAFTARAN = [
  { bulan: "Jan", jamaah: 42 },
  { bulan: "Feb", jamaah: 55 },
  { bulan: "Mar", jamaah: 88 },
  { bulan: "Apr", jamaah: 64 },
  { bulan: "Mei", jamaah: 73 },
  { bulan: "Jun", jamaah: 91 },
  { bulan: "Jul", jamaah: 104 },
];

export const CHART_PENDAPATAN = CHART_PENDAFTARAN.map((d, i) => ({
  bulan: d.bulan,
  pendapatan: (d.jamaah * 28 + i * 40) * 1_000_000,
}));

export const CHART_PAKET = KATEGORI_PAKET.slice(0, 6).map((k, i) => ({
  kategori: k,
  jumlah: 30 - i * 3 + (i % 2) * 6,
}));

export const CHART_DEMOGRAFI = [
  { nama: "18-30", value: 14 },
  { nama: "31-45", value: 31 },
  { nama: "46-60", value: 38 },
  { nama: "60+", value: 17 },
];
