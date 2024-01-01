import React from "react"
import HeroDraftedContainer from "../components/hero-drafted-container"

export default function Home() {
  return (
    <main className="main">
      <HeroDraftedContainer type={"team"}/>
      <HeroDraftedContainer type={"enemy"}/>
      <HeroDraftedContainer type={"ban"}/>
    </main>
  )
}
