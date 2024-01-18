"use client";
import React from "react";

export default function Home() {
    const videoData = "/static/videos/video-bg.webm";

    return (
        <main className="main">
            <video autoPlay muted loop>
                <source src={videoData} type="video/webm" />
            </video>
        </main>
    );
}
