import { HttpClient } from "../http-client/http-client";
import { GetHeroesResponse } from "./models/get-heroes-response.model";
import { GetHeroesResult } from "./models/get-heroes-result.model";
import { extractIdFromHeroUrl } from "./helpers/extract-id-from-hero-url";
import { getAvatarUrlByHeroId } from "./helpers/get-avatar-url-by-hero-id";
import { Hero } from "../../state/Heroes/models/hero.model";

class StarWarsServiceImpl {
    getHeroes(page: number): Promise<GetHeroesResult> {
        return HttpClient.get<GetHeroesResponse>(`people/?page=${page}`).then(response => {
            return this.mapGetHeroesResponseToResult(response)
        });
    }

    searchHeroes(heroesQuery: string): Promise<GetHeroesResult> {
        return HttpClient.get<GetHeroesResponse>(`people/?search=${heroesQuery}`).then(response => {
            return this.mapGetHeroesResponseToResult(response);
        });
    }

    getHeroesByUrl(url: string): Promise<GetHeroesResult> {
        return HttpClient.get<GetHeroesResponse>(url).then(response => {
            return this.mapGetHeroesResponseToResult(response);
        });
    }

    private async mapGetHeroesResponseToResult(response: GetHeroesResponse): Promise<GetHeroesResult> {
        const heroes: Hero[] = [];

        const homeworldPromises = response.results.map(hero => HttpClient.get<{ name: string }>(hero.homeworld));
        const homeworldResults = await Promise.all(homeworldPromises);

        for (let i = 0; i < response.results.length; i++) {
            const hero = response.results[i];
            const id = extractIdFromHeroUrl(hero.url);
            heroes.push({
                id,
                name: hero.name,
                homeworld: homeworldResults[i].name,
                avatarUrl: getAvatarUrlByHeroId(id),
            });
        }

        return {
            prevUrl: response.previous,
            nextUrl: response.next,
            heroes
        };
    }
}

export const StarWarsService = new StarWarsServiceImpl();