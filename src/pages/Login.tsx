
// // src/pages/Login.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "@/components/Header";
// import { loginWithUsername } from "@/services/loginService";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  
//   const [showPwd, setShowPwd] = useState(false);
//   // const SESSION_TIMEOUT = 1000 * 60 * 60 * 2; // 2 jam
//   const togglePwd = () => setShowPwd((p) => !p);

//   const handleLogin = async () => {
//     try {
//       setError("");
//       await loginWithUsername(username, password);
//       localStorage.setItem("lastLogin", Date.now().toString());
//       navigate("/admin");
//     } catch (err: any) {
//       let message = "Login gagal. Coba periksa kembali.";
//       const code = err?.code || err?.message;
//       if (code.includes("user-not-found")) {
//         message = "Akun tidak ditemukan. Periksa kembali username dan password.";
//       } else if (code.includes("wrong-password")) {
//         message = "Password salah. Coba lagi.";
//       } else if (code.includes("Username tidak ditemukan")) {
//         message = "Username tidak terdaftar.";
//       } else if (code.includes("network-request-failed")) {
//         message = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
//       }
  
  
//       setError(message);
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-green-200">
//       <Header title="ADMIN" backTo="/" />

//       <div className="flex items-center justify-center px-4 py-12">
//         <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
//           <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
//             Login Admin
//           </h2>

//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <div className="relative mb-6">
//               <input
//                 type={showPwd ? "text" : "password"}        // ← switch
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded
//                           focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               {/* Tombol mata */}
//               <button
//                 type="button"
//                 onClick={togglePwd}
//                 className="absolute inset-y-0 right-0 flex items-center px-3
//                           text-gray-600 hover:text-gray-800 focus:outline-none"
//               >
//                 {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {error && <p className="text-sm text-red-600">{error}</p>}

//             <button
//               onClick={handleLogin}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
//             >
//               LOGIN
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Login.tsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { loginWithUsername } from "@/services/loginService";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername]      = useState("");
  const [password, setPassword]      = useState("");
  const [showPwd,  setShowPwd]       = useState(false);
  const [error,    setError]         = useState("");

  const pwdRef   = useRef<HTMLInputElement>(null);

  /** 1️⃣  mapping firebase code → bahasa manusia */
  const mapError = (code: string) => {
    // v9 klasik
    if (code === "auth/user-not-found")       return "Username tidak terdaftar.";
    if (code === "auth/wrong-password")       return "Password salah. Coba lagi.";
  
    // kode baru (v10+)
    if (code === "auth/invalid-credential" ||
        code === "auth/invalid-login-credentials") {
      return "Username atau password salah.";
    }
  
    // fallback jaringan
    if (code === "auth/network-request-failed") {
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }
  
    return "Login gagal. Coba periksa kembali.";
  };
  

  /** 2️⃣  handle Login */
  const handleLogin = async () => {
    // Validasi sederhana
    if (!username.trim() || !password.trim()) {
      setError("Username dan Password wajib diisi.");
      return;
    }

    try {
      if (!username.trim()) {
        setError("Username wajib diisi.");
        return;
      }
      if (!password.trim()) {
        setError("Password wajib diisi.");
        return;
      }
      await loginWithUsername(username.trim(), password);

      localStorage.setItem("lastLogin", Date.now().toString());
      navigate("/admin");
    } catch (err: any) {
      console.log("Firebase‑error:", err.code, err.message);
      setError(mapError(err.code || err.message || ""));
      // Opsional: fokuskan kembali ke password
      pwdRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-green-200">
      <Header title="ADMIN" backTo="/" />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
          <h2 className="text-xl font-bold text-center mb-6">Login Admin</h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pwdRef.current?.focus()}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password + toggle mata */}
          <div className="relative mb-4">
            <input
              ref={pwdRef}
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute inset-y-0 right-0 flex items-center px-3
                         text-gray-600 hover:text-gray-800"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Pesan error */}
          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Tombol login */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
