'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('generator', function () {
  beforeEach(function (cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return cb(err);
      }

      this.generator = helpers.createGenerator('jquery-plugin-boilerplate:app', deps);
      cb();
    }.bind(this));
  });

  it('generates expected files', function (cb) {
    var expected = [
      'src/test.js',
      'src/test.css',
      'test/index.html',
      'test/spec.js',
      'demo.html',
      'gulpfile.js',
      'bower.json',
      'package.json',
      'readme.md',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      '.travis.yml'
    ];

    helpers.mockPrompt(this.generator, {
      pluginName: 'test',
      githubUserName: 'test',
      pluginCss: 'Yes'
    });

    this.generator.run({}, function () {
      helpers.assertFile(expected);
      cb();
    });
  });
});
