import gulp from 'gulp';
import gulpif from 'gulp-if';
import data from './../source/data.json' assert {type: 'json'};
import htmlmin from 'gulp-htmlmin';
import htmlPrettify from 'gulp-html-prettify';
import twig from 'gulp-twig';
import { htmlValidator } from 'gulp-w3c-html-validator';
import bemlinter from 'gulp-html-bemlinter';

const compileTwig = () => {
  return gulp.src('./source/*.html')
    .pipe(twig({
      data: data
    }))
    .pipe(gulpif(
      data.isDevelopment,
      htmlPrettify({indent_char: ' ', indent_size: 2}),
      htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('./build'));
}

const validateMarkup = () => {
	return gulp.src('build/*.html')
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }));
}

const lintBem = () => {
	return gulp.src('build/*.html')
		.pipe(bemlinter());
}

export {compileTwig, validateMarkup, lintBem};
