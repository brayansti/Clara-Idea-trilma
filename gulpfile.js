const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const BABEL_POLYFILL = './node_modules/@babel/polyfill/browser.js';

var paths = {
	styles: {
		src: 'sources/sass/*.scss',
		dest: 'deploy/assets/css/'
	},
	scripts: {
		src: [
			'sources/js/utilidades.js',
			'sources/js/script.js',
			'sources/js/front.js',
		],
		src_IE: [
			BABEL_POLYFILL
		],
		dest: 'deploy/assets/js/'
	},
	watchFiles: {
		js: [
			'sources/js/*',
		],
		css: [
			'sources/sass/*',
			'sources/sass/*/*',
		]
	}
};
 
/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
	// You can use multiple globbing patterns as you would with `gulp.src`,
	// for example if you are using del 2.0 or above, return its promise
	return del([ 'deploy/assets' ]);
}
 
/*
 * Define our tasks using plain functions
 */
function styles() {
	return gulp.src(paths.styles.src , { sourcemaps: true })
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(cleanCSS())
		// pass in options to the stream
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest));
}
 
function scripts() {
		return gulp.src( paths.scripts.src , { sourcemaps: true })
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.js'))
		// .pipe(sourcemaps.write('./maps')) → ¿error?
		.pipe(gulp.dest(paths.scripts.dest))
		// ↓↓ Minificate
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.scripts.dest))
}

function ie() {
		return gulp.src( paths.scripts.src_IE)
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('ie.min.js'))
		.pipe(gulp.dest(paths.scripts.dest))
}
 
function watch() {
	gulp.watch(paths.watchFiles.js, scripts);
	gulp.watch(paths.watchFiles.css, styles);
}
 
/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts, ie));
 
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.ie = ie;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;