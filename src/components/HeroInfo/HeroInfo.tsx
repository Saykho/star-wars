import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addFavoriteHero } from "../../state/Heroes/heroes-slice";
import heartImage from "../../assets/img/heart.png";
import { Hero } from "../../state/Heroes/models/hero.model";
import "./HeroInfo.scss";

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
        <div className="hero">
            <img src={props.hero.avatarUrl} alt="Avatar" className="hero__avatar"/>
            <div className="hero__info">
                <div className="hero-name">{props.hero.name}</div>
                <div className="hero-birthYear">Birth Year: {props.hero.birthYear}</div>
                <div className="hero-gender">Gender: {props.hero.gender}</div>
                <div className="hero-height">Height: {props.hero.height}</div>
                <div className="hero-homeworld">Homeworld: {props.hero.homeworld}</div>
            </div>
            {!props.readonly && <img src={heartImage} onClick={() => {addFavHero(props.hero.id);}} className="hero__favorite"/>}
        </div>
    );
}