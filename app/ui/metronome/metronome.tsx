'use client'
import { StopIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Metronome () {
    // User-controleed values that trigger re-renders
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

    // Internal values that DON'T trigger re-renders (performance)
    const audioCtxRef = useRef<AudioContext | null>(null);
    const nextBeatTimeRef = useRef(0);
    const currentBeatRef = useRef(0);
    const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Timing Constants
    const scheduleAheadTime = 0.1; //milliseconds
    const lookAhead = 25; //seconds

    // Function 1: Schedule a Beat
    const scheduleBeat = useCallback((time: number, isAccent: boolean) => {
        if (!audioCtxRef.current) return

        const ctx = audioCtxRef.current
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        // Frequency: 1000 Hz for accent, 800 Hz for regular beats
        osc.frequency.value = isAccent ? 1000 : 800

        // Volume envelope: Quick attack, exponential decay
        gain.gain.setValueAtTime(0.3, time)
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1)

        // Audio routing
        osc.connect(gain)
        gain.connect(ctx.destination)

        // Schedule to play at EXACT time (not "now")
        osc.start(time)
        osc.stop(time + 0.1)
    }, []);

    // Function 2: Calculate Next Beat Time
    const nextBeat = useCallback(() => {
        const secondsPerBeat = 60.0 / bpm
        nextBeatTimeRef.current += secondsPerBeat
        currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure
    }, [bpm, beatsPerMeasure])

    // Function 3: The Scheduler (Core Algorithm)
    const scheduler = useCallback(() => {
        if (!audioCtxRef.current) return

        const currentTime = audioCtxRef.current?.currentTime

        // Schedule all beats within the lookahead window
        while (nextBeatTimeRef.current < currentTime + scheduleAheadTime) {
            const isAccent = currentBeatRef.current === 0
            scheduleBeat(nextBeatTimeRef.current, isAccent)
            nextBeat()
        }
    }, [scheduleAheadTime, scheduleBeat, nextBeat])

    // Function 4: Start Metronome
    const start = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext()
        }

        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }

        // Initialize: First beat 50ms from now
        nextBeatTimeRef.current = audioCtxRef.current.currentTime + 0.05
        currentBeatRef.current = 0

        // Run scheduler every 25ms
        schedulerIntervalRef.current = setInterval(scheduler, lookAhead)
        setIsPlaying(true)
    }

    // Function 5: Stop Metronome'
    const stop = () => {
        if (schedulerIntervalRef.current !== null) {
            clearInterval(schedulerIntervalRef.current)
            schedulerIntervalRef.current = null
        }
        setIsPlaying(false)
    }

    // Effect Hooks - Restart when BPM changes during playback
    useEffect(() => {
        // Only restart if already playing
        if (isPlaying && schedulerIntervalRef.current !== null) {
            // Clear old interval
            clearInterval(schedulerIntervalRef.current)

            // Restart with new tempo
            if (audioCtxRef.current) {
                nextBeatTimeRef.current = audioCtxRef.current.currentTime + 0.05
                currentBeatRef.current = 0
                schedulerIntervalRef.current = setInterval(scheduler, lookAhead)
            }
        }
    }, [bpm, beatsPerMeasure, isPlaying, scheduler, lookAhead]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (schedulerIntervalRef.current !== null) {
                clearInterval(schedulerIntervalRef.current)
            }
            if (audioCtxRef.current) {
                audioCtxRef.current.close()
            }
        }
    }, [])

    // UI Component 
    return (
        <div className="flex min-h-screen items-center justify-center bg-thyme-100">
            <div className="w-full max-w-md bg-white border-2 border-thyme-400 rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-thyme-500 text-center mb-8">
                    Metronome
                </h1>

                <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-thyme-300 mb-2">
                        {bpm}
                    </div>
                    <div className="text-lg text-thyme-400">BPM</div>
                </div>

                <div className="mb-6">
                    <input
                        type="range"
                        min="40"
                        max="240"
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                        className="w-full h-2 bg-thyme-200 rounded-lg apparance-none cursor-pointer accent-thyme-300"
                    />
                    <div className="flex justify-between text-sm text-thyme-400 mt-1">
                        <span>40</span>
                        <span>240</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-thyme-500 font-medium mb-2">
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
                    onClick={isPlaying ? stop : start}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                        isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-thyme-300 hover:bg-thyme-200 text-white'
                    }`}
                >
                    {isPlaying ? (
                        <>
                            <StopIcon className="w-6 h-6" />
                            Stop
                        </>
                    ) : (
                        <>
                            <PlayIcon className="w-6 h-6" />
                            Start
                        </>
                    )}
                </button>

                <div className="grid grid-cols-4 gap-2 mt-4">
                    {[60, 90, 120, 140].map((tempo) => (
                        <button
                            key={tempo}
                            onClick={() => setBpm(tempo)}
                            className="py-2 bg-thyme-200 hover:bg-thyme-300 text-thyme-500 rounded font-medium transition-colors"
                        >
                            {tempo}
                        </button>
                    ))}
                </div>      
            </div>
        </div>
    )
}