const path = require('path')
const { setBuildExternals } = require('@laura-wert/vue-helpers/build-helpers')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('src', path.join(__dirname, 'src'))
  },
  configureWebpack: config => {
    setBuildExternals(config)
  },
}
