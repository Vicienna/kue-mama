# 🍰 Kue Mama Store - Premium Homemade Bakery

Selamat datang di **Kue Mama Store**! Sebuah platform e-commerce modern yang dirancang khusus untuk membantu Mama mengelola penjualan kue homemade dengan lebih profesional, efisien, dan tentunya *aesthetic*.

## 🌟 Fitur Utama

### 🛍️ Customer Experience
- **Katalog Interaktif**: Tampilan produk yang responsif dengan filter kategori.
- **Sistem Pre-Order (PO)**: Validasi tanggal pengiriman otomatis berdasarkan deadline PO (H-X) per produk.
- **Smart Cart**: Manajemen keranjang belanja (Tambah, Kurangi, Hapus) yang tersimpan secara lokal.
- **Checkout via WhatsApp**: Integrasi pesan otomatis yang rapi, mengirimkan detail pesanan, alamat, dan total harga langsung ke WhatsApp Mama.
- **Pilihan Kurir**: Integrasi estimasi biaya pengiriman (Sameday, Instant, Reguler).
- **Responsive Design**: Pengalaman belanja yang mulus baik di Desktop maupun Mobile (Android/iOS).

### 🛠️ Admin Power Panel
- **Secure Authentication**: Sistem login admin yang aman menggunakan Supabase Auth.
- **Product Management (CRUD)**: Tambah, Edit, dan Hapus produk langsung dari dashboard tanpa perlu menyentuh database.
- **Inventory Control**: Pengaturan stok, harga, dan status PO secara real-time.
- **Business Overview**: Dashboard statistik untuk memantau performa toko.
- **Protected Routes**: Keamanan tingkat tinggi, halaman admin tidak dapat diakses tanpa autentikasi.

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Database & Auth** | Supabase (PostgreSQL) |
| **Routing** | React Router DOM |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 🛠️ Instalasi & Setup

### 1. Clone Proyek
```bash
git clone https://github.com/username/kue-mama-vercel.git
cd kue-mama-vercel
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di root folder dan masukkan key dari Supabase:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Jalankan Mode Development
```bash
npm run dev
```

## 🛡️ Security Implementation
- **SQL Injection Protection**: Menggunakan Supabase Client SDK yang secara otomatis melakukan parameterisasi query.
- **XSS Prevention**: Mengandalkan mekanisme *auto-escaping* dari React.
- **Auth Guard**: Implementasi `ProtectedRoute` untuk mencegah akses ilegal ke area admin.
- **Lazy Loading**: Inisialisasi client Supabase secara lazy untuk meningkatkan stabilitas di berbagai environment (termasuk Android/Termux).

## 📸 Preview
- **Landing Page**: `/`
- **Katalog**: `/shop`
- **Checkout**: `/shop/checkout`
- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin`

---
**Dibuat dengan ❤️ untuk Mama.** 🍰✨