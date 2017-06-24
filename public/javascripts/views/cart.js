var CartView = Backbone.View.extend({
	template: App.templates.cart,
	el: $("#cart").get(0),
	events: {
		"click a": "destroy"
	},
	destroy: function(event) {
		event.preventDefault();
		var $e = $(event.target);
		this.collection.trigger("destroy", +$e.attr("data-id"));
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			quantity: this.collection.getQuantity(),
			items: this.collection.toJSON(),
			total: this.collection.getTotal(),
		}));
		// this.$el.appendTo($("#items"));
	},
	initialize: function() {
		this.render();
		this.listenTo(this.collection, "cart_updated", this.render);
	},
});
