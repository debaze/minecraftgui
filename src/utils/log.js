import {Instance} from "../index.js";

export function log(id, formatters) {
	let message = Instance.data.lang[id];

	if (!message) return console.error("Log message not found");

	if (formatters) {
		formatters = Object.entries(formatters);

		for (const [formatter, value] of formatters) {
			message = message.replaceAll(formatter, value);
		}
	}

	console[types[+id.includes(".error.")]](message);
};

let types = ["log", "error"];