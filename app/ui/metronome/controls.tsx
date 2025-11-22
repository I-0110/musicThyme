'use client';

import useMetronome from "@/app/lib/metronome/useMetronome";
import { StopIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function Controls() {
    const {
        bpm, 
        setBpm, 
        beatsPerMeasure,
        setBeatsPerMeasure,
        playing,
        start,
        stop
    } = useMetronome()

    return (
        <>
            <div className="text-center mb-4">
                <div className="text-5xl font-bold text-thyme-300 mb-2">
                    {bpm}
                </div>
                <div className="text-lg text-thyme-400">BPM</div>
            </div>

            <div className="mb-4">
                <input
                    type="range"
                    min="1"
                    max="240"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-full h-6 bg-thyme-200 rounded-lg apparance-none cursor-pointer accent-thyme-300"
                />
                <div className="flex justify-between text-sm text-thyme-400 mt-0">
                    <span>1</span>
                    <span>240</span>
                </div>
            </div>

            <div className="mb-3">
                <label className="block text-thyme-500 font-medium mb-3">
                    Beats per Measure
                </label>
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={beatsPerMeasure}
                    onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
                    className="w-full px-4 py-2 border-2 border-thyme-400 rounded-lg text-thyme-500 focus:outline-none focus:border-thyme-300"
                />
            </div>

            <button
                onClick={playing ? stop : start}
                className={`w-full py-1 rounded-sm font-bold text-md transition-all flex items-center justify-center gap-2 ${
                    playing
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                {playing ? (
                    <>
                        <StopIcon className="w-8 h-8" />
                        Stop
                    </>
                ) : (
                    <>
                        <PlayIcon className="w-8 h-8" />
                        Start
                    </>
                )}
            </button>

            <div className="grid grid-cols-4 gap-2 mt-2">
                {[40, 60, 66, 76, 82, 90, 120, 140].map((tempo) => (
                    <button
                        key={tempo}
                        onClick={() => setBpm(tempo)}
                        className="py-2 bg-thyme-200 hover:bg-thyme-300 text-thyme-500 hover:text-white rounded font-medium transition-colors"
                    >
                        {tempo}
                    </button>
                ))}
            </div> 
        </>    
    )
}