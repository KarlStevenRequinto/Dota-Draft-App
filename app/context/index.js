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
    const [draftedEnemy, setDraftedEnemy] = useState([]);
    const [draftedBans, setDraftedBans] = useState([]);
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

                // Find the index to replace, starting from the end
                let replaceIndex = 4;
                // Check if the hero is not already drafted
                const isHeroAlreadyDrafted = updatedDraft.some((draftedHero) => draftedHero && draftedHero.id === hero.id);

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
                        console.log(`team is full`);
                    }

                    console.log(updatedDraft);
                } else {
                    console.log(`${hero.name} is already drafted and cannot be added again.`);
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
