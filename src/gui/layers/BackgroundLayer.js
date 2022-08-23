import {Instance, TEXTURES, GUI} from "../../index.js";

export function BackgroundLayer() {
	this.width = GUI.width;
	this.height = GUI.height;

	const canvas = document.createElement("canvas");
	canvas.width = Instance.data.gui.max_width;
	canvas.height = Instance.data.gui.max_height;
	canvas.style.zIndex = 220;

	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	ctx.setTransform(GUI.scale * 2, 0, 0, GUI.scale * 2, 0, 0);
	ctx.filter = "brightness(41%)";
	ctx.fillStyle = ctx.createPattern(TEXTURES["gui/options_background.png"], null);
	ctx.fillRect(0, 0, this.width, this.height);

	Object.assign(this, {canvas, ctx});

	document.body.appendChild(this.canvas);
};