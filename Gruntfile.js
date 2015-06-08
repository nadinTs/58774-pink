module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-lintspaces');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            style: {
                files: {
                    'build/css/style.css': 'source/less/style.less'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 10"]
            },
            style: {
                src: "build/css/style.css"
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },

                files: [{
                    expand: true,
                    src: ["build/img/**/*.{png,jpg,gif,svg}"]
                }]
            }
        },

        lintspaces: {
            test: {
                src: [
                    '*.html',
                    'js/*.js',
                    'less/*.less',
                    'sass/*.sass'
                ],
                options: {
                    editorconfig: '.editorconfig'
                }
            }
        },

        githooks: {
            test: {
                'pre-commit': 'lintspaces:test',
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                        "img/**",
                        "js/**",
                        "*.html"
                    ],
                    dest: "build"
                }]
            },

            gosha: {
                files: [{
                    expand: true,
                    src: [
                        '*.html',
                        'css/**',
                        'img/**',
                        'js/**'
                    ],
                    dest: 'gosha',
                }]
            }
        },

        clean: {
            build: ["build"],
            gosha: [
                'gosha/img/README',
                'gosha/js/README'
            ]
        },

        replace: {
            build: {
                options: {
                    patterns: [{
                        match: /[\"\']img\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/img/$1"'
                    }, {
                        match: /[\"\']css\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/css/$1"'
                    }, {
                        match: /[\"\']js\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/js/$1"'
                    }]
                }
            },
            files: [{
                expand: true,
                src: [
                    "build/css/style*.css",
                    "build/*.html"
                ]
            }]
        }
    });

    grunt.registerTask('test', ['lintspaces:test']);

    grunt.registerTask("build", [
        "clean",
        "copy",
        "less",
        "autoprefixer",
        "imagemin"
    ]);

    if (grunt.file.exists(__dirname, 'less', 'style.less')) {
        grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
    } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
        grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
    } else {
        grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
    }
};
