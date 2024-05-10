import {
	LocationProvider,
	Router,
	Route,
	hydrate,
	prerender as ssr,
} from "preact-iso";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";
import { Plugins } from "./pages/Plugins";
import { PluginSlug } from "./pages/PluginSlug"
import "../node_modules/picnic/picnic.min.css";

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/plugins" component={Plugins} />
					<Route path="/plugins/*" component={PluginSlug} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
