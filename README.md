<div align="center">

# S-One Gym — Full-Stack Gym Management Platform

Aplikasi web full-stack untuk gym fiktif di Bukittinggi: situs publik, akun member, dan panel admin CMS — dibangun dari nol dengan Next.js 15, Prisma, dan PostgreSQL. Bukan sekadar UI mock-up — setiap alur (registrasi, pembayaran, booking, ulasan, notifikasi) benar-benar tersambung ke database.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?logo=supabase&logoColor=white)
![NextAuth](https://img.shields.io/badge/Auth-NextAuth_v5-purple)

</div>

![Homepage](docs/screenshots/home.jpg)

## Overview

S-One Gym adalah aplikasi manajemen gym full-stack yang mencakup tiga sisi sekaligus:

- **Situs publik** — landing page, katalog kelas, jadwal mingguan, profil coach, paket membership, toko produk, dan blog/news, dengan SEO lengkap (sitemap, robots.txt, JSON-LD, metadata per halaman).
- **Area member** — registrasi & login sungguhan (Credentials + Google OAuth), verifikasi email lewat kode OTP, dashboard dengan kartu member QR/barcode, dan alur pembelian nyata: beli produk, booking kelas, booking personal trainer, langganan membership — semuanya menulis baris asli ke database, bukan simulasi tampilan.
- **Panel admin (CMS)** — dilindungi role-based access control di level middleware **dan** server action, dipakai untuk mengelola seluruh konten publik langsung dari browser.

Setelah alur inti berjalan, ditambahkan sistem **ulasan** (produk, kelas, paket PT) yang otomatis memicu rating produk & testimoni homepage yang riil, serta sistem **notifikasi** nyata yang dipicu oleh event asli (booking, pembayaran, dsb).

Project ini sengaja dibangun bertahap — dari static mock UI, ke aplikasi full-stack yang benar-benar tersambung ke database, sampai ke audit keamanan produksi — termasuk menemukan dan memperbaiki cukup banyak bug non-trivial di sepanjang jalan.

## Fitur Utama

### Publik
- Homepage dengan section dinamis (kelas unggulan, coach unggulan, artikel terbaru, **testimoni asli** dari ulasan member) yang otomatis menyesuaikan jumlah data
- Katalog kelas dengan filter level, jadwal mingguan dengan filter hari + tipe kelas
- Direktori coach & alur booking Personal Trainer
- Paket membership dengan tabel perbandingan fitur
- Toko produk dengan keranjang belanja, rating produk **dihitung otomatis** dari ulasan pembeli (bukan input manual admin)
- Blog/News dengan halaman detail artikel
- SEO teknikal: `sitemap.xml` & `robots.txt` dinamis, JSON-LD (`ExerciseGym`, `Article`), metadata + canonical URL per halaman

### Autentikasi & Member
- **NextAuth v5**: login Credentials (`bcrypt-ts`) + **Google OAuth**
- **Verifikasi email lewat kode OTP** (6 digit, dikirim via Gmail SMTP/Nodemailer) — akun belum terverifikasi tidak bisa checkout, booking kelas, atau booking PT sampai kode dimasukkan
- Middleware + server-side guard (`requireVerifiedUser`) sebagai dua lapis proteksi rute
- Dashboard member: kartu QR/barcode entry asli, status membership aktif, statistik nyata (kelas dihadiri, sisa hari, kelas mendatang), riwayat transaksi gabungan (produk + kelas + PT)
- Halaman Settings: ubah profil & password (dengan verifikasi password lama), hapus akun (cascade aman)

### Transaksi Nyata
- **Checkout produk** → menulis `Order` + `OrderItem` + `Payment` asli, lalu langsung memicu prompt beri ulasan produk
- **Booking kelas** → menulis `ClassRegistration` terhadap sesi yang benar-benar ada di jadwal; setelah jam kelas lewat, sistem otomatis menandai "sudah dihadiri" dan memunculkan prompt ulasan di dashboard
- **Booking Personal Trainer** → menulis `PTBooking` asli, langsung memicu prompt ulasan trainer
- **Langganan membership** → menulis `GymMembership` + menerbitkan `MemberCard` (QR code) asli
- 5 metode pembayaran simulasi (QRIS, e-wallet, virtual account, kartu, retail) — UI lengkap, siap diganti Midtrans Snap.js kapan pun

### Ulasan & Notifikasi
- Satu model `Review` menangani tiga jenis target (produk, sesi kelas, paket PT) dengan constraint database yang memastikan tepat satu target terisi per ulasan
- Rating produk & testimoni homepage dihitung otomatis dari ulasan asli — bukan angka yang diketik manual
- Notifikasi asli (bukan data dummy) untuk konfirmasi booking, pembayaran berhasil, paket PT aktif, dan pengingat beri ulasan — muncul konsisten di dropdown header maupun halaman `/notifications`

### Admin CMS
- Login admin dengan role terpisah (`ADMIN` vs `USER`), dijaga di middleware **dan** setiap server action
- CRUD penuh untuk **Products**, **Classes**, **Coaches**, **Membership Plans**, dan **Blog Posts** lewat **Next.js Server Actions**
- Rating produk bersifat read-only di form admin (dihitung otomatis dari ulasan pelanggan)

### Keamanan
- **Row Level Security (RLS) aktif di seluruh tabel** — ditemukan lewat audit Supabase Security Advisor bahwa API publik (`/rest/v1/...`) sempat bisa diakses siapa saja dengan anon key, termasuk tabel `User` (password hash) dan `Account` (OAuth token). Sudah diperbaiki tanpa mengubah kode aplikasi sama sekali (Prisma tetap jalan sebagai table owner, RLS hanya menutup akses publik).

## Screenshot

| Homepage | Dashboard Member |
|---|---|
| ![Homepage](docs/screenshots/home.jpg) | ![Dashboard](docs/screenshots/dashboard.jpg) |

| Panel Admin | Shop |
|---|---|
| ![Admin Panel](docs/screenshots/admin-products.jpg) | ![Shop](docs/screenshots/shop.jpg) |

| Membership | Coaches |
|---|---|
| ![Membership](docs/screenshots/membership.jpg) | ![Coaches](docs/screenshots/coaches.jpg) |

| Schedule |
|---|
| ![Schedule](docs/screenshots/schedule.jpg) |

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack, Server Components + Server Actions) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4, custom design system (glass morphism + neon accent) |
| Database | PostgreSQL ([Supabase](https://supabase.com)), Row Level Security aktif |
| ORM | [Prisma](https://www.prisma.io) |
| Autentikasi | [NextAuth v5](https://authjs.dev) — Credentials (`bcrypt-ts`) + Google OAuth |
| Email | [Nodemailer](https://nodemailer.com) (Gmail SMTP) untuk kode OTP verifikasi |
| Validasi | [Zod](https://zod.dev) |
| Komponen UI | Radix UI primitives, `lucide-react`, `class-variance-authority` |

## Arsitektur

Struktur folder mengikuti pola **Atomic Design**:

```
src/
├── app/                # Routes (App Router) — public pages, /admin, /api
│   ├── verify-email/   # Alur verifikasi OTP
│   ├── notifications/  # Notifikasi real-time (server actions)
│   └── reviews/        # Server actions untuk submit ulasan (produk/kelas/PT)
├── components/
│   ├── atoms/          # Elemen terkecil (button, input, icon visual)
│   ├── molecules/      # Gabungan atom (card, form field, star rating input)
│   ├── organisms/      # Bagian halaman lengkap (header, section, review prompt)
│   ├── templates/      # Layout pembungkus halaman
│   └── ui/             # Base UI primitives (input, select, textarea, label)
├── context/             # React Context (Cart, Auth)
├── lib/                 # Prisma client, auth config, guards, serializer, mailer, OTP
└── generated/prisma/    # Prisma Client hasil generate (gitignored)
prisma/
├── schema.prisma        # Skema database
├── seed.ts              # Seed data awal
└── migrations/          # Riwayat migrasi
```

**Kenapa Server Actions untuk mutasi, tapi REST API untuk data publik?**
Endpoint publik (`/api/products`, `/api/coaches`, dst.) tetap REST API karena dikonsumsi client component yang butuh fetch di browser. Mutasi (checkout, booking, ulasan, admin CRUD) pakai Server Actions karena validasi & pengecekan role/verifikasi tetap jalan di server tanpa round-trip fetch manual.

## Menjalankan Secara Lokal

### 1. Clone & install

```bash
git clone https://github.com/RizqGyx/ecommerce-auth.git
cd ecommerce-auth
npm install
```

### 2. Environment variables

Salin `.env.example` menjadi `.env.local`, lalu isi:

```env
AUTH_SECRET=                    # generate dengan: openssl rand -base64 32
DATABASE_URL=                   # connection string PostgreSQL (pooler)
DIRECT_URL=                     # connection string PostgreSQL (direct, untuk migrasi)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Google OAuth — buat di console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Gmail SMTP untuk kirim kode OTP — pakai Google App Password, bukan password akun biasa
GMAIL_USER=
GMAIL_APP_PASSWORD=

NEXT_PUBLIC_SITE_URL=            # untuk sitemap & canonical URL, boleh http://localhost:3000
```

### 3. Setup database

```bash
npm run prisma:generate   # generate Prisma Client
npm run prisma:migrate    # jalankan migrasi (termasuk enable RLS)
npm run prisma:seed       # isi data awal (produk, kelas, coach, dll)
```

Seed script otomatis membuat 1 akun admin (sudah terverifikasi email) untuk login ke panel admin:

```
Email    : admin@s-onegym.id
Password : admin123
```

### 4. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Panel admin ada di `/admin` (login dengan akun admin di atas).
