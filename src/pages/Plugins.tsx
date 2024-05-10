import { useEffect, useState } from "preact/compat";
import { marked } from "marked";
import * as DOMPurify from 'dompurify/dist/purify';
import getData from "../backendHandlers/getData";

export function Plugins() {
    const [compiledData, setCompiledData] = useState([]);
    const [$data, $setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                $setData(data);
                const compiledData = await compileData(data);
                setCompiledData(compiledData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function Search() {
        let searchBox = document.getElementById("searchBox") as HTMLInputElement;
        const generatedData = [];
        for (let i = 3; i < $data.addons.length; i++) {
            const addon = $data.addons[i];
            const id = addon.id || "This plugin's entry inside manifest.json is invalid.";
            const description = addon.description || "This plugin doesn't have a description.";
            const title = addon.name || id[0].toUpperCase() + id.slice(1).replace("_", " ");
            if (!id.toLowerCase().includes(searchBox.value.toLowerCase()) || !description.toLowerCase().includes(searchBox.value.toLowerCase())) {
                continue;
            }
            generatedData.push(
                <article key={i} className="card darker content-fit adjusted-width">
                    <footer>
                        <h3 style={{ padding: "0" }}>{title}</h3>
                        <p>{id}</p>
                        <p className="description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(description.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")), { ALLOWED_TAGS: ['a', 'code'] }) }} ></p>
                        <a className="button" href={"/plugins/" + id}>View plugin</a>
                    </footer>
                </article>
            );
        }
        setCompiledData(generatedData);
    }

    return (
        <section>
            <div className="hero__plugins">
                <div className="flex dark pt-60 center text-center">
                    <h1>Browse Plugins</h1>
                </div>
                <div className="dark flex justifyContent pb-40 mb-40">
                    <input id="searchBox" onInput={Search} className="dark adjusted-width" type="text" placeholder="Start typing" />
                </div>
            </div>
            <div className="flex three space-evenly">
                {compiledData}
            </div>
        </section>
    );
}

async function compileData(data) {
    const generatedData = [];
    for (let i = 3; i < data.addons.length; i++) {
        const addon = data.addons[i];
        const id = addon.id || "This plugin's entry inside manifest.json is invalid.";
        const description = addon.description || "This plugin doesn't have a description.";
        const title = addon.name || id[0].toUpperCase() + id.slice(1).replace("_", " ");
        generatedData.push(
            <article key={i} className="card darker content-fit adjusted-width">
                <footer>
                    <h3 style={{ padding: "0" }}>{title}</h3>
                    <p>{id}</p>
                    <p className="description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(description.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")), { ALLOWED_TAGS: ['a', 'code'] }) }} ></p>
                    <a className="button" href={"/plugins/" + id}>View plugin</a>
                </footer>
            </article>
        );
    }
    return generatedData;
}
