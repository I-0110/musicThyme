import { PlanetId, LessonCategory, YtChannels, TpT } from "./types";

export interface Planet {
    id: PlanetId;
    title: string; // Use this for Overview Card: 1
    planetName: string; // Use this for Overview Card: 1
    orderNumber: number; // Use this for Overview Card: 1

    // Video sources
    youtube?: string; // Use this for Overview Card: 2

    // Character Image
    imageUrl?: string; // Use this for Overview Card: 1
}

export interface PlanetSection {
    slug: string;
    title: string;
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