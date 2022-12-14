import { Hero } from "../../../state/Heroes/models/hero.model";

export interface GetHeroesResult {
    prevUrl: string;
    nextUrl: string;
    heroes: Hero[];
}