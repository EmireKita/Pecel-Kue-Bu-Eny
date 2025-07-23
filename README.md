# 🤖 UMKM Chatbot - Pecel Kue Bu Eny

Chatbot berbasis web yang membantu pelanggan mendapatkan informasi seputar produk UMKM, informasi toko, serta FAQ. Dibuat menggunakan React dan Firestore (Firebase) untuk admin panel dan chatbot interface.

---

## 📦 Fitur
- Menampilkan informasi seputar toko dalam bentuk sebuah ChatBot
- Admin panel untuk mengelola produk dan toko secara realtime.
- Data disimpan dan disinkronkan secara realtime melalui Firebase Firestore.

---

## 🚀 Demo
> https://pecel-kue-bu-eny.web.app/

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

---

## 🧑‍💻 Penggunaan
👤 Sebagai Pengunjung (User):
Akses halaman utama chatbot.

Pilih menu seperti "Info Produk", "Info Toko", atau "FAQ".

Atau ketikkan pertanyaan Anda

Chatbot akan membalas sesuai kategori yang dipilih.

Informasi ditampilkan secara real-time dari Firestore.



🔐 Sebagai Admin:
Klik tombol Login Admin.

**Masukkan username dan password admin.**

Setelah login berhasil, akan masuk ke Admin Panel.

Di dalam panel admin:

Tersedia Pilihan: 

**Informasi Produk (Mengelola Produk):**

Tambah Produk: klik tombol ➕

Edit Produk: klik ikon ✏️

Hapus Produk: klik ikon 🗑️

**Informasi Toko:**

Edit Toko: klik ikon ✏️

**Informasi Pemesanan:**

Edit Informasi: klik ikon ✏️

**Kelola FaQ:**

Tambah FAQ: klik tombol ➕

Edit FAQ: klik ikon ✏️

Hapus FAQ: klik ikon 🗑️

Klik Simpan untuk menyimpan perubahan.
