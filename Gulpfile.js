var gulp=require('gulp')
var browserify=require('browserify')
var babel=require('babelify')
var source=require('vinyl-source-stream')
var rename=require('gulp-rename')

gulp.task('default', function () {
  browserify('index.js')
    .transform(babel, {presets: ["es2015"]})
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('global'))
});