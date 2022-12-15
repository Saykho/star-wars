import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectFavoriteHeroes } from "../../state/Heroes/heroes-slice";
import { HeroInfo } from "../HeroInfo/HeroInfo";
import { Link } from "react-router-dom";
import "./FavoriteHeroes.scss";

export function FavoriteHeroes() {
    const favoriteHeroes = useAppSelector(selectFavoriteHeroes);

    return (
        <>
            <Link to="/">
                <button className="go-main-button">Перейти в Главное меню</button>
            </Link>
            <div className="favorite-heroes">
                {
                    favoriteHeroes.map(hero => (
                        <HeroInfo hero={hero} readonly={true} key={hero.id}/>
                    ))
                }
            </div>
        </>
    );
}