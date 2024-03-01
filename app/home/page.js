"use client";
import React, { useState, useEffect, useContext } from "react";
import HeroDraftedContainer from "../components/hero-drafted-container";
import ImmortalLogo from "../components/immortal-logo";
import styles from "./styles.module.css";
import HeroGridComponent from "../components/hero-grid-container";
import { GetHeroesOpenDota, GetMatchUps } from "../api";
import { AGAINST_CORE, AGAINST_SUPPORT } from "../constants/mock-data";
import Image from "next/image";
import { Federo, Mukta_Vaani } from "next/font/google";
import { AppContext } from "../context";
const federo = Federo({ subsets: ["latin"], weight: "400" });
const mukta = Mukta_Vaani({ subsets: ["latin"], weight: "400" });

export default function Home() {
    const [isAgainstLoading, setIsAgainstLoading] = useState(false);
    const [strHeroes, setStrHeroes] = useState(null);
    const [agiHeroes, setAgiHeroes] = useState(null);
    const [univHeroes, setUnivHeroes] = useState(null);
    const [intHeroes, setIntHeroes] = useState(null);
    const [gifHeroSource, setGifHeroSource] = useState(null);
    const [selectedHero, setSelectedHero] = useState(null);
    const [selectedHeroClass, setSelectedHeroClass] = useState(null);
    const [heroList, setHeroList] = useState([]);
    const [goodAgainstCore, setGoodAgainstCore] = useState([]);
    const [goodAgainstSupp, setGoodAgainstSupp] = useState([]);
    const [badAgainstCore, setBadAgainstCore] = useState([]);
    const [badAgainstSupp, setBadAgainstSupp] = useState([]);
    const [suggestCoreList, setSuggestCoreList] = useState([]);
    const [suggestSupportList, setSuggestSupportList] = useState([]);
    const [selectedEnemyList, setSelectedEnemyList] = useState([]);

    const appContext = useContext(AppContext);
    const draftedTeam = appContext.draftedTeam;
    const draftedEnemy = appContext.draftedEnemy;
    const draftedBans = appContext.draftedBans;

    const fetchHeroes = async () => {
        try {
            const heroesList = await GetHeroesOpenDota();
            const extractHeroes = heroesList.map((item) => ({
                id: item.id,
                name: item.localized_name,
                shortName: item.name.split("npc_dota_hero_")[1],
                attribute: item.primary_attr,
                roles: item.roles,
            }));

            const strHeroesArray = extractHeroes.filter((hero) => hero.attribute === "str").sort((a, b) => a.name.localeCompare(b.name));
            const agiHeroesArray = extractHeroes.filter((hero) => hero.attribute === "agi").sort((a, b) => a.name.localeCompare(b.name));
            const intHeroesArray = extractHeroes.filter((hero) => hero.attribute === "int").sort((a, b) => a.name.localeCompare(b.name));
            const univHeroesArray = extractHeroes.filter((hero) => hero.attribute === "all").sort((a, b) => a.name.localeCompare(b.name));
            setHeroList(extractHeroes);
            setStrHeroes(strHeroesArray);
            setAgiHeroes(agiHeroesArray);
            setIntHeroes(intHeroesArray);
            setUnivHeroes(univHeroesArray);
        } catch (error) {
            console.error("Error fetching hero stats:", error);
        }
    };

    const fetchMatchups = async (heroId) => {
        const isHeroAlreadyDrafted =
            draftedTeam.some((hero) => hero.id === heroId) ||
            draftedEnemy.some((hero) => hero.id === heroId) ||
            draftedBans.some((hero) => hero.id === heroId);

        if (isHeroAlreadyDrafted) {
            console.log(`Hero with ID ${heroId} is already drafted. Skipping.`);
            return;
        }

        try {
            const data = await GetMatchUps(heroId);
            const updatedData = data.map((dataItem) => {
                const hero = heroList.find((hero) => hero.id === dataItem.hero_id);
                if (hero) {
                    return {
                        id: dataItem.hero_id,
                        roles: hero.roles,
                        shortName: hero.shortName,
                        winrate: +(dataItem.wins / dataItem.games_played).toFixed(4),
                    };
                }
                return dataItem;
            });
            const filteredData = updatedData.sort((a, b) => a.id - b.id);
            setSelectedEnemyList((prevArray) => [...prevArray, filteredData]);
        } catch (error) {
            console.error("Error fetching hero matches:", error);
        }
    };
    const fetchMatches = async (heroId) => {
        setIsAgainstLoading(true);
        try {
            const data = await GetMatchUps(heroId);
            const updatedData = data.map((dataItem) => {
                const hero = heroList.find((hero) => hero.id === dataItem.hero_id);
                if (hero) {
                    return {
                        ...dataItem,
                        roles: hero.roles,
                        shortName: hero.shortName,
                    };
                }
                return dataItem;
            });
            // , "Disabler", "Escape", "Initiator", "Nuker","Durable"
            const filteredCores = updatedData.filter((item) => item.roles.some((role) => ["Carry"].includes(role)));
            const filteredSupports = updatedData.filter((item) => item.roles.some((role) => ["Support"].includes(role)));
            const sortedCores = filteredCores.sort((a, b) => b.wins / b.games_played - a.wins / a.games_played);
            const sortedSupports = filteredSupports.sort((a, b) => b.wins / b.games_played - a.wins / a.games_played);

            const topCores = sortedCores.slice(0, 7);
            const bottomCores = sortedCores.slice(-7);
            const topSupports = sortedSupports.slice(0, 7);
            const bottomSupports = sortedSupports.slice(-7);

            setGoodAgainstCore(topCores);
            setBadAgainstCore(bottomCores);
            setGoodAgainstSupp(topSupports);
            setBadAgainstSupp(bottomSupports);
            setIsAgainstLoading(false);
        } catch (error) {
            console.error("Error fetching hero matches:", error);
        }
    };

    const videoData = "/static/videos/video-bg.webm";
    const heroClasses = ["Strength", "Agility", "Intelligence", "Universal"];
    const alignStyle = { textAlign: "right", fontSize: 12, lineHeight: 1.2 };

    const onSelectHero = (hero) => {
        setSelectedHero(hero);
        appContext.setHeroSelectedId(hero.id);
        setSelectedHeroClass(hero.attribute);
        setGifHeroSource(hero.shortName);
        appContext.setHeroSelected({ ...hero });
        fetchMatches(hero.id);
    };

    const onSelectDraft = (hero, draftType) => {
        GetMatchUps(hero);
        appContext.addHeroToDraft(hero, draftType);
        if (draftType === "enemy") {
            fetchMatchups(hero.id);
        }
    };

    const onDeleteDraft = (hero, index, draftType) => {
        appContext.removeHeroFromDraft(hero, index, draftType);
        if (draftType === "enemy") {
            setSelectedEnemyList((prevList) => {
                const newList = [...prevList];
                newList.splice(index, 1);
                return newList;
            });
        }
    };
    const iconClass =
        selectedHeroClass === "agi"
            ? "hero_agility"
            : selectedHeroClass === "str"
            ? "hero_strength"
            : selectedHeroClass === "int"
            ? "hero_intelligence"
            : selectedHeroClass === "all"
            ? "hero_universal"
            : null;

    useEffect(() => {
        fetchHeroes();
    }, []);

    useEffect(() => {
        const idWinrateMap = {};
        const supportArray = [];

        selectedEnemyList.forEach((heroArray) => {
            heroArray.forEach((hero) => {
                const isHeroDrafted = draftedEnemy.some((draftedHero) => draftedHero.id === hero.id);

                if (!isHeroDrafted) {
                    if (idWinrateMap.hasOwnProperty(hero.id)) {
                        idWinrateMap[hero.id].winrate += hero.winrate;
                        idWinrateMap[hero.id].count += 1;
                    } else {
                        idWinrateMap[hero.id] = { winrate: hero.winrate, count: 1, shortName: hero.shortName, roles: hero.roles };
                    }
                }

                if (hero.roles.includes("Support")) {
                    supportArray.push({ id: hero.id, shortName: hero.shortName, winrate: hero.winrate, roles: hero.roles });
                }
            });
        });

        const newArray = Object.entries(idWinrateMap)
            .map(([id, { winrate, shortName, roles }]) => {
                // Exclude heroes with the role "Support" from newArray
                if (!roles.includes("Support")) {
                    return {
                        id: parseInt(id),
                        shortName,
                        winrate: winrate / selectedEnemyList.length,
                        roles,
                    };
                }
                // Return null for heroes with the role "Support"
                return null;
            })
            .filter((hero) => hero !== null);
        const sortedSupports = supportArray.sort((a, b) => a.winrate - b.winrate);
        const sortedCores = newArray.sort((a, b) => a.winrate - b.winrate);

        setSuggestCoreList(sortedCores);
        setSuggestSupportList(sortedSupports);
    }, [selectedEnemyList, draftedEnemy]);

    return (
        <main className="main">
            <video autoPlay muted loop className={styles.videoBg}>
                <source src={videoData} type="video/webm" />
            </video>

            <header>
                <div className={`${styles.header} flexRow`}>
                    <div className="flexRow">
                        {draftedTeam.map((hero, index) => (
                            <HeroDraftedContainer
                                key={index}
                                type={"team"}
                                hero={hero}
                                onClick={() => {
                                    onDeleteDraft(hero, index, "team");
                                }}
                            />
                        ))}
                    </div>
                    <ImmortalLogo />
                    <div className="flexRow">
                        {draftedEnemy.map((hero, index) => (
                            <HeroDraftedContainer
                                key={index}
                                type={"enemy"}
                                hero={hero}
                                onClick={() => {
                                    onDeleteDraft(hero, index, "enemy");
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className={`${styles.header} flexRow`}>
                    {draftedBans.map((hero, index) => (
                        <HeroDraftedContainer
                            key={index}
                            type={"ban"}
                            hero={hero}
                            onClick={() => {
                                onDeleteDraft(hero, index, "ban");
                            }}
                        />
                    ))}
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
                                    heroGridContainerStyle={styles.gridContainerStyle}
                                    imageStyle={styles.gridImgStyle}
                                    onSelectHero={onSelectHero}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.heroMiniDetailContainer}>
                        <div className={styles.videoGifContainer}>
                            {gifHeroSource ? (
                                <video autoPlay muted loop className={styles.gifVideo} key={gifHeroSource}>
                                    <source
                                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${gifHeroSource}.webm`}
                                        type="video/webm"
                                    ></source>
                                </video>
                            ) : null}
                        </div>
                        <div className={styles.againstContainer}>
                            <div style={{ flex: 1 }}>
                                <div className={styles.againstSpan}>Good Against</div>
                                <div className={styles.against}>
                                    <div>
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <div className={mukta.className} style={alignStyle}>
                                                Core
                                            </div>
                                        )}

                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <HeroGridComponent
                                                heroArray={goodAgainstCore}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={styles.gridContainerStyle}
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <div className={mukta.className} style={alignStyle}>
                                                Support
                                            </div>
                                        )}
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <HeroGridComponent
                                                heroArray={goodAgainstSupp}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={styles.gridContainerStyle}
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className={styles.againstSpan}>Bad Against</div>
                                <div className={styles.against}>
                                    <div>
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <div className={mukta.className} style={alignStyle}>
                                                Core
                                            </div>
                                        )}
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <HeroGridComponent
                                                heroArray={badAgainstCore}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={styles.gridContainerStyle}
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <div className={mukta.className} style={alignStyle}>
                                                Support
                                            </div>
                                        )}
                                        {isAgainstLoading ? (
                                            <span>loading placeholder...</span>
                                        ) : (
                                            <HeroGridComponent
                                                heroArray={badAgainstSupp}
                                                width={60}
                                                height={40}
                                                heroGridStyle={styles.gridStyle}
                                                heroGridContainerStyle={styles.gridContainerStyle}
                                                imageStyle={styles.gridImgStyle}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.draftingContainer}>
                    <div className={styles.tbmContainer}>
                        {gifHeroSource ? (
                            <Image
                                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${gifHeroSource}.png`}
                                fill="layout"
                                alt="hero-image"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                className={styles.heroBGDraftSelect}
                                key={gifHeroSource}
                            />
                        ) : null}

                        {iconClass ? (
                            <Image src={`/static/icons/${iconClass}.png`} width={50} height={50} alt="icon" className={styles.heroClassIcon} />
                        ) : null}

                        <div className={styles.draftSelectContainer}>
                            <span
                                className={`${styles.draftSelectBtn} ${styles.selectTeam}`}
                                onClick={() => onSelectDraft(selectedHero ? selectedHero : null, "team")}
                            >
                                TEAM
                            </span>
                            <span
                                className={`${styles.draftSelectBtn} ${styles.selectBan}`}
                                onClick={() => onSelectDraft(selectedHero ? selectedHero : null, "ban")}
                            >
                                BAN
                            </span>
                            <span
                                className={`${styles.draftSelectBtn} ${styles.selectEnemy}`}
                                onClick={() => onSelectDraft(selectedHero ? selectedHero : null, "enemy")}
                            >
                                ENEMY
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.suggestlist}`}>
                        <div className={styles.rolelabel}>CORE</div>
                        <HeroGridComponent
                            heroArray={suggestCoreList}
                            width={"100%"}
                            height={70}
                            heroGridStyle={styles.suggestStyle}
                            onSelectHero={() => {}}
                        />
                    </div>

                    <div className={`${styles.suggestlist}`}>
                        <div className={styles.rolelabel}>SUPPORT</div>
                        <HeroGridComponent
                            heroArray={suggestSupportList}
                            width={"100%"}
                            height={70}
                            heroGridStyle={styles.suggestStyle}
                            onSelectHero={() => {}}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
