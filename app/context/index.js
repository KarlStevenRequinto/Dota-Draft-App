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

    const addHeroToDraft = (selectedArray, heroId) => {
        console.log("AddHeroToDraft");
    };

    const removeHeroFromDraft = (selectedArray, heroId) => {
        console.log("RemoveHeroFromDraft");
    };

    // console.log("heroSelected in AppProvider:", heroSelectedId ? heroSelectedId : null);

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
