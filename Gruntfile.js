
module.exports = function (grunt) {
  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.loadNpmTasks('grunt-wiredep');
  
  // Define the configuration for all the tasks
  grunt.initConfig({
    wiredep: {

      task: {
        src: [
          'app/index.html'
        ],

        options: {
          dependencies: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'wiredep'
  ]);
};