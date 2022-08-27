import {Instance, BackgroundLayer, HoverLayer} from "../../index.js";
import {Group} from "../Group.js";
import {intersect} from "../../utils/index.js";

/**
 * Global Layer.
 * 
 * @constructor
 * @param	{string}	name													Layer name (must be unique)
 * @param	{array}		[size=[Instance.window.width, Instance.window.height]]	Width & height
 * @param	{boolean}	[visible=true]											Determines the layer visibility state
 * @param	{boolean}	[background=false]										Indicates whether the layer has a background pattern preset
 * @param	{array}		[components=[]]											Component list
 * 
 * @todo	Groups
 * @todo	Clickable components
 */
export function Layer({name, size = [Instance.window.width, Instance.window.height], visible = true, background = false, components = []}) {
	let [width, height] = size;

	Object.assign(this, {name, width, height, visible, background});

	this.components = new Set();
	this.hoverableComponents = new Set();
	this.clickableComponents = new Set();

	const canvas = document.createElement("canvas");
	name && (canvas.classList.add(name));
	canvas.width = Instance.window.max_width;
	canvas.height = Instance.window.max_height;
	canvas.style.opacity = +this.visible;
	canvas.addEventListener("mousemove", e => {
		const {scale} = Instance.gui;
		let component, x, y, w, h, hovered;

		for (const component of this.hoverableComponents) {
			({x, y} = component);
			[w, h] = component.size;
			hovered = intersect([e.x, e.y], [x, y, w, h]);
			
			if (component.hovered !== hovered) {
				component.hovered = hovered;

				HoverLayer[hoverStates[+component.hovered]](component);
			}
		}
	});
	canvas.addEventListener("mousedown", e => {
		const {scale} = Instance.gui;
		let component, x, y, w, h, hovered;

		for (const component of this.clickableComponents) {}
	});

	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.setTransform(Instance.gui.scale, 0, 0, Instance.gui.scale, 0, 0);

	Object.assign(this, {canvas, ctx});

	/**
	 * Toggles the canvas element.
	 * 
	 * @param	{number}	[duration=0]	Duration value (ms)
	 * @param	{number}	[delay=0]		Delay value (ms)
	 * @returns	{self}
	 */
	this.toggle = (duration = 0, delay = 0) => {
		this.visible = !this.visible;

		Object.assign(this.canvas.style, {
			"opacity":				+this.visible,
			"pointer-events":		pointerEvents[+this.visible],
			"transition-delay":		`${delay}ms`,
			"transition-duration":	`${duration}ms`,
		});

		return this;
	};

	this.stretch = (width = Instance.window.width, height = Instance.window.height) => {
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
			this.hoverableComponents.delete(component);
			this.clickableComponents.delete(component);

			component.layer = null;
		}

		return this;
	};

	/**
	 * Returns the first component found with the given name.
	 * 
	 * @param	{string}	name
	 * @returns	{Component}
	 */
	this.get = name => [...this.components].find(c => c.name === name);

	this.compute = () => {
		for (const component of this.components) {
			component.visible && component.compute();
		}

		return this;
	};

	this.erase = () => {
		let x, y, w, h;

		for (const component of this.components) {
			if (component instanceof Group) {
				component.erase();

				continue;
			}

			if (component.visible) {
				({x, y} = component);
				[w, h] = component.size;

				this.ctx.clearRect(x, y, w, h);
			}
		}

		return this;
	};

	this.draw = () => {
		this.background && BackgroundLayer.show();

		for (const component of this.components) {
			component.visible && component.draw(this.ctx);
		}

		return this;
	};

	Instance.gui.layers[this.name] = this;

	this.add(...components);

	document.body.appendChild(this.canvas);
};

const
	hoverStates = ["clearHovered", "drawHovered"],
	pointerEvents = ["none", "auto"];