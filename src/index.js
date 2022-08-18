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
};

export {Loader} from "./Loader.js";
export {Layer} from "./Layer.js";
export {Component} from "./components/index.js";
export {Color} from "./Color.js";
export {Utils} from "./utils/index.js";

export {default as Config} from "../public/config.js";