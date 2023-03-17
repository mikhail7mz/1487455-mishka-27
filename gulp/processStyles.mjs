import gulp from 'gulp';
import data from './../source/data.json' assert {type: 'json'};
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browser from 'browser-sync';

const sass = gulpSass(dartSass);

const processStyles = () => {
  const sassOptions = {
		functions: {
			'getbreakpoint($bp)': (bp) => new dartSass.types.Number(data.viewports[bp.getValue()]),
			'getext($name)': (name) => new dartSass.types.String(data.images[name.getValue()].ext),
			'getmaxdppx()': () => new dartSass.types.Number(data.maxdppx),
			'getviewports($name)': function (name) {
				let vps = data.images[name.getValue()].sizes.map((size) => size.viewport);
				let viewports = new dartSass.types.List(vps.length);
				vps.reverse().forEach((vp, i) => { viewports.setValue(i, new dartSass.types.String(vp)) });
				return viewports;
			}
		}
	}
  return gulp.src('source/sass/style.scss', { sourcemaps: data.isDevelopment })
    .pipe(plumber())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

export default processStyles;
