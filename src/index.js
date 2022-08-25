import Config from "../public/config.js";
import {HoverLayer} from "./gui/layers/index.js";

export {BackgroundLayer, HoverLayer, Layer} from "./gui/layers/index.js";
export * as Component from "./gui/components/index.js";
export {TextBuffer} from "./gui/buffers/index.js";
export {Loader} from "./Loader.js";
export {Color} from "./Color.js";
export * as Utils from "./utils/index.js";
export const ASSET_PATH = "assets/";
export const FONT_PATH = ASSET_PATH + "font/";
export const LANGUAGE_PATH = ASSET_PATH + "lang/";
export const TEXTURE_PATH = ASSET_PATH + "textures/";
export const TEXTURES = new Set();
export const GUI = {layers: {}};
export const Font = {
	symbolHeight: 8,
	strikethroughY: 3,
	underlineY: 8,
	letterSpacing: 1,
	lineSpacing: 1,
	formatter: {
		prefix: "\u00a7",
		bold: "b",
		color: "c",
		highlight: "h",
		italic: "i",
		reset: "r",
		strikethrough: "s",
		underline: "u",
	},
};

export const Instance = {
	name: "Minecraft",
	version: [1, 19, 2],
	data: {
		gui: {
			default_width: 320,
			default_height: 240,
			max_width: screen.width,
			max_height: screen.height,
		},
		mojang_backgrounds: [0xef323d, 0x000000],
		lang: null,
	},
	settings: {},
	init: function() {
		document.title = `${this.name} ${this.version.join(".")}`;

		HoverLayer.init();
	},
	setup: async function(settings) {
		// Setting: "Language"
		{
			const {language} = settings;

			if (this.settings.language !== language) {
				this.data.lang = await (await fetch(`${LANGUAGE_PATH}${language}.json`)).json();
			}
		}

		// Setting: "Monochrome Logo"
		{
			const {monochrome_logo} = settings;

			if (this.settings.monochrome_logo !== monochrome_logo) {
				Config.mojangBackground = this.data.mojang_backgrounds[+monochrome_logo];
			}
		}

		// Setting: "GUI Scale"
		{
			const {gui_scale} = settings;

			if (this.settings.gui_scale !== gui_scale) {
				GUI.preferredScale = gui_scale;
			}
		}

		Object.assign(this, {settings});
	},
};