import Logo from "../assets/logo.svg";
import { RiMenu3Line } from "react-icons/ri";

export function Header() {
	return (
		<nav className="dark">
			<a href="/" className="brand">
				<img className="logo" src={Logo} />
				<span>Lite XL Themes</span>
			</a>
			<input id="bmenub" type="checkbox" className="show" />
			<label for="bmenub" className="burger pseudo button">
				<RiMenu3Line />
			</label>
			<div className="menu">
				<a href="https://lite-xl.com" className="pseudo button icon-picture">
					Download Lite XL
				</a>
				<a href="/plugins" className="button icon-puzzle">
					Plugins
				</a>
			</div>
		</nav>
	);
}
