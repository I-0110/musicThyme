'use client';

import { usePractice } from "@/app/lib/practice/usePractice";
import ArrayInput from "@/app/ui/practice/array-input"; 
import { calculateDuration, minutesToTime } from "@/app/lib/practice/utils";

export default function PracticeForm() {
    const { 
        entries, 
        form, 
        loading, 
        edit,
        success, 
        error, 
        setForm, 
        handleSubmit, 
        handleEdit, 
        handleDelete, 
        handleCancelEdit 
    } = usePractice();

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
                <div className="mb-4 space-y-3">
                    <h2 className="text-lg font-bold mb-2">
                    {edit ? "Edit session" : "Log new session"}
                    </h2>
                    <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                    />
                    <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-sm text-gray-500">Start time</label>
                        <input
                        type="time"
                        value={form.startTime}
                        onChange={e => setForm({ ...form, startTime: e.target.value })}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-500">End time</label>
                        <input
                        type="time"
                        value={form.endTime}
                        onChange={e => setForm({ ...form, endTime: e.target.value })}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                        />
                    </div>
                    </div>
                    <input
                    placeholder="Instrument"
                    value={form.instrument}
                    onChange={e => setForm({ ...form, instrument: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                    />
                    <ArrayInput
                    label="Scales"
                    placeholder="Enter a scale..."
                    value={form.scales}
                    onChange={scales => setForm({ ...form, scales })}
                    />
                    <ArrayInput
                    label="Studies"
                    placeholder="Enter an exercise/study/etude..."
                    value={form.study}
                    onChange={study => setForm({ ...form, study })}
                    />
                    <ArrayInput
                    label="Repertoire"
                    placeholder="Enter a piece of repertoire..."
                    value={form.piece}
                    onChange={piece => setForm({ ...form, piece })}
                    />
                    <ArrayInput
                    label="Solos"
                    placeholder="Enter any solos/excerpts/licks..."
                    value={form.solos}
                    onChange={solos => setForm({ ...form, solos })}
                    />
                    <textarea
                    placeholder="Notes (e.g. what you worked on, how it felt, etc.)"
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
        
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    {loading ? "Saving..." : "Save Practice Session"}
                </button>
        
                {edit && (
                    <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-sm text-gray-500 underline mb-2"
                    >
                    Cancel edit
                    </button>
                )}
        
                {success && <p className="text-green-500 mt-2">Practice session saved!</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            <h2 className="text-xl font-bold mb-4">Previous Practice Sessions</h2>
        
            {entries.length === 0 ? (
            <p className="text-gray-600">No practice sessions logged yet.</p>
            ) : (
            <div className="space-y-4">
                {entries.map(entry => (
                <div key={entry.id} className="border border-gray-300 rounded p-4">
                    <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{entry.instrument}</h3>
                    <span className="text-gray-500 text-sm">
                        {calculateDuration(entry.startTime, entry.endTime)}
                    </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                    {new Date(entry.date).toLocaleDateString()} · {minutesToTime(entry.startTime)} → {minutesToTime(entry.endTime)}
                    </p>
                    {entry.piece.length > 0 && <p className="text-sm">Pieces: {entry.piece.join(", ")}</p>}
                    {entry.scales.length > 0 && <p className="text-sm">Scales: {entry.scales.join(", ")}</p>}
                    {entry.study.length > 0 && <p className="text-sm">Studies: {entry.study.join(", ")}</p>}
                    {entry.solos.length > 0 && <p className="text-sm">Solos: {entry.solos.join(", ")}</p>}
                    {entry.notes && <p className="text-sm text-gray-500 mt-2">{entry.notes}</p>}
                    <div className="flex gap-2 mt-2">
                    <button
                    type="button"
                    onClick={() => handleEdit(entry)}
                    className="text-sm text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDelete(entry.id)}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                    </div>
                </div>
                ))}  
            </div>
            )}
        </>
    );
}