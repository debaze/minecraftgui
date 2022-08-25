import {GUI, TEXTURE_PATH, TEXTURES, Component, Layer, Utils} from "./index.js";
import {log} from "./utils/index.js";

export function Loader() {
	this.progress = null;
	this.logs = true;

	this.bind = progress => {
		if (!(progress instanceof Component.Progress)) return log("system.error.invalid_component_type");

		this.progress = progress;
	};

	/**
	 * Loads the given sources into actual images.
	 * 
	 * @param	{...string}	Sources to load
	 */
	this.load = async (...sources) => {
		sources = new Set(sources);
		let now = performance.now(),
			image;

		if (this.progress) {
			const step = (100 - this.progress.percent) / sources.size;

			for (const source of sources) {
				await load(image, source, this.logs);
				this.progress.advance(step);
			}

			// Unbind the progress bar
			this.progress = null;
		} else {
			for (const source of sources) {
				await load(image, source, this.logs);
			}
		}

		this.logs && console.log(`%cLoading finished (took ${((performance.now() - now) / 1000).toFixed(2)}s)`, "color: #6cbf6c");
	};

	this.loadLayers = async source => {
		const layers = await (await fetch(source)).json();

		for (let layer of layers) {
			// Construct layer components
			for (const i in layer.components) {
				let component = layer.components[i];

				layer.components[i] = new Component[component.class](component);
			}

			layer = new Layer(layer);
		}

		addEventListener("resize", () => Utils.debounce(() => {
			Utils.resize();

			const layers = Object.values(GUI.layers);
			for (const layer of layers) {
				layer.compute().redraw();
			}
		}, 50));

		return GUI.layers;
	};

	/**
	 * Removes the given resources from the memory by replacing them with a white pixel
	 * and deleting access to them in the loaded texture list.
	 * 
	 * @param	{...string}	Sources to unload
	 */
	this.unload = async (...sources) => {
		if (!TEXTURES["misc/white.png"]) return console.error("The unload texture was not found.");

		sources = new Set(sources);

		for (const source of sources) {
			TEXTURES[source].src = TEXTURE_PATH + "misc/white.png";

			await TEXTURES[source].decode();

			TEXTURES.delete(source);
		}
	};
};

const load = async (image, source, logs) => {
	image = new Image();
	image.src = TEXTURE_PATH + source;

	try {
		await image.decode();
	} catch (error) {
		console.error(`Could not load ${image.src}: the resource was not found.`);
	}

	TEXTURES[source] = image;

	logs && console.log(`%c${source} loaded`, "color: #777; font-style: italic");
};