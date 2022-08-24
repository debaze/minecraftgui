import {Instance} from "../index.js";

export function log(id) {
	const message = Instance.data.lang[id];

	if (!message) return console.error("This message was not found in the .lang file.");

	const error = id.includes(".error.");

	console[types[+error]](message);
};

let types = ["log", "error"];