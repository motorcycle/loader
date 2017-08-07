import { isAbsolute, join } from 'path'

import { compile } from '@motorcycle/compiler'

const cwd = process.cwd()

export = function(source: string, map: string) {
  const { options: { entry }, resourcePath } = this

  const callback = this.async()

  if (isEntry(entry, resourcePath)) return callback(null, compile(resourcePath), map)

  callback(null, source, map)
}

function isEntry(entry: string | Record<string, string>, resourcePath: string) {
  if (typeof entry === 'string') return getPath(entry) === resourcePath

  const keys = Object.keys(entry)
  const values = keys.map(key => entry[key])

  return values.map(getPath).some(path => path === resourcePath)
}

function getPath(path: string) {
  return isAbsolute(path) ? path : join(cwd, path)
}
