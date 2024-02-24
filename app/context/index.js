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
    const [draftedBans, setDraftedBans] = useState(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]);
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

                if (draftType === "team") {
                    if (!isHeroAlreadyDrafted) {
                        const slots = "abcde";
                        let replaceIndex = -1;
                        for (let i = 4; i < slots.length; i--) {
                            if (updatedDraft[i] === slots[i]) {
                                replaceIndex = i;
                                break;
                            }
                        }

                        if (replaceIndex !== -1) {
                            updatedDraft[replaceIndex] = hero;
                            console.log(updatedDraft);
                        } else {
                            return updatedDraft;
                        }
                        console.log(updatedDraft);
                    } else {
                        console.log(`${hero.name} is already drafted and cannot be added again.`);
                    }
                } else if (draftType === "ban") {
                    if (!isHeroAlreadyDrafted) {
                        const slots = "abcdefghij";
                        let replaceIndex = -1;
                        for (let i = 0; i < slots.length; i++) {
                            if (updatedDraft[i] === slots[i]) {
                                replaceIndex = i;
                                break;
                            }
                        }
                        if (replaceIndex !== -1) {
                            updatedDraft[replaceIndex] = hero;
                        } else {
                            return updatedDraft;
                        }
                    } else {
                        console.log(`${hero.name} is already drafted and cannot be added again.`);
                    }
                } else if (draftType === "enemy") {
                    if (!isHeroAlreadyDrafted) {
                        const slots = "abcde";
                        let replaceIndex = -1;

                        for (let i = 0; i < slots.length; i++) {
                            if (updatedDraft[i] === slots[i]) {
                                replaceIndex = i;
                                break;
                            }
                        }

                        if (replaceIndex !== -1) {
                            updatedDraft[replaceIndex] = hero;
                            console.log(updatedDraft);
                        } else {
                            return updatedDraft;
                        }
                        console.log(updatedDraft);
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
