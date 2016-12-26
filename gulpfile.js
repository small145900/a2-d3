gulp = require("gulp"),
concat = require("gulp-concat"),
uglify = require('gulp-uglify');
minifyCss = require('gulp-minify-css');
rename = require('gulp-rename');
ts = require('gulp-typescript');
babel = require('gulp-babel');
// tsProject = ts.createProject("tsconfig.json");
// tslint = require('gulp-tslint');
// htmlmin = require('gulp-htmlmin');
// browserify = require('browserify');
// imagemin = require('gulp-imagemin');
// gutil = require('gulp-util');

gulp.task("minify-css",function(){
	return gulp.src(["css/*.css"])
    .pipe(concat("main.css"))
		.pipe(minifyCss())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("lib-css",function(){
	return gulp.src([
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/font-awesome/css/font-awesome.min.css"
		])
    .pipe(concat("lib.min.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest("dist/css"));
});

gulp.task("fonts",function(){
	return gulp.src([
			'node_modules/font-awesome/fonts/*',
			'node_modules/bootstrap/dist/fonts/*'
		])
		.pipe(gulp.dest("dist/fonts"));
});

gulp.task("img",function(){
	return gulp.src(["img/*"])
		.pipe(gulp.dest("dist/img"));
});

gulp.task("json",function(){
	return gulp.src(["json/*"])
		.pipe(gulp.dest("dist/json"));
});

gulp.task("templates",function(){
	return gulp.src(["templates/*/*.html"])
		.pipe(gulp.dest("dist/templates"));
});

gulp.task("src",function(){
	return gulp.src(["src/*"])
		.pipe(gulp.dest("dist/src"));
});

gulp.task("systemjs",function(){
	return gulp.src('systemjs.config.js')
		.pipe(gulp.dest("dist"));
});

gulp.task("index",function(){
	return gulp.src(["index.html","coming.html","favicon.ico"])
		.pipe(gulp.dest("dist"));
});

gulp.task("email",function(){
	return gulp.src(["email/*"])
		.pipe(gulp.dest("dist/email"));
});

gulp.task("lib", () => {
  return gulp.src([
  				'jquery/dist/**',
  				'bootstrap/dist/js/bootstrap.min.js',
  				'blueimp-md5/js/**',
          'core-js/client/shim.min.js',
          'systemjs/dist/system-polyfills.js',
          'systemjs/dist/system.src.js',
          'reflect-metadata/Reflect.js',
          'rxjs/**/*.js',
          'zone.js/dist/**',
          '@angular/**/bundles/**'
      ],{cwd: "node_modules/**"})
      .pipe(gulp.dest("dist/lib"));
});

gulp.task('default', [
	'img',
	'json',
	'templates',
	'src',
	'email',
	'systemjs',
	'index',
	'lib-css',
	'minify-css',
	'fonts',
	'lib'
])