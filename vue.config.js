/*
 * @Author: wei.yafei
 * @Date: 2019-10-22 16:32:01
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-10-30 11:20:59
 */

/**
 * 使用 uglifyjs-webpack-plugin 进行文件的压缩
 */
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/**
 * webpack实时打包进度
 */
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

/**
 * GZIP压缩
 */
const compressionPlugin = require("compression-webpack-plugin");

/**
 * lodash 按需引用
 */
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

/**
 * 添加js或者css资源到由html-webpack-plugin插件自动生成的文件中
 */
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

/**
 * 打包结果分析
 */
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
  
/**
 * webpack
 */
const webpack = require("webpack");
const path = require("path");

/**
 * 增加环境变量
 */
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss");

/**
 * 拼接路径
 */
const resolve = dir => require("path").join(__dirname, dir);

/**
 * 基础路径 注意发布之前要先修改这里
 * `PUBLIC_PATH` 基础路径
 * `PRODUCTION_SOURCE_MAP` 不需要生产环境的 source map(根据项目实际需求，能减少一半以上打包体积)
 */
const PUBLIC_PATH = "/";
const PRODUCTION_SOURCE_MAP = false;

/*=============================================
=                vue-cli3配置                  =
=============================================*/
module.exports = {
  //根据你的实际情况更改这里
  publicPath: PUBLIC_PATH,
  //仅在开发环境下使用
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: PRODUCTION_SOURCE_MAP,
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    //和 publicPath 保持一致
    publicPath: PUBLIC_PATH,
    open: true
  },
  css: {
    //给 sass-loader 传递选项
    loaderOptions: {
      //设置 scss 公用变量文件
      sass: {
        //注意：在 sass-loader v7中，这个选项名是 "data"（本版本是8.0.0）
        prependData: `@import '~@/style/core/core.scss'`
      },
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号，此处对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import '~@/style/core/core.scss';`
      },
      postcss: {
        plugins: [
          /**
           * px转为rem
           */
          require("postcss-pxtorem")({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2
          }),
          /**
           * 添加css前缀
           */
          require("autoprefixer")()
        ]
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
      return {
        plugins: [
          /**
           * 开始GZIP文件压缩
           */
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件
            threshold: 1024 * 100, //对超过100k的数据进行数据压缩
            deleteOriginalAssets: false //是否删除源文件
          }),
          /**
           * 打包进度条
           */
          new ProgressBarPlugin(),
          new LodashModuleReplacementPlugin(),
          new BundleAnalyzerPlugin()
        ]
      };
    } else {
      // 为开发环境修改配置
      new LodashModuleReplacementPlugin();
    }
  },
  /**
   * 基于webpack-chain的链式调用
   * 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
   */
  chainWebpack: config => {
    //重新设置 alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("types", resolve("types"))
      .set("@style", resolve("src/style"))
      .set("@component", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"));
    /**
     * TODO:根据实际项目调整是否开启
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("prefetch").delete("preload");
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
    config
      // 开发环境
      .when(
        process.env.NODE_ENV === "development",
        /**
         * 将静态资源文件（运行依赖包）与源文件分开打包
         * https://juejin.im/post/5d1c05e4f265da1b8333a89f
         */
        config => {
          config.plugin("vendorDll").use(webpack.DllReferencePlugin, [
            {
              context: __dirname,
              manifest: require("./dll/vendor.manifest.json")
            }
          ]);
          config
            .plugin("addAssetHtml")
            .use(AddAssetHtmlPlugin, [
              [
                {
                  filepath: require.resolve(
                    path.resolve(__dirname, "dll/vendor.dll.js")
                  ),
                  outputPath: "dll",
                  publicPath: "/dll"
                }
              ]
            ])
            .after("html");
        }
      )
      //开发环境且productionSourceMap为true
      /**
       * 如果productionSourceMap为true,修改下面source-map展示项
       * https://www.webpackjs.com/configuration/devtool/#devtool
       */
      .when(
        process.env.NODE_ENV === "development" && PRODUCTION_SOURCE_MAP,
        // sourcemap不包含列信息
        config => config.devtool("cheap-source-map")
      )
      // 非开发环境
      .when(process.env.NODE_ENV !== "development", config => {
        config.optimization.minimizer([
          new UglifyJsPlugin({
            uglifyOptions: {
              // 移除 console
              // 其它优化选项 https://segmentfault.com/a/1190000010874406
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"]
              }
            }
          })
        ]);
      });
  }
};
