// src/components/Input.tsx
type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    className?: string;
    name?: string;
  };
  
  export default function Input({
    value,
    onChange,
    placeholder = "",
    type = "text",
    className = "",
    name,
  }: InputProps) {
    return (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${className}`}
      />
    );
  }
  