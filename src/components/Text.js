import {Component} from "./Component.js";
import {Font} from "../index.js";

/**
 * Text constructor extended from Component.
 * 
 * @constructor
 * @param	{string}	[text]	Text string
 */
export function Text({text}) {
	Component.call(this, ...arguments);

	Object.assign(this, {text});

	this.format = () => {
		console.log("Formatting...");
	};

	this.compute = () => {
		this.format();

		console.debug(this.text);
		console.debug(this.text.split("\n"))
	};

	this.draw = () => {
		const {ctx} = this.layer;

		ctx.fillStyle = "orange";
		ctx.fillRect(0, 0, 40, 40);
	};
};