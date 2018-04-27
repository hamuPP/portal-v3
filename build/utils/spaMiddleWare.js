/**
 * 基于 https://github.com/bripkens/connect-history-api-fallback 改造
 */
const path = require('path')
const fs = require('fs')
const logger = require('./logger/koa-logger')('spaMiddleWare')
const currentIP = require('ip').address()

const { IS_DEBUG } = require('../utils/env')
const appConfig = require('../../conf/app')

//过滤向服务器请求的资源地址
const defaultOptions = { include: /^\/((mockLogin.+)|api|static|public|v3)/ };//原作者的写法，我需要json也读取，所以改成如下
// const defaultOptions = { include: /(^\/(api|static|public|v3))|(.json$)/ };//原作者的写法，我需要json也读取

/**
 * 读取构建过的文件，public目录下
 * @param {String} filename 文件名
 * @return {String} 文件内容
 */
function readBuiltFile (filename) {
    console.log('读取构建过的文件，public目录下');//todo 生成环境下，这个目录需要改，我不是public目录
    console.log(filename);
  return fs.readFileSync(path.join(process.cwd(), 'dist', filename), 'utf-8')
}

let indexHTML

// 生产模式
if (!IS_DEBUG) {
  indexHTML = readBuiltFile('index.html')
}

/**
 * 单页应用中间件
 * @param {Object} options 配置项
 * @return {function} 中间件
 */
module.exports = function (options) {
  options = Object.assign({}, defaultOptions, options)
  return async function spa (ctx, next) {
      console.log(ctx.url);
      console.log(options.include.test(ctx.url));// 向服务器请求的为true
    if (!options.include.test(ctx.url)) {
    // if (false) {
      /**
       * 开发模式从koa2服务中获取index
       */
      await new Promise((resolve) => {
        if (indexHTML) {
          resolve()
        } else {
          require('http').get('http://' + currentIP + ':' + appConfig.appPort, (res) => {
            res.on('data', (chunk) => {
              logger.info('Fetching index.html succeed.')
              indexHTML = chunk.toString('utf-8')
              resolve()
            })
          }).on('error', (e) => {
            logger.error(`Fetching index.html error: ${e.message}`)
            process.exit(1)
          })
        }
      }).then(doRender)

      /**
       * 返回HTML
       */
      function doRender () {
          console.log('dorender');

          const res = ctx.res
        res.statusCode = 200
        // 这句很重要，否则会影响到weinre调试
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(`${indexHTML}`)
        logger.info('Page routing request')
        return
      }
    } else {
      return next()
    }
  }
}
