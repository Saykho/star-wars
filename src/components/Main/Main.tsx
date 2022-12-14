import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCurrentPageHeroes, selectError, selectNextUrl, selectPrevUrl } from "../../state/Heroes/heroes-slice";
import { getHeroes } from "../../state/Heroes/async-actions/get-heroes";
import { getHeroesByUrl } from "../../state/Heroes/async-actions/get-hero-by-url";
import { Search } from "../Search/Search";
import { HeroInfo } from "../HeroInfo/HeroInfo";
import { Link } from "react-router-dom";

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
        <>
            <Search/>
            {error && <div>Ошибка: {error}</div>}
            {
                heroes.map(hero => (
                    <HeroInfo hero={hero} readonly={false} key={hero.id}/>
                ))
            }
            {prevPageUrl && <button onClick={() => {
                loadHeroesByUrl(prevPageUrl!);
            }}>Предыдущая страница
            </button>}

            {nextPageUrl && <button onClick={() => {
                loadHeroesByUrl(nextPageUrl!);
            }}>Следующая страница
            </button>}
            <Link to="/favorite">
                <button>Перейти в Избранные</button>
            </Link>
        </>
    );
}