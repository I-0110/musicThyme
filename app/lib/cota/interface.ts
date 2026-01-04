import { Articulation, Tempo, Mood, Moves, InstrumentFamily, Dynamics, Instruments, Pitch, Time, LessonCategory, CharacterId, YtChannels, TpT } from '@/app/lib/cota/types';

export interface VideoSource {
    youtube?: string; // YouTube URI
}

export interface Activities {
    activityCat1: LessonCategory[];
    activity1: string; // Use this for Content Card: 5
    activityCat2: LessonCategory[];
    activity2: string; 
}

export interface Credits {
    videoCreatedBy: YtChannels[];
    activitiesCreatedBy?: string[];
    people?: PeopleContact[];
    more?: string[];
}

export interface PeopleContact {
    name: string;
    description: string;
    email?: string;
    ytChannel?: YtChannels;
    fbLink?: string;
    tpt?: TpT;
    otherLink?: string;
}

export interface Vocabulary { // Use this for Vocabulary Section
    characterId?: CharacterId;
    term: string;
    definition: string;
    example: string;
}

export interface Character {
    id: CharacterId;
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
    characterId: CharacterId; 
    mood: Mood[]; // Use this for Overview Card: 3
    articulation?: Articulation[];
    tempo: Tempo[]; // Use this for Overview Card: 3
    timeSignature?: Time;
    dynamics: Dynamics[]; // Use this for Overview Card: 3
    pitch?: Pitch[];
    moves: Moves[]; // Use this for Overview Card: 4
}

export interface Instrumentation { // Use this for Content Card: 2
    characterId: CharacterId;
    mainFamily: InstrumentFamily[]; 
    instruments: Instruments[];
}

export interface Instrument {
    instrumentId: Instrument;
    imageUrl?: string;
    video?: VideoSource;
}

export interface Content { 
    // Educational content
    characterId: CharacterId; // Use this for Content Card: 1
    description: string; // Use this for Content Card: 1
    musicalFacts: string[]; // Use this for Content Card: 1
    funFacts: string; // Use this for Content Card: 3
    // Video sources
    video: VideoSource; // Use this for Content Card: 4
}

export interface LessonPlan {
    // Teacher content
    characterId: CharacterId;
    videoCat: LessonCategory[]; 
    video: VideoSource; 
    videoNotes?: string;
    videoCat2?: LessonCategory[];
    video2?: VideoSource; 
    videoNotes2?: string;
    videoCat3?: LessonCategory[];
    video3?: VideoSource; 
    videoNotes3?: string;
    activities: Activities;
    coloring?: string;
    parachute?: string;
    parachuteVideo?: VideoSource;
    parachuteImage?: string[];
    credits?: Credits;
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