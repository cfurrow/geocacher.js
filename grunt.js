module.exports = function(grunt){
  grunt.initConfig({
    lint:{
      all: ['grunt.js','js/modules/*.js','js/tests/specs/*.js','js/*.js']
    },
    jshint:{
      options:{
        browser:true
      }
    }
  });


  grunt.registerTask('default','lint');
};
