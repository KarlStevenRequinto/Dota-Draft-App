"use client";

import { createContext, useState } from "react";

export const AppContext = createContext({
    heroSelected: null,
    addHeroToDraft: () => {},
    removeHeroFromDraft: () => {},
});

export default function AppProvider({ children }) {
    const [heroSelected, setHeroSelected] = useState(null);

    const addHeroToDraft = (selectedArray, heroId) => {
        console.log("AddHeroToDraft");
    };

    const removeHeroFromDraft = (selectedArray, heroId) => {
        console.log("RemoveHeroFromDraft");
    };

    console.log("heroSelected in AppProvider:", heroSelected ? heroSelected.shortName : "wala pa");

    const value = {
        heroSelected,
        setHeroSelected,
        addHeroToDraft,
        removeHeroFromDraft,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
