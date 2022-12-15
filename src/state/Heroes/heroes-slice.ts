import { Hero } from "./models/hero.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetHeroesResult } from "../../services/star-wars-service/models/get-heroes-result.model";
import { getHeroes } from "./async-actions/get-heroes";
import { searchHeroes } from "./async-actions/search-heroes";
import { GetHeroesError } from "./models/get-heroes-error.model";
import { getHeroesByUrl } from "./async-actions/get-hero-by-url";
import { RootState } from "../index";

export enum HeroesStateStatus {
    loading = "loading",
    idle = "idle",
}

export interface HeroesState {
    heroes: Hero[];
    favoriteHeroIds: number[];
    error: string | null;
    status: HeroesStateStatus;

    currentPageHeroes: Hero[];
    nextUrl: string | null;
    prevUrl: string | null;
}

const initialState: HeroesState = {
    heroes: [],
    favoriteHeroIds: [],
    error: null,
    status: HeroesStateStatus.idle,

    currentPageHeroes: [],
    nextUrl: null,
    prevUrl: null
};

export const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        addFavoriteHero: (state, {payload}: PayloadAction<{
            heroId: number;
        }>) => {
            if (!state.favoriteHeroIds.includes(payload.heroId)) {
                state.favoriteHeroIds.push(payload.heroId);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getHeroes.pending, (state) => {
            getHeroesPendingHandle(state);
        });
        builder.addCase(getHeroes.fulfilled, (state, {payload}) => {
            getHeroesFulfilledHandle(state, payload);
        });
        builder.addCase(getHeroes.rejected, (state, {payload}) => {
            getHeroesRejectedHandle(state, payload);
        });
        builder.addCase(searchHeroes.pending, (state) => {
            getHeroesPendingHandle(state);
        });
        builder.addCase(searchHeroes.fulfilled, (state, {payload}) => {
            getHeroesFulfilledHandle(state, payload);
        });
        builder.addCase(searchHeroes.rejected, (state, {payload}) => {
            getHeroesRejectedHandle(state, payload);
        });
        builder.addCase(getHeroesByUrl.pending, (state) => {
            getHeroesPendingHandle(state);
        });
        builder.addCase(getHeroesByUrl.fulfilled, (state, {payload}) => {
            getHeroesFulfilledHandle(state, payload);
        });
        builder.addCase(getHeroesByUrl.rejected, (state, {payload}) => {
            getHeroesRejectedHandle(state, payload);
        });
    }
});

function getHeroesPendingHandle(state: HeroesState) {
    state.status = HeroesStateStatus.loading;
    state.error = null;
}

function getHeroesFulfilledHandle(state: HeroesState, payload: GetHeroesResult) {
    state.heroes = [...state.heroes, ...payload.heroes.filter(newHero => !state.heroes.find(hero => hero.id === newHero.id))];
    state.nextUrl = payload.nextUrl;
    state.prevUrl = payload.prevUrl;
    state.status = HeroesStateStatus.idle;
    state.currentPageHeroes = payload.heroes;
}

function getHeroesRejectedHandle(state: HeroesState, payload: GetHeroesError | undefined) {
    if (payload) {
        state.error = payload.message;
    }
    state.status = HeroesStateStatus.idle;
}

export const {addFavoriteHero} = heroesSlice.actions;
export default heroesSlice.reducer;
export const selectNextUrl = (state: RootState) => state.heroes.nextUrl;
export const selectPrevUrl = (state: RootState) => state.heroes.prevUrl;
export const selectCurrentPageHeroes = (state: RootState) => state.heroes.currentPageHeroes;
export const selectFavoriteHeroes = (state: RootState) => {
    return state.heroes.heroes.filter(hero => state.heroes.favoriteHeroIds.includes(hero.id));
}
export const selectError = (state: RootState) => state.heroes.error;
export const selectIsHeroesLoading = (state: RootState) => state.heroes.status === HeroesStateStatus.loading;

