'use strict';
var path = require('path');
var fs = require('fs');

module.exports = function () {
  var cb = this.async();

  this.prompt([{
    name: 'pluginname',
    message: 'What do you want to name your jquery plugin?',
    default: this.appname.replace(/\s/g, '-')
  }, {
    name: 'githubusername',
    message: 'What is your GitHub username?',
    validate: function (val) {
      return val.length > 0 ? true : 'You have to provide a username';
    }
  }], function (props) {

    this.pluginname = props.pluginname;
    this.camelname = this._.camelize(props.pluginname);
    this.slugname = this._.slugify(props.pluginname);
    this.githubusername = props.githubusername;
    this.name = this.user.git.username;
    this.email = this.user.git.email;



    fs.writeFileSync(path.join(this.sourceRoot(), '.gitignore'), 'node_modules\n');

    this.template('_package.json', 'package.json');
    this.template('_Readme.md', 'readme.md');
    this.template('.editorconfig');
    this.template('.gitignore');
    this.template('.jshintrc');
    this.template('.travis.yml');
    this.template('demo.html');
    this.template('gulpfile.js');
    this.template('test/index.html');
    this.template('test/spec.js');
    this.template('src/name.js', 'src/' + this.camelname + '.js');

    cb();
  }.bind(this));
};
