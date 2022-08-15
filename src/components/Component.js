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
	if (!align) return console.error(Output.needAlignment);

	Object.assign(this, {align, margin, visible});

	/**
	 * Calculates the absolute component position from its alignment and its margin.
	 */
	this.computePosition = () => {
		if (!this.layer) return console.error(Output.cantComputeUnlayeredComponent);

		let [horizontal, vertical] = this.align,
			[x, y] = this.margin,
			w = this.layer.width / GUI.scale - this.size[0],
			h = this.layer.height / GUI.scale - this.size[1];

		if (horizontal === "right") x = w - x;
		else if (horizontal === "center") x += w / 2;

		if (vertical === "bottom") y = h - y;
		else if (vertical === "center") y += h / 2;

		Object.assign(this, {x, y});
	};
};