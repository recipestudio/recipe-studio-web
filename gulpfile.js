var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function(){
  gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'public/src/css/*css'])
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.css'))
      .pipe(sass())
      .pipe(autoprefixer('last 2 versions'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/dist/css/'))
});

gulp.task('scripts', function(){
  return gulp.src(['node_modules/jquery/dist/jquery.slim.js', 'node_modules/materialize-css/dist/js/materialize.js', 'public/src/js/*.js'])
    /* .pipe(jshint())
    .pipe(jshint.reporter('default')) */
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/dist/js'))
});

var spawn = require('child_process').spawn;
var node;
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['./bin/www'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });  
});

gulp.task('default', ['scripts', 'styles', 'server'], function() {
  gulp.watch('public/src/css/**/*css', ['styles']);
  gulp.watch('public/src/js/**/*.js', ['scripts']);
  gulp.watch(['app.js', 'routes/**/*.js'], ['server']);
});