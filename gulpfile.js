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

// Remove build

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

// Server

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

// Npm run build

export const build = (done) => {
  data.isDevelopment = false;
  gulp.series(
    removeBuild,
    compileProject
  )(done);
}

// Npm run start-dev

export const startDev = (done) => {
  data.isDevelopment = true;
  gulp.series(
    removeBuild,
    compileProject,
    server,
    watcher
  )(done);
}

// Npm run start

export default gulp.series(
  removeBuild,
  compileProject,
  server,
  watcher
);
