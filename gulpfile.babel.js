import gulp from 'gulp'
import config from './gulp/config'

import clean from './gulp/tasks/clean'
import server from './gulp/tasks/server'
import { buildImages, watchImages } from './gulp/tasks/images'
import { buildStyles, watchStyles } from './gulp/tasks/styles'
import { buildScripts, watchScripts } from './gulp/tasks/scripts'
import { buildViews, watchViews } from './gulp/tasks/views'

config.setEnv()

export const build = gulp.series(
  clean,
  gulp.parallel(buildImages, buildStyles, buildScripts, buildViews)
)

export const watch = gulp.series(
  build,
  server,
  gulp.parallel(watchImages, watchStyles, watchScripts, watchViews)
)
