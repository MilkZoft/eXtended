'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      options: {
        config: '.jscsrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/example.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/example.js'
      ]
    },
    githooks: {
      all: {
        options: {
          endMarker: ''
        },
        'pre-commit': 'analyze',
        'post-checkout': 'shell:gitLog',
        'post-commit': 'shell:gitLog'
      }
    },
    shell: {
      gitLog: {
        command: 'git log -1 > git-info.txt'
      }
    }
  });

  // Code tasks
  grunt.registerTask('default', ['analyze']);
  grunt.registerTask('analyze', 'Validates code style', ['jshint', 'jscs']);
};
