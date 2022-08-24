import {Component} from "./Component.js";
import {log} from "../../utils/index.js";
import {GUI, TEXTURES} from "../../index.js";

const
	INITIAL_WIDTH = 200,
	HEIGHT = 20,
	UV = {
		DISABLED: [0, 46],
		NORMAL: [0, 66],
		HOVERED: [0, 86],
	};

/**
 * TextButton component.
 * NOTE: The button width should not exceed 396.
 * 
 * @constructor
 * @param	{number}	[width=INITIAL_WIDTH]
 */
export function TextButton({width = INITIAL_WIDTH}) {
	Component.call(this, ...arguments);

	Object.assign(this, {
		size: [width, HEIGHT],
		halfWidth: width / 2,
		texture: TEXTURES["gui/widgets.png"],
		hovered: false,
	});

	this.compute = () => {
		if (this.width > 396) {
			log("system.error.exceeded_button_width");

			this.width = INITIAL_WIDTH;
		}

		this.on("hover");

		this.computePosition();
	};

	this.draw = ctx => {
		const
			{x, y} = this,
			hw = this.halfWidth,
			h = this.size[1],
			T = this.texture;

		ctx.drawImage(
			T,
			...UV.NORMAL,
			hw, h,
			x, y,
			hw, h,
		);

		ctx.drawImage(
			T,
			INITIAL_WIDTH - hw, UV.NORMAL[1],
			hw, h,
			x + hw, y,
			hw, h,
		);
	};

	this.hover = ctx => {
		const
			{x, y} = this,
			hw = this.halfWidth,
			h = this.size[1],
			T = this.texture;

		ctx.drawImage(
			T,
			...UV.HOVERED,
			hw, h,
			x, y,
			hw, h,
		);

		ctx.drawImage(
			T,
			INITIAL_WIDTH - hw, UV.HOVERED[1],
			hw, h,
			x + hw, y,
			hw, h,
		);
	};

	this.unhover = ctx => {
		const
			{x, y} = this,
			[w, h] = this.size;

		ctx.clearRect(x, y, w, h);
	};
};