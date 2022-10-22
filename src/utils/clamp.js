/**
 * Clamps n to the min and max values.
 * 
 * @param	{number}	n
 * @param	{number}	min
 * @param	{number}	max
 * @return	{number}
 */
export function clamp(n, min, max) {
	n < min && (n = min);
	n > max && (n = max);

	return n;
};