
import type { ReactNode } from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm" | "lg" | "icon";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
};

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "default",
  size = "default",
}: ButtonProps) {
  let baseClasses = "rounded font-medium transition-colors focus:outline-none inline-flex items-center justify-center";

  let variantClasses = "";
  if (variant === "outline") variantClasses = "border border-green-500 bg-transparent text-green-500 hover:bg-green-100";
  else if (variant === "ghost") variantClasses = "bg-transparent text-green-500 hover:bg-green-100";
  else variantClasses = "bg-green-500 text-white hover:bg-green-600";

  let sizeClasses = "";
  if (size === "sm") sizeClasses = "px-2 py-1 text-sm";
  else if (size === "lg") sizeClasses = "px-6 py-3 text-lg";
  else if (size === "icon") sizeClasses = "w-10 h-10 p-0";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}
