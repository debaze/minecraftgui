import {GUI} from "../../index.js";

export const HoverLayer = {};
HoverLayer.canvas = document.createElement("canvas");
HoverLayer.canvas.className = "hoverLayer";
HoverLayer.ctx = HoverLayer.canvas.getContext("2d");
HoverLayer.ctx.imageSmoothingEnabled = false;
HoverLayer.stretch = (width = GUI.width, height = GUI.height) => {
	Object.assign(HoverLayer, {width, height});

	return this;
};
document.body.appendChild(HoverLayer.canvas);