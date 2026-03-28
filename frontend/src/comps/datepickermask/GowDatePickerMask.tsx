import { useEffect, useState } from "react";

type DatePickerProps = {
  id?: string;
  name?: string;
  label?: string;
  value?: string; // bisa DD-MM-YYYY atau YYYY-MM-DD
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void; // selalu return YYYY-MM-DD
};

const GowDatePickerMask = ({
  id,
  name,
  label,
  value,
  placeholder = "DD-MM-YYYY",
  isDisabled,
  onChange,
}: DatePickerProps) => {

  const [inputValue, setInputValue] = useState("");

  // ✅ normalize semua value jadi ISO
  const normalizeToISO = (val: string) => {
    const parts = val.split("-");
    if (parts.length !== 3) return "";

    // kalau sudah ISO
    if (parts[0].length === 4) return val;

    // kalau DD-MM-YYYY
    const [d, m, y] = parts;
    return `${y}-${m}-${d}`;
  };

  // ✅ convert ISO -> display (DD-MM-YYYY)
  const toDisplay = (val: string) => {
    const parts = val.split("-");
    if (parts.length !== 3) return "";

    const [y, m, d] = parts;
    return `${d}-${m}-${y}`;
  };

  useEffect(() => {
    if (!value) return;

    const iso = normalizeToISO(value);
    if (iso) {
      setInputValue(toDisplay(iso));
    }
  }, [value]);

  const applyMask = (val: string) => {
    let v = val.replace(/\D/g, "");

    if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);

    return v;
  };

  const convertToISO = (val: string) => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(val)) return "";

    const [d, m, y] = val.split("-");
    return `${y}-${m}-${d}`;
  };

  return (
    <>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
      )}

      <div className="mt-2">
        <input
          id={id}
          name={name}
          type="text"
          autoComplete="off"
          disabled={isDisabled}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => {
            const masked = applyMask(e.target.value);
            setInputValue(masked);

            const iso = convertToISO(masked);
            if (iso) {
              onChange?.(iso); // ✅ selalu kirim ISO
            }
          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 placeholder:italic disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:focus:outline-none"
        />
      </div>
    </>
  );
};

export default GowDatePickerMask;