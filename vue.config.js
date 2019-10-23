/*
 * @Author: wei.yafei
 * @Date: 2019-10-22 16:32:01
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-23 20:15:28
 */

// 使用 uglifyjs-webpack-plugin 进行文件的压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// webpack实时打包进度
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const pxtorem = require("postcss-pxtorem");
// 增加环境变量
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss");

// 拼接路径
const resolve = dir => require("path").join(__dirname, dir);

// 基础路径 注意发布之前要先修改这里
let publicPath = "/";

/*=============================================
=                vue-cli3配置                  =
=============================================*/
module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  // 仅在开发环境下使用
  lintOnSave: process.env.NODE_ENV === "development",
  // 不需要生产环境的 source map(根据项目实际需求，能减少一半以上打包体积)
  productionSourceMap: false,
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    publicPath, // 和 publicPath 保持一致
    open: true
  },
  css: {
    // 给 sass-loader 传递选项
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        // 注意：在 sass-loader v7中，这个选项名是 "data"（本版本是8.0.0）
        prependData: `@import '~@/style/core/core.scss'`
      },
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号，此处对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import '~@/style/core/core.scss';`
      },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2
          }),
          require("autoprefixer")()
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [new ProgressBarPlugin()]
  },
  chainWebpack: config => {
    // 重新设置 alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@style", resolve("src/style"))
      .set("@component", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"));
  }
};

/*=====  End of Section comment block  ======*/
