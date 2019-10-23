/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:20:21
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-23 21:39:29
 */

// 配合postcss-pxtorem做px转为rem
import "./responsive/responsive";

// 解决 ios 300ms 延迟
import "./fastclick/index";

export default {
  async install(Vue: any, options: any) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
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
