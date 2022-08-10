/**
 * Global component constructor.
 * 
 * @constructor
 * @param	{array}		align			Horizontal & vertical alignment
 * @param	{array}		[margin=[0, 0]]	X & Y offset relative to the window side
 * @param	{boolean}	[visible=true]	Visibility state
 */
export function Component({align, margin = [0, 0], visible = true}) {
	let [horizontal, vertical] = align,
		[x, y] = margin;

	this.align = {horizontal, vertical};
	this.margin = {x, y};
	this.visible = visible;
};