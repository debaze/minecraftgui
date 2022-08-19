/**
 * Verifies if the (x, y) is inside the rectangle of size (x2, y2) with (x1, y1) as the top-left corner.
 * 
 * @param	{number}	x
 * @param	{number}	y
 * @param	{number}	x1
 * @param	{number}	x2
 * @param	{number}	y1
 * @param	{number}	y2
 * @returns	{boolean}
 */
export const intersect = ([x, y], [x1, x2, y1, y2]) => (
	x > x1 &&
	x < x2 &&
	y > y1 &&
	y < y2
);