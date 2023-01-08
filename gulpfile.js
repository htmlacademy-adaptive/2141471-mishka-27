import gulp from 'gulp';
import getData from 'gulp-data';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import posthtml from 'gulp-posthtml';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import twig from 'gulp-twig';
import sortMediaQueries from 'postcss-sort-media-queries';
import { stacksvg } from 'gulp-stacksvg';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      sortMediaQueries(),
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

const buildHtml = () => {
  return gulp
    .src('source/layouts/pages/**/*.twig')
    .pipe(
      getData(({ path }) => {
        const page = path
          .replace(/^.*pages(\\+|\/+)(.*)\.twig$/, "$2")
          .replace(/\\/g, "/");

        return {
          page,
        };
      })
    )
    .pipe(twig())
    .pipe(posthtml())
    .pipe(gulp.dest('source'));
}

const buildSprite = () => {
  return gulp.src('source/img/icon/**/*.svg')
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(gulp.dest('source/img'));
}

const reload = (done) => {
  browser.reload();
  done();
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/layouts/**/*.twig', gulp.series(buildHtml, reload));
  gulp.watch('source/img/icon/**/*.svg', gulp.series(buildSprite, reload));
}


export default gulp.series(
  buildHtml, buildSprite, styles, server, watcher
);
