/* eslint-disable @next/next/no-img-element */
import React from "react";

const HeroGridComponent = ({
    heroClassName,
    heroGridStyle,
    heroGridContainerStyle,
    imageStyle,
    heroArray,
    width,
    height,
    onSelectHero,
    headerTextClassName,
}) => {
    return (
        <div>
            <div className={headerTextClassName}>{heroClassName}</div>

            {heroArray ? (
                <div className={heroGridContainerStyle}>
                    {heroArray.map((hero, index) => {
                        return (
                            <div key={index} className={heroGridStyle} onClick={() => onSelectHero(hero)}>
                                {
                                    <img
                                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.shortName}.png`}
                                        alt="Hero"
                                        width={width}
                                        height={height}
                                        className={imageStyle}
                                    />
                                }
                            </div>
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
