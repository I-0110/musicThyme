import { planetMvt } from "./main-data";
import { planetDetails } from "./overview-data";
import { planetLesson } from "./lesson-data";
import { Planet, Details, LessonPlan } from "./interface";

// Find Planet by Id, so user can access individual page with more information
export function getPlanetById(id: string): Planet | undefined {
    return planetMvt.find(planet => planet.id === id);
}

// Get Details by planetId
export function getPlanetDetails(planetId: string): Details | undefined {
    return planetDetails.find(d => d.planetId === planetId);
}

// Get Instruments by planetId
export function getPlanetInstruments(planetId: string): { instruments: string[]; instrumentsFamily: string[]; } | undefined {
    const details = getPlanetDetails(planetId);
    if( !details) return undefined;

    return {
        instruments: details.instruments,
        instrumentsFamily: details.instrumentsFamily,
    };
}

// Get Lesson Plan by planetId
export function getPlanetLessonPlan(planetId: string): LessonPlan | undefined {
    return planetLesson.find( lesson => lesson.planetId === planetId);
}