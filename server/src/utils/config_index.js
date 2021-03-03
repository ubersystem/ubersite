// config/index.js
module.exports = {
    // ...
    dev: {
      proxyTable: {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    }
  }