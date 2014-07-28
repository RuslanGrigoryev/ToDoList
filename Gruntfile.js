module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройка для объединения файлов находится тут
            dist: {
                    src: [
                        'src/js/libs/*.js', // Все JS в папке libs
                        'src/js/script.js'  // Конкретный файл
                    ],
                    dest: 'src/js/build/production.js',
                }
        },
        uglify: {
            build: {
                src: 'src/js/build/production.js',
                dest: 'src/js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/i/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/i/build/'
                }]
            }
        },
        watch: {
          scripts: {
            files: ['src/js/libs/*.js', 'src/js/script.js'],
            tasks: ['concat', 'uglify'],
            options: {
              spawn: false,
            },
          },
          css: {
              files: ['src/css/*.scss'],
              tasks: ['sass'],
              options: {
                spawn: false,
                livereload: true
              }
          }
        },
        cssmin: {
          combine: {
            files: {
              'src/css/build/style.min.css': ['src/css/build/style.css']
            }
          }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/css/build/style.css': 'src/css/style.scss'
                }
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['watch']);

};