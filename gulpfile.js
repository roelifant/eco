const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const include = require('gulp-include');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');

//use gulp-include sprockets/snockets syntax to concatenate js files
gulp.task('require', () =>{
    return gulp.src('./src/js/startup.js')
    .pipe(include())
      .on('error', console.log)
    .pipe(rename("index.js"))
    .pipe(gulp.dest('./dist/js/'))
});

//rewrite es6 js as universally executable js
gulp.task('babel', () =>
    gulp.src('./dist/js/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/js/'))
);

//compresses the js into a more compact form
gulp.task('compress', function () {
    return gulp.src('./dist/js/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

//build css
  gulp.task('styles', function () {
    return gulp.src('./src/sass/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css/'));
  });

//default task. Runs when "gulp" is run
gulp.task('default', gulp.series('require', "babel", 'compress', "styles"));

//default task but without compression
gulp.task('dev', gulp.series('require', "styles"));

//watch changes
gulp.task('watch', ()=>{gulp.watch("./src/**/*", gulp.series("default"))});
gulp.task('watch:dev', ()=>{gulp.watch("./src/**/*", gulp.series("dev"))});