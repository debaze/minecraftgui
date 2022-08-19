import {GUI, TEXTURES, Loader, Layer, Component, Color, Font, Utils} from "../src/index.js";
import Config from "./config.js";

const loader = new Loader();
await loader.load(...Config.PRIMARY_SOURCES, ...Config.SECONDARY_SOURCES);





GUI.preferredScale = 2;
Utils.resize();

const {symbols, colors} = await (await fetch(Config.font)).json();
Object.assign(Font, {symbols, colors});
const layers = await (await fetch(Config.gui)).json();





for (let layer of layers) {
	layer.background = new Color(layer.background);

	// Construct layer components
	for (const i in layer.components) {
		let component = layer.components[i];

		layer.components[i] = new Component[component.type](component);

		component = layer.components[i];

		if (component instanceof Component.Text) {
			component.background &&= new Color(component.background);
			component.format();
		}
	}

	layer = new Layer(layer);
	layer.compute();
	layer.visible && layer.draw();
}



addEventListener("resize", () => Utils.debounce(() => {
	Utils.resize();

	for (const layer of GUI.layers) {
		layer.compute().redraw();
	}
}, 50));