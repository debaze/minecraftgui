/**
 * Color utility constructor.
 * 
 * @constructor
 * @param	{number}	value	Color hexadecimal code
 */
export function Color(value) {
	this.value = value;
	this.hex = `#${this.value.toString(16)}`;
};