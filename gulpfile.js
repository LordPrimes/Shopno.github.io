const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minicss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const include = require("gulp-include");
const imagemin = require('gulp-imagemin');
const importCss = require('gulp-import-css');
 
const path = {

    build:{
        js:'js/',
        css:'css/',
        cssdetails:'css/*.css',
        html:'index.html',
        img:'img/',
        libscss:'css/',
        libsjs:'js/'
    },
    dist: {
        js:'dist/js/*.js',
        css:'dist/sass/*.sass',
        html:'index.html',
        img:'dist/images/*',
        libscss:'dist/libs/css/*.css',
        libsjs:'dist/libs/js/*.js'
    },
    watch: {
        js:'dist/js/*.js',
        scss:'dist/sass/*.sass',
        css:'css/*.css',
        html:'index.html',
        img:'dist/images/*',
        libscss:'dist/libs/css/*.css',
        libsjs:'dist/libs/js/*.js'

    },
    bundlename: {
        js:'all.js'
    }
  
};
gulp.task('libs', function() {
    gulp.src(path.dist.libsjs)
    .pipe(plumber({errorHandler: notify.onError("Error:<%= error.message %>")}))
    .pipe(concat(path.bundlename.js))
    .pipe(babel({
    presets: ['es2015']
    }))
    .pipe(include({
        extensions:"js",
        hardFail:true
    }))
    .pipe(uglify()) 
    .pipe(gulp.dest(path.build.libsjs));
    gulp.src(path.dist.libscss)
    .pipe(importCss())
    .pipe(concat('style.css'))
    .pipe(minicss({compatibility:'ie8'}))
    .pipe(autoprefixer({
        browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
        ],
        cascade: false 
        }))
    .pipe(gulp.dest('./'))
    .pipe(livereload());;
  });  
gulp.task('sass',function(){
    return gulp.src(path.dist.css)
    .pipe(plumber({errorHandler: notify.onError("Error:<%= error.message %>")}))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(path.build.css))
    .pipe(livereload());

});

gulp.task('css',function(){
 return gulp.src(path.build.cssdetails)
        .pipe(concat('style.css'))
        .pipe(minicss({compatibility:'ie8'}))
        .pipe(autoprefixer({
            browsers: [
            '> 1%',
            'last 2 versions',
            'firefox >= 4',
            'safari 7',
            'safari 8',
            'IE 8',
            'IE 9',
            'IE 10',
            'IE 11'
            ],
            cascade: false 
            }))
        .pipe(gulp.dest('./'))
        .pipe(livereload());;
      
});
gulp.task('scripts', function() {
    return gulp.src(path.dist.js)
      .pipe(plumber({errorHandler: notify.onError("Error:<%= error.message %>")}))
      .pipe(concat(path.bundlename.js))
      .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(include({
        extensions:"js",
        hardFail:true
    }))
    .pipe(uglify()) 
      .pipe(gulp.dest(path.build.js));
  });
gulp.task('html', function(){
    return gulp.src(path.dist.html )
    .pipe(livereload());;
}); 
gulp.task('images', function(){
    return gulp.src(path.dist.img )
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 50}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest(path.build.img))
});  

gulp.task('default' , function() {
    livereload.listen();
    gulp.watch(path.watch.libsjs, gulp.parallel('libs'));
    gulp.watch(path.watch.libscss, gulp.parallel('libs'));
    gulp.watch(path.watch.scss, gulp.parallel('sass'));
    gulp.watch(path.watch.css, gulp.parallel('css'));
    gulp.watch(path.watch.js, gulp.parallel('scripts'));
    gulp.watch(path.watch.html, gulp.parallel('html'));
    gulp.watch(path.watch.img, gulp.parallel('images'));


});
