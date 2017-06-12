var App = {
	// allows access to App.templates.album (from View)
	templates: JST,
	$el: $("main"),
	renderAlbums: function () {
		this.albums.each(this.renderAlbumView);
	},
	renderAlbumView: function(album) {
		debugger;
		new AlbumView({
			model: album,
		})
	},
	init: function() {
		this.renderAlbums();
	}
};
