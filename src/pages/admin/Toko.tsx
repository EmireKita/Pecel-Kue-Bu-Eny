
  import { useEffect, useState } from "react";
  import { getStore, updateStore } from "@/services/storeService";
  import Header from "@/components/Header";
  import EditStoreModal from "@/modals/StoreModal";
  import type { Store } from "@/types/Store";
  
  export default function Toko() {
    const [store, setStore] = useState<Store>({
      nama: "",
      alamat: "",
      jadwal: "",
      kontak: "",
      whatsApp: "",
      goFood: "",
      grabFood: "",
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      getStore().then((data) => {
        if (data) setStore(data); // ✅ Sekarang cocok
      });
    }, []);
  
    const handleChange = (name: string, value: string) => {
      setStore((prev: Store) => ({
        ...prev,
        [name]: value,
      }));
    };
    
  
    const handleSubmit = async () => {
      await updateStore(store);
      alert("Informasi toko diperbarui!");
      setShowModal(false);
    };
  
    const fields = [
      { name: "nama", label: "Nama Toko", value: store.nama },
      { name: "alamat", label: "Alamat", value: store.alamat },
      { name: "jadwal", label: "Jadwal", value: store.jadwal },
      { name: "kontak", label: "Kontak", value: store.kontak },
    ];
  
    return (
      <div className="min-h-screen bg-green-200 relative">
        <Header title="TOKO" backTo="/admin" />
  
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Informasi Toko</h2>
  
          {/* Tampilan hanya lihat */}
          <ul className="mb-4 space-y-2">
            <li>
              <span className="font-semibold">• Nama Toko:</span> {store.nama || "-"}
            </li>
            <li>
              <span className="font-semibold">• Alamat:</span> {store.alamat || "-"}
            </li>
            <li>
              <span className="font-semibold">• Jadwal:</span> {store.jadwal || "-"}
            </li>
            <li>
              <span className="font-semibold">• Kontak:</span> {store.kontak || "-"}
            </li>
          </ul>

  
          {/* Tombol edit */}
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            ✏️
          </button>

        </div>
  
        {/* Modal */}
        {showModal && (
          <EditStoreModal
            title="Edit Informasi Toko"
            fields={fields}
            onChange={handleChange}
            onSave={handleSubmit}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    );
  }
  