var CartItems = Backbone.Collection.extend({
	setTotal: function() {
		this.total = this.toJSON().reduce(function(a, b) {
			return a + b.price * b.quantity;
		}, 0);
		return this;
	},
	getTotal: function() { return this.total; },
	readStorage: function() {
		var stored_cart = JSON.parse(localStorage.getItem("cart"));
		this.reset(stored_cart);
		this.setTotal().setQuantity();
	},
	updateStorage: function() {
		localStorage.setItem("cart", JSON.stringify(this.toJSON()));
	},
	setQuantity: function() {
		this.quantity = this.toJSON().reduce(function(a, b) {
			return a + b.quantity;
		}, 0);
		
		return this;
	},
	getQuantity: function() { return this.quantity; },
	addItem: function(item) {
		var existing = this.get(item.get("id"));

		if (existing) {
			existing.set("quantity", existing.get("quantity") + 1);
		} else {
			existing = item.clone();
			existing.set("quantity", 1);
			this.add(existing);
		}
		this.update();
		this.trigger("cart_updated");
		// cart view is listening to cart_updated, and will trigger CartView.render().
	},
	destroy: function(id) {
		this.remove(id);
		this.update();
	},
	update: function() {
		this.setTotal().setQuantity().updateStorage();
	},
	initialize: function() {
		this.readStorage();
		this.on("destroy", this.destroy);		
	},

});
