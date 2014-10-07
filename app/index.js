'use strict';

module.exports = function () {
  var cb = this.async();

  this.prompt([{
    name: 'pluginName',
    message: 'What do you want to name your jquery plugin?',
    default: this.appname.replace(/\s/g, '-')
  },
  {
    name: 'pluginCss',
    message: 'Will your plugin have also css?',
    type: 'list',
    choices: ['Yes', 'No'],
    default: 'No'
  },
  {
    name: 'githubUserName',
    message: 'What is your GitHub username?',
    validate: function (val) {
      return val.length > 0 ? true : 'You have to provide a username';
    }
  }], function (props) {

    this.pluginName = props.pluginName;
    this.pluginCss = props.pluginCss;
    this.camelName = this._.camelize(props.pluginName);
    this.slugName = this._.slugify(props.pluginName);
    this.githubUserName = props.githubUserName;
    this.name = this.user.git.name();
    this.email = this.user.git.email();

    this.template('_bower.json', 'bower.json');
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
    this.template('src/name.js', 'src/' + this.camelName + '.js');

    if (this.pluginCss === 'Yes') {
      this.template('src/name.css', 'src/' + this.camelName + '.css');
    }

    this.npmInstall();
    cb();

  }.bind(this));
};
