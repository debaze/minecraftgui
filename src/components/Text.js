import {Component} from "./Component.js";
import {Font, Output} from "../index.js";

/**
 * Text constructor extended from Component.
 * 
 * @constructor
 * @param	{string}	[text=""]				Text string
 * @param	{string}	[padding=[0, 0, 0, 0]]	Padding
 * @param	{string}	[lineSpacing=1]			Line spacing value
 */
export function Text({text = "", padding = [0, 0, 0, 0], lineSpacing = 1}) {
	Component.call(this, ...arguments);

	if (typeof text !== "string") return console.error(Output.invalidText);

	const [top, right, bottom, left] = padding;
	Object.assign(this, {text, padding: {top, right, bottom, left}, lineSpacing});

	/**
	 * Formats the text value of the component.
	 */
	this.format = () => {
		console.log("Formatting...");

		const chars = this.text.split("").map(symbol => ({symbol}));
		let f, parsingFormatter, parsingColorPrefix, parsingColor;

		this.formatted = [];

		for (const c of chars) {
			// Search for a formatting prefix
			if (c.symbol === Font.formattingPrefix) {
				parsingFormatter = true;

				continue;
			}

			// The last symbol was a formatting prefix
			if (parsingFormatter) {
				parsingFormatter = false;

				f = {formatter: c.symbol};

				// Identify the formatter nature
				/*if (c.symbol === ) {
					//
				}*/
			}

			this.formatted.push(c);
		}
	};

	this.compute = () => {
		this.format();

		let mw, w, h = Font.lineHeight, x, y, cw, bold = false;
		mw = w = x = y = 0;

		this.chars = [];

		for (const c of this.formatted) {
			/*if (c.formatter) {
				// Formatter character
				if (c.formatter === Font.formatter.bold) bold = true;
				if (c.formatter === Font.formatter.reset) bold = false;

				this.chars.push(c);

				continue;
			}*/

			if (c.symbol === "\n") {
				// Line break character
				x = 0;
				y += this.lineSpacing + Font.lineHeight;

				if (w > mw) mw = w;

				continue;
			}

			// The symbol is not a formatting prefix nor a line break
			let i = Font.symbols[c.symbol] ? c.symbol : undefined;
			cw = Font.symbols[i].size + this.letterSpacing;

			// Mark the symbol as undefined if it's not found
			i ?? (c.symbol = i);

			// Increase the size of bold characters
			if (bold) cw += Font.boldWeight;

			Object.assign(c, {x, y});

			w += cw;
			x += cw;

			this.chars.push(c);
		}

		w = Math.max(w, mw);
		h += y;

		this.size = [w, h];
		this.computeDefault();
	};

	this.draw = () => {
		const
			{ctx} = this.layer,
			{x, y} = this,
			[w, h] = this.size;

		ctx.fillStyle = "orangered";
		ctx.fillRect(x, y, w, h);
	};
};