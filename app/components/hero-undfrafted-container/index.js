/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect,useState } from "react"
import { GetHeroStats } from "@/app/api"
const HeroUndraftedContainer = () => {
  const [heroImage, setHeroImage] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroStats = await GetHeroStats()
        const imageUrl = `https://api.opendota.com${heroStats[0].img}`
        setHeroImage(imageUrl)
      } catch (error) {
        console.error("Error fetching hero data:", error)
      }
    }

    fetchData()
  }, [])

  return <div>{heroImage && <img src={heroImage} alt="Hero Image" />}</div>
}

export default HeroUndraftedContainer
