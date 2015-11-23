'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc'
			},
			target: ['**/*.js', '!coverage/**', '!**/node_modules/**']
		},

		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage'
				}
			}
		},

		mocha_istanbul: {
			coverage: {
				src: ['test/**.js'],
				options: {
					coverage: true,
					reporter: 'spec'
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha-istanbul');

	// Default task.
	grunt.registerTask('default', []);

	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

	grunt.registerTask('lint', ['eslint']);
};
