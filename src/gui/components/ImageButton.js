import {Component} from "./Component.js";
import {TEXTURES} from "../../index.js";

/**
 * ImageButton component.
 * 
 * @constructor
 * @param	{number}	width
 * @param	{string}	[source]	Image path (must be loaded before draw)
 * @param	{array}		[uv=[0, 0]]	Image UVs
 */
export function ImageButton({width, source, uv = [0, 0]}) {
	Component.call(this, ...arguments);

	Object.assign(this, {width, source, uv, size: [width, 20]});

	this.compute = this.computePosition;

	this.draw = ctx => {
		const texture = TEXTURES[this.source];

		if (texture) {
			const
				{x, y} = this,
				[w, h] = this.size,
				[u, v] = this.uv;

			ctx.drawImage(
				texture,
				u, v,
				w, h,
				x, y,
				w, h,
			);
		}
	};
};