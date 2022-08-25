import {Component} from "./Component.js";
import {TEXTURES} from "../../index.js";

/**
 * ImageButton component.
 * 
 * @constructor
 * @param	{number}	width
 * @param	{string}	source
 * @param	{array}		[uv=[0, 0]]
 */
export function ImageButton({width, source, uv = [0, 0]}) {
	Component.call(this, ...arguments);

	Object.assign(this, {width, source, uv});

	this.compute = () => {
		this.size = [this.width, 20];

		this.computePosition();
	};

	this.draw = ctx => {
		const
		{x, y, uv} = this,
		[w, h] = this.size,
		texture = TEXTURES[this.source];
		console.log(x, y, w, h)

		ctx.drawImage(
			texture,
			...uv,
			w, h,
			x, y,
			w, h,
		);
	};
};