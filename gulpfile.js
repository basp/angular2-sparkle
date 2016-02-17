'use strict';

const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const inject = require('gulp-inject');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const DEV_DEPS = [
  'es6-shim/es6-shim.js',
  'systemjs/dist/system-polyfills.js',
  'angular2/bundles/angular2-polyfills.js',
  'systemjs/dist/system.src.js',
  'rxjs/bundles/Rx.js',
  'angular2/bundles/angular2.dev.js',
  'jquery/dist/jquery.js',
  'bootstrap/dist/css/bootstrap.css',
  'boostrap/dist/js/boostrap.js',
  'lodash/lodash.js',
  'moment/moment.js'
];

gulp.task('build:index:dev', () => {
  const files = DEV_DEPS.map(x => path.join('node_modules', x));
  const sources = gulp.src(files)
    .pipe(gulp.dest('wwwroot/vendor'));

  return gulp.src('src/index.html')
    .pipe(gulp.dest('wwwroot'))
    .pipe(inject(sources, { relative: true }))
    .pipe(gulp.dest('wwwroot'))
    .pipe(browserSync.stream());
});

gulp.task('build:app:dev', () => {
  var tsResult = gulp.src('src/app/**/*.ts')
    .pipe(ts(tsProject));
    
  return tsResult.js
    .pipe(gulp.dest('wwwroot/app'))
    .pipe(browserSync.stream());
});

gulp.task('build:dev', ['build:index:dev', 'build:app:dev']);

gulp.task('watch', () => {
  gulp.watch('src/app/*.ts', ['build:app:dev']);
  gulp.watch('src/index.html', ['build:index:dev']);
});

gulp.task('serve', ['build:dev', 'watch'], () => {
  if (browserSync.active) return;
  browserSync.init({
    server: {
      baseDir: 'wwwroot',
      index: 'index.html'
    },
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    notify: true,
    reloadDelay: 50
  });
});

gulp.task('default', ['serve']);