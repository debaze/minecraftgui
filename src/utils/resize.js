import {Instance, GUI, HoverLayer} from "../index.js";

/**
 * Stretches the layers to the GUI size and scales them.
 * 
 * On resize:
 * - All the currently hovered components are cleared on the HoverLayer
 */
export function resize() {
	GUI.width = Math.ceil(innerWidth / 2) * 2;
	GUI.height = Math.ceil(innerHeight / 2) * 2;
	GUI.scale = GUI.preferredScale;

	// Calculate the new scale
	let i = GUI.preferredScale + 2;
	while (--i > 1) {
		if (
			GUI.width <= Instance.data.gui.default_width * i ||
			GUI.height < Instance.data.gui.default_height * i
		) GUI.scale = i - 1;
	}
	i = undefined;

	// Erase the hovered components
	HoverLayer.clearAllHovered();

	const layers = Object.values(GUI.layers);
	for (const layer of layers) {
		layer.stretch();
	}

	if (GUI.previousScale !== GUI.scale) {
		GUI.previousScale = GUI.scale;

		const transform = [GUI.scale, 0, 0, GUI.scale, 0, 0];

		HoverLayer.ctx.setTransform(...transform);
		for (const layer of layers) {
			layer.ctx.setTransform(...transform);
		}
	}
};