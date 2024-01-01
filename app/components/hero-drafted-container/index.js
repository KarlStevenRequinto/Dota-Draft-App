/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "./styles.module.css"
import Image from "next/image"

const HeroDraftedContainer = () => {
  return (
    // main container
    <div className={styles.container}>
      {/* shadow container */}
      <div className={styles.outerShadowContainer}>
        {/* image container */}
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/static/images/antimage.png"
              alt="where's the hero image bro?"
              width={80}
              height={65}
            />
          </div>
        </div>
      </div>
      {/* colored container */}
      <div className={styles.draftColorContainer}></div>
    </div>
  )
}

export default HeroDraftedContainer
