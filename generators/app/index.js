'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the lovely ' + chalk.red('ghernagon-react') + ' generator!'
    ));

    this.log(
      chalk.magenta('Make sure you are in the directory you want to scaffold into.')
    );

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.name;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // this.mkdir(this.props.name);
    // Copy the configuration files
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copy(
      this.templatePath('_webpack.lint.config.js'),
      this.destinationPath('webpack.lint.config.js')
    );
    this.fs.copy(
      this.templatePath('_webpack.prod.config.js'),
      this.destinationPath('webpack.prod.config.js')
    );
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath('.eslintignore')
    );
    this.fs.copy(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );
    this.fs.copy(
      this.templatePath('stylelintrc'),
      this.destinationPath('.stylelintrc')
    );

    // Copy the app files
    this.fs.copyTpl(
      this.templatePath('_app/_templates/_index_default.html'),
      this.destinationPath('app/templates/index_default.html'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_app/_index.jsx'),
      this.destinationPath('app/index.jsx')
    );
    this.fs.copy(
      this.templatePath('_app/_style.css'),
      this.destinationPath('app/style.css')
    );
    mkdirp('app/components');
    mkdirp('app/public');
    mkdirp('app/styles');
  },

  install: function () {
    this.installDependencies();
  }
});
