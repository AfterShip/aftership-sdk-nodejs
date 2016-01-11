'use strict';

module.exports = {
	coverage: {
		src: ['test/**/*.js'],
		options: {
			coverage: true,
			reporter: 'spec',
			istanbulOptions: ['--include-all-sources']
		}
	}
};
