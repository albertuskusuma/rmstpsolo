import { useEffect, useState } from 'react'

type InputProps = {
    id: string;
    name: string;
    type?: string;
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
    onChange?: (value: string) => void;
    value: string;
};

const GowInput = ({
    id,
    name,
    type = 'text',
    isDisabled,
    placeholder,
    label,
    onChange,
    value
}: InputProps) => {

    const [selectedInp, setSelectedInp] = useState<string>(value ?? '');

    useEffect(() => {
        setSelectedInp(value ?? '');
    }, [value]);

    return (
        <>
            <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    name={name}
                    autoComplete="off"
                    disabled={isDisabled}
                    placeholder={placeholder}
                    value={selectedInp}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectedInp(val);
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

export default GowInput