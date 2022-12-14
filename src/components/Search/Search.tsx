import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { searchHeroes } from "../../state/Heroes/async-actions/search-heroes";
import { getHeroes } from "../../state/Heroes/async-actions/get-heroes";

export function Search() {
    const dispatch = useAppDispatch();
    const [heroesQuery, setHeroesQuery] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);

    const search = () => {
        dispatch(searchHeroes({
            heroesQuery
        }));
    };

    const loadPage = () => {
        dispatch(getHeroes({page: pageNumber}));
    };
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                search();
            }}>
                <input
                    type="text"
                    value={heroesQuery}
                    onInput={(e: FormEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement;
                        setHeroesQuery(target.value);
                    }}
                    placeholder="Найти персонажа"
                />
                <button type="submit" disabled={!heroesQuery?.trim()}>Найти</button>
            </form>
            <div>
                <input
                    type="number"
                    value={pageNumber}
                    onInput={(e: FormEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement;
                        setPageNumber(+target.value);
                    }}
                />
                <button
                    disabled={pageNumber < 1}
                    onClick={loadPage}>
                    Перейти
                </button>
            </div>
        </div>
    );
}