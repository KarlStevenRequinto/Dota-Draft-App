"use client";
import React, { useState, useEffect } from "react";
import HeroDraftedContainer from "../components/hero-drafted-container";
import ImmortalLogo from "../components/immortal-logo";
import styles from "./styles.module.css";
import HeroGridComponent from "../components/hero-grid-container";
import { GetHeroStats } from "../api";

export default function Home() {
    const [strHeroes, setStrHeroes] = useState(null);
    const [agiHeroes, setAgiHeroes] = useState(null);
    const [univHeroes, setUnivHeroes] = useState(null);
    const [intHeroes, setIntHeroes] = useState(null);
    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const data = await GetHeroStats();
                const newData = data.slice(1);
                const strHeroesArray = newData
                    .filter((hero) => hero.stat.AttributePrimary === "str")
                    .sort((a, b) => a.displayName.localeCompare(b.displayName));
                const agiHeroesArray = newData
                    .filter((hero) => hero.stat.AttributePrimary === "agi")
                    .sort((a, b) => a.displayName.localeCompare(b.displayName));
                const intHeroesArray = newData
                    .filter((hero) => hero.stat.AttributePrimary === "int")
                    .sort((a, b) => a.displayName.localeCompare(b.displayName));
                const univHeroesArray = newData
                    .filter((hero) => hero.stat.AttributePrimary === "all")
                    .sort((a, b) => a.displayName.localeCompare(b.displayName));
                // console.log(strHeroesArray);
                setStrHeroes(strHeroesArray);
                setAgiHeroes(agiHeroesArray);
                setIntHeroes(intHeroesArray);
                setUnivHeroes(univHeroesArray);
            } catch (error) {
                console.error("Error fetching hero stats:", error);
            }
        };

        fetchHeroes();
    }, []);
    const videoData = "/static/videos/video-bg.webm";
    const heroClasses = ["Strength", "Agility", "Intelligence", "Universal"];
    const teamContainers = Array.from({ length: 5 }, (_, index) => (
        <HeroDraftedContainer key={index} type={"team"} />
    ));

    const enemyContainers = Array.from({ length: 5 }, (_, index) => (
        <HeroDraftedContainer key={index} type={"enemy"} />
    ));

    const banContainers = Array.from({ length: 11 }, (_, index) => (
        <HeroDraftedContainer key={index} type={"ban"} />
    ));

    return (
        <main className="main">
            <video autoPlay muted loop className={styles.videoBg}>
                <source src={videoData} type="video/webm" />
            </video>

            <header>
                <div className={`${styles.header} flexRow`}>
                    <div className="flexRow">{teamContainers}</div>
                    <ImmortalLogo />
                    <div className="flexRow">{enemyContainers}</div>
                </div>
                <div className={`${styles.header} flexRow`}>
                    {banContainers}
                </div>
            </header>

            <section id={styles.section}>
                <div className={styles.heroGridContainer}>
                    <div className={styles.heroClassGridContainer}>
                        {heroClasses.map((heroClass) => {
                            return (
                                <HeroGridComponent
                                    heroClassName={heroClass}
                                    heroArray={
                                        heroClass === "Strength"
                                            ? strHeroes
                                            : heroClass === "Agility"
                                            ? agiHeroes
                                            : heroClass === "Intelligence"
                                            ? intHeroes
                                            : univHeroes
                                    }
                                    key={heroClass}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.heroMiniDetailContainer}>
                        <div className={styles.againstContainer}>
                            good against
                        </div>
                        <div className={styles.againstContainer}>
                            bad against
                        </div>
                    </div>
                </div>
                <div className={styles.draftingContainer}>
                    <div className={styles.tbmContainer}>TEAM BAN ENEMY</div>
                    <div>CORE</div>
                    <div>SUPPORT</div>
                </div>
            </section>
        </main>
    );
}
