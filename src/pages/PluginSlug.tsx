import { useLocation } from 'preact-iso';
import getData from "../backendHandlers/getData";
import { useEffect, useState } from 'preact/compat';
import * as DOMPurify from 'dompurify/dist/purify';
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function PluginSlug() {
    const [$data, $setData] = useState(<></>);

    const $pluginIdInPath = useLocation().path.slice(9);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const $data = await getData();
                var correct: boolean = false;
                for (var i = 3; i < $data.addons.length; i++) {
                    if ($pluginIdInPath === $data.addons[i].id) {
                        correct = true;
                        break;
                    }
                }
                if (!correct) {
                    $setData(
                        <div className="hero pt-60 dark flex center middle">
                            <h1 className="text-center">404</h1>
                        </div>
                    )
                }
                const addon = $data.addons[i];
                const id = addon.id || "This plugin's entry inside manifest.json is invalid.";
                const description = addon.description || "This plugin doesn't have a description.";
                const title = addon.name || id[0].toUpperCase() + id.slice(1).replace("_", " ");
                const version = addon.version;
                const $codeString = "lpm install " + id;
                $setData(
                    <>
                        <div className="pt-60 dark flex center middle">
                            <div>
                                <h1 className="text-center">{title}</h1>
                                <p className="description text-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(description.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")), { ALLOWED_TAGS: ['a', 'code'] }) }} ></p>
                                <div className="flex center">
                                    <div className="flex two center content-fit">
                                        <a href="/plugins" className="button mainButton mr-10">Browse Source code</a>
                                        <a className="button customButton mainButton">Latest Version: {version}</a>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2>Run the following to install:</h2>
                                    <div class="tabs three">
                                        <input id='tab-1' type='radio' name='tabgroupB' checked />
                                        <label class="pseudo button toggle" htmlFor="tab-1">lpm</label>
                                        <input id='tab-2' type='radio' name='tabgroupB' />
                                        <label class="pseudo button toggle" htmlFor="tab-2">miq</label>
                                        <input id='tab-3' type='radio' name='tabgroupB' />
                                        <label class="pseudo button toggle" htmlFor="tab-3">Balloon</label>
                                        <div className="row wfull">
                                            <div className="wfull">
                                                <div className="flex two center">
                                                    <span className="content-fit codeblock">
                                                        <span style={{ "color": "#42c6ff" }}>$</span> <span style={{ "color": "#ff42ff" }}>lpm</span> <span style={{ "color": "#ffee70" }}>install</span> <span style={{ "color": "#f77260" }}>{id}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="wfull">
                                                <div className="flex two center">
                                                    <span className="content-fit codeblock">
                                                        <span style={{ "color": "#42c6ff" }}>$</span> <span style={{ "color": "#ff42ff" }}>miq</span> <span style={{ "color": "#ffee70" }}>install</span> <span style={{ "color": "#f77260" }}>{id}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="wfull">
                                                <div className="flex two center">
                                                    <SyntaxHighlighter className="content-fit" language="lua" style={a11yDark}>
                                                        {$codeString}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex two center">
                            <SyntaxHighlighter className="content-fit" language="lua" style={a11yDark}>
                                {$codeString}
                            </SyntaxHighlighter>
                        </div>
                    </>
                )

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return $data;
}
