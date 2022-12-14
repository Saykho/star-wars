import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addFavoriteHero } from "../../state/Heroes/heroes-slice";
import heartImage from "../../assets/img/heart.png";
import { Hero } from "../../state/Heroes/models/hero.model";

interface HeroProps {
    hero: Hero;
    readonly: boolean;
}

export function HeroInfo(props: HeroProps) {
    const dispatch = useAppDispatch();
    const addFavHero = (heroId: number) => {
        dispatch(addFavoriteHero({heroId}));
    };

    return (
        <>
            <div>{props.hero.name}</div>
            <div>{props.hero.homeworld}</div>
            <img src={props.hero.avatarUrl} alt="Avatar"/>
            {!props.readonly && <img src={heartImage} onClick={() => {addFavHero(props.hero.id);}}/>}
        </>
    );
}