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
    const [draftedTeam, setDraftedTeam] = useState([]);
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
            const isHeroAlreadyDrafted = [...draftedTeam, ...draftedBans, ...draftedEnemy].some((draftedHero) => draftedHero.id === hero.id);

            if (!isHeroAlreadyDrafted) {
                selectedFunction((prevDraftedTeam) => {
                    if (draftType === "team" && prevDraftedTeam.length >= 5) {
                        console.log(`Maximum limit reached for draftedTeam. Cannot add ${hero.name}.`);
                        return prevDraftedTeam;
                    } else if (draftType === "enemy" && prevDraftedTeam.length >= 5) {
                        console.log(`Maximum limit reached for draftedEnemy. Cannot add ${hero.name}.`);
                        return prevDraftedTeam;
                    } else if (draftType === "ban" && prevDraftedTeam.length >= 11) {
                        console.log(`Maximum limit reached for ${draftType}. Cannot add ${hero.name}.`);
                        return prevDraftedTeam;
                    }

                    const updatedDraft = [...prevDraftedTeam, hero];
                    console.log(updatedDraft);
                    return updatedDraft;
                });
            } else {
                console.log(`${hero.name} is already drafted and cannot be added again.`);
            }
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
