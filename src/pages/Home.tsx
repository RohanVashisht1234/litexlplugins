import liteXL from "../assets/lite-xl.svg";

export function Home() {
  return (
    <div className="hero pt-60 dark flex center middle">
      <div>
        <h1 className="text-center">View Lite XL Plugins</h1>
        <div className="flex center">
          <div className="flex two center content-fit">
            <a href="/plugins" className="button mainButton mr-10">View plugins</a>
            <a href="https://lite-xl.com/en/downloads" className="button mainButton">Download Lite XL</a>
          </div>
        </div>
      </div>
      <img
        className="hero-image"
        src={liteXL}
      />
    </div>
  );
}
