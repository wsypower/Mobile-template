/*
 * @Author: wei.yafei
 * @Date: 2019-10-24 16:24:23
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-24 21:25:16
 */
import Vue from "vue";

export interface VuePlugin {
  /**
   * @description Vue.js 的插件应该暴露一个 install 方法
   * @version 1.0.0
   * @author weiyafei
   * @date 2019-10-24
   * @param {typeof Vue} vue
   * @param {object} [options]
   * @returns {Promise<any>}
   * @memberof VuePlugin
   */
  install(vue: typeof Vue, options?: object): Promise<any>;
}
