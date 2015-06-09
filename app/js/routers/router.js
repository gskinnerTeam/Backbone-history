/**
 * Application router.
 */
(function (scope) {

	'use strict';

	var p = {};
	var s = {};

	/**
	 * Backbone's routes object.
	 * @property routes
	 * @type {object}
	 */
	p.routes = {
		'': 'home',
		'fruits(/:fruit)': 'fruit',
		'*error': 'error'
	};

	/**
	 * Shorthand for Router.navigate that lets us run processes before the route is sent.
	 * @method go
	 * @param dest
	 */
	p.go = function (dest) {
		if (this.activeRoute === dest) { return; }
		this.activeRoute = dest;
		this.navigate(dest, { trigger: true });
	};

	/**
	 * Compares the live site origin to the origin on the anchor's href to determine whether or not it is an internal route.
	 * @method detectInternalLink
	 * @param link
	 * @returns {boolean}
	 */
	p.detectInternalLink = function (link) {
		// spike-only crawler check
		if (link.className === 'crawler') { return false; }
		// link.href === “http://site.com/path/to/view”
		var destination = link.href;
		var currentBase = window.location.protocol + '//' + window.location.hostname;
		// if bases match, check the path against exceptions
		if (destination.indexOf(currentBase) >= 0) {
			var exceptions = /(some\/directory|other\/directory)\/.+/i;
			return destination.split(currentBase)[1].match(exceptions) === null;
		}
		return false;
	};

	scope.Router = Backbone.Router.extend(p, s);

})(window.app);