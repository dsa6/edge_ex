const { defineConfig } = require('@vue/cli-service')
let CopyWebpackPlugin = require("copy-webpack-plugin");
let path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 和上面自定义的 baseURL 保持一致
      '/api': {
        target: 'http://119.45.7.196:8080/',
        changeOrigin: true,
      }
    }
  },configureWebpack:{
    plugins:[
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve("src/manifest.json"),
            to: `${path.resolve("dist")}/manifest.json`
          },
        ],
      })
    ]
  }
})
