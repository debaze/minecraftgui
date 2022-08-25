import {log} from "./utils/index.js";

/**
 * @constructor
 * @param	{number|string}	value	Hexadecimal color
 */
export function Color(value) {
	if (typeof value === "string" && value.length !== 8) return log("system.error.color.invalid_hex");

	this.value = typeof value === "string" ? parseInt(value, 16) : value;
	this.hex = `#${this.value.toString(16).padStart(6, 0)}`;
};