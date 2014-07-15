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
                    style: 'compressed',
                    noCache: 'true'
                },
                files: {
                    'build/_css/global.min.css': 'source/_css/global.scss'
                }
            }
        },

        // Watch dem files
        watch: {
            js: {
                files: ['source/_js/*.js'],
                tasks: ['concat', 'uglify']
            },
            copy: {
                files: ['source/*.php'],
                tasks: ['copy:php']
            },
            sass: {
                files: ['source/_css/*.scss'],
                tasks: ['sass']
            },
            options: {
                livereload: true
            }
        },

        // Move over images & PHP
        copy: {
            images: {
                expand: 'true',
                cwd: 'source/_img/',
                src: '**',
                dest: 'build/_img/'
            },
            php: {
                expand: 'true',
                cwd: 'source/',
                src: '*.php',
                dest: 'build/',
                filter: 'isFile'
            }
        },

        // Pre-process the images
        imageoptim: {
            build: {
                src: 'source/_img/**/*'
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Register task(s)
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'copy:php', 'watch']);
    grunt.registerTask('images', ['newer:copy:images', 'newer:imageoptim']);

};