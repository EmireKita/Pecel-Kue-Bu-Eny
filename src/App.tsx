// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chatbot from "./pages/ChatBot";
import AdminDashboard from "./pages/admin/Dashboard";
import Produk from "./pages/admin/Produk";
import Toko from "./pages/admin/Toko";
import Pemesanan from "./pages/admin/Pemesanan";
import FaqAdmin from "./pages/admin/Faqs";
import Kategori from "./pages/admin/Kategori";
import ProtectedRoute from "@/components/ProtectedRoute";
import './index.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/produk" element={<ProtectedRoute><Produk /></ProtectedRoute>} />
        <Route path="/admin/produk/:kategori" element={<ProtectedRoute><Produk /></ProtectedRoute>} />  {/* Tambahkan ini */}
        <Route path="/admin/toko" element={<ProtectedRoute><Toko /></ProtectedRoute>} />
        <Route path="/admin/pemesanan" element={<ProtectedRoute><Pemesanan /></ProtectedRoute>} />
        <Route path="/admin/faqs" element={<ProtectedRoute><FaqAdmin /></ProtectedRoute>} />
        <Route path="/admin/kategori" element={<ProtectedRoute><Kategori /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
