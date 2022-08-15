import {GUI, Output} from "./index.js";

/**
 * Layer constructor.
 * 
 * @constructor
 * @param	{string}	name							Layer name (must be unique)
 * @param	{array}		[size=[GUI.width, GUI.height]]	Width & height
 * @param	{boolean}	[visible=true]					Visibility state
 * @param	{Color}		background						Background color
 * @param	{array}		[components=[]]					Component list (can be managed later with add())
 */
export function Layer({name, size = [GUI.width, GUI.height], visible = true, background, components = []}) {
	if (!name) return console.error(Output.untitledLayer);

	let [width, height] = size;

	Object.assign(this, {width, height, background, visible});

	this.components = new Set();

	this.canvas = document.createElement("canvas");
	this.canvas.width = GUI.maxWidth;
	this.canvas.height = GUI.maxHeight;
	this.canvas.style.visibility = visibilities[+this.visible];

	this.ctx = this.canvas.getContext("2d");
	this.ctx.imageSmoothingEnabled = false;
	this.ctx.setTransform(GUI.scale, 0, 0, GUI.scale, 0, 0);

	this.toggle = (state = !this.visible) => {
		this.visible = state;
		this.canvas.style.visibility = visibilities[+this.visible];

		return this;
	};

	this.stretch = (width = GUI.width, height = GUI.height) => {
		Object.assign(this, {width, height});

		return this;
	};

	this.add = (...components) => {
		for (const component of components) {
			this.components.add(component);
			component.layer = this;
		}

		return this;
	};

	this.remove = (...components) => {
		for (const component of components) {
			this.components.delete(component);
			component.layer = null;
		}

		return this;
	};

	this.compute = () => {
		for (const component of this.components) {
			component.visible && component.compute();
		}

		return this;
	};

	this.erase = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		return this;
	};

	this.draw = () => {
		this.canvas.style.backgroundColor = this.background.hex;

		for (const component of this.components) {
			component.visible && component.draw();
		}

		return this;
	};

	this.redraw = () => this.erase().draw();

	GUI.layers.add(this);
	this.add(...components);
	document.body.appendChild(this.canvas);
};

let visibilities = ["hidden", "visible"];