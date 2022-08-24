import {Instance, GUI} from "../../index.js";

export const HoverLayer = {
	canvas: document.createElement("canvas"),
	init: function() {
		this.width = GUI.width;
		this.height = GUI.height;
		this.canvas.className = "hover";
		this.canvas.width = Instance.data.gui.max_width;
		this.canvas.height = Instance.data.gui.max_height;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.setTransform(GUI.scale, 0, 0, GUI.scale, 0, 0);

		document.body.appendChild(this.canvas);
	},
};