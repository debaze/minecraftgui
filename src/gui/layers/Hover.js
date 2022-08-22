import {GUI} from "../../index.js";

export const Hover = {};
Hover.canvas = document.createElement("canvas");
Hover.canvas.className = "hover";
Hover.ctx = Hover.canvas.getContext("2d");
Hover.ctx.imageSmoothingEnabled = false;
Hover.stretch = (width = GUI.width, height = GUI.height) => {
	Object.assign(Hover, {width, height});

	return this;
};
document.body.appendChild(Hover.canvas);