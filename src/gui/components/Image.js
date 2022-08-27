import {Component} from "./Component.js";
import {TEXTURES} from "../../index.js";

/**
 * Image component.
 * 
 * @constructor
 * @param	{array}		size		Width & height
 * @param	{string}	[source]	Image path (must be loaded before draw)
 * @param	{array}		uv			Image UV
 * @param	{number}	[scale=1]	Scale multiplier
 */
export function Image({size, source, uv, scale = 1}) {
	Component.call(this, ...arguments);

	Object.assign(this, {size, source, uv, scale});

	this.compute = this.computePosition;

	this.draw = ctx => {
		const texture = TEXTURES[this.source];

		if (texture) {
			const
				{x, y, scale} = this,
				[w, h] = this.size,
				[u, v] = this.uv;

			ctx.drawImage(
				texture,
				u, v,
				w / scale, h / scale,
				x, y,
				w, h,
			);
		}

		this.drawModifier(ctx);
	};
};