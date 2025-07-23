// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { Bot, ShieldCheck } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Kartu Utama */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-green-700">
          Selamat Datang di
        </h1>
        <h2 className="text-xl font-semibold text-gray-800">
          Pecel dan Kue Bu Eny <br /> AI Customer Service
        </h2>
        <p className="text-sm text-gray-600">
          Dapatkan informasi produk, jam buka, dan pemesanan secara otomatis!
        </p>

        <button
          onClick={() => navigate("/chat")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Bot size={18} /> Mulai Chat
        </button>
      </div>

      {/* Tombol Admin di kanan bawah */}
      <button
        onClick={() => navigate("/login")}
        className="fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition flex items-center gap-2"
      >
        <ShieldCheck size={18} /> Admin
      </button>
    </div>
  );
}
