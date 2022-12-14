import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "../../src/state/Heroes/heroes-slice";

export const store = configureStore({
    reducer: {
        heroes: heroesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;