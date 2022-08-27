/**
 * @constructor
 * @param	{boolean}	[visible=true]	Determines the group visibility state
 * @param	{array}		[components=[]]	Component list
 */
export function Group({visible = true, components = []}) {
	Object.assign(this, {
		visible,
		components: new Set(components),
	});

	/**
	 * Adds component(s) to the group.
	 * 
	 * @param	{...Component}	components	Component(s) to be added
	 * @returns	{self}
	 */
	this.add = (...components) => {
		for (const component of components) {
			this.components.add(component);

			component.group = this;
		}

		return this;
	};

	/**
	 * Removes component(s) to the group.
	 * 
	 * @param	{...Component}	components	Component(s) to be removed
	 * @returns	{self}
	 */
	this.remove = (...components) => {
		for (const component of components) {
			this.components.delete(component);

			// Update the inverse side
			component.group = null;
		}

		return this;
	};

	/**
	 * Returns the first component found with the given name.
	 * 
	 * @param	{string}	name
	 * @returns	{Component}
	 */
	this.get = name => [...this.components].find(c => c.name === name);

	/**
	 * Computes the component(s) of the group.
	 * 
	 * @returns	{self}
	 */
	this.compute = () => {
		if (!this.visible) return;

		for (const component of this.components) {
			component.visible && component.compute();
		}

		return this;
	};

	/**
	 * Draws the component(s) of the group on the layer.
	 * 
	 * @returns	{self}
	 */
	this.draw = ctx => {
		if (!this.visible) return;

		for (const component of this.components) {
			component.visible && component.draw(ctx);
		}

		return this;
	};

	/**
	 * Erases the component(s) of the group on the layer.
	 * 
	 * @returns	{self}
	 */
	this.erase = ctx => {
		if (!this.visible) return;

		let x, y, w, h;

		for (const component of this.components) {
			if (component.visible) {
				({x, y} = component);
				[w, h] = component.size;

				this.layer.ctx.clearRect(x, y, w, h);
			}
		}

		return this;
	};

	this.add(...components);
};