const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  },

  // untuk disable https
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 8085,
    // hotOnly: false,
    https: false,
  },
})
