'use strict';

const loadGruntConfig = require('load-grunt-config');
const path = require('path');

module.exports = (grunt) => {
	loadGruntConfig(grunt, {
		pkg: grunt.file.readJSON('package.json'), // Loads grunt tasks defined in package.json
		configPath: path.join(process.cwd(), 'grunt-config'), // path to task.js files, defaults to grunt dir
		init: true, // auto grunt.initConfig

		config: {
			// additional config vars
		},
		loadGruntTasks: {
			pattern: ['grunt-*', '@*/grunt-*']
		}
	});

	// Tasks

	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

	grunt.registerTask('lint', ['eslint']);

	// Default task
	grunt.registerTask('default', []);
};
