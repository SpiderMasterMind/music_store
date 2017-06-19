var router = new (Backbone.Router.extend({
	routes: {
		"albums/new": App.newAlbum
	},
	index: function() {
		App.indexView();
	},
	initialize: function() {
		this.route(/^\/?$/, "index", this.index);
	},

}))();	// make IIFE so it is immiediately called

Backbone.history.start({
	pushState: true
});

$(document).on("click", "a[href^='/']", function(event) {
	event.preventDefault();
	router.navigate($(event.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});
