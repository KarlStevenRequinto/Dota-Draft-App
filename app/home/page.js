"use client";
import React from "react";
import HeroDraftedContainer from "../components/hero-drafted-container";
import ImmortalLogo from "../components/immortal-logo";
import styles from "./styles.module.css";

export default function Home() {
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

    const heroBoxComponent = (heroClass) => {
        return <div key={heroClass}>{heroClass}</div>;
    };

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
                        {heroClasses.map((heroClass) =>heroBoxComponent(heroClass))}
                    </div>
                    <div className={styles.heroMiniDetailContainer}>
                    <div className={styles.againstContainer}>good against</div>
                    <div className={styles.againstContainer}>bad against</div>
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
