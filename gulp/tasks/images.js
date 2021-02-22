import gulp from 'gulp'
import gulpif from 'gulp-if'
import image from 'gulp-image'
import plumber from 'gulp-plumber'
import config from '../config'

export const buildImages = async () =>
  await gulp
    .src(`${config.src.images}/**/*`)
    .pipe(plumber())
    .pipe(image())
    .pipe(
      gulpif(
        config.isProd,
        gulp.dest(config.build.images),
        gulp.dest(config.dest.images)
      )
    )

export const watchImages = () =>
  gulp.watch(`${config.src.images}/**/*`, buildImages)
