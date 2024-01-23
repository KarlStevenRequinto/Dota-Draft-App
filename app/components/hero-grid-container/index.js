/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "./styles.module.css"

const HeroGridComponent = ({heroClassName}) => {
  return (
    <div>
      <div>{heroClassName}</div>
      <div>hero grid</div>
    </div>
  )
}

export default HeroGridComponent
