
import { useEffect, useState } from "react";
import { getStore, updateStore } from "@/services/storeService";
import type { Store } from "@/types/Store";
import Header from "@/components/Header";
import EditStoreModal from "@/modals/StoreModal";

export default function Pemesanan() {
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
      if (data) setStore(data);
    });
  }, []);

  const handleSubmit = async () => {
    await updateStore(store);
    alert("Link pemesanan berhasil diperbarui!");
    setShowModal(false);
  };

  const fields = [
    { name: "whatsApp", label: "WhatsApp Link", value: store.whatsApp },
    { name: "goFood", label: "GoFood Link", value: store.goFood },
    { name: "grabFood", label: "GrabFood Link", value: store.grabFood },
  ];

  return (
    <div className="min-h-screen bg-green-200 relative">
      <Header title="PEMESANAN" backTo="/admin" />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Link Pemesanan</h2>

        <ul className="mb-4 space-y-2">
          <li>
            <span className="font-semibold">• WhatsApp:</span>{" "}
            {store.whatsApp ? (
              <a href={store.whatsApp} target="_blank" className="text-blue-600 underline break-all">
                {store.whatsApp}
              </a>
            ) : (
              "-"
            )}
          </li>
          <li>
            <span className="font-semibold">• GoFood:</span>{" "}
            {store.goFood ? (
              <a href={store.goFood} target="_blank" className="text-blue-600 underline break-all">
                {store.goFood}
              </a>
            ) : (
              "-"
            )}
          </li>
          <li>
            <span className="font-semibold">• GrabFood:</span>{" "}
            {store.grabFood ? (
              <a href={store.grabFood} target="_blank" className="text-blue-600 underline break-all">
                {store.grabFood}
              </a>
            ) : (
              "-"
            )}
          </li>
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-200"
        >
          ✏️
        </button>
      </div>

      {showModal && (
        <EditStoreModal
          title="Edit Link Pemesanan"
          fields={fields}
          // onChange={handleChange}
          onChange={(name, value) =>
            setStore((prev: Store) => ({
              ...prev,
              [name]: value,
            }))
          }
          onSave={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
