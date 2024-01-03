"use client"
import React, { useEffect, useState } from "react"
import { getData, getHero } from "@/app/api"
const HeroUndraftedContainer = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroData = await getHero()
        const valuesArray = Object.values(heroData)
        valuesArray.forEach((hero) => {
          console.log(hero.id) // This will log each individual item
          // You can access specific properties of each item like hero.id, hero.name, etc.
        })
      } catch (error) {
        console.error("Error fetching hero data:", error)
        // Handle error
      }
    }

    fetchData()
  }, [])

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
