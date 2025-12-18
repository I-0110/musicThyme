import { Tempo, Mood, Moves, InstrumentFamily, Dynamics, Instruments } from '@/app/lib/cota/types';

export interface VideoSource {
    youtube?: string; // YouTube URI
}

export interface Vocabulary {
    term: string,
    definition: string,
    example: string
}

export interface Character {
    id: string;
    title: string;
    characterName: string;
    orderNumber: number;

    // Video sources
    video: VideoSource;

    // Character Image
    imageUrl?: string;
}

export interface Details {
    // Correct answers and details for each character
    mood: Mood[];
    tempo: Tempo;
    dynamics: Dynamics[];
    mainFamily: InstrumentFamily[];
    instruments: Instruments[];
    vocabulary: Vocabulary[];
    moves: Moves[];
}

export interface Content {
    // Educational content
    description: string;
    musicalFacts: string[];
    funFacts: string[];
    performanceVideo: string[];
}

export interface LessonPlan {
    // Teacher content
    activitiesVideo: string[];
    activities: string[];
}

export interface QuizOption {
    id: string;
    label: string;
    type: 'tempo' | 'mood' | 'movement' | 'instrument' | 'dynamics';
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