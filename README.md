# @motorcycle/loader

This loader makes use of [`@motorcycle/compiler`](https://github.com/motorcyclets/compiler) to
make compile-time optimizations of Motorcycle constructs.

## Install
```sh
yarn add --dev @motorcycle/loader
# or
npm install --save-dev @motorcycle/loader
```

## Usage

To make use of this loader you only need to add `@motorcycle/loader` before 
`ts-loader` in your webpack configuration file.

```typescript
// webpack.config.js
module.exports = {
  entry: 'src/bootstrap.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          '@motorcycle/loader',
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  // other configuration options
}
```
