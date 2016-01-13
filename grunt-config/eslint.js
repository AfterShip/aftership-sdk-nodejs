'use strict';

module.exports = {
	options: {
		configFile: '.eslintrc'
	},
	target: [
		'**/*.js',
		'!**/bower_components/**',
		'!**/node_modules/**',
		'!coverage/**'
	]
};
