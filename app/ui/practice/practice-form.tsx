'use client';

import { usePractice } from "@/app/lib/practice/usePractice";
import ArrayInput from "@/app/ui/practice/array-input"; 

export default function PracticeForm() {
    const {  
        form, 
        loading, 
        edit,
        success, 
        error, 
        setForm, 
        handleSubmit, 
        handleCancelEdit 
    } = usePractice();

    return (
        <>
            <form 
                onSubmit={handleSubmit} 
                className="mb-4 space-y-3 p-2"
            >
                <div className="flex-1">
                    <h1 className="mb-3 text-xl font-bold text-thyme-400">
                    {edit ? "Edit Session" : "Log New Session"}
                    </h1>
                    <div className="w-full">
                        <div className="relative mb-3">
                            <input
                            type="date"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            className="w-full border border-thyme-300 rounded p-2"
                            required
                            />
                            <label
                                htmlFor="Date"
                                className="absolute left-3 top-3 text-thyme-500 bg-thyme-100 text-sm"
                            >
                                Date 
                            </label>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative mb-3">
                            <input
                                type="time"
                                value={form.startTime}
                                onChange={e => setForm({ ...form, startTime: e.target.value })}
                                className="w-full border border-thyme-300 rounded p-2"
                                required
                            />
                            <label
                                htmlFor="Start Time"
                                className="absolute left-3 top-3 text-thyme-500 bg-thyme-100 text-sm"
                            >
                                Start Time 
                            </label>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative mb-3">
                            <input
                                type="time"
                                value={form.endTime}
                                onChange={e => setForm({ ...form, endTime: e.target.value })}
                                className="w-full border border-thyme-300 rounded p-2"
                                required
                            />
                            <label
                                htmlFor="End Time"
                                className="absolute left-3 top-3 text-thyme-500 bg-thyme-100 text-sm"
                            >
                                End Time 
                            </label>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="relative mb-3">
                            <input
                                placeholder=""
                                value={form.instrument}
                                onChange={e => setForm({ ...form, instrument: e.target.value })}
                                className="w-full border border-thyme-300 rounded p-2"
                                required
                            />
                            <label
                                htmlFor="Instrument"
                                className="absolute left-3 top-3 text-thyme-400 bg-thyme-100 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Instrument 
                            </label>
                        </div>
                    </div>

                    <ArrayInput
                        label="Scales"
                        placeholder="e.g. C major"
                        value={form.scales}
                        onChange={scales => setForm({ ...form, scales })}
                    />
                    <ArrayInput
                        label="Study(-ies)"
                        placeholder=""
                        value={form.study}
                        onChange={study => setForm({ ...form, study })}
                    />
                    <ArrayInput
                        label="Piece"
                        placeholder=""
                        value={form.piece}
                        onChange={piece => setForm({ ...form, piece })}
                    />
                   <ArrayInput
                        label="Solos"
                        placeholder=""
                        value={form.solos}
                        onChange={solos => setForm({ ...form, solos })}
                    />
                    
                    <div className="w-full">
                        <div className="relative mb-3">
                            <textarea
                                placeholder="Notes (e.g. what you worked on, how it felt, etc.)"
                                value={form.notes}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                rows={4}
                                className="w-full border border-thyme-300 rounded p-2"
                            />
                            <label
                                htmlFor="Notes"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            />
                        </div>
                    </div>
                </div>
        
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-thyme-400 text-white px-4 py-2 rounded disabled:bg-thyme-200"
                >
                    {loading ? "Saving..." : "Save Practice Session"}
                </button>
        
                {edit && (
                    <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-thyme-400 text-white px-4 py-2 rounded"
                    >
                    Cancel Edit
                    </button>
                )}
        
                {success && <p className="text-green-700 mt-2">Practice session saved!</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </>
    );
}