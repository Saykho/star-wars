import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import heroesReducer from "../../src/state/Heroes/heroes-slice";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    heroes: heroesReducer
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;