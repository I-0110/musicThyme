'use client'

import { useState, useEffect, useRef, useCallback } from "react";


export default function Metronome () {
    //User-controlled values that trigger re-renders
    const [bpm, setBpm] = useState(120);
    const [playing, setPlaying] = useState(false);
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
        setPlaying(true)
    }


    // Function 5: Stop Metronome'
    const stop = () => {
        if (schedulerIntervalRef.current !== null) {
            clearInterval(schedulerIntervalRef.current)
            schedulerIntervalRef.current = null
        }
        setPlaying(false)
    }


    // Effect Hooks - Restart when BPM changes during playback
    useEffect(() => {
        // Only restart if already playing
        if (playing && schedulerIntervalRef.current !== null) {
            // Clear old interval
            clearInterval(schedulerIntervalRef.current)


            // Restart with new tempo
            if (audioCtxRef.current) {
                nextBeatTimeRef.current = audioCtxRef.current.currentTime + 0.05
                currentBeatRef.current = 0
                schedulerIntervalRef.current = setInterval(scheduler, lookAhead)
            }
        }
    }, [bpm, beatsPerMeasure, playing, scheduler, lookAhead]);


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

    return {
        bpm,
        setBpm,
        beatsPerMeasure,
        setBeatsPerMeasure,
        playing,
        currentBeatRef,
        start,
        stop,
    }
}