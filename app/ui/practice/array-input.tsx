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

    const handleAdd = () => {
        if (!input.trim()) return;
        onChange([...value, input.trim()]);
        setInput("");
    };

    const handleRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">{label}</label>
            
            {/* List of values */}
            
            {value.length > 0 && (
                <div className="mb-2">
                    {value.map((item, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 mr-2 mb-2">
                            {item}
                            <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
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
                    placeholder={placeholder}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAdd();
                        }
                    }}
                    className="flex-1 border border-gray-300 rounded-l p-2"
                />
                <button type="button" onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded-r">
                    <PlusIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
} 

