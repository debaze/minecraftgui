import {log} from "./utils/index.js";

/**
 * Color utility constructor.
 * 
 * @constructor
 * @param	{number|string}	value	Hexadecimal color code
 * 
 * @todo	Find a replacement for substr() which is deprecated
 */
export function Color(value) {
	if (typeof value === "string" && value.length !== 8) return log("system.error.invalid_hexadecimal");

	this.value = typeof value === "string" ? parseInt(value, 16) : value;
	this.hex = `#${("000000" + this.value.toString(16)).substr(-6)}`;
};