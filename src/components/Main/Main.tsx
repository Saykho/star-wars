import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCurrentPageHeroes, selectError, selectNextUrl, selectPrevUrl } from "../../state/Heroes/heroes-slice";
import { getHeroes } from "../../state/Heroes/async-actions/get-heroes";
import { getHeroesByUrl } from "../../state/Heroes/async-actions/get-hero-by-url";
import { Search } from "../Search/Search";
import { HeroInfo } from "../HeroInfo/HeroInfo";
import { Link } from "react-router-dom";
import "./Main.scss";
import rightArrow from "../../assets/img/right-arrow.svg"
import leftArrow from "../../assets/img/left-arrow.svg"

export function Main() {
    const heroes = useAppSelector(selectCurrentPageHeroes);
    const dispatch = useAppDispatch();
    const nextPageUrl = useAppSelector(selectNextUrl);
    const prevPageUrl = useAppSelector(selectPrevUrl);
    const error = useAppSelector(selectError);

    useEffect(() => {
        if (!heroes.length) {
            dispatch(getHeroes({page: 1}));
        }
    }, []);

    const loadHeroesByUrl = (url: string) => {
        dispatch(getHeroesByUrl({url}));
    };

    return (
        <div className="hero-cards">
            <Search/>
            {error && <div className="hero-cards__error">Ошибка: {error}</div>}
            <div className="hero-cards__list">
                {
                    heroes.map(hero => (
                        <HeroInfo hero={hero} readonly={false} key={hero.id}/>
                    ))
                }
            </div>
            {prevPageUrl && <button className="hero-cards__prev-button" onClick={() => {
                loadHeroesByUrl(prevPageUrl!);
            }}>
                <img src={leftArrow} alt="Arrow right"/>
            </button>}

            {nextPageUrl && <button className="hero-cards__next-button" onClick={() => {
                loadHeroesByUrl(nextPageUrl!);
            }}>
                <img src={rightArrow} alt="Arrow right"/>
            </button>}
            <Link to="/favorite">
                <button className="hero-cards__go-favorite-button">Перейти в Избранные</button>
            </Link>
        </div>
    );
}