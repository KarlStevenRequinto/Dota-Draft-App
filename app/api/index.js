const GetHero = async () => {
  const myHeaders = new Headers()
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiZWQ1YTY4ZjEtMGNkMS00NDE0LWI1MzYtYzhlMzQ0MWZjOTQwIiwiU3RlYW1JZCI6IjE0NzM2Nzg4NSIsIm5iZiI6MTcwMjkxMzU2MywiZXhwIjoxNzM0NDQ5NTYzLCJpYXQiOjE3MDI5MTM1NjMsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.OLJA1BUiqvfHxtjhrcsLhAPC5zzaOVVVLGp2h1JJvOs"
  )

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  try {
    const response = await fetch(
      "https://api.stratz.com/api/v1/Hero",
      requestOptions
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const result = await response.json()
    return result // Return the result to be used elsewhere
  } catch (error) {
    console.log("Error:", error)
    throw error // Rethrow the error to be caught elsewhere if needed
  }
}

const GetHeroImage = async () => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    const response = await fetch(
      "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
      requestOptions
    )
    return response
  } catch (error) {
    console.log("error", error)
    return null
  }
}

async function GetHeroStats() {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    const response = await fetch(
      "https://api.opendota.com/api/heroStats",
      requestOptions
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.log("error", error)
    return null
  }
}
export { GetHero, GetHeroImage, GetHeroStats }
