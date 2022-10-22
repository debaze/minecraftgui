import {Instance, TEXTURE_PATH, TEXTURES, Component, BackgroundLayer, Layer} from "./index.js";
import {Group} from "./gui/Group.js";
import {debounce, log, resize} from "./utils/index.js";

export function Loader() {
	this.progress = null;
	this.logs = false;

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
		const
			now = performance.now(),
			{logs} = this;
		let image;
		sources = new Set(sources);

		if (this.progress) {
			const step = (100 - this.progress.percent) / sources.size;

			for (const source of sources) {
				TEXTURES[source] = await load(image, source, this.logs);
				this.progress.advance(step);
			}

			// Unbind the progress bar
			this.progress = null;
		} else {
			for (const source of sources) {
				TEXTURES[source] = await load(image, source, this.logs);
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

				if (component.class === "Group") {
					// Construct group components
					let group = component;

					for (let i in group.components) {
						component = group.components[i];

						if (component.class === "Group") {
							log("system.error.group.contains_group");

							continue;
						}

						group.components[i] = new Component[component.class](component);
					}

					layer.components[i] = new Group(group);

					continue;
				}

				layer.components[i] = new Component[component.class](component);
			}

			layer = new Layer(layer);
		}

		addEventListener("resize", () => debounce(() => {
			resize();

			BackgroundLayer.resize().draw();
		}, 50));

		return Instance.gui.layers;
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

/**
 * Loads an image asynchronously and returns it.
 * 
 * @async
 * @param	{mixed}		image	Placeholder variable for the Image element
 * @param	{string}	source	Image path
 * @param	{boolean}	logs	Determines whether to show load logs
 * @return	{Image}
 */
const load = async (image, source, logs) => {
	image = new Image();
	image.src = TEXTURE_PATH + source;

	try {
		await image.decode();
	} catch (error) {
		console.error(`Could not load ${image.src}: the resource was not found.`);
	}

	logs && console.log(`%c${source} loaded`, "color: #777; font-style: italic");

	return image;
};