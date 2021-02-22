import gulp from 'gulp'
import pug from 'gulp-pug'
import posthtml from 'gulp-posthtml'
import gulpif from 'gulp-if'
import plumber from 'gulp-plumber'
import { setup as emittySetup } from '@zoxon/emitty'
import config from '../config'

const emittyPug = emittySetup(config.src.views, 'pug', {
  makeVinylFile: true
})

global.watch = false
global.emittyChangedFile = {
  path: '',
  stats: null
}

export const buildViews = async () =>
  await gulp
    .src(`${config.src.views}/*.pug`)
    .pipe(plumber())
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats
        )
      )
    )
    .pipe(pug({ pretty: false }))
    .pipe(posthtml())
    .pipe(
      gulpif(
        config.isProd,
        gulp.dest(config.build.views),
        gulp.dest(config.dest.views)
      )
    )

export const watchViews = () => {
  global.watch = true

  gulp
    .watch(`${config.src.views}/**/*.pug`, buildViews)
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      }
    })
}
