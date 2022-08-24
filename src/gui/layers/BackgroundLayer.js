import {Instance, GUI, TEXTURES} from "../../index.js";

export const BackgroundLayer = {
	canvas: document.createElement("canvas"),
	init: function() {
		this.width = GUI.width;
		this.height = GUI.height;
		this.canvas.className = "option-background";
		this.canvas.width = Instance.data.gui.max_width;
		this.canvas.height = Instance.data.gui.max_height;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.setTransform(GUI.scale * 2, 0, 0, GUI.scale * 2, 0, 0);
		this.ctx.filter = "brightness(25%)";
		this.ctx.fillStyle = this.ctx.createPattern(TEXTURES["gui/options_background.png"], null);
		this.ctx.fillRect(0, 0, this.width, this.height);

		document.body.appendChild(this.canvas);
	},
	show: function() {
		this.canvas.style.visibility = "visible";
	},
	hide: function() {
		this.canvas.style.visibility = "hidden";
	},
}