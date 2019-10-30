/*
 * @description 优化 webpack 的生产环境中构建速度，生成了动态链接库。
 * @Author: wei.yafei
 * @Date: 2019-9-24 20:49:01
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-29 21:21:57
 */

/**
 * webpack
 */
const path = require("path");
const webpack = require("webpack");

/**
 * 自动删除webpack里的dll目录
 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * 需要生成dll的文件名
 */
const VENDOR = [
  "vue/dist/vue.runtime.esm.js",
  "vuex",
  "vue-router",
  "axios",
  "dayjs",
  "fastclick",
  "js-cookie"
];

module.exports = {
  mode: "production",
  entry: {
    vendor: VENDOR
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "dll"), // 打包后文件输出的位置
    library: "dll_[name]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "dll_[name]", //和output. library保持一致
      path: path.join(__dirname, "dll", "[name].manifest.json"),
      context: __dirname
    })
  ]
};
