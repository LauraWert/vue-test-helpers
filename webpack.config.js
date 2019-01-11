const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  externals: {
    quasar: 'quasar',
    '@vue/test-utils': '@vue/test-utils',
    vue: 'vue',
  },
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'vue-test-helpers',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.vue',
      '.ts',
      '.tsx',
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/node_modules/.cache/ts-loader',
              cacheIdentifier: '401271e7',
            },
          },
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'babel-loader',
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$',
              ],
              happyPackMode: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: true,
        formatter: 'codeframe',
        checkSyntacticErrors: false,
      },
    ),
  ],
}
