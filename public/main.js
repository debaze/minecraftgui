import {GUI, TEXTURES, Loader, Layer, Component, Color, Font, Utils} from "../src/index.js";
import Config from "./config.js";

const loader = new Loader();

await loader.load(...Config.PRIMARY_SOURCES);
await loader.load(...Config.SECONDARY_SOURCES);

GUI.preferredScale = 4;
Utils.resize();

const {char, color} = await (await fetch(Config.font)).json();
Font.symbols = char;
Font.colors = color;
const layers = await (await fetch(Config.gui)).json();

for (let layer of layers) {
	let newComponents = [];

	for (const component of layer.components) {
		let type = component.type;
		delete component.type;

		newComponents.push(new Component[type](component));
	}

	layer = new Layer({
		background: new Color(0x202124),
		components: newComponents,
	});

	layer.compute().draw();

	addEventListener("resize", () => Utils.debounce(() => {
		Utils.resize();

		layer.compute().redraw();
	}, 50));
}