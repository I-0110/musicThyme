import { Tempo, Mood, Movements, InstrumentFamily, Dynamics, Instruments } from '@/app/lib/cota/types';

export interface QuizOption {
    id: string;
    label: string;
    type: 'tempo' | 'mood' | 'movement' | 'instrument' | 'dynamics';
}

export interface AudioSource {
    spotify?: string; // Spotify track ID or URI
    startTime?: number; // Start time in seconds for the clip (20 to 30s)
    endTime?: number; // End time in seconds for the clip
}

export interface CharacterOrder {
    id: string;
    title: string;
    characterName: string;
    orderNumber: number;

    // Audio sources
    audio: AudioSource;

    // Correct answers and details for each character
    correctAnswers: {
        tempo: Tempo;
        mood: Mood;
        movement: Movements[];
        mainFamily: InstrumentFamily[];
        instruments: Instruments[];
        dynamics: Dynamics[];
    };

    // Educational content
    description: string;
    musicalFacts: string[];
    funFacts: string;

    // Character Image
    imageUrl?: string;
}

export interface QuizQuestion {
    id: string;
    movementId: string;
    text: string;
    type: 'tempo' | 'mood' | 'movement' | 'instrument' | 'dynamics';
    options: QuizOption[];
    correctAnswerId: string;
    hint?: string;
    explanation: string;
}