
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

const SESSION_TIMEOUT = 1000 * 60 * 60 * 2; // 2 jam

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Memuat sesi...</p>;

  const lastLogin = parseInt(localStorage.getItem("lastLogin") || "0");
  const isExpired = Date.now() - lastLogin > SESSION_TIMEOUT;

  if (user && isExpired) {
    signOut(auth);
    localStorage.removeItem("lastLogin");
    return <Navigate to="/login" replace />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
