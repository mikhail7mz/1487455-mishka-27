import gulp from 'gulp';

const copyAssets = () => {
  return gulp.src([
    'source/fonts/*.{woff,woff2}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

export default copyAssets;
