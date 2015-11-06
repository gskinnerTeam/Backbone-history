/**
 * Application view.
 * @class View
 * @extends Backbone.View
 */
(function (scope) {

	'use strict';

	var p = {};
	var s = {};

	/**
	 * Initialize the view and apply our anchor listener.
	 * @method initialize
	 */
	p.initialize = function () {
		this.render();
		this.$('a').on('click', this.handleAnchorClick.bind(this));
	};

	/**
	 * Render the view, fetching our Handlebars template.
	 * @method render
	 */
	p.render = function () {
		var rand = Math.random();
		var data = {
			ID: rand * 100 | 0,
			BAD_ROUTE: '/' + rand.toString(36).substr(2, 7)
		};
		var html = scope.templates['view'](data);

		this.setElement(html);
		this.$el.css('background', this.getRandomColor());

		return this;
	};

	/**
	 * Generate a random hexidecimal color value.
	 * @method getRandomColor
	 * @returns {string}
	 */
	p.getRandomColor = function () {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	/**
	 * Handle clicks on anchor elements.
	 * @method handleAnchorClick
	 * @param event
	 * @returns {boolean}
	 */
	p.handleAnchorClick = function (event) {
		// allow CTRL/CMD+Clicks through
		if (event.ctrlKey || event.metaKey) { return true; }
		scope.router.processLink(event);
	};

	scope.View = Backbone.View.extend(p, s);

})(window.app);