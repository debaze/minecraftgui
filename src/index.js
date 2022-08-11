export const GUI = {
	defaultWidth: 320,
	defaultHeight: 240,
	width: innerWidth,
	height: innerHeight,
	maxWidth: screen.width,
	maxHeight: screen.height,
	scale: 2,
	preferredScale: 2,
	layers: new Set(),
};

export const Font = {
	lineHeight: 8,
	boldWeight: 1,
	formatter: {
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

export const Output = {
	cantComputeUnlayeredComponent: "Unable to compute a component which doesn't belong to a layer.",
	invalidText: "Received a non-string value for a Text component.",
};

export {Loader} from "./Loader.js";
export {Layer} from "./Layer.js";
export {Component} from "./components/index.js";
export {Color} from "./Color.js";
export {Utils} from "./utils/index.js";

export {default as Config} from "../public/config.js";