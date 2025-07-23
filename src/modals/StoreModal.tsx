
import { useEffect, useState } from "react";

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
}

interface EditStoreModalProps {
  title: string;
  fields: Field[];
  onChange: (name: string, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function EditStoreModal({
  title,
  fields,
  onChange,
  onSave,
  onClose,
}: EditStoreModalProps) {
  const [localFields, setLocalFields] = useState<Field[]>([]);
  const [initialFields, setInitialFields] = useState<Field[]>([]);

  // Simpan salinan awal dan lokal saat pertama kali dibuka
  useEffect(() => {
    setLocalFields(fields);
    setInitialFields(fields);
  }, [fields]);

  const handleChange = (name: string, value: string) => {
    setLocalFields((prev) =>
      prev.map((f) => (f.name === name ? { ...f, value } : f))
    );
  };

  const handleSave = () => {
    localFields.forEach((f) => onChange(f.name, f.value));
    onSave();
  };

  const isChanged = () => {
    return initialFields.some((init, i) => init.value !== localFields[i]?.value);
  };

  const handleClose = () => {
    if (isChanged()) {
      const confirmClose = confirm("Perubahan belum disimpan. Yakin ingin keluar?");
      if (!confirmClose) return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600">✕</button>
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        {localFields.map((field) => (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="text-sm font-semibold block mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || ""}
              className="block w-full p-2 border rounded"
            />
          </div>
        ))}

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full">
          Simpan
        </button>
      </div>
    </div>
  );
}
