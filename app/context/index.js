"use client";

import { createContext, useState } from "react";

export const AppContext = createContext({
    heroSelected: null,
    heroSelectedId: null,
    addHeroToDraft: () => {},
    removeHeroFromDraft: () => {},
});

export default function AppProvider({ children }) {
    const [heroSelected, setHeroSelected] = useState(null);
    const [draftedTeam, setDraftedTeam] = useState(["a", "b", "c", "d", "e"]);
    const [draftedEnemy, setDraftedEnemy] = useState(["a", "b", "c", "d", "e"]);
    const [draftedBans, setDraftedBans] = useState(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j","k"]);
    const [heroSelectedId, setHeroSelectedId] = useState(null);

    const addHeroToDraft = (hero, draftType) => {
        const draftTypeFunctions = {
            team: setDraftedTeam,
            ban: setDraftedBans,
            enemy: setDraftedEnemy,
        };

        const selectedFunction = draftTypeFunctions[draftType];
        if (selectedFunction) {
            selectedFunction((prevDraftedTeam) => {
                const updatedDraft = [...prevDraftedTeam];

                const isHeroAlreadyDrafted = updatedDraft.some((draftedHero) => draftedHero && draftedHero.id === hero.id);
                const isHeroInDraftedTeam = draftedTeam.some((draftedHero) => draftedHero && draftedHero.id === hero.id);
                const isHeroInDraftedEnemy = draftedEnemy.some((draftedHero) => draftedHero && draftedHero.id === hero.id);
                const isHeroInDraftedBan = draftedBans.some((draftedHero) => draftedHero && draftedHero.id === hero.id);

                if (isHeroInDraftedTeam || isHeroInDraftedEnemy || isHeroInDraftedBan) {
                    console.log(`${hero.name} is already drafted elsewhere and cannot be added again.`);
                    return updatedDraft;
                }
                if (draftType === "team" || draftType === "enemy") {
                    let replaceIndex = 4;
                    if (!isHeroAlreadyDrafted) {
                        if (updatedDraft[4] === "e") {
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[3] === "d") {
                            replaceIndex = 3;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[2] === "c") {
                            replaceIndex = 2;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[1] === "b") {
                            replaceIndex = 1;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[0] === "a") {
                            replaceIndex = 0;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[0] != "a") {
                            return updatedDraft;
                        }

                        console.log(updatedDraft);
                    } else {
                        console.log(`${hero.name} is already drafted and cannot be added again.`);
                    }
                } else if (draftType === "ban") {
                    let replaceIndex = 10;
                    if (!isHeroAlreadyDrafted) {
                        if (updatedDraft[10] === "k") {
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[9] === "j") {
                            replaceIndex = 9;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[8] === "i") {
                            replaceIndex = 8;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[7] === "h") {
                            replaceIndex = 7;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[6] === "g") {
                            replaceIndex = 6;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[5] === "f") {
                            replaceIndex = 5;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[4] === "e") {
                            replaceIndex = 4;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[3] === "d") {
                            replaceIndex = 3;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[2] === "c") {
                            replaceIndex = 2;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[1] === "b") {
                            replaceIndex = 1;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[0] === "a") {
                            replaceIndex = 0;
                            updatedDraft[replaceIndex] = hero;
                        } else if (updatedDraft[0] != "a") {
                            return updatedDraft;
                        }
                    } else {
                        console.log(`${hero.name} is already drafted and cannot be added again.`);
                    }
                }

                return updatedDraft;
            });
        }
    };

    const removeHeroFromDraft = (hero, heroId) => {
        console.log("RemoveHeroFromDraft");
    };

    const value = {
        heroSelectedId,
        setHeroSelectedId,
        heroSelected,
        setHeroSelected,
        draftedTeam,
        setDraftedTeam,
        draftedEnemy,
        setDraftedEnemy,
        draftedBans,
        setDraftedBans,
        addHeroToDraft,
        removeHeroFromDraft,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
