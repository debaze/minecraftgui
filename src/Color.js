import {log} from "./utils/index.js";

/**
 * Color utility class.
 * 
 * @constructor
 * @param	{number|string}	value	Hexadecimal color
 */
export function Color(value) {
	if (typeof value === "string") {
		if (value.length !== 8) return log("system.error.color.invalid_hex");

		this.value = parseInt(value, 16);
	} else this.value = value;

	this.hex = `#${this.value.toString(16).padStart(6, 0)}`;
};