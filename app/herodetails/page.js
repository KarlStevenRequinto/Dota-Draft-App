/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { GetHeroStats } from "../api";
import Image from "next/image";
const HeroDetails = () => {
    const [heroStats, setHeroStats] = useState(null);
    // attributePrimary
    // agi, all, str, int
    useEffect(() => {
        const fetchHeroStats = async () => {
            try {
                const data = await GetHeroStats();
                const newData = data.slice(1);
                console.log(newData);
                setHeroStats(newData);
            } catch (error) {
                console.error("Error fetching hero stats:", error);
            }
        };

        fetchHeroStats();
    }, []);

    return (
        <div>
            {heroStats ? (
                <ul>
                    {heroStats.map((hero, index) => {
                        console.log(heroStats.length); // Log each hero object
                        return (
                            <span key={index}>
                                {
                                    <img
                                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.shortName}.png`}
                                        alt="Hero"
                                        width={128}
                                        height={72}
                                    />
                                }
                            </span>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading hero stats...</p>
            )}
        </div>
    );
};

export default HeroDetails;
