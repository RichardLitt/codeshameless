'use strict';

module.exports = function(grunt) {
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			less: {
				files: [
				'public/lib/less/app.less',
				'public/lib/bootstrap/less/*.less'
				],
				tasks: ['less']
			},
			js: {
				files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['public/views/**', 'app/views/**'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['public/css/**'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
				options: {
					jshintrc: true
				}
			}
		},
		less: {
			dist: {
				files: {
					'public/css/main.min.css': [
					'public/lib/less/app.less'
					]
				},
				options: {
					compress: true,
					// LESS source map
					// To enable, set sourceMap to true and update sourceMapRootpath based on your install
					// sourceMap: false,
					// sourceMapFilename: '',
					// sourceMapRootpath: ''
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'public/js/scripts.min.js': [
					'public/lib/bootstrap/js/*.js'
					]
				},
				options: {
					// JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
					// sourceMap: '',
					// sourceMappingURL: ''
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					args: [],
					ignore: ['public/**'],
					ext: 'js',
					nodeArgs: ['--debug'],
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		mochaTest: {
			options: {
				reporter: 'spec',
				require: 'server.js'
			},
			src: ['test/mocha/**/*.js']
		},
		env: {
			test: {
				NODE_ENV: 'test'
			}
		},
		karma: {
			unit: {
				configFile: 'test/karma/karma.conf.js'
			}
		}
	});

	//Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	//Default task(s).
	grunt.registerTask('default', ['jshint', 'concurrent', 'less', 'uglify']);

	//Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
