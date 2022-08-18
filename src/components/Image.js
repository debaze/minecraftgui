import {Component} from "./Component.js";
import {TEXTURES} from "../index.js";

/**
 * Image component.
 * 
 * @constructor
 * @param	{array}		[size]		Width & height
 * @param	{string}	[source]	Image path
 * @param	{array}		[uv=[0, 0]]	Image UV
 * @param	{number}	[scale=1]	Scale of the source image
 */
export function Image({size, source, uv = [0, 0], scale = 1}) {
	Component.call(this, ...arguments);

	Object.assign(this, {size, source, uv, scale});

	this.compute = () => {
		if (!this.size && TEXTURES[this.source]) {
			const image = TEXTURES[this.source];

			this.size = [image.width, image.height];
		}

		this.computePosition();
	};

	this.draw = () => {
		if (TEXTURES[this.source]) {
			const
				ctx = this.layer.ctx,
				{x, y, scale} = this,
				[w, h] = this.size,
				[u, v] = this.uv;

			ctx.drawImage(
				TEXTURES[this.source],
				u, v,
				w / scale, h / scale,
				x, y,
				w, h,
			);
		}
	};
};