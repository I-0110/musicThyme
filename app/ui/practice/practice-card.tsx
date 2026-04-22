"use client";

import { usePractice } from "@/app/lib/practice/usePractice";
import { calculateDuration, minutesToTime } from "@/app/lib/practice/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function PracticeCard() {
    const { 
        entries, 
        handleEdit, 
        handleDelete, 
    } = usePractice();

    return (
        <>
            <h2 className="text-2xl text-thyme-500 font-bold pb-2 mb-3">Previous Practice Sessions</h2>
        
            {entries.length === 0 ? (
            <p className="text-gray-600">No practice sessions logged yet.</p>
            ) : (
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
            {entries.map(entry => (
                <div key={entry.id} className="border border-thyme-300 bg-thyme-100 text-thyme-500 rounded p-4">
                    <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{entry.instrument}</h3>
                    <span className="text-thyme-500 text-sm">
                        {calculateDuration(entry.startTime, entry.endTime)}
                    </span>
                    </div>
                    <p className="text-thyme-300 text-sm mb-2">
                    {new Date(entry.date).toLocaleDateString()} · {minutesToTime(entry.startTime)} → {minutesToTime(entry.endTime)}
                    </p>
                    {entry.piece.length > 0 && <p className="text-sm">Pieces: {entry.piece.join(", ")}</p>}
                    {entry.scales.length > 0 && <p className="text-sm">Scales: {entry.scales.join(", ")}</p>}
                    {entry.study.length > 0 && <p className="text-sm">Studies: {entry.study.join(", ")}</p>}
                    {entry.solos.length > 0 && <p className="text-sm">Solos: {entry.solos.join(", ")}</p>}
                    {entry.notes && <p className="text-md text-thyme-300 mt-2">{entry.notes}</p>}
                    <div className="flex gap-2 mt-2">
                        <button
                        type="button"
                        onClick={() => handleEdit(entry)}
                        className="text-sm px-3 py-1 bg-thyme-300 text-white hover:bg-green-400 transition rounded"
                        >
                            Edit
                            <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(entry.id)}
                            className="px-3 py-1 bg-red-600 text-white hover:bg-red-400 transition rounded"
                        >
                            Delete
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                ))}  
            </div>
            )}
        </>
    )
}