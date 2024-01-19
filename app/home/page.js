"use client";
import React from "react";
import HeroDraftedContainer from "../components/hero-drafted-container";
import ImmortalLogo from "../components/immortal-logo";
import styles from "./styles.module.css";

export default function Home() {
    const videoData = "/static/videos/video-bg.webm";

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
                <div className={`${styles.header} flexRow`}>{banContainers}</div>
            </header>
        </main>
    );
}
