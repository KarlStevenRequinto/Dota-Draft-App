"use client"
import React, { useEffect, useState } from "react"
const HeroUndraftedContainer = () => {
  return (
    <div>
      <video
        poster="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.png"
        autoPlay
        preload="auto"
        loop
        playsInline
      >
        <source
          type="video/webm"
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.webm"
        ></source>
      </video>
    </div>
  )
}

export default HeroUndraftedContainer
