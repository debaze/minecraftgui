import {Instance} from "../index.js";

export function log(id) {
	const message = Instance.data.lang[id];

	console.log(message);
};