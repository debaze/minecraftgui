import {Instance, GUI, TEXTURES} from "../../index.js";

export const BackgroundLayer = {
	canvas: document.createElement("canvas"),
	init: function() {
		this.resize();
		this.canvas.className = "option-background";
		this.canvas.width = Instance.data.gui.max_width;
		this.canvas.height = Instance.data.gui.max_height;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

		document.body.appendChild(this.canvas);
	},
	resize: function() {
		this.width = GUI.width;
		this.height = GUI.height;
	},
	draw: function() {
		this.ctx.setTransform(GUI.scale * 2, 0, 0, GUI.scale * 2, 0, 0);
		this.ctx.filter = "brightness(25%)";
		this.ctx.fillStyle = this.ctx.createPattern(TEXTURES["gui/options_background.png"], "repeat");
		this.ctx.fillRect(0, 0, this.width, this.height);
	},
	show: function() {
		this.canvas.style.visibility = "visible";
	},
	hide: function() {
		this.canvas.style.visibility = "hidden";
	},
}