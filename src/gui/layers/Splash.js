import {TextBuffer} from "../buffers/index.js";
import {Instance, Font, TEXTURES} from "../../index.js";

/**
 * Splash text.
 * Formatting options:
 * - Single line
 * - Yellow
 * 
 * @constructor
 */
export function Splash() {
	const
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d");

	Object.assign(canvas, {
		width: Instance.window.max_width,
		height: Instance.window.max_height,
		className: "splash",
	});

	canvas.style.backgroundColor = "#000";
	canvas.style.zIndex = 999;
	ctx.imageSmoothingEnabled = false;

	Object.assign(this, {
		x: 312,
		y: 80,
		canvas,
		ctx,
		color: Font.colors.splash,
		fontSize: 1,
	});

	this.set = text => {
		const chars = text.split("");
		let w = 0,
			h = Font.symbolHeight,
			i;
		this.chars = [];
		// this.fontSize = text.length * 0.7;
		this.fontSize = 2.485;

		for (const c of chars) {
			i = Font.symbols[c] && c;

			// Store the character data
			this.chars.push({
				symbol: i,
				x: w,
			});

			w += Font.symbols[i].width + Font.letterSpacing;
		}

		this.size = [w, h];

		this.draw();
	};

	this.draw = () => {
		const
			{bctx} = TextBuffer,
			{symbols, symbolHeight} = Font,
			{x, y} = this,
			[tw, th] = this.size,
			fs = this.fontSize;
		let symbol;

		console.log(this.chars.length, fs, tw);
		// "Soap and water!" (15 chars/80) = 1.535
		// "Awesome!" (8 chars/44) = 2.35
		// ".party()" (8 chars/40) = 2.485

		TextBuffer.resize(tw * fs, th * fs);

		for (const c of this.chars) {
			symbol = symbols[c.symbol];

			bctx.drawImage(
				TEXTURES["font/ascii.png"],
				...symbol.uv,
				symbol.width,
				symbolHeight,
				c.x * fs,
				0,
				symbol.width * fs,
				symbolHeight * fs,
			);
		}

		bctx.globalCompositeOperation = "source-atop";
		bctx.fillStyle = this.color.background;
		bctx.fillRect(0, 0, tw * fs, th * fs);

		ctx.translate(x, y);
		ctx.rotate(-Math.PI / 9);
		ctx.drawImage(TextBuffer, fs, fs);

		bctx.fillStyle = this.color.foreground;
		bctx.fillRect(0, 0, tw * fs, th * fs);

		ctx.drawImage(TextBuffer, 0, 0);
	};

	document.body.appendChild(canvas);
};