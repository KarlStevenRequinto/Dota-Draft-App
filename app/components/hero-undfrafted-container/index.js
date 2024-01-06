/* eslint-disable @next/next/no-img-element */
import React from "react"
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
