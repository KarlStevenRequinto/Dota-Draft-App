"use client";
import React, { useState, useEffect } from "react";
import HeroDraftedContainer from "../components/hero-drafted-container";
import ImmortalLogo from "../components/immortal-logo";
import styles from "./styles.module.css";
import HeroGridComponent from "../components/hero-grid-container";
import { GetHeroStats } from "../api";
import { AGAINST_CORE, AGAINST_SUPPORT } from "../constants/mock-data";
import Image from "next/image";
import { Federo, Mukta_Vaani } from "next/font/google";

const federo = Federo({ subsets: ["latin"], weight: "400" });
const mukta = Mukta_Vaani({ subsets: ["latin"], weight: "400" });

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
                                    width={90}
                                    height={40}
                                    key={heroClass}
                                    heroGridStyle={styles.gridStyle}
                                    heroGridContainerStyle={
                                        styles.gridContainerStyle
                                    }
                                    imageStyle={styles.gridImgStyle}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.heroMiniDetailContainer}>
                        <div className={styles.videoGifContainer}>
                            <video
                                autoPlay
                                muted
                                loop
                                className={styles.gifVideo}
                            >
                                <source
                                    src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ancient_apparition.webm"
                                    type="video/webm"
                                ></source>
                            </video>
                        </div>
                        <div className={styles.againstContainer}>
                            <div
                                style={{
                                    background:
                                        "linear-gradient(to bottom, var(--green-03), var(--green-04))",
                                    flex: 1,
                                }}
                            >
                                <div className={styles.againstSpan}>
                                    Good Against
                                </div>
                                <div className={styles.against}>
                                    <div>
                                        <div
                                            className={mukta.className}
                                            style={{
                                                textAlign: "right",
                                                fontSize: 12,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            Core
                                        </div>
                                        {
                                            <HeroGridComponent
                                                heroArray={AGAINST_CORE}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={
                                                    styles.gridContainerStyle
                                                }
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        }
                                    </div>
                                    <div>
                                        <div
                                            className={mukta.className}
                                            style={{
                                                textAlign: "right",
                                                fontSize: 12,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            Support
                                        </div>
                                        {
                                            <HeroGridComponent
                                                heroArray={AGAINST_SUPPORT}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={
                                                    styles.gridContainerStyle
                                                }
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    background:
                                        "linear-gradient(to bottom, var(--red-03), var(--red-04))",
                                    flex: 1,
                                }}
                            >
                                <div className={styles.againstSpan}>
                                    Bad Against
                                </div>
                                <div className={styles.against}>
                                    <div>
                                        <div
                                            className={mukta.className}
                                            style={{
                                                textAlign: "right",
                                                fontSize: 12,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            Core
                                        </div>
                                        {
                                            <HeroGridComponent
                                                heroArray={AGAINST_CORE}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={
                                                    styles.gridContainerStyle
                                                }
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        }
                                    </div>
                                    <div>
                                        <div
                                            className={mukta.className}
                                            style={{
                                                textAlign: "right",
                                                fontSize: 12,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            Support
                                        </div>
                                        {
                                            <HeroGridComponent
                                                heroArray={AGAINST_SUPPORT}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={
                                                    styles.gridContainerStyle
                                                }
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.draftingContainer}>
                    <div className={styles.tbmContainer}>
                        <Image
                            src={"/static/images/antimage.png"}
                            fill="layout"
                            alt="hero-image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className={styles.heroBGDraftSelect}
                        />
                        <Image
                            src={"/static/icons/hero_agility.png"}
                            width={50}
                            height={50}
                            alt="icon"
                            className={styles.heroClassIcon}
                        />

                        <div className={styles.draftSelectContainer}>
                            <span className={`${styles.draftSelectBtn}`}>
                                TEAM
                            </span>
                            <span className={`${styles.draftSelectBtn}`}>
                                BAN
                            </span>
                            <span className={`${styles.draftSelectBtn}`}>
                                ENEMY
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.suggestlist} ${styles.core}`}>
                        <span>CORE</span>
                        <HeroGridComponent
                            heroArray={AGAINST_CORE}
                            width={190}
                            height={70}
                        />
                    </div>
                    <div className={`${styles.suggestlist}`}>
                        <span>SUPPORT</span>
                        <HeroGridComponent
                            heroArray={AGAINST_SUPPORT}
                            width={190}
                            height={70}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
