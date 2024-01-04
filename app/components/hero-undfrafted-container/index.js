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
        <div className={styles.imageContainer}>
          <img src={heroImage} className={styles.image} alt="Hero Image" />
          <div className={styles.textContainer}>
            <span>Antimage</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroUndraftedContainer
