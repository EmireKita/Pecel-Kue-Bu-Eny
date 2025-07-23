
// src/pages/admin/Kategori.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { getKategoriList } from "@/services/productService";

export default function Kategori() {
  const defaultKategori = ["nasi", "cemilan"];

  const [kategoriList, setKategoriList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchKategori = async () => {
    const dbKategori = await getKategoriList();
    const semuaKategori = new Set([...defaultKategori, ...dbKategori]); // otomatis unik
    setKategoriList(Array.from(semuaKategori));
    setLoading(false);
  };
  fetchKategori();
}, []);

  return (
    <div className="min-h-screen bg-green-200 relative">
      <Header title="KATEGORI" backTo="/admin" />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Pilih Kategori Produk</h2>

        {loading ? (
          <p className="text-gray-700">Memuat kategori...</p>
        ) : kategoriList.length === 0 ? (
          <p className="text-gray-600">Belum ada kategori tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kategoriList.map((kategori) => (
              <Link
                key={kategori}
                to={`/admin/produk/${kategori}`}
                className="bg-white rounded-xl shadow p-4 text-center font-medium hover:bg-gray-100 transition capitalize"
              >
                {kategori}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
