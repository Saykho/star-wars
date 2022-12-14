import { createAsyncThunk } from "@reduxjs/toolkit";
import { StarWarsService } from "../../../services/star-wars-service/star-wars-service";
import { GetHeroesResult } from "../../../services/star-wars-service/models/get-heroes-result.model";
import { GetHeroesError } from "../models/get-heroes-error.model";


export const getHeroes = createAsyncThunk<GetHeroesResult, { page: number }, { rejectValue: GetHeroesError }>(
    "heroes/getHeroes",
    async ({page}, thunkAPI) => {
        try {
            return await StarWarsService.getHeroes(page);
        } catch (e: any) {
            return thunkAPI.rejectWithValue({
                message: e.message
            });
        }
    }
);


