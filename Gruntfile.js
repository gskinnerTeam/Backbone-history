/**
 * Application Gruntfile
 * http://gruntjs.com/
 * @param grunt
 */
module.exports = function (grunt) {
	var config = {
		cwd: 'app/',
		// https://github.com/gruntjs/grunt-contrib-connect
		connect: {
			server: {
				options: {
					hostname: '*',
					base: 'app/',
					open: true,
					middleware: function (connect, options) {
						var mw = [];
						/* rewrite the path as a hash after the index for the app to parse and strip trailing slash
						 don't match if route contains '#' since that means we've already redirected
						 don't match if route contains '.' since we don’t want to redirect files */
						var expressions = [
							// strip trailing slash
							'^\/(.*)/$ /$1 [R]',
							'^\/([^#.]+)(\\?.*)?$ /#$1$2 [R,L]'
						];
						// https://www.npmjs.com/package/connect-modrewrite
						mw.push(require('connect-modrewrite')(expressions));
						for (var i = 0, l = options.base.length; i < l; i++) {
							mw.push(connect.static(options.base[i]));
						}

						return mw;
					}
				}
			}
		},
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			templates: {
				files: 'templates/*.template.html',
				options: { cwd: 'app/' },
				tasks: 'handlebars'
			},
			main: {
				files: [
					'**/*.js',
					'**/*.css',
					'index.html'
				],
				options: {
					livereload: true,
					cwd: 'app/'
				}
			}
		},
		// https://github.com/gruntjs/grunt-contrib-handlebars
		handlebars: {
			options: {
				namespace: 'app.templates',
				processName: function (name) {
					return name.substring(name.lastIndexOf('/') + 1, name.indexOf('.'));
				}
			},
			files: {
				src: 'app/templates/*.template.html',
				dest: 'app/templates/templates.compiled.js'
			}
		}
	};

	grunt.config.init(config);

	grunt.task.loadNpmTasks('grunt-contrib-connect');
	grunt.task.loadNpmTasks('grunt-contrib-watch');
	grunt.task.loadNpmTasks('grunt-contrib-handlebars');

	grunt.task.registerTask('default', [
		'handlebars',
		'connect:server',
		'watch'
	]);
};