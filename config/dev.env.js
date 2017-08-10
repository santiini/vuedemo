var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://api-dev"',   // 动态设置的axios 请求的域名，开发阶段;
  APP_ORIGIN: '"https://wallstreetcn.com"'
})
