import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import type { Product } from "@/types/Product";

export type ProductWithId = Product & { id: string };

const productRef = collection(db, "products");

// Fetch produk sekali saja
export const getProducts = async (): Promise<ProductWithId[]> => {
  try {
    const snapshot = await getDocs(productRef);
    console.log("📦 Jumlah dokumen:", snapshot.size);
    if (snapshot.empty) {
      console.warn("⚠️ Tidak ada data ditemukan di koleksi 'products'");
    }
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Product),
    }));
  } catch (error) {
    console.error("❌ Gagal fetch produk:", error);
    return [];
  }
};

// Realtime listener, callback tiap data berubah
export const subscribeProducts = (
  callback: (products: ProductWithId[]) => void,
  errorCallback?: (error: Error) => void
) => {
  return onSnapshot(
    productRef,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));
      callback(products);
    },
    (error) => {
      console.error("Realtime fetch error:", error);
      if (errorCallback) errorCallback(error);
    }
  );
};

export const getProductsByKategori = async (kategori: string): Promise<ProductWithId[]> => {
    try {
      const q = query(productRef, where("kategori", "==", kategori));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));
    } catch (err) {
      console.error("❌ Gagal fetch produk berdasarkan kategori:", err);
      return [];
    }
  };

  export const getKategoriList = async (): Promise<string[]> => {
    try {
      const snapshot = await getDocs(productRef);
      const kategoriSet = new Set<string>();
  
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as Product;
        if (data.kategori) {
          kategoriSet.add(data.kategori.toLowerCase());
        }
      });
  
      return Array.from(kategoriSet).sort(); // optional: sort alfabet
    } catch (err) {
      console.error("❌ Gagal mengambil daftar kategori:", err);
      return [];
    }
  };
  
  export const getBestSellerProducts = async (): Promise<ProductWithId[]> => {
    const q = query(productRef, where("bestSeller", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Product),
    }));
  };


export const addProduct = async (product: Product): Promise<string> => {
  const { id, ...data } = product as any;
  const docRef = await addDoc(productRef, data);
  return docRef.id;
};

export const updateProduct = async (id: string, product: Product): Promise<void> => {
  try {
    const { id: _id, ...data } = product as any;
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, data);
  } catch (err) {
    console.error("❌ Gagal update produk:", err);
    throw err;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("❌ Gagal hapus produk:", err);
    throw err;
  }
};
