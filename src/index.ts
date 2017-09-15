import { isAbsolute, join } from 'path'

import { compile } from '@motorcycle/compiler'
import { getOptions } from 'loader-utils'
import { loader } from 'webpack'

export = loader

function loader(this: loader.LoaderContext, source: string, map: string) {
  const { resourcePath, options: { context } } = this
  const { entries = [] } = getOptions(this)

  const callback = this.async()

  if (isEntry(entries, resourcePath, context)) {
    const { code, sourceMap } = compile(resourcePath)

    return callback(null, code, sourceMap)
  }

  callback(null, source, map)
}

function isEntry(entries: ReadonlyArray<string>, resourcePath: string, context: string) {
  return entries.map(getPath(context)).some(path => path === resourcePath)
}

function getPath(cwd: string) {
  return function(path: string) {
    return isAbsolute(path) ? path : join(cwd, path)
  }
}
