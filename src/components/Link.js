import {Component} from "./Component.js";
import {TEXTURES, Font, TextBuffer} from "../index.js";

/**
 * Link component.
 * 
 * @constructor
 * @param	{array}		[padding=[0, 0, 0, 0]]	Padding
 * @param	{string}	[text=""]				Text string
 * @param	{string}	[textColor="white"]		Text color (since link text can't be formatted, the whole text will get this color)
 * @param	{number}	[fontSize=1]			Font size multiplier
 */
export function Link({padding = [0, 0, 0, 0], text = "", textColor = "white", fontSize = 1}) {
	Component.call(this, ...arguments);

	Object.assign(this, {padding, text, textColor, fontSize, hovered: false});

	// Since link content cannot be changed, they can be computed once
	{
		// Multiple lines are not allowed
		let chars = this.text.replaceAll("\n", " ").split(""),
			[pt, pr, pb, pl] = this.padding,
			fs = this.fontSize,
			w = 0,
			h = (Font.symbolHeight + 1) * fs,
			i;
		this.chars = [];

		for (const c of chars) {
			i = Font.symbols[c] && c;

			// Store the character data
			this.chars.push({
				symbol: i,
				x: w,
			});

			w += (Font.symbols[i].width + Font.letterSpacing) * fs;
		}

		// Inner size (text)
		this.textSize = [w, h];

		// Full size, including padding
		// Width and height have already been scaled by the font size
		this.size = [
			w + (pl + pr) * fs,
			h + (pt + pb) * fs,
		];

		// Retrieve the text color from the color list
		this.textColor = Font.colors[this.textColor];
	}

	this.compute = () => {
		this.on("hover", (x, y) => {
			console.log(x, y);
		});

		this.computePosition();
	};

	this.draw = () => {
		const
			{ctx} = this.layer,
			{bctx} = TextBuffer,
			{symbols, symbolHeight} = Font,
			{x, y} = this,
			[w, h] = this.size,
			[tw, th] = this.textSize,
			fs = this.fontSize;
		let symbol;

		TextBuffer.resize(tw, th);

		for (const c of this.chars) {
			symbol = symbols[c.symbol];

			bctx.drawImage(
				TEXTURES["font/ascii.png"],
				...symbol.uv,
				symbol.width,
				symbolHeight,
				c.x,
				0,
				symbol.width * fs,
				symbolHeight * fs,
			);
		}

		if (this.textColor) {
			bctx.globalCompositeOperation = "source-atop";
			bctx.fillStyle = this.textColor.foreground;
			bctx.fillRect(0, 0, tw, th);
		}

		ctx.drawImage(TextBuffer, x, y);

		bctx.fillStyle = this.textColor.background;
		bctx.fillRect(0, 0, tw, th);

		ctx.globalCompositeOperation = "destination-over";
		ctx.drawImage(TextBuffer, x + fs, y + fs);
	};

	this.hover = ctx => {
		const
			{x, y} = this,
			[tw, th] = this.textSize,
			fs = this.fontSize;
		console.log("ok")
		
		if (this.hovered) {
			ctx.fillStyle = this.textColor.foreground;
			ctx.fillRect(x, y + th - 2, tw, fs);

			ctx.fillStyle = this.textColor.background;
			ctx.fillRect(x + fs, y + th + fs - 2, tw, fs);
		} else ctx.clearRect(x, y + th - 2, tw + fs, 2 * fs);
	};
};