import { useEffect, useState } from "react";

type Option = {
    value: string;
    text: string;
};

type DropdownProps = {
    list_option: Option[];
    selected_option?: Option | null;
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
    onChange?: (value: Option) => void;
    id?:string;
    name?:string;
};

const GowDropdownSearchArray = ({
    list_option,
    selected_option = null,
    label = "",
    placeholder = "Cari Data...",
    isDisabled = false,
    onChange,
    id,
    name,
}: DropdownProps) => {

    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState<Option | null>(selected_option);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        if (selected_option) {
            setSelectedOption(selected_option);
        }
    }, [selected_option]);

    const filteredOptions = list_option.filter((f) =>
        f.text.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <>
            {label && (
                <label className="block text-sm/6 font-medium text-gray-900">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <input
                    id={id}
                    name={name}
                    autoComplete="off"
                    type="text"
                    value={inputValue}
                    disabled={isDisabled}
                    placeholder={placeholder}
                    className={`w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:italic
                        ${isDisabled
                            ? "bg-gray-200 text-base outline-gray-300 cursor-not-allowed"
                            : "bg-white text-gray-900 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                        }`}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                        setHighlightIndex(-1);
                    }}
                    onFocus={() => {
                        setIsOpen(true);

                        const index = list_option.findIndex(
                            (opt) => opt.value === selectedOption?.value
                        );

                        setHighlightIndex(index >= 0 ? index : -1);
                    }}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    onKeyDown={(e) => {
                        if (!isOpen) return;

                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setHighlightIndex((prev) =>
                                prev < filteredOptions.length - 1 ? prev + 1 : 0
                            );
                        }

                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setHighlightIndex((prev) =>
                                prev > 0 ? prev - 1 : filteredOptions.length - 1
                            );
                        }

                        if (e.key === "Enter" && highlightIndex >= 0) {
                            e.preventDefault();

                            const option = filteredOptions[highlightIndex];

                            setSelectedOption(option);
                            setInputValue(option.text);
                            setIsOpen(false);

                            onChange?.(option);
                        }
                    }}
                />

                {isOpen && (
                    <ul className="absolute left-0 right-0 z-10 mt-1 bg-white border rounded shadow-md max-h-[150px] overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <li className="p-2 text-gray-500">Data Tidak Ditemukan</li>
                        ) : (
                            filteredOptions.map((f, i) => {
                                const isSelected = selectedOption?.value === f.value;
                                const isHighlighted = highlightIndex === i;

                                return (
                                    <li
                                        key={f.value}
                                        onClick={() => {
                                            setSelectedOption(f);
                                            setInputValue(f.text);
                                            setHighlightIndex(i);
                                            setIsOpen(false);

                                            onChange?.(f);
                                        }}
                                        className={`p-2 cursor-pointer ${isSelected
                                                ? "bg-blue-300"
                                                : isHighlighted
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                    >
                                        {f.text}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};

export default GowDropdownSearchArray;