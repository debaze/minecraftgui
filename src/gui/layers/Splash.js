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

	canvas.style.zIndex = 1;
	ctx.imageSmoothingEnabled = false;

	Object.assign(this, {
		x: 311.5,
		y: 68.5,
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
			{symbols} = Font,
			sh = Font.symbolHeight,
			{x, y} = this,
			[tw, th] = this.size,
			fs = this.fontSize;
		let symbol, sw, uv;

		console.log(this.chars.length, fs, tw);
		// "Soap and water!" (15 chars/80) = 1.535?
		// "Awesome!" (8 chars/44) = [EXACTLY 2.24, EXACTLY 2.35]
		// ".party()" (8 chars/40) = EXACTLY 2.485
		// "l33t!" (5 chars/21) = EXACTLY 3.3
		// "pls rt" (6 chars/29) = EXACTLY 2.9

		TextBuffer.resize(tw, th);
		ctx.translate(x, y);
		ctx.rotate(-Math.PI / 9);

		for (const c of this.chars) {
			symbol = symbols[c.symbol];
			sw = symbol.width;
			({uv} = symbol);

			bctx.drawImage(
				TEXTURES["font/ascii.png"],
				...uv,
				sw,
				sh,
				c.x,
				0,
				sw,
				sh,
			);
		}

		bctx.globalCompositeOperation = "source-atop";
		bctx.fillStyle = this.color.foreground;
		bctx.fillRect(0, 0, tw * fs, th * fs);

		ctx.drawImage(TextBuffer, 0, 0, tw * fs, th * fs);

		bctx.fillStyle = this.color.background;
		bctx.fillRect(0, 0, tw * fs, th * fs);

		ctx.globalCompositeOperation = "destination-over";
		ctx.drawImage(TextBuffer, fs, fs, tw * fs, th * fs);
	};

	document.body.appendChild(canvas);
};