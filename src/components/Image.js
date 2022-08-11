import {Component} from "./Component.js";
import {TEXTURES} from "../index.js";

/**
 * Image constructor extended from Component.
 * 
 * @constructor
 * @param	{array}		[size]		Width & height
 * @param	{string}	[source]	Image path
 * @param	{array}		[uv=[0, 0]]	Image UVs
 */
export function Image({size, source, uv = [0, 0]}) {
	Component.call(this, ...arguments);

	Object.assign(this, {size, source, uv});

	this.compute = () => {
		if (!this.size && TEXTURES[this.source]) {
			let image = TEXTURES[this.source];

			this.size = [image.width, image.height];
		}

		this.computeDefault();
	};

	this.draw = () => {
		if (TEXTURES[this.source]) {
			const
				ctx = this.layer.ctx,
				{x, y} = this,
				[w, h] = this.size,
				[u, v] = this.uv;

			ctx.drawImage(
				TEXTURES[this.source],
				u, v,
				w, h,
				x, y,
				w, h,
			);
		}
	};
};