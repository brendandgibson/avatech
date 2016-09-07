var _          = require('lodash'),
	babel      = require('gulp-babel'),
	babelify   = require('babelify'),
	browserify = require('gulp-browserify'),
	concat     = require('gulp-concat'),
	csslint    = require('gulp-csslint'),
	cssmin     = require('gulp-cssmin'),
	eslint     = require('gulp-eslint');
	fs         = require('fs'),
	gulp       = require('gulp'),
	gulpif     = require('gulp-if'),
	gulpfilter = require('gulp-filter'),
	less       = require('gulp-less'),
	livereload = require('gulp-livereload'),
	notify     = require('gulp-notify'),
	path       = require('path'),
	pkg        = require('./package'),
	rename     = require('gulp-rename'),
	replace    = require('gulp-replace'),

	debug      = require('gulp-debug'),

	dist       = path.join(__dirname, 'public'),

	reactFile  = 'react-with-addons' + (gulp.env.production ? '.min.js' : '.js');

	paths      = {
		consolePolyfill : path.join(__dirname, 'node_modules/console-polyfill/index.js'),
		data            : path.join(__dirname, 'assets', 'data', '**/*'),
		dataDest        : path.join(dist, 'data'),
		dist            : path.join(__dirname, 'public'),
		gulpfile        : 'gulpfile.js',
		html            : path.join(__dirname, 'resources', '*.html') ,
		images          : 'assets/images/**',
		imagesDist      : path.join(dist, 'images'),
		main            : path.join(__dirname, pkg.main),
		scriptsDist     : path.join(dist, 'scripts'),
		scripts         : path.join(__dirname, 'scripts/**/*.js'),
		styles          : [ path.join(__dirname, 'assets/styles/**/*'), path.join(__dirname, 'styles/*.less') ],
		stylesResources : path.join(__dirname, 'resources', 'styles'),
		stylesDist      : path.join(dist, 'styles')
	},

	// Handle the error by outputting info to the console
	errorHandler = function (error) {
		console.log(error.toString());
		this.emit('end');
	};


// script tasks ----------------------------------------------------------------

// Lint javascript
gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
	.pipe(eslint())
	.pipe(eslint.format());
});

gulp.task('scripts', ['jshint'], function() {
	return gulp.src(paths.main)
		.pipe(browserify({
			// Convert JSX files into javascript
			transform: [babelify]
		}))
		.on('error', errorHandler)
		.pipe(concat([pkg.name, '-', pkg.version, '.js'].join('')))
		.pipe(gulp.dest(paths.scriptsDist));
});


// style tasks -----------------------------------------------------------------

// Lint the CSS
gulp.task('csslint', function() {

	var csspaths = paths.styles
		.concat('!**/*/reset.less')
		.concat('!**/svg/*');

	return gulp.src(csspaths)
		.pipe(less({ paths : [ paths.stylesResources] })
			.on('error', errorHandler))
		.pipe(csslint({
			'box-sizing': false,
			'box-model': false,
			'adjoining-classes': false,
			'universal-selector': false,
			'star-property-hack': false,
			'outline-none': false,
			'qualified-headings': false,
			'unique-headings': false,
			'important': false
		}))
		.pipe(csslint.reporter());
});

gulp.task('styles', ['csslint'], function() {
	return gulp.src(paths.styles)
		.pipe(less({ paths : [ paths.stylesResources ] }))
		.pipe(concat([pkg.name, '-', pkg.version, '.css'].join('')))
		.pipe(gulpif(gulp.env.production, cssmin()))
		.pipe(gulp.dest(paths.stylesDist));
});



// asset tasks -----------------------------------------------------------------

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.imagesDist));
});


gulp.task('data', function() {
	return gulp.src(paths.data).pipe(gulp.dest(paths.dataDest));
});


gulp.task('console-polyfill', function() {
	return gulp.src(paths.consolePolyfill)
		.pipe(gulp.dest(paths.scriptsDist));
});


gulp.task('html', function() {
	return gulp.src(paths.html)
		.pipe(replace('#VERSION#', pkg.version))
		.pipe(gulp.dest(dist));
});

// watch tasks -----------------------------------------------------------------

gulp.task('watch', function() {
	var allStyles = paths.styles.concat(paths.stylesResources + '/**/*.less');

	gulp.run('default');

	gulp.watch(paths.html,          [ 'html' ]);
	gulp.watch(paths.images,        [ 'images' ]);
	gulp.watch(paths.scripts,       [ 'scripts' ]);
	gulp.watch(allStyles,           [ 'styles' ]);
	gulp.watch(paths.data,          [ 'data' ]);
	gulp.watch(paths.gulpfile,      [ 'default' ]);

});

// default task ----------------------------------------------------------------

gulp.task('default', [ 'data', 'scripts', 'styles', 'images', 'html' ]);
