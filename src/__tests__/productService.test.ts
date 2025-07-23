

// import { describe, it, expect, vi, beforeEach } from "vitest";
// import * as firestore from "firebase/firestore";
// import {
//   getProducts,
//   getProductsByKategori,
//   getKategoriList,
//   getBestSellerProducts,
// } from "@/services/productService";

// // 🔌 Mock firebase/firestore functions
// vi.mock("firebase/firestore", async () => {
//   const actual = await vi.importActual<typeof firestore>("firebase/firestore");
//   return {
//     ...actual,
//     collection: vi.fn(() => "mockCollection"),
//     getDocs: vi.fn(),
//     query: vi.fn(),
//     where: vi.fn(),
//   };
// });

// const mockDocs = [
//   {
//     id: "1",
//     data: () => ({
//       nama: "Produk A",
//       harga: 10000,
//       kategori: "Makanan",
//       bestSeller: true,
//     }),
//   },
//   {
//     id: "2",
//     data: () => ({
//       nama: "Produk B",
//       harga: 20000,
//       kategori: "Minuman",
//       bestSeller: false,
//     }),
//   },
// ];

// beforeEach(() => {
//   vi.clearAllMocks();
// });

// describe("productService", () => {
//   it("getProducts() should return list of products", async () => {
//     (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: mockDocs, empty: false, size: 2 });

//     const result = await getProducts();
//     expect(result).toHaveLength(2);
//     expect(result[0].nama).toBe("Produk A");
//   });

//   it("getProductsByKategori() should filter by kategori", async () => {
//     (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: [mockDocs[0]] });

//     const result = await getProductsByKategori("Makanan");
//     expect(result).toHaveLength(1);
//     expect(result[0].kategori).toBe("Makanan");
//   });

//   it("getKategoriList() returns unique sorted kategori", async () => {
//     (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: mockDocs });

//     const result = await getKategoriList();
//     expect(result).toEqual(["makanan", "minuman"]);
//   });

//   it("getBestSellerProducts() returns only best sellers", async () => {
//     (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: [mockDocs[0]] });

//     const result = await getBestSellerProducts();
//     expect(result).toHaveLength(1);
//     expect(result[0].bestSeller).toBe(true);
//   });
// });
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as firestore from "firebase/firestore";

// ✅ Mock semua method penting yang digunakan
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual<typeof firestore>("firebase/firestore");
  return {
    ...actual,
    collection: vi.fn(() => "mockCollection"),
    getDocs: vi.fn(),
    query: vi.fn((...args) => args),
    where: vi.fn((...args) => args),
    getFirestore: vi.fn(() => "mockFirestore"), // ✅ ini wajib kalau pakai getFirestore()
  };
});

// 🔸 Mock dokumen-dokumen yang seolah-olah dikembalikan Firestore
const mockDocs = [
  {
    id: "1",
    data: () => ({
      nama: "Produk A",
      harga: 10000,
      kategori: "Makanan",
      bestSeller: true,
    }),
  },
  {
    id: "2",
    data: () => ({
      nama: "Produk B",
      harga: 20000,
      kategori: "Minuman",
      bestSeller: false,
    }),
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

// ✅ Import service-mu setelah mock siap
import {
  getProducts,
  getProductsByKategori,
  getKategoriList,
  getBestSellerProducts,
} from "@/services/productService";

// 🔬 Test suite
describe("productService", () => {
  it("getProducts() should return list of products", async () => {
    (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: mockDocs, empty: false, size: 2 });

    const result = await getProducts();
    expect(result).toHaveLength(2);
    expect(result[0].nama).toBe("Produk A");
  });

  it("getProductsByKategori() should filter by kategori", async () => {
    (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: [mockDocs[0]] });

    const result = await getProductsByKategori("Makanan");
    expect(result).toHaveLength(1);
    expect(result[0].kategori).toBe("Makanan");
  });

  it("getKategoriList() returns unique sorted kategori", async () => {
    (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: mockDocs });

    const result = await getKategoriList();
    expect(result).toEqual(["makanan", "minuman"]);
  });

  it("getBestSellerProducts() returns only best sellers", async () => {
    (firestore.getDocs as vi.Mock).mockResolvedValue({ docs: [mockDocs[0]] });

    const result = await getBestSellerProducts();
    expect(result).toHaveLength(1);
    expect(result[0].bestSeller).toBe(true);
  });
});
