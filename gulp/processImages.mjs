import gulp from 'gulp';
import gulpif from 'gulp-if';
import data from './../source/data.json' assert {type: 'json'};
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { stacksvg } from 'gulp-stacksvg';

const processImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulpif(!data.isDevelopment, squoosh()))
    .pipe(gulp.dest('build/img'));
}

const createWebp = (done) => {
  if (!data.isDevelopment) {
    return gulp.src('source/img/**/*.{jpg,png}')
      .pipe(squoosh({ webp: {} }))
      .pipe(gulp.dest('build/img'));
  } else {
    done()
  }
}

const createAvif = (done) => {
  if (!data.isDevelopment) {
    return gulp.src('source/img/**/*.{jpg,png}')
      .pipe(squoosh({ avif: {} }))
      .pipe(gulp.dest('build/img'));
  } else {
    done()
  }
}

const optimizeSvg = () => {
  return gulp.src('source/img/favicons/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/favicons'));
}

const createSvgStack = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/favicons/*.svg'])
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/img'));
}

export {processImages, createWebp, createAvif, optimizeSvg, createSvgStack};
