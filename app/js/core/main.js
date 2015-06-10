/**
 * Application controller.
 * @class Main
 */
(function (scope) {

	'use strict';

	function Main () {
		scope.router = new scope.Router();
		scope.router.on('route', this.updateView, this);
		this.$el = $('#container');

		this.parseFirstRoute();
		Backbone.history.start({ pushState: true });
	}
	var p = Main.prototype;

	/**
	 * Remove the current view and inject a new one.
	 * @method updateView
	 */
	p.updateView = function () {
		this.view && this.view.remove();
		this.view = new scope.View();
		this.$el.append(this.view.el);
	};

	/**
	 * Check the first route for hashbangs.
	 * @method parseFirstRoute
	 */
	p.parseFirstRoute = function () {
		var route = String(window.location.hash); // We want a copy of the hash, not a reference.
		if (/^#\!\//.test(route)) {
			route = route.substr(3);  // strip hashbang
			// rewrite the hash, since it is what Backbone reads when start is called.
			if (window.history && window.history.replaceState) {
				window.history.replaceState({}, '', route);
			} else {
				window.location.replace(route);
			}
		}
	};

	scope.Main = Main;

})(window.app);