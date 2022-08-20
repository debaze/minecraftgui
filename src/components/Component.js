import {GUI, Output, Utils, HoverLayer} from "../index.js";

/**
 * Global component.
 * 
 * @constructor
 * @param	{array}		align			Horizontal & vertical alignment
 * @param	{array}		[margin=[0, 0]]	X & Y offset relative to the window side
 * @param	{boolean}	[visible=true]	Visibility state
 */
export function Component({name = "", align, margin = [0, 0], visible = true}) {
	if (!align) return console.error(Output.needAlignment);

	Object.assign(this, {name, align, margin, visible});

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

	/**
	 * Adds hover and click (mousedown) events to the component.
	 * 
	 * @param	{string}	event		Event name
	 * @param	{function}	callback	Callback function
	 */
	this.on = (event, callback) => {
		const {layer} = this;

		if (!layer) return console.error(Output.eventOnUnlayeredComponent);

		switch (event) {
			case "hover":
				layer.canvas.addEventListener("mousemove", e => {
					const
						{ctx} = HoverLayer,
						{scale} = GUI,
						{x, y} = this,
						[w, h] = this.size,
						hovered = Utils.intersect([e.x, e.y], [x * scale, y * scale, (x + w) * scale, (y + h) * scale]);
					
					if (this.hovered !== hovered) {
						this.hovered = hovered;

						this.hover(ctx);
					}
				});

				break;
			case "click":
				layer.canvas.addEventListener("mousedown", () => {
					this.hovered && callback();
				});

				break;
		}
	};
};