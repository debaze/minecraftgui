import {Output} from "./index.js";

/**
 * Color utility constructor.
 * 
 * @constructor
 * @param	{number|string}	value	Hexadecimal color code
 */
export function Color(value) {
	if (value.length !== 8) return console.error(Output.invalidHex);

	this.value = typeof value === "string" ? parseInt(value, 16) : value;
	this.hex = `#${("000000" + this.value.toString(16)).substr(-6)}`;
};