import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'

const XlistFormPage = () => {

    type Option = {
        value: string;
        text: string;
    };

    const fruits = [
        { value: "apple", text: "Apple" },
        { value: "banana", text: "Banana" },
        { value: "blueberry", text: "Blueberry" },
        { value: "grape", text: "Grape" },
        { value: "lemon", text: "Lemon" }
    ];

    const [inputValue, setInputValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1)

    const filtered = fruits.filter(f =>
        f.text.toLowerCase().includes(inputValue.toLowerCase())
    );

    const excludeFiltered = fruits.filter(f => !filtered.includes(f));

    const allOptions = [...filtered, ...excludeFiltered];

    return (
        <MainLayout>
            <div>
                <h2 className='text-2xl font-semibold p-6'>All Form Component</h2>
                {/* start */}
                <form className='p-6' action='#'>
                    <div className="space-y-12">
                        <div className='col-span-full'>
                            <label className="block text-sm/6 font-medium text-gray-900">Country (Dropdown Search Array)</label>
                            <div className="relative w-full">
                                {/* {selectedOption?.text} - {selectedOption?.value} */}
                                <input
                                    autoComplete="off"
                                    type="text"
                                    value={inputValue}
                                    placeholder="Cari Data..."
                                    className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setIsOpen(true);
                                    }}
                                    onFocus={() => {
                                        setIsOpen(true);
                                        // highlight ke item yang sudah dipilih
                                        const index = allOptions.findIndex(
                                            (opt) => opt.value === selectedOption?.value
                                        );
                                        setHighlightIndex(index >= 0 ? index : -1);
                                    }}
                                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                                    onKeyDown={(e) => {
                                        if (!isOpen) return;

                                        if (e.key === "ArrowDown") {
                                            e.preventDefault();
                                            setHighlightIndex((prev) => (prev + 1) % allOptions.length || 0);
                                        }

                                        if (e.key === "ArrowUp") {
                                            e.preventDefault();
                                            setHighlightIndex((prev) =>
                                                (prev - 1 + allOptions.length) % allOptions.length
                                            );
                                        }

                                        if (e.key === "Enter" && highlightIndex >= 0) {
                                            e.preventDefault();
                                            const option = allOptions[highlightIndex];
                                            setSelectedOption(option);
                                            setInputValue(option.text);
                                            setIsOpen(true); // tetap open jika input fokus
                                        }
                                    }}
                                />

                                {isOpen && (
                                    <ul className="absolute left-0 right-0 z-10 mt-1 bg-white border rounded shadow-md max-h-[150px] overflow-y-auto">
                                        {allOptions.map((f, i) => {
                                            const isSelected = selectedOption?.value === f.value;
                                            const isHighlighted = highlightIndex === i;

                                            return (
                                                <li
                                                    key={f.value}
                                                    onClick={() => {
                                                        setSelectedOption(f);
                                                        setInputValue(f.text);
                                                        setHighlightIndex(i);
                                                        setIsOpen(true); // tetap open jika input fokus
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
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="">
                            <div className="mt-10 col-span-full">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm/6 font-medium text-gray-900">Inputan Biasa</label>
                                    <div className="mt-2">
                                        <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label className="block text-sm/6 font-medium text-gray-900">Inputan Email</label>
                                    <div className="mt-2">
                                        <input id="email" type="email" name="email" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <legend className="text-sm/6 font-semibold text-gray-900">Checkbox</legend>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex gap-3">
                                            <div className="flex h-6 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input id="comments" type="checkbox" name="comments" checked aria-describedby="comments-description" className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                    <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                                        <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                                                        <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="text-sm/6">
                                                <label className="font-medium text-gray-900">Comments</label>
                                                <p id="comments-description" className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex h-6 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input id="candidates" type="checkbox" name="candidates" aria-describedby="candidates-description" className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                    <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                                        <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                                                        <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="text-sm/6">
                                                <label className="font-medium text-gray-900">Candidates</label>
                                                <p id="candidates-description" className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend className="text-sm/6 font-semibold text-gray-900">Radio Button</legend>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-everything" type="radio" name="push-notifications" checked className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden" />
                                            <label className="block text-sm/6 font-medium text-gray-900">Everything</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-email" type="radio" name="push-notifications" className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden" />
                                            <label className="block text-sm/6 font-medium text-gray-900">Same as email</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>
                {/* end */}
            </div>
        </MainLayout>
    )
}

export default XlistFormPage