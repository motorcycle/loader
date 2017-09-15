import { isAbsolute, join } from 'path'

import { compile } from '@motorcycle/compiler'

const cwd = process.cwd()

export = loader

namespace loader {
  export type Context = {
    readonly async: () => AsyncCallBack

    readonly options: {
      readonly entry: string | Record<string, string>
    }
    readonly resourcePath: string
  }

  export type AsyncCallBack = {
    (error: Error, source: void, map: void): void
    (error: null, source: string, map: string): void
  }
}

function loader(this: loader.Context, source: string, map: string) {
  const { options: { entry }, resourcePath } = this

  const callback = this.async()

  if (entry && resourcePath && isEntry(entry, resourcePath)) {
    const { code, sourceMap } = compile(resourcePath)

    return callback(null, code, sourceMap)
  }

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
