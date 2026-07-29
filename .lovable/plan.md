## UmrahPro — Fase 1: Kerangka Aplikasi Lengkap (UI + Data Contoh)

Membangun kerangka penuh sistem manajemen umroh: navigasi 26 modul dalam bahasa Indonesia, desain premium bernuansa Islami (hijau, putih, aksen emas), dengan halaman inti yang sudah fungsional secara tampilan dan sisanya berupa empty state rapi. Semua data berasal dari mock data lokal — belum ada database.

### Desain
- Palet token semantik di `src/styles.css`: hijau zamrud (primary), emas (accent), krem/putih (background), status badge (sukses/menunggu/ditolak).
- Tipografi non-generik (bukan Inter/Poppins), pola geometris Islami halus sebagai ornamen.
- Layout: sidebar collapsible + top bar (pencarian, notifikasi, profil), responsif penuh ke mobile.

### Struktur Navigasi (grup sidebar)
- **Utama**: Dashboard
- **Penjualan**: CRM Marketing, Agen, Agensi & Cabang, Booking
- **Jamaah**: Data Jamaah, Paket Umroh, Paspor & Visa, Dokumen
- **Operasional**: Penerbangan, Hotel, Transportasi, Keberangkatan, Tour Leader
- **Keuangan**: Pembayaran, Pengeluaran, Komisi, Laporan Keuangan
- **Layanan Jamaah**: Portal Jamaah, Panduan Digital, Itinerari Harian, Pengumuman, Customer Service, Galeri
- **Pasca Umroh**: Feedback, Sertifikat, Loyalitas & Referral
- **Sistem**: Laporan, Pengaturan, Hak Akses Peran

### Halaman yang dibangun penuh di fase ini
1. **Dashboard** — 12 kartu KPI (total jamaah, paket aktif, keberangkatan mendatang, jamaah di Saudi, umroh selesai, pendapatan, tunggakan, status visa, paspor, okupansi hotel), grafik (pendaftaran bulanan, pendapatan, popularitas paket, demografi), jadwal penerbangan, aktivitas terkini, kalender mini.
2. **Data Jamaah** — tabel dengan pencarian/filter/status, detail jamaah (profil, dokumen, mahram, medis) + stepper status 9 tahap.
3. **Paket Umroh** — grid kartu paket dengan kategori, kuota, harga/promo, halaman detail.
4. **Booking** — tabel booking, status pembayaran, ringkasan invoice.
5. **Keuangan** — ringkasan cicilan/tunggakan, tabel transaksi, metode pembayaran.
6. **Paspor & Visa** — papan status (kanban) proses visa.
7. **Agen** — leaderboard, komisi, referral.
8. **Panduan Digital** — konten lengkap (ihram, miqat, tawaf, sai, tahallul, adab, darurat) dengan checklist interaktif.
9. **Autentikasi** — halaman login email & password (UI, validasi form; belum terhubung backend), dan pemilih peran demo untuk melihat perbedaan menu antar 10 peran.

Modul lain (transportasi, tour leader, galeri, pasca umroh, dll.) mendapat halaman dengan header, breadcrumb, dan empty state yang dirancang baik agar siap diisi bertahap.

### Data Contoh
Mock data TypeScript: 100 jamaah, 20 agen, 15 paket, hotel Makkah/Madinah, penerbangan, pembayaran, pengumuman, itinerari.

### Catatan Teknis
- Stack tetap TanStack Router (bukan React Router DOM) + TanStack Query, TypeScript, Tailwind v4, shadcn/ui, Recharts.
- Setiap modul = route file terpisah di `src/routes/` dengan `head()` metadata unik.
- RBAC fase ini bersifat tampilan: menu & aksi disaring berdasarkan peran aktif dari state lokal.
- Data disimpan di modul `src/data/*` agar penggantian ke database nanti hanya mengubah lapisan pengambilan data.

### Fase Berikutnya (setelah disetujui)
Aktifkan Lovable Cloud: skema database relasional lengkap dengan audit field, RLS, tabel `user_roles` terpisah, autentikasi nyata, storage dokumen, dan seed data.