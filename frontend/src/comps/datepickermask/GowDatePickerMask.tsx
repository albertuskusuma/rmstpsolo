import { useEffect, useState } from "react";

type DatePickerProps = {
  id?: string;
  name?: string;
  label?: string;
  value?: string; // YYYY-MM-DD
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void; // return YYYY-MM-DD
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

  // convert YYYY-MM-DD -> DD-MM-YYYY
  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-");
      setInputValue(`${d}-${m}-${y}`);
    }
  }, [value]);

  const applyMask = (val: string) => {

    let v = val.replace(/\D/g, "");

    if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);

    return v;
  };

  const convertToISO = (val: string) => {

    if (val.length !== 10) return "";

    const [d, m, y] = val.split("-");

    if (!d || !m || !y) return "";

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
              onChange?.(iso);
            }

          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 placeholder:italic"
        />
      </div>
    </>
  );
};

export default GowDatePickerMask;