const path = require('path')

module.exports = {
  configureWebpack: config => {
    config.resolve.alias.src = path.resolve(__dirname, './src')
  },
}
