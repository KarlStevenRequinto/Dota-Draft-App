"use client";

import { createContext } from "react";

export const AppContext = createContext({
    heroSelected: "heroSelected",
    addHeroToDraft: () => {},
    removeHeroFromDraft: () => {},
});

export default function AppProvider({ children }) {
    const addHeroToDraft = (selectedArray, heroId) => {
        console.log("AddHeroToDraft");
    };

    const removeHeroFromDraft = (selectedArray, heroId) => {
        console.log("RemoveHeroFromDraft");
    };
    const value = {
        ids: "my ids",
        addHero: addHeroToDraft,
        removeHero: removeHeroFromDraft,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
