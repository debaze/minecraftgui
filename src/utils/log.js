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

	const splittedId = id.split(".").reverse()[0];

	console[logTypes[+id.includes(".error.")]](`${splittedId}: ${message}`);
};

const logTypes = ["log", "error"];