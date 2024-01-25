/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";

const HeroGridComponent = ({ heroClassName, heroArray, width, height }) => {
    return (
        <div className={styles.container}>
            <div>{heroClassName}</div>

            {heroArray ? (
                <div>
                    {heroArray.map((hero, index) => {
                        return (
                            <span key={index} style={{marginLeft:3,marginRight:3}}>
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
                </div>
            ) : (
                <p>Loading hero stats...</p>
            )}
        </div>
    );
};

export default HeroGridComponent;
