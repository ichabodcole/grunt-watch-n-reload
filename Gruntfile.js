var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point){
  return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    regarde: {
      frontend: {
        files: ['app/**/*.html', 'app/**/*.js'],
        tasks: ['livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          base: 'app/',
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};