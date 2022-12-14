import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectFavoriteHeroes } from "../../state/Heroes/heroes-slice";
import { HeroInfo } from "../HeroInfo/HeroInfo";
import { Link } from "react-router-dom";

export function FavoriteHeroes() {
    const favoriteHeroes = useAppSelector(selectFavoriteHeroes);

    return (
        <div>
            {
                favoriteHeroes.map(hero => (
                   <HeroInfo hero={hero} readonly={true}/>
                ))
            }
            <Link to="/">
                <button>Перейти в Главное меню</button>
            </Link>
        </div>
    );
}