import React from 'react';
import { Route, Routes } from "react-router-dom";
import { FavoriteHeroes } from "./components/FavoriteHeroes/FavoriteHeroes";
import { Main } from "./components/Main/Main";
import "./App.scss";
import { useAppSelector } from "./hooks/hooks";
import { selectIsHeroesLoading } from "./state/Heroes/heroes-slice";
import { Loader } from "./components/Loader/Loader";

function App() {
    const isHeroesLoading = useAppSelector(selectIsHeroesLoading);
    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/favorite" element={<FavoriteHeroes/>}/>
            </Routes>
            <Loader isShow={isHeroesLoading}/>
        </>
    );
}

export default App;
