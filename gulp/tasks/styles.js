import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import gulpif from 'gulp-if'
import purgecss from '@fullhuman/postcss-purgecss'
import tailwindcss from 'tailwindcss'
import config from '../config'

export const buildStyles = () =>
  gulp
    .src(`${config.src.styles}/*.{scss,sass}`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
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

export const buildTailwindcss = () =>
  gulp
    .src('./tailwind.css')
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemaps.init()))
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
  gulp.watch(`${config.src.styles}/**/*.{scss,sass}`, buildStyles)

export const watchTailwindcss = () =>
  gulp.watch('./tailwind.css', buildTailwindcss)
