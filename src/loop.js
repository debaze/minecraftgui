import {Instance} from "./index.js";

export default {
	unfreeze: () => {
		CURRENT_FRAME = 0;
		interval = 1000 / FRAMES_PER_SECOND;
		start = then = performance.now();

		loop();
	},
	freeze: () => cancelAnimationFrame(request),
};
export let
	FRAMES_PER_SECOND = 1,
	CURRENT_FRAME,
	ELAPSED; // Elapsed time (ms) since the loop start

function loop() {
	request = requestAnimationFrame(loop);

	now = performance.now();
	diff = now - then;

	if (diff > interval) {
		// Adjust the interval
		then = now - diff % interval;

		ELAPSED = then - start;
		CURRENT_FRAME++;

		Instance.update().render();
	}
};

let interval, start, then, now, diff, request;