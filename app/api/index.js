const myHeadersStratz = new Headers();

myHeadersStratz.append(
    "Authorization",
    `Bearer ${process.env.NEXT_PUBLIC_STRAZT_API_TOKEN}`
);

const requestOptions = {
    method: "GET",
    redirect: "follow",
};

const requestOptionsStratz = {
    method: "GET",
    headers: myHeadersStratz,
    redirect: "follow",
};

async function GetHeroStats() {
    try {
        const response = await fetch(
            "https://api.stratz.com/api/v1/Hero",
            requestOptionsStratz
        );

        const data = await response.json();
        console.log(data)
        const dataArray = Object.values(data);
        return dataArray;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

export { GetHeroStats };
