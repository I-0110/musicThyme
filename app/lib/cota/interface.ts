import { Tempo, Mood, Moves, InstrumentFamily, Dynamics, Instruments } from '@/app/lib/cota/types';

export interface VideoSource {
    youtube?: string; // YouTube URI
}

export interface Vocabulary { // Use this for Vocabulary Section
    characterId: string,
    term: string,
    definition: string,
    example: string
}

export interface Character {
    id: string;
    title: string; // Use this for Overview Card: 1
    characterName: string; // Use this for Overview Card: 1
    orderNumber: number; // Use this for Overview Card: 1

    // Video sources
    video: VideoSource; // Use this for Overview Card: 2

    // Character Image
    imageUrl?: string; // Use this for Overview Card: 1
}

export interface CharacterSection {
    slug: string;
    title: string;
}

export interface Details {
    // Correct answers and details for each character
    characterId: string; 
    mood: Mood[]; // Use this for Overview Card: 3
    tempo: Tempo; // Use this for Overview Card: 3
    dynamics: Dynamics[]; // Use this for Overview Card: 3
    moves: Moves[]; // Use this for Overview Card: 4
}

export interface Instrumentation { // Use this for Content Card: 2
    characterId: string;
    mainFamily: InstrumentFamily[]; 
    instruments: Instruments[];

    // Instrument Image
    imageUrl?: string;

    // Video sources
    video: VideoSource;
}

export interface Content { 
    // Educational content
    characterId: string; // Use this for Content Card: 1
    description: string; // Use this for Content Card: 1
    musicalFacts: string[]; // Use this for Content Card: 1
    funFacts: string; // Use this for Content Card: 3
    performanceVideo: string[]; // Use this for Content Card: 4
}

export interface LessonPlan {
    // Teacher content
    characterId: string; // Use this for Content Card: 5
    video: VideoSource; // Use this for Content Card: 5
    activities: string[]; // Use this for Content Card: 5
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