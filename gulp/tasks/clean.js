import del from 'del'
import config from '../config'

const clean = async () => {
  await del.sync(config.dest.root)
  await del.sync(config.build.root)
}

export default clean
