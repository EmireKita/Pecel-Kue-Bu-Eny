
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProductsByKategori,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import type { ProductWithId } from "@/services/productService";
import type { Product } from "@/types/Product";
import ProdukForm from "@/modals/ProdukForm";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Header from "@/components/Header";

export default function Produk() {
  const { kategori } = useParams();
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithId | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchProducts = async () => {
    if (!kategori) return;
    setLoading(true);
    const data = await getProductsByKategori(kategori);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [kategori]);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: ProductWithId) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin hapus produk ini?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleSubmit = async (data: Product) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      // await addProduct({ ...data, kategori: kategori || "" });
      await addProduct(data);
    }
    fetchProducts();
    setIsFormOpen(false);
    setEditingProduct(null); // ✅ Reset data setelah submit
  };

  const handleShowDetail = (product: ProductWithId) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setIsDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-green-200 relative">
      <Header title="PRODUK" backTo="/admin/kategori" />

      <div className="p-4">
        <h2 className="text-xl font-bold mt-4 mb-4 text-center">
          Kategori: <span className="capitalize">{kategori}</span>
        </h2>

        {isFormOpen && (
          <ProdukForm
            key={editingProduct ? editingProduct.id : "new"} // penting agar reset
            isOpen={true}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={editingProduct || undefined}
          />
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada produk dalam kategori ini.</p>
        ) : (
          <ul className="flex flex-col gap-4 mt-4">
            {products.map((p) => (
              <li
                key={p.id}
                onClick={() => handleShowDetail(p)}
                className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.imageUrl}
                    alt={p.nama}
                    className="w-10 h-10 object-cover rounded-lg bg-gray-200 border border-gray-400"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{p.nama}</h3>
                    {/* <p className="text-sm text-gray-700">{p.deskripsi}</p> */}
                    <p className="text-sm text-gray-700 line-clamp-2">{p.deskripsi}</p>
                    <p className="text-sm font-semibold text-gray-800">Rp{p.harga}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(p);
                    }}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <FiEdit size={22} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isDetailOpen && selectedProduct && (
          <div
            className="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleCloseDetail} // klik luar akan menutup
          >
            <div
              className="bg-white rounded-lg p-6 w-96 shadow-xl relative"
              onClick={(e) => e.stopPropagation()} // cegah close saat klik dalam modal
            >
              {/* Tombol close */}
              <button
                onClick={handleCloseDetail}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                aria-label="Close"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold mb-2">{selectedProduct.nama}</h2>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.nama}
                className="w-full h-full object-cover rounded mb-4"
              />
              <p className="text-gray-700 mb-2">{selectedProduct.deskripsi}</p>
              <p className="font-semibold text-gray-900">Rp{selectedProduct.harga}</p>
            </div>
          </div>
        )}


        <button
          onClick={handleAdd}
          className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800"
        >
          <FiPlus size={24} />
        </button>
      </div>
    </div>
  );
}
