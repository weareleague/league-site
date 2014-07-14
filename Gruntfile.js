module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concat $ Uglify JS
        concat: {
            dist: {
                src: 'source/_js/*.js',
                dest: 'build/_js/core.min.js'
            }
        },
        uglify: {
            build: {
                src: 'build/_js/core.min.js',
                dest: 'build/_js/core.min.js'
            }
        },

        // SASS pre-processing
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/_css/global.css': 'source/_css/global.scss'
                }
            }
        },

        // Pre-process the images
        imageoptim: {
            build: {
                src: 'build/_img/'
            }
        },

        // Watch dem files
        watch: {
            js: {
                files: ['source/_js/*.js'],
                tasks: ['concat', 'uglify']
            },
            img: {
                files: ['source/_img/**/*.{png,jpg,gif}'],
                tasks: ['imageoptim']
            },
            sass: {
                files: ['source/_css/*.scss'],
                tasks: ['sass']
            },
            options: {
                livereload: true
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register task(s)
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imageoptim', 'watch']);

};