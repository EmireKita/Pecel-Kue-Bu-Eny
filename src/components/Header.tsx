
// src/components/Header.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Header({
  title = "PRODUK",
  backTo = -1,
  showBack = true,
  rightContent,
}: {
  title?: string;
  backTo?: number | string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof backTo === "number") {
      navigate(backTo);
    } else {
      navigate(backTo);
    }
  };


  return (
    <div className="sticky top-0 left-0 w-full flex items-center justify-between bg-gray-300 p-4 border-b-4 border-green-300 z-50">
      {showBack ? (
        <button onClick={handleBack} className="z-10">
          <ArrowLeft size={24} />
        </button>
      ) : (
        <div className="w-6" />
      )}
  
      <h1 className="text-lg font-bold text-center absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>
  
      <div>{rightContent}</div>
    </div>
  );
  
}

