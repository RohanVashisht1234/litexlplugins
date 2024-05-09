import { useEffect, useState } from "preact/compat";

export function Plugins() {
    const [compiledData, setCompiledData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                const compiledData = compileData(data);
                setCompiledData(compiledData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section>
            <div className="flex dark pt-60 center text-center">
                <h1>Browse Plugins</h1>
            </div>
            <div className="dark flex justifyContent pb-40 mb-40">
                <input className="dark adjusted-width" type="text" placeholder="Start typing" />
            </div>
            <div className="flex three space-evenly">
                {compiledData}
            </div>
        </section>
    );
}

function compileData(data) {
    const generatedData = [];
    for (let i = 3; i < data.addons.length; i++) {
        const addon = data.addons[i];
        const id = addon.id || "This plugin's entry inside manifest.json is invalid.";
        const description = addon.description || "This plugin doesn't have a description.";
        const title = addon.name || id[0].toUpperCase() + id.slice(1).replace("_", " ");
        generatedData.push(
            <article key={i} className="card darker content-fit adjusted-width">
                <footer>
                    <h3 style={{padding:"0"}}>{title}</h3>
                    <p>{id}</p>
                    <p>{description}</p>
                    <button>View plugin</button>
                </footer>
            </article>
        );
    }
    return generatedData;
}

async function getData() {
    const res = await fetch(
        "https://raw.githubusercontent.com/lite-xl/lite-xl-plugins/master/manifest.json"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
