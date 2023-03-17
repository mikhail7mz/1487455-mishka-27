import gulp from 'gulp';
import terser from 'gulp-terser';

const processScripts = () => {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

export default processScripts;
