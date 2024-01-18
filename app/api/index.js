async function GetHeroStats() {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        const response = await fetch(
            "https://api.opendota.com/api/heroStats",
            requestOptions
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

export { GetHeroStats };
