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
		Backbone.history.start({ pushState: true, root: '/Backbone-history/' });
	}

	var p = {};

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
		var route = window.location.hash;
		if (/^#!\//.test(route)) {
			route = route.substr(3); // strip hashbang
			// rewrite the hash, since it is what Backbone reads when start is called.
			if (!!window.history) {
				window.history.replaceState({}, '', route);
			} else {
				window.location.replace(route);
			}
		}
	};

	 _.extend(Main.prototype, p);
	scope.Main = Main;

})(window.app);