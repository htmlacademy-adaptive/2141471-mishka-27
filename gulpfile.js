import gulp from 'gulp';
import { deleteSync as clean } from 'del';
import getData from 'gulp-data';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import minifyCss from 'postcss-csso';
import rename from 'gulp-rename';
import posthtml from 'gulp-posthtml';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import minifyJs from 'gulp-terser';
import twig from 'gulp-twig';
import sortMediaQueries from 'postcss-sort-media-queries';
import { stacksvg } from 'gulp-stacksvg';
import svgo from 'gulp-svgo';
import createWebp from 'gulp-webp';
import optimizeImages from 'gulp-imagemin';
import optimizeJpeg from 'imagemin-mozjpeg';
import optimizePng from 'imagemin-pngquant';
import optimizeSvg from 'imagemin-svgo';
import svgoConfig from './svgo.config.js';
import useCondition from 'gulp-if';


// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      sortMediaQueries(),
      autoprefixer(),
      minifyCss()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

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
    .pipe(gulp.dest('build'));
}

// Scripts

const buildScripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(minifyJs())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
}

// Images

const isDev = process.argv.includes('--dev');

const buildImages = () => {
  return gulp
    .src('source/img/**/*.{jpg,png,svg}')
    .pipe(
      useCondition(
        isDev,
        optimizeImages([
          optimizePng(),
          optimizeJpeg({ progressive: true, quality: 75 }),
          optimizeSvg(svgoConfig),
        ])
      )
    )
    .pipe(gulp.dest('build/img'))
    .pipe(createWebp({ quality: 75 }))
    .pipe(gulp.dest('build/img'))
}

// Sprite

const buildSprite = () => {
  return gulp.src('source/img/icon/**/*.svg')
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(gulp.dest('build/img'));
}

// SVG

const buildSvgo = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

// Copy

const buildCopy = (done) => {
  gulp.src([
    'source/static',
    'source/*.{ico,manifest}',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Delete

const buildDelete = (done) => {
  clean('build');
  done();
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

// Build

export const build = gulp.series(
  buildDelete,
  buildCopy,
  buildImages,
  gulp.parallel(
    styles,
    buildHtml,
    buildScripts,
    buildSprite,
    buildSvgo
  ),
);

export default gulp.series(
  buildHtml, buildSprite, styles, server, watcher
);
