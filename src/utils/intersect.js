import {GUI} from "../index.js";

/**
 * Verifies if the point (ex, ey) is inside the rectangle of size (w, h) at the positioon (x, y) (top-left corner).
 * 
 * @param	{number}	ex
 * @param	{number}	ey
 * @param	{number}	x
 * @param	{number}	y
 * @param	{number}	w
 * @param	{number}	h
 * @returns	{boolean}
 */
export function intersect([ex, ey], [x, y, w, h]) {
	const {scale} = GUI;

	ex /= scale;
	ey /= scale;

	return (
		ex >= x &&
		ex < x + w &&
		ey >= y &&
		ey < y + h
	);
};