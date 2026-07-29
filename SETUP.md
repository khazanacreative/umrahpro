# Cara Mengakses Aplikasi UmrahPro

## Prerequisites

Pastikan Anda sudah menginstall:
- Node.js (v18 atau lebih baru)
- npm atau yarn

## Langkah 1: Install Dependencies

```bash
npm install
```

## Langkah 2: Jalankan Aplikasi

Ada 3 platform yang bisa dijalankan secara bersamaan:

### Platform 1: Internal Management (Desktop)
```bash
npm run dev:admin
```
Akses di: http://localhost:5173

### Platform 2: Agen & Marketing (Mobile First)
```bash
npm run dev:agen
```
Akses di: http://localhost:5174

### Platform 3: Jamaah & Tim Lapangan (Mobile First)
```bash
npm run dev:jamaah
```
Akses di: http://localhost:5175

## Menjalankan Semua Platform Sekaligus

Buka 3 terminal berbeda dan jalankan masing-masing platform:

**Terminal 1:**
```bash
npm run dev:admin
```

**Terminal 2:**
```bash
npm run dev:agen
```

**Terminal 3:**
```bash
npm run dev:jamaah
```

## Production Deployment

Untuk deployment ke production dengan subdomain:

### 1. Build semua aplikasi
```bash
npm run build
```

### 2. Konfigurasi DNS
Buat subdomain di DNS provider Anda:
- `admin.umrahpro.com` → IP server
- `agen.umrahpro.com` → IP server
- `jamaah.umrahpro.com` → IP server

### 3. Konfigurasi Reverse Proxy (Nginx)

Contoh konfigurasi Nginx:

```nginx
# Internal Management
server {
    listen 80;
    server_name admin.umrahpro.com;
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Agen & Marketing
server {
    listen 80;
    server_name agen.umrahpro.com;
    
    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Jamaah & Tim Lapangan
server {
    listen 80;
    server_name jamaah.umrahpro.com;
    
    location / {
        proxy_pass http://localhost:5175;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Setup SSL dengan Let's Encrypt

```bash
# Install certbot
sudo apt install certbot

# Generate SSL certificates
sudo certbot --nginx -d admin.umrahpro.com
sudo certbot --nginx -d agen.umrahpro.com
sudo certbot --nginx -d jamaah.umrahpro.com
```

## Troubleshooting

### Port sudah digunakan
Jika port 5173, 5174, atau 5175 sudah digunakan, Anda bisa mengubah port di file `vite.config.ts` masing-masing platform.

### Module not found
Pastikan semua dependencies sudah terinstall:
```bash
npm install
```

### Build errors
Pastikan Node.js versi Anda sesuai (v18+).

## Catatan Penting

- Setiap platform berjalan secara independen
- Shared package (`packages/shared`) berisi kode yang digunakan bersama seperti types, utilities, dan components
- Role-based access akan dikonfigurasi di masing-masing platform
- Untuk development, setiap platform bisa dijalankan di port yang berbeda