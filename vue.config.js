const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8091,
    client: {
      webSocketURL: 'ws://127.0.0.1:8091/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 配置代理
    proxy: {
      '/api': {
        // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true, // 是否改变域名：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true, // 是否启用websockets
        pathRewrite: {
          // 路径重写
          '^/api': '' // 用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'http://127.0.0.1:8080/user/add'
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
})
