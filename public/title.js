import {TEXTURES} from "../src/index.js";

export function drawTitle(ctx) {
	const texture = TEXTURES[this.source];

	if (texture) {
		const
			{x, y} = this,
			ix = x + 1,
			iy = y + 1,
			[w, h] = this.size,
			ih = h - 2,
			offsets = [[-1, 0], [1, 0], [0, 1], [0, -1]];
		let i = ix, ox, oy;

		if (this.minceraft) {
			for (const o of offsets) {
				ox = ix + o[0];
				oy = iy + o[1];

				// "MIN"
				ctx.drawImage(
					texture,
					0, 0,
					99, ih,
					ox, oy,
					99, ih,
				);
				ox += 99;

				// "C"
				ctx.drawImage(
					texture,
					129, 0,
					26, ih,
					ox, oy,
					26, ih,
				);
				ox += 26;

				// "E" beginning
				ctx.drawImage(
					texture,
					126, 0,
					3, ih,
					ox, oy,
					3, ih,
				);
				ox += 3;

				// "E"
				ctx.drawImage(
					texture,
					99, 0,
					27, ih,
					ox, oy,
					27, ih,
				);
				ox += 27;

				// "RAFT"
				ctx.drawImage(
					texture,
					0, 45,
					119, ih,
					ox, oy,
					119, ih,
				);
			}

			ctx.globalCompositeOperation = "source-atop";
			ctx.fillRect(x, y, w, h);
			ctx.globalCompositeOperation = "source-over";

			// "MIN"
			ctx.drawImage(
				texture,
				0, 0,
				99, ih,
				i, iy,
				99, ih,
			);
			i += 99;

			// "C"
			ctx.drawImage(
				texture,
				129, 0,
				26, ih,
				i, iy,
				26, ih,
			);
			i += 26;

			// "E" beginning
			ctx.drawImage(
				texture,
				126, 0,
				3, ih,
				i, iy,
				3, ih,
			);
			i += 3;

			// "E"
			ctx.drawImage(
				texture,
				99, 0,
				27, ih,
				i, iy,
				27, ih,
			);
			i += 27;

			// "RAFT"
			ctx.drawImage(
				texture,
				0, 45,
				119, ih,
				i, iy,
				119, ih,
			);
		} else {
			for (const o of offsets) {
				ox = ix + o[0];
				oy = iy + o[1];

				// "MINEC"
				ctx.drawImage(
					texture,
					0, 0,
					155, ih,
					ox, oy,
					155, ih,
				);
				ox += 155;

				// "RAFT"
				ctx.drawImage(
					texture,
					0, 45,
					119, ih,
					ox, oy,
					119, ih,
				);
			}

			ctx.globalCompositeOperation = "source-atop";
			ctx.fillRect(x, y, w, h);
			ctx.globalCompositeOperation = "source-over";

			// "MINEC"
			ctx.drawImage(
				texture,
				0, 0,
				155, ih,
				i, iy,
				155, ih,
			);
			i += 155;

			// "RAFT"
			ctx.drawImage(
				texture,
				0, 45,
				119, ih,
				i, iy,
				119, ih,
			);
		}
	}
};