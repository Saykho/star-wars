import React from 'react';
import { Route, Routes } from "react-router-dom";
import { FavoriteHeroes } from "./components/FavoriteHeroes/FavoriteHeroes";
import { Main } from "./components/Main/Main";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/favorite" element={<FavoriteHeroes/>}/>
        </Routes>
    );
}

export default App;
