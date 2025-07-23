
import { useEffect, useState } from "react";
import {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} from "@/services/faqService";
import type { FaqWithId, Faq } from "@/types/Faq";
// import type { Faq } from "@/types/Faq";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function FaqAdmin() {
  const [faqs, setFaqs] = useState<FaqWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqWithId | null>(null);
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [keywordsText, setKeywordsText] = useState(""); // ← Tambahan

  const fetchFaqs = async () => {
    setLoading(true);
    const data = await getFaqs();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAdd = () => {
    setEditingFaq(null);
    setPertanyaan("");
    setJawaban("");
    setKeywordsText("");
    setIsFormOpen(true);
  };

  const handleEdit = (faq: FaqWithId) => {
    setEditingFaq(faq);
    setPertanyaan(faq.pertanyaan);
    setJawaban(faq.jawaban);
    setKeywordsText((faq.keywords || []).join(", "));
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin hapus FAQ ini?")) {
      await deleteFaq(id);
      fetchFaqs();
    }
  };

  const handleSubmit = async () => {
    const keywordsArray = keywordsText
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw.length > 0);

    const data: Faq = {
      pertanyaan,
      jawaban,
      keywords: keywordsArray,
    };

    if (editingFaq) {
      await updateFaq(editingFaq.id, data);
    } else {
      await addFaq(data);
    }

    setIsFormOpen(false);
    fetchFaqs();
  };

  return (
    <div className="min-h-screen bg-green-200 relative">
      <Header title="FAQ" backTo="/admin" />

      <div className="p-4">
        <h2 className="text-xl font-bold mt-4 mb-4 text-center">
          Daftar Pertanyaan yang Sering Ditanyakan
        </h2>

        {isFormOpen && (
          <Modal
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              title={editingFaq ? "Edit FAQ" : "Tambah FAQ"}
          >
              <div className="mb-2">
              <label className="block text-sm font-semibold">Pertanyaan</label>
              <input
                  type="text"
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  className="w-full p-2 border rounded"
              />
              </div>
              <div className="mb-2">
              <label className="block text-sm font-semibold">Jawaban</label>
              <textarea
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  className="w-full p-2 border rounded"
              />
              </div>
              <div className="mb-4">
              <label className="block text-sm font-semibold">Kata kunci (pisahkan dengan koma)</label>
              <input
                  type="text"
                  value={keywordsText}
                  onChange={(e) => setKeywordsText(e.target.value)}
                  className="w-full p-2 border rounded"
              />
              </div>
              <div className="flex justify-end gap-2">
              <button
                  onClick={handleSubmit}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                  Simpan
              </button>
              <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-600 hover:underline"
              >
                  Batal
              </button>
              </div>
          </Modal>
        )}

        {/* Daftar FAQ */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : faqs.length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada FAQ.</p>
        ) : (
          <ul className="flex flex-col gap-4 mt-4">
            {faqs.map((faq) => (
              <li
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-bold text-lg">{faq.pertanyaan}</h3>
                  <p className="text-sm text-gray-700 mt-1">{faq.jawaban}</p>
                  {faq.keywords && faq.keywords.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Kata kunci: {faq.keywords.join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <FiEdit size={22} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Tombol Tambah */}
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
