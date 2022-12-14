import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetHeroesResult } from "../../../services/star-wars-service/models/get-heroes-result.model";
import { GetHeroesError } from "../models/get-heroes-error.model";
import { StarWarsService } from "../../../services/star-wars-service/star-wars-service";

export const getHeroesByUrl = createAsyncThunk<GetHeroesResult, { url: string }, { rejectValue: GetHeroesError }>(
    "heroes/getHeroesByUrl",
    async ({url}, thunkAPI) => {
        try {
            return await StarWarsService.getHeroesByUrl(url);
        } catch (e: any) {
            return thunkAPI.rejectWithValue({
                message: e.message
            });
        }
    }
);