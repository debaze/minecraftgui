import {Component} from "./Component.js";
import {Output} from "../index.js";

/**
 * Progress constructor extended from Component.
 * 
 * @constructor
 * @param	{number}	length		Progress bar length, in pixels (this value doesn't take the border in account!)
 * @param	{number}	[percent=0]	Current percentage value showed on the bar
 */
export function Progress({length, percent = 0}) {
	if (!length) return console.error(Output.invalidProgressLength);

	Component.call(this, ...arguments);

	Object.assign(this, {length, percent, size: [length + 4, 10]});

	this.compute = this.computePosition;

	this.draw = () => {
		const
			ctx = this.layer.ctx,
			{x, y} = this,
			[w, h] = this.size;

		ctx.fillStyle = "white";
		ctx.fillRect(x, y, w, h);
		ctx.clearRect(x + 1, y + 1, w - 2, h - 2);
		ctx.fillRect(x + 2, y + 2, this.length * (this.percent / 100), h - 4);
	};
};