import loader = require('./')

import * as webpack from 'webpack'

import { Test, describe, given, it } from '@typed/test'

import { join } from 'path'

export const test: Test = describe(`loader`, [
  given(`source code and source-map and 'this' which is not the entry`, [
    it(`calls callback with supplied source code and source-map`, function({ equal }) {
      const error: null = null
      const code = `const foo = ['f', 'o', 'o']`
      const sourceMap = `{ version: "3" }`

      const callback = function callback(
        err: Error | null,
        source: string | void,
        map: string | void
      ) {
        equal(error, err)
        equal(code, source)
        equal(sourceMap, map)
      }

      const context = {
        options: {
          context: process.cwd(),
        },
        async() {
          return callback
        },
        query: {
          entries: ['src/__test__/bootstrap.ts'],
        },
        resourcePath: 'not-important.js',
      } as webpack.loader.LoaderContext

      loader.apply(context, [code, sourceMap])
    }),
  ]),

  given(`source code and source-map and 'this' which is the entry`, [
    it(`calls callback with compiled source code and source-map`, function({ equal }) {
      const error: null = null

      const expectedCode = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("@motorcycle/stream");
var mostly_dom_1 = require("@motorcycle/mostly-dom");
var UI_1 = require("./UI");
var element = document.querySelector('#app');
if (!element)
    throw new Error('could not find element');
var sinkProxies__generated__by__motorcycle__compiler = {
    view$: stream_1.createProxy().stream
};
var sources__generated__by__motorcycle__compiler = mostly_dom_1.makeDomComponent(element)(sinkProxies__generated__by__motorcycle__compiler);
var sinks__generated__by__motorcycle__compiler = UI_1.UI(sources__generated__by__motorcycle__compiler);
sinks__generated__by__motorcycle__compiler.view$.run(sinkProxies__generated__by__motorcycle__compiler.view$, stream_1.scheduler);
//# sourceMappingURL=module.js.map`

      const expectedSourceMap = `{"version":3,"file":"module.js","sourceRoot":"","sources":["module.ts"],"names":[],"mappings":";;AAAA,6CAA4D;AAC5D,qDAAgF;AAChF,2BAA0B;AAC1B,IAAM,OAAO,GAAG,QAAQ,CAAC,aAAa,CAAC,MAAM,CAAC,CAAC;AAC/C,EAAE,CAAC,CAAC,CAAC,OAAO,CAAC;IACT,MAAM,IAAI,KAAK,CAAC,wBAAwB,CAAC,CAAC;AAC9C,IAAM,gDAAgD,GAAG;IACrD,KAAK,EAAE,oBAAW,EAAE,CAAC,MAAM;CAC9B,CAAC;AACF,IAAM,4CAA4C,GAAG,6BAAgB,CAAC,OAAO,CAAC,CAAC,gDAAgD,CAAC,CAAC;AACjI,IAAM,0CAA0C,GAAG,OAAE,CAAC,4CAA4C,CAAC,CAAC;AACpG,0CAA0C,CAAC,KAAK,CAAC,GAAG,CAAC,gDAAgD,CAAC,KAAK,EAAE,kBAAS,CAAC,CAAA"}`

      const callback = function callback(
        err: Error | null,
        source: string | void,
        map: string | void
      ) {
        equal(error, err)
        equal(expectedCode, source)
        equal(expectedSourceMap, map)
      }

      const entry = 'src/__test__/bootstrap.ts'

      const context = {
        options: {
          context: process.cwd(),
        },
        async() {
          return callback
        },
        query: {
          entries: [entry],
        },
        resourcePath: join(process.cwd(), entry),
      }

      loader.call(context as webpack.loader.LoaderContext, 'not', 'important')
    }),
  ]),
])
