import { PlanetId, LessonCategory, YtChannels, TpT } from "./types";
import { Meter, Tempo, Dynamics } from "./types";
import { Instruments, InstrumentFamily } from "../instrument-type";

export interface Planet {
    id: PlanetId;
    title: string; 
    planetName: string; 
    orderNumber: number; 
    // Video sources
    youtube?: string; 
    fullMvt?: string;

    // Character Image
    imageUrl?: string; 
}

export interface PlanetSection {
    slug: string;
    title: string;
}

export interface Details {
    // Correct answers and details for each character
    planetId: PlanetId; 
    meter: Meter[];
    tempo: Tempo[]; 
    dynamics: Dynamics[];
    instrumentsFamily: InstrumentFamily[];
    instruments: Instruments[];
}

export interface Activities {
    activityCat1: LessonCategory[];
    activity1: string; // Use this for Content Card: 5
    activityCat2: LessonCategory[];
    activity2: string; 
}

export interface Vocabulary { // Use this for Vocabulary Section
    planetId?: PlanetId;
    term: string;
    definition: string;
    example: string;
}

export interface LessonPlan {
    // Teacher content
    planetId: PlanetId;
    videoCat: LessonCategory[]; 
    video: string; 
    videoNotes?: string;
    videoCat2?: LessonCategory[];
    video2?: string; 
    videoNotes2?: string;
    videoCat3?: LessonCategory[];
    video3?: string; 
    videoNotes3?: string;
    videoCat4?: LessonCategory[];
    video4?: string;
    videoNotes4?: string;
    activities?: Activities;
    coloring?: string;
    parachute?: string;
    parachuteVideo?: string;
    parachuteImage?: string[];
    credits?: Credits;
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