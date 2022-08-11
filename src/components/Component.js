import {GUI, Output} from "../index.js";

/**
 * Global component constructor.
 * 
 * @constructor
 * @param	{array}		align			Horizontal & vertical alignment
 * @param	{array}		[margin=[0, 0]]	X & Y offset relative to the window side
 * @param	{boolean}	[visible=true]	Visibility state
 */
export function Component({align, margin = [0, 0], visible = true}) {
	const
		[horizontal, vertical] = align,
		[x, y] = margin;

	this.align = {horizontal, vertical};
	this.margin = {x, y};
	this.visible = visible;

	/**
	 * Computes the absolute component position, if it belongs to a layer.
	 * 
	 * @todo Optimize alignment conditions
	 */
	this.computeDefault = () => {
		if (!this.layer) return console.error(Output.cantComputeUnlayeredComponent);

		let {x, y} = this.margin,
			[w, h] = this.size,
			[lw, lh] = [this.layer.width / GUI.scale, this.layer.height / GUI.scale];

		if (this.align.horizontal === "right") x = lw - w - x;
		else if (this.align.horizontal === "center") x += (lw - w) / 2;

		if (this.align.vertical === "bottom") y = lh - h - y;
		else if (this.align.vertical === "center") y += (lh - h) / 2;

		Object.assign(this, {x, y});
	};
};