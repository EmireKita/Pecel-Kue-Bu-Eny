// src/types/Product.ts

export interface Product {
    nama: string;
    deskripsi: string;
    harga: string;         // bisa juga string kalau harga berupa teks
    imageUrl: string;
    kategori: string;
    bestSeller?: boolean; // ← optional
  }
  