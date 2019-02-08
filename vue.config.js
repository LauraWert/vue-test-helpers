const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('src', path.join(__dirname, 'src'))
  },
  configureWebpack: config => {
    if (config.mode === 'production') {
      config.externals['quasar/src/vue-plugin.js'] = 'quasar/src/vue-plugin.js'
      config.externals['quasar/lang/nl'] = 'quasar/lang/nl'
      config.externals['@vue/test-utils'] = '@vue/test-utils'
      config.externals['vue'] = 'vue'
      delete config.devtool
    }
  },
}
