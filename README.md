# UmrahPro - Multi-Platform Monorepo

Aplikasi manajemen umrah yang dibagi menjadi 3 platform terpisah dengan subdomain masing-masing.

## Struktur Platform

### 1. Internal Management (Desktop)
- **Subdomain**: `admin.umrahpro.com`
- **Roles**: super_admin, direktur, operasional, keuangan
- **Port**: 5173
- **Fitur**: Dashboard manajemen, laporan, pengaturan, user management

### 2. Agen & Marketing (Mobile First)
- **Subdomain**: `agen.umrahpro.com`
- **Roles**: marketing, agen
- **Port**: 5174
- **Fitur**: CRM, booking, tracking komisi, registrasi jamaah

### 3. Jamaah & Tim Lapangan (Mobile First)
- **Subdomain**: `jamaah.umrahpro.com`
- **Roles**: tour_leader, guide, customer_service, jamaah
- **Port**: 5175
- **Fitur**: Portal jamaah, itinerari, dokumen, feedback

## Struktur Direktori

```
umrahpro/
├── apps/
│   ├── internal-management/     # Platform admin
│   ├── agen-marketing/          # Platform agen & marketing
│   └── jamaah-timlapangan/      # Platform jamaah & tim lapangan
├── packages/
│   └── shared/                  # Shared components, types, utilities
├── package.json                 # Root package.json (monorepo)
└── README.md
```

## Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Jalankan platform Internal Management
npm run dev:admin

# Jalankan platform Agen & Marketing
npm run dev:agen

# Jalankan platform Jamaah & Tim Lapangan
npm run dev:jamaah
```

## Konfigurasi Subdomain

Setiap platform berjalan di port berbeda untuk development:
- Internal Management: http://localhost:5173
- Agen & Marketing: http://localhost:5174
- Jamaah & Tim Lapangan: http://localhost:5175

Untuk production, konfigurasikan subdomain di DNS dan reverse proxy:
- admin.umrahpro.com → Internal Management
- agen.umrahpro.com → Agen & Marketing
- jamaah.umrahpro.com → Jamaah & Tim Lapangan

## Role-Based Access

Setiap platform hanya mengizinkan akses untuk role tertentu:

### Internal Management
- super_admin
- direktur
- operasional
- keuangan

### Agen & Marketing
- marketing
- agen

### Jamaah & Tim Lapangan
- tour_leader
- guide
- customer_service
- jamaah

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- Lucide React Icons