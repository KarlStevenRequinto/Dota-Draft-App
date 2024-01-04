/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react"
import { GetHeroStats } from "@/app/api"
import styles from "./styles.module.css"

const HeroUndraftedContainer = () => {
  const heroImage = "/static/images/antimage.png"
  
  return (
    // make the container shadow later
    <div className={styles.container}>
      {heroImage && (
        <img src={heroImage} className={styles.image} alt="Hero Image" />
      )}
    </div>
  )
}

export default HeroUndraftedContainer
