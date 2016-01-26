// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var wrapper = require('gulp-wrapper');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var usemin = require('gulp-usemin');
//var rev = require('gulp-rev');

var paths = {
    scripts: {
        all: ['./js/**/*.js'],
        lint: ['./js/*.js','!./js/lib/*.js'],
        offerValidation: ['./js/fairgarage.js','./js/offerValidation.js','./js/offerValidationRules.js','./js/main.js']
    },
    html: ['./index.html','./portalOffer.html']
};

gulp.task('usemin', function () {
    return gulp.src(paths.html)
        .pipe(usemin({
            //css: [minifyCss(), 'concat'],
            html: [minifyHTML({
                conditionals: true,
                empty: true,
                quotes: true
            })],
            //js: [uglify(), rev()]
            js: [uglify()]
        }))
        .pipe(gulp.dest('./dist'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.scripts.lint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Min OV files Task
gulp.task('js-portal', function(){
    return gulp.src(paths.scripts.offerValidation)
        .pipe(concat('portalOfferValidation.js'))
        .pipe(wrapper({
            header: '(function($){\n',
            footer: '\n})(jQuery);'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('portalOfferValidation.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Our Sass
/*
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});
*/

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts.lint, ['lint']);
    gulp.watch([paths.html,paths.scripts.all], ['usemin']);
    gulp.watch(paths.scripts.offerValidation, ['js-portal']);
    //gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint','usemin','js-portal','watch']);
