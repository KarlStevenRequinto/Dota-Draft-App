/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";

const HeroGridComponent = ({ heroClassName, heroArray, width, height }) => {
    return (
        <div>
            <div>{heroClassName}</div>

            {heroArray ? (
                <span>
                    {heroArray.map((hero, index) => {
                        return (
                            <span key={index}>
                                {
                                    <img
                                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.shortName}.png`}
                                        alt="Hero"
                                        width={width}
                                        height={height}
                                    />
                                }
                            </span>
                        );
                    })}
                </span>
            ) : (
                <p>Loading hero stats...</p>
            )}
        </div>
    );
};

export default HeroGridComponent;
