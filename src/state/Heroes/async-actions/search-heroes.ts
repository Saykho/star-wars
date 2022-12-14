import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetHeroesResult } from "../../../services/star-wars-service/models/get-heroes-result.model";
import { StarWarsService } from "../../../services/star-wars-service/star-wars-service";
import { GetHeroesError } from "../models/get-heroes-error.model";

export const searchHeroes = createAsyncThunk<GetHeroesResult, { heroesQuery: string }, { rejectValue: GetHeroesError }>(
    "heroes/searchHeroes",
    async ({heroesQuery}, thunkAPI) => {
        try {
            return await StarWarsService.searchHeroes(heroesQuery);
        } catch (e: any) {
            return thunkAPI.rejectWithValue({
                message: e.message
            });
        }
    }
);
