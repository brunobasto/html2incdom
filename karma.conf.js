'use strict';

var isparta = require('isparta');

var babelOptions = {
  presets: ['es2015'],
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

    files: [
      'node_modules/incremental-dom/dist/incremental-dom.js',
      'src/*.js',
      'test/*.js'
    ],

    preprocessors: {
      'src/HTMLParser.js': ['commonjs'],
      'src/unescape.js': ['babel', 'commonjs'],
      'src/!(HTMLParser|unescape).js': ['coverage', 'commonjs'],
      'test/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions},

		reporters: ['coverage', 'progress'],

		coverageReporter: {
			instrumenters: {isparta : isparta},
			instrumenter: {'**/*.js': 'isparta'},
			instrumenterOptions: {
				isparta: {babel: babelOptions}
			},
			reporters: [
				{type: 'lcov', subdir: 'lcov'},
				{type: 'text-summary'}
			]
		}
  });
};
