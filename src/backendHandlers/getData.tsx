export default async function getData() {
    const res = await fetch(
        "https://raw.githubusercontent.com/lite-xl/lite-xl-plugins/master/manifest.json"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
