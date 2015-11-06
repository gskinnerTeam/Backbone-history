/**
 * Application router.
 * @class Router
 * @extends Backbone.Router
 */
(function (scope) {

	'use strict';

	var p = {};
	var s = {};

	p._origin = null;
	p._exceptionRegex = null;

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
	 * Set our origin and regex properties for use later.
	 * @method initialize
	 */
	p.initialize = function () {
		this._origin = location.protocol + '//' + location.hostname;
		this._exceptionRegex =/^https?:\/{2}[^/]+\/(dir1|dir2)\//i;
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
	 * Inspect an anchor click event.
	 * @method processLink
	 * @param event
	 */
	p.processLink = function (event) {
		var target = event.target;
		// link.href === “http://site.com/path/to/view”
		if (this.isInternalLink(target.href)) {
			event.preventDefault();
			// element.getAttribute(‘href’) === “/path/to/view”
			this.go(target.getAttribute('href'));
		}
	};

	/**
	 * Compares the live site origin to the origin on the anchor's href to determine whether or not it is an internal route.
	 * @method isInternalLink
	 * @param link {string}
	 * @returns {boolean}
	 */
	p.isInternalLink = function (link) {
		// if bases match, check the path against exceptions
		return ~link.indexOf(this._origin) ? !this._exceptionRegex.test(this._origin) : false;
	};

	scope.Router = Backbone.Router.extend(p, s);

})(window.app);