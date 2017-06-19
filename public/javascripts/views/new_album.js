var NewAlbumView = Backbone.View.extend({
	template: App.templates.new_album,
	attributes: {
		id: "album_new"								// these are the actual htmml element attributes!
	},
	events: {
		submit: "create"
	},
	render: function() {
		this.$el.html(this.template());
		App.$el.html(this.$el);
	},
	create: function(event) {
		debugger;
		event.preventDefault();
		var $f = this.$("form");			// context of THIS view

		$.ajax({
			url: $f.attr("action"),
			type: $f.attr("method"),
			data: $f.serialize(),
			success: function(json) {
				debugger;
				App.albums.add(json);
				App.indexView();					// temporary, when Backbone router is setup, we can just go back with history state
			},
		});
	},
	initialize: function() {
		this.render();
	},

});
