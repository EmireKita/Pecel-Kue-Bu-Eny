# 🤖 UMKM Chatbot - Pecel Kue Bu Eny

Chatbot berbasis web yang membantu pelanggan mendapatkan informasi seputar produk UMKM, informasi toko, serta FAQ. Dibuat menggunakan React dan Firestore (Firebase) untuk admin panel dan chatbot interface.

---

## 📦 Fitur
- Menampilkan info produk berdasarkan kategori.
- Informasi toko: alamat, kontak, link GrabFood/GoFood.
- Admin panel untuk mengelola produk dan toko secara realtime.
- Data disimpan dan disinkronkan secara realtime melalui Firebase Firestore.

---

## 🚀 Demo
> Belum tersedia. Bisa di-deploy menggunakan Vercel, Netlify, atau Heroku (khusus server jika ada backend).

---

## 🛠️ Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/EmireKita/Pecel-Kue-Bu-Eny.git
   cd Pecel-Kue-Bu-Eny
2. **Install Dependensi:**
   ```bash
   npm install
3. **Konfigurasi Firebase**
   Edit Firebase.ts dengan konfigurasi:
      ```bash
      const firebaseConfig = {
        apiKey: "your_api_key",
        authDomain: "your_project.firebaseapp.com",
        projectId: "your_project_id",
        storageBucket: "your_project.appspot.com",
        messagingSenderId: "your_sender_id",
        appId: "your_app_id",
      };
Pastikan kamu sudah membuat project Firebase di https://console.firebase.google.com/ dan mengambil konfigurasi dari sana.

5. **Jalankan secara lokal**
   ```bash
   npm run dev



##🧑‍💻 Penggunaan
👤 Sebagai Pengunjung (User):
Akses halaman utama chatbot.

Pilih menu seperti "Info Produk", "Info Toko", atau "FAQ".

Chatbot akan membalas sesuai kategori yang dipilih.

Informasi ditampilkan secara real-time dari Firestore.

🔐 Sebagai Admin:
Klik tombol Login Admin.

Masukkan email dan password admin.

Setelah login berhasil, akan masuk ke Admin Panel.

Di dalam panel admin:

Tambah Produk: klik tombol ➕

Edit Produk: klik ikon ✏️

Hapus Produk: klik ikon 🗑️

Kelola Info Toko: edit langsung nama, alamat, kontak, dan tautan online

Klik Simpan untuk menyimpan perubahan.
