import {Instance} from "../index.js";

export function log(id) {
	const
		message = Instance.data.lang[id],
		error = id.includes(".error.");

	console[types[+error]](message);
};

let types = ["log", "error"];