import {Config, TEXTURES} from "./index.js";

export function Loader() {
	/**
	 * Loads the given sources into actual images.
	 * 
	 * @param	{...string}	Sources to load
	 */
	this.load = async (...sources) => {
		sources = new Set(sources);
		let image,
			now = performance.now();

		for (const source of sources) {
			image = new Image();
			image.src = Config.ABSOLUTE_TEXTURE_PATH + source;

			try {
				await image.decode();
			} catch (error) {
				console.error(`Could not load ${image.src}: the resource was not found.`);
			}

			TEXTURES[source] = image;
		}

		console.log(`Loading finished (took ${((performance.now() - now) / 1000).toFixed(2)}s)`);
	};

	/**
	 * Removes the given resources from the memory by replacing them with a white pixel
	 * and deleting access to them in the loaded texture list.
	 * 
	 * @param	{...string}	Sources to unload
	 */
	this.unload = async (...sources) => {
		if (!TEXTURES[Config.white]) return console.error("The unload texture was not found.");

		sources = new Set(sources);

		for (const source of sources) {
			TEXTURES[source].src = Config.ABSOLUTE_TEXTURE_PATH + Config.white;

			await TEXTURES[source].decode();

			TEXTURES.delete(source);
		}
	};
};