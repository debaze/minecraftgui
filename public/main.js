import {Instance, Loader, BackgroundLayer, HoverLayer, Layer, Component, Color, Font, Utils, TEXTURES} from "../src/index.js";
import Sources from "./sources.js";

const {symbols, colors} = await (await fetch("assets/font/default.json")).json();
Object.assign(Font, {symbols, colors});

const settings = await (await fetch("public/settings.json")).json();
Instance.init();
await Instance.setup(settings);

Utils.resize();
BackgroundLayer.init().hide();

const loader = new Loader();
await loader.load(...Sources.PRIMARY_SOURCES);

const
	progress = new Component.Progress({
		align: ["center", "bottom"],
		margin: [0, 86],
		length: 536,
	}),
	loadingScreen = new Layer({
		name: "mojang-loading-screen",
		components: [
			new Component.Image({
				align: ["center", "center"],
				margin: [-128, 0],
				size: [256, 128],
				source: "gui/title/mojangstudios.png",
				uv: [0, 0],
				scale: 0.5,
			}),
			new Component.Image({
				align: ["center", "center"],
				margin: [128, 0],
				size: [256, 128],
				source: "gui/title/mojangstudios.png",
				uv: [0, 256],
				scale: 0.5,
			}),
			progress,
		],
	});
loadingScreen.canvas.style.zIndex = 10;
loadingScreen.canvas.style.backgroundColor = new Color(Instance.data.mojang_backgrounds[+Instance.settings.monochrome_logo]).hex;
loadingScreen.compute().draw();

loader.bind(progress);
await loader.load(...Sources.SECONDARY_SOURCES);

const
	layers = await loader.loadLayers("assets/gui.json"),
	mainMenu = layers["main-menu"],
	optionMenu = layers["option-menu"];

// Prepare the main menu before fading out the loading screen
// Set the version number
const version = mainMenu.get("version");
version.text = Instance.getName();
version.format();

function titleModifier(ctx) {
	const
		{x, y, source} = this,
		[w, h] = this.size,
		[u, v] = this.uv,
		offsets = [
			[-1, 0],	// Left offset
			[1, 0],		// Right offset
			[0, 1],		// Top offset
			[0, -1],	// Bottom offset
		];

	ctx.globalCompositeOperation = "destination-over";
	for (const o of offsets) {
		ctx.drawImage(
			TEXTURES[source],
			u, v,
			w, h,
			x + o[0], y + o[1],
			w, h,
		);
	}

	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = "#000";
	ctx.fillRect(x - 1, y - 1, w + 1, h + 2);

	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(
		TEXTURES[source],
		u, v,
		w, h,
		x, y,
		w, h,
	);
}
let titleLeft = mainMenu.get("title_left"),
	titleRight = mainMenu.get("title_right");
// titleLeft.drawModifier = titleModifier;
// titleRight.drawModifier = titleModifier;

const optionButton = mainMenu.get("main").get("options");
optionButton.on("click", () => {
	BackgroundLayer.show();
	mainMenu.toggle();
	HoverLayer.clearAllHovered();
	optionMenu.compute().toggle().draw();
});

const optionDone = optionMenu.get("done");
optionDone.on("click", () => {
	BackgroundLayer.hide();
	HoverLayer.clearAllHovered();
	optionMenu.toggle();
	mainMenu.toggle();
});

// Show the main menu while the loading screen is faded out
BackgroundLayer.draw();
mainMenu.compute().draw();
loadingScreen.toggle(2000, 500);