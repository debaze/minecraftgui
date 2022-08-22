export const GUI = {
	layers: {},
};

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

export const TEXTURES = new Set();

export const TextBuffer = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(0, 0) : document.createElement("canvas");
TextBuffer.bctx = TextBuffer.getContext("2d");
TextBuffer.resize = (w, h) => {
	TextBuffer.width = w;
	TextBuffer.height = h;
	TextBuffer.bctx.imageSmoothingEnabled = false;
};

export const Output = {
	invalidHex: "Colors only support 6 digit hex codes.",
	needAlignment: "Tried to instantiate a Component without the `alignment` option.",
	untitledLayer: "A name must be provided when instantiating a layer.",
	cantComputeUnlayeredComponent: "Unable to compute a component which doesn't belong to a layer.",
	eventOnUnlayeredComponent: "Unable to register an event for this component, because it doesn't belong to a layer.",
	invalidText: "Received a non-string value for a Text component.",
	invalidProgressLength: "Invalid progress bar length received (0 is not accepted).",
	invalidProgressPercent: "Invalid progress bar percentage value.",
	outOfRangeProgressPercent: "Progress bar percentage not between 0 and 100.",
	invalidComponentType: "Invalid component type.",
};

import {HoverLayer} from "./Layer.js";

export {Loader} from "./Loader.js";
export {Layer, HoverLayer} from "./Layer.js";
export {Component} from "./components/index.js";
export {Color} from "./Color.js";
export {Utils} from "./utils/index.js";

import Config from "../public/config.js";
export {Config};

export const ASSET_PATH = "assets/";
export const FONT_PATH = ASSET_PATH + "font/";
export const LANGUAGE_PATH = ASSET_PATH + "lang/";
export const TEXTURE_PATH = ASSET_PATH + "textures/";

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

HoverLayer.canvas.width = Instance.data.gui.max_width;
HoverLayer.canvas.height = Instance.data.gui.max_height;
HoverLayer.stretch();
HoverLayer.ctx.setTransform(GUI.scale, 0, 0, GUI.scale, 0, 0);