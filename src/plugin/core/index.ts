/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:20:21
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-24 21:35:59
 */

/**
 * 配合postcss-pxtorem做px转为rem
 */
import "./responsive/responsive";

/**
 * 解决 ios 300ms 延迟
 */
import "./fastclick/index";

/**
 * install类型引入
 */
import { VuePlugin } from "@/types/interface/vue.plugin";

/**
 * @description 暴露一个 install 方法,这个方法的第一个参数是 Vue 构造器
 * @author weiyafei
 * @date 2019-10-24
 * @interface InstallConfig
 * @see
 * ───  EXAMPLE   ────────────────────────────────────────────────
 *
 * MyPlugin.install = function (Vue, options) {
 *    1. 添加全局方法或属性
 *   Vue.myGlobalMethod = function () {
 *      逻辑...
 *   }
 *    2. 添加全局资源
 *   Vue.directive('my-directive', {
 *     bind (el, binding, vnode, oldVnode) {
 *       逻辑...
 *     }
 *   })
 *    3. 注入组件选项
 *   Vue.mixin({
 *     created: function () {
 *        逻辑...
 *     }
 *   })
 *    4. 添加实例方法
 *   Vue.prototype.$myMethod = function (methodOptions) {
 *        逻辑...
 *   }
 * }
 *
 * ──────────────────────────────────────────────────────────────────
 *
 */
const CoreModule: VuePlugin = {
  async install(Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false;
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV;
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL;
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION;
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME;
  }
};
export default CoreModule;
