import {GUI} from "../../index.js";
import {log} from "../../utils/index.js";

/**
 * Global component.
 * 
 * @constructor
 * @param	{string}	name			Component name, used to select it from its layer (must be unique in the layer)
 * @param	{boolean}	[visible=true]	Visibility state
 * @param	{array}		align			Horizontal & vertical alignment
 * @param	{array}		[margin=[0, 0]]	X & Y offset relative to the window side
 */
export function Component({name, visible = true, align, margin = [0, 0]}) {
	if (
		typeof align !== "object" ||
		align.length !== 2 ||
		!["left", "center", "right"].includes(align[0]) ||
		!["top", "center", "bottom"].includes(align[1])
	) return log("system.error.component.invalid_alignment", {
		"%s": this.constructor.name,
	});

	Object.assign(this, {name, visible, align, margin});

	/**
	 * Calculates the absolute component position from its alignment and its margin.
	 */
	this.computePosition = () => {
		if (!this.layer) return log("system.error.cant_compute_unlayered_component");

		const {scale} = GUI;
		let [horizontal, vertical] = this.align,
			[x, y] = this.margin,
			w = this.layer.width / scale - this.size[0],
			h = this.layer.height / scale - this.size[1];

		if (horizontal === "right") x = w - x;
		else if (horizontal === "center") x += w / 2;

		if (vertical === "bottom") y = h - y;
		else if (vertical === "center") y += h / 2;

		this.x = Math.floor(x);
		this.y = Math.floor(y);
	};

	/**
	 * Registers the component to its layer event buffer.
	 * 
	 * @param	{string}	event		Event name
	 * @param	{function}	callback	Callback function
	 */
	this.on = (event, callback) => {
		const {layer} = this;

		if (!layer) return log("system.error.event_on_unlayered_component");

		switch (event) {
			case "hover":
				layer.hoverableComponents.add(this);

				break;
			case "click":
				layer.clickableComponents.add(this);

				break;
		}
	};

	/**
	 * Removes the component from its layer event buffer.
	 * 
	 * @param	{string}	event	Event name
	 */
	this.off = event => {
		const {layer} = this;

		if (!layer) return log("system.error.event_on_unlayered_component");

		switch (event) {
			case "hover":
				layer.hoverableComponents.delete(this);

				break;
			case "click":
				layer.clickableComponents.delete(this);

				break;
		}
	};
};