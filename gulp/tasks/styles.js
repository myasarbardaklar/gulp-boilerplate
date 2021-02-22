import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import gcmq from 'gulp-group-css-media-queries'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import gulpif from 'gulp-if'
import config from '../config'

export const buildStyles = async () =>
  await gulp
    .src(`${config.src.styles}/*.scss`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(postcss())
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(
      gulpif(
        config.isProd,
        gulp.dest(config.build.styles),
        gulp.dest(config.dest.styles)
      )
    )

export const watchStyles = () =>
  gulp.watch(`${config.src.styles}/**/*.scss`, buildStyles)
