import { GetHeroesHero } from "./get-heroes-hero.model";

export interface GetHeroesResponse {
    next: string;
    previous: string;
    results: GetHeroesHero[];
}