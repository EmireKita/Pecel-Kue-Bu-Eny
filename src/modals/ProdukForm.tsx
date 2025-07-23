
import { useState, useEffect } from "react";
import type { Product } from "@/types/Product";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { uploadToCloudinary } from "@/services/imageService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  defaultValue?: Product;
};

export default function ProdukForm({ isOpen, onClose, onSubmit, defaultValue }: Props) {
  const [form, setForm] = useState<Product>({
    nama: "",
    deskripsi: "",
    harga: "",
    imageUrl: "",
    kategori: "",
    bestSeller: false,
  });
  const [uploading, setUploading] = useState(false);
  const [initialForm, setInitialForm] = useState<Product | null>(null);

  useEffect(() => {
    const defaultData = defaultValue || {
      nama: "",
      deskripsi: "",
      harga: "",
      imageUrl: "",
      kategori: "",
      bestSeller: false,
    };
    setForm(defaultData);
    setInitialForm(defaultData);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === "kategori" ? value.toLowerCase() : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, imageUrl }));
    } catch (err) {
      alert("Gagal upload gambar");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!form.nama || !form.kategori || !form.harga || !form.imageUrl) {
      alert("Isi semua field termasuk gambar!");
      return;
    }
    onSubmit(form);
    onClose();
  };

  const hasChanged = () => {
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  };

  const handleCloseWithConfirm = () => {
    if (hasChanged()) {
      const confirmClose = confirm("Perubahan belum disimpan. Yakin ingin keluar?");
      if (!confirmClose) return;
    }
    onClose();
  };

  return (
    <Modal
      title={defaultValue ? "Edit Produk" : "Tambah Produk"}
      isOpen={isOpen}
      onClose={handleCloseWithConfirm}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="nama" className="text-sm font-semibold">Nama Produk</label>
          <Input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama produk" />
        </div>

        <div>
          <label htmlFor="deskripsi" className="text-sm font-semibold">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi"
            rows={3}
            className="w-full p-2 border rounded resize-none overflow-y-auto max-h-[6rem]"
          />
        </div>

        <div>
          <label htmlFor="harga" className="text-sm font-semibold">Harga</label>
          <Input
            name="harga"
            value={form.harga.toString()}
            onChange={handleChange}
            placeholder="Harga"
            type="number"
          />
        </div>

        <div>
          <label htmlFor="kategori" className="text-sm font-semibold">Kategori</label>
          <Input name="kategori" value={form.kategori} onChange={handleChange} placeholder="Kategori" />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestSeller"
            checked={form.bestSeller || false}
            onChange={(e) => setForm((prev) => ({ ...prev, bestSeller: e.target.checked }))}
          />
          <label htmlFor="bestSeller" className="text-sm font-semibold">Tandai sebagai Best Seller</label>
        </div>

        <div>
          <label htmlFor="image" className="text-sm font-semibold">Gambar Produk</label><br />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded mt-2" />
          )}
        </div>

        <Button onClick={handleSubmit}>
          {defaultValue ? "Simpan Perubahan" : "Tambah"}
        </Button>
      </div>
    </Modal>
  );
}
