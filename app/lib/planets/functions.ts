import { planetMvt } from "./main-data";
import { planetDetails } from "./overview-data";
import { Planet, Details } from "./interface";

// Find Planet by Id, so user can access individual page with more information
export function getPlanetById(id: string): Planet | undefined {
    return planetMvt.find(planet => planet.id === id);
}

// Get Details by planetId
export function getPlanetDetails(planetId: string): Details | undefined {
    return planetDetails.find(d => d.planetId === planetId);
}