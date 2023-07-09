var gulp = require('gulp');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass')(require('sass'));
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

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