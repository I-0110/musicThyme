"use client";

import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

type ArrayInputProps = {
    label: string;
    placeholder: string;
    value: string[];
    onChange: (values: string[]) => void;
};

export default function ArrayInput({ label, placeholder, value, onChange }: ArrayInputProps) {
    const [input, setInput] = useState("");
    const [focused, setFocused] = useState(false);

    const isFloating = focused || value.length > 0 || input.length > 0;

    const handleAdd = () => {
        if (!input.trim()) return;
        onChange([...value, input.trim()]);
        setInput("");
    };

    const handleRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="relative mb-3 w-full border border-thyme-300 rounded">
            <label
                className={`absolute left-3 text-thyme-100 pointer-events-none transition-all duration-200 ${
                isFloating 
                    ? "top-1 text-xs text-thyme-100" 
                    : "top-3 text-md text-thyme-500"
                }`}
            >
                {label}
            </label>
            
            {/* List of values */}
            {value.length > 0 && (
                <div className="mb-2">
                    {value.map((item, index) => (
                        <span key={index} className="inline-flex items-center bg-thyme-200 text-thyme-500 rounded-full px-3 py-1 mr-2 mb-2">
                            {item}
                            <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-2 text-thyme-300 hover:text-thyme-500"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input field */}
            <div className="flex">
                <input
                    value={input}
                    placeholder={isFloating ? placeholder : ""}
                    onChange={e => setInput(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAdd();
                        }
                    }}
                    className="flex-1 border border-transparent rounded-l p-2"
                />
                <button type="button" onClick={handleAdd} className="bg-thyme-400 text-white px-4 rounded-r">
                    <PlusIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
} 
