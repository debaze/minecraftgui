export default {
	unfreeze: () => {
		CURRENT_FRAME = 0;
		interval = 1000 / FRAMES_PER_SECOND;
		start = then = performance.now();

		console.log("unfreezed");

		loop();
	},
	freeze: () => {
		cancelAnimationFrame(request);
	},
};
export let
	ELAPSED,				// Elapsed time (ms) since the loop start
	FRAMES_PER_SECOND = 1,
	CURRENT_FRAME = 0;

function loop() {
	request = requestAnimationFrame(loop);

	now = performance.now();
	diff = now - then;

	if (diff > interval) {
		console.log(diff, interval);
		// Adjust the interval
		then = now - diff % interval;

		ELAPSED = then - start;
		CURRENT_FRAME++;

		// console.log(CURRENT_FRAME);
	}
};

let interval, start, then, now, diff, request;