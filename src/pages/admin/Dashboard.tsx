// File: Dashboard.tsx
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { logout } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm("Yakin ingin logout?")) {
      await logout();
      setTimeout(() => {
        navigate("/"); // atau navigate("/", { replace: true })
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-green-200 relative">
      <Header
        title="DASHBOARD"
        showBack={false}
        rightContent={
          <button onClick={handleLogout} className="text-red-600 hover:text-red-800 flex items-center gap-1">
            <LogOut size={18} />
            Logout
          </button>
        }
      />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

        {/* Grid menu admin */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/kategori"
            className="bg-white rounded-xl shadow p-4 text-center font-medium hover:bg-gray-100 transition"
          >
            Informasi Produk
          </Link>
          <Link
            to="/admin/toko"
            className="bg-white rounded-xl shadow p-4 text-center font-medium hover:bg-gray-100 transition"
          >
            Informasi Toko
          </Link>
          <Link
            to="/admin/pemesanan"
            className="bg-white rounded-xl shadow p-4 text-center font-medium hover:bg-gray-100 transition"
          >
            Informasi Pemesanan
          </Link>
          <Link
            to="/admin/faqs"
            className="bg-white rounded-xl shadow p-4 text-center font-medium hover:bg-gray-100 transition"
          >
            Seputar FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
