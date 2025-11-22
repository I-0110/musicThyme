'use client'

import Controls from './controls'

export default function Metronome() {
    return (
        <div className="flex h-screen items-center justify-center mt-0">
            <div className="w-full max-w-sm shrink-0 bg-transparent dark:bg-thyme-100/5 border-2 border-thyme-400 rounded-xl shadow-md shadow-current p-8 mt-0">
                <h1 className="text-3xl font-bold text-thyme-500 text-center mb-2">
                Metronome
                </h1>
                <Controls />
            </div>
        </div>
    )
}