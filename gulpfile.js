/*
!!! Created for node server v16.18.1
This gulp build has 2 modes: developing and production

Differences of developing mode:
-- No compression images
-- No creation webP and avif files
-- Creating html and css files without including webP and avif formats.
*/

import gulp from 'gulp';
import data from './source/data.json' assert {type: 'json'};
import browser from 'browser-sync';
import del from 'del';
import {compileTwig, validateMarkup, lintBem} from './gulp/processMarkup.mjs';
import {processImages, createWebp, createAvif, optimizeSvg, createSvgStack} from './gulp/processImages.mjs';
import processStyles from './gulp/processStyles.mjs';
import processScripts from './gulp/processScripts.mjs';
import copyAssets from './gulp/copyAssets.mjs';

export {compileTwig, validateMarkup, lintBem};

data.isDevelopment = false;

// Delete build folder

const removeBuild = () => {
  return del('build');
}

// CompileProject

const compileProject = (done) => {
  gulp.parallel(
    copyAssets,
    compileTwig,
    processStyles,
    processImages,
    processScripts,
    createWebp,
    createAvif,
    optimizeSvg,
    createSvgStack
  )(done);
}

// Run localhost server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const serverReload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(processStyles));
  gulp.watch('source/js/**/*.js', gulp.series(processScripts, serverReload));
  gulp.watch('source/img/**/*.svg', gulp.series(createSvgStack, serverReload));
  gulp.watch(['source/**/*.{html,twig}', 'source/data.json'], gulp.series(compileTwig, serverReload));
}

// Build the project in production mode without running the localhost server.
// To read about developing and production mode follow to the begining of this file.

export const build = (done) => {
  data.isDevelopment = false;
  gulp.series(
    removeBuild,
    compileProject
  )(done);
}

// Run the localhost server building the project in developing mode.
// To read about developing and production mode follow to the begining of this file.

export const startDev = (done) => {
  data.isDevelopment = true;
  gulp.series(
    removeBuild,
    compileProject,
    server,
    watcher
  )(done);
}

// Run the localhost server building the project in production mode.
// To read about developing and production mode follow to the begining of this file.

export default gulp.series(
  removeBuild,
  compileProject,
  server,
  watcher
);
