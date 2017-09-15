# @motorcycle/loader

This loader makes use of [`@motorcycle/compiler`](https://github.com/motorcyclets/compiler) to
make compile-time optimizations of Motorcycle constructs.

## Install
```sh
yarn add --dev @motorcycle/loader
# or
npm install --save-dev @motorcycle/loader
```

## Motorcycle Starter

This loader and other webpack optimizations are configured for you in our very 
own Motorcycle starter application, which can be found [here](https://github.com/motorcyclets/starter).

## Usage

To make use of this loader you only need to add `@motorcycle/loader` before 
`ts-loader` in your webpack configuration with some configuration.

```typescript
// webpack.config.js
const entry = 'src/bootstrap.ts'

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: '@motorcycle/loader',
            options: {
              entries: [ entry ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  // other configuration options
}
```

## Options

#### `entries: Array<string>`

Entries are paths, relative or absolute, to the part(s) of your application that 
have calls to `run` from `@motorcycle/run`.
