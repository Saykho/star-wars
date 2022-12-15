import React from "react";
import styled, { keyframes } from "styled-components";
import "./Loader.scss";

interface LoaderProps {
    isShow: boolean;
}

export function Loader(props: LoaderProps) {
    return props.isShow ?
        (<div className="loader-wrapper">
            <div className="loader-circle"></div>
        </div>) : null;
}