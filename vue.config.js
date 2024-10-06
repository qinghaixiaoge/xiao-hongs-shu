const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions:{
      sass:{
        additionalData: `@import "~@/styles/variable.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].Xiao_Yu = JSON.stringify(process.env.Xiao_Yu)
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
  }
})
