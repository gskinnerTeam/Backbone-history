/**
 * Application controller.
 * @class Main
 */
(function (scope) {

	'use strict';

	function Main () {
		scope.router = new scope.Router();
		scope.router.on('route', this.updateView, this);
		this.container = $('#container');

		this.parseFirstRoute();
		Backbone.history.start({ pushState: true });
	}

	var p = Main.prototype;

	/**
	 * Remove the current view and inject a new one.
	 * @method updateView
	 */
	p.updateView = function () {
		this.activeView && this.activeView.remove();
		this.activeView = new scope.View();
		this.container.append(this.activeView.el);
	};

	/**
	 * Check the first route for hashbangs.
	 * @method parseFirstRoute
	 */
	p.parseFirstRoute = function () {
		var route = location.hash;
		if (/^#!\//.test(route)) {
			route = route.substr(3); // strip hashbang
			// rewrite the hash, since it is what Backbone reads when start is called.
			!!history.pushState ? history.replaceState({}, '', route) : location.replace(route);
		}
	};

	scope.Main = Main;

})(window.app);