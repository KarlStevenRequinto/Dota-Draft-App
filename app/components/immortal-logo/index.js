/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react"
import styles from "./styles.module.css"

const ImmortalLogo = () => {
  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source src="/static/videos/flame-gif.mp4" type="video/mp4" />
      </video>
      <div className={styles.innerContainer}>
        <img
          src={"/static/images/immortal-logo.png"}
          alt="logo"
          width={"100%"}
          height={"100%"}
          className={styles.image}
        />
      </div>
    </div>
  )
}

export default ImmortalLogo
