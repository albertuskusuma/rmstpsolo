import { useEffect, useState } from 'react'

type InputProps = {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
    onChange?: (value: string) => void;
    value: string;
};

const GowTextArea = ({
    id,
    name,
    isDisabled,
    placeholder,
    label,
    onChange,
    value
}: InputProps) => {

    const [selectedTextArea, setSelectedTextArea] = useState<string>(value ?? '');

    useEffect(() => {
        setSelectedTextArea(value ?? '');
    }, [value]);

    return (
        <>
            <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <textarea
                    id={id}
                    name={name}
                    autoComplete="off"
                    disabled={isDisabled}
                    placeholder={placeholder}
                    value={selectedTextArea}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectedTextArea(val);
                        onChange?.(val);
                    }}
                    className="block w-full rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6
                        bg-white text-gray-900 placeholder:italic
                        focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
                        disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:focus:outline-none"
                />
            </div>
        </>
    )
}

export default GowTextArea