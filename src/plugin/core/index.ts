/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:20:21
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-12-03 16:42:11
 */

/**
 * 配合postcss-pxtorem做px转为rem
 */
import './responsive/responsive';

/**
 * 解决 ios 300ms 延迟
 */
import './fastclick/index';

/**
 * 解决 ios 300ms 延迟
 */
import './inobounce/inobounce.js';

/**
 * 自动导入
 */
import './svg/requireAllSvg';
/**
 * 引入vue
 */
import Vue from 'vue';

// import './hesc/hesc';
// import './hesc/heschybird';
/**
 * Vue.js 的插件应该暴露一个 install 方法
 *
 *
 * @version 1.0.0
 * @author weiyafei
 * @date 2019-10-24
 * @param {typeof Vue} vue vue构造函数
 * @param {object} [options] 一个可选的对象
 * @returns {Promise<any>} 一个promise返回值
 * @memberof VuePlugin
 *
 *
 * * [还不懂？点这里吧](https://cn.vuejs.org/v2/guide/plugins.html)
 *
 */

// tslint:disable-next-line: class-name
export declare interface TyVuePlugin {
  install(vue: typeof Vue, options?: object): Promise<any>;
}

/**
 * Ty插件-引入项目核心插件
 *
 * @author weiyafei
 * @date 2019-10-31
 * @param { Vue } Vue vue构造函数
 *
 */

let CoreModule: TyVuePlugin;

CoreModule = {
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
  },
};

export default CoreModule;
