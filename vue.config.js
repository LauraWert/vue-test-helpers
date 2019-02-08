const path = require('path')

module.exports = {
  configureWebpack: config => {
    config.resolve.alias.src = path.resolve(__dirname, './src')
    config.resolve.alias.quasar = path.resolve(__dirname, './node_modules/quasar-framework/dist/quasar.mat.esm.js')

    if (config.mode === 'production') {
      config.externals.quasar = 'quasar'
      config.externals['@vue/test-utils'] = '@vue/test-utils'
      config.externals['vue'] = 'vue'
      delete config.devtool
    }
  },
}
