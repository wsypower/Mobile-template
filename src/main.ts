import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import CoreModule from '@/plugin/core/index';
import vueFiltersDate from './plugin/filter/moment';
import { UserModule } from './store/modules/user';
import LongTap from '@/plugin/core/LongTap';
import Clipboard from 'v-clipboard';
import VuePreview from '@/components/base/preview/index';
import Layzr from 'layzr.js';
import vueg from 'vueg';
import VConsole from 'vconsole';

// const options = {
//   duration: '0.3', // 转场动画时长，默认为0.3，单位秒
//   firstEntryDisable: false, // 值为true时禁用首次进入应用时的渐现动画，默认为false
//   firstEntryDuration: '.6', // 首次进入应用时的渐现动画时长，默认为.6
//   forwardAnim: 'fadeInRight', // 前进动画，默认为fadeInRight
//   backAnim: 'fadeInLeft', // 后退动画，默认为fedeInLeft
//   sameDepthDisable: true, // url深度相同时禁用动画，默认为false
//   tabs: [
//     {
//       name: 'home',
//     },
//     {
//       name: 'my',
//     },
//   ], // 默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
//   tabsDisable: false, // 值为true时，tabs间的转场没有动画，默认为false
//   disable: false, // 禁用转场动画，默认为false，嵌套路由默认为true
// };

// 移动端转场
Vue.use(vueg, router);

Vue.use(Layzr);

Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  closeEl: false,
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 1,
  tapToClose: true,
  tapToToggleControls: false,
  showHideOpacity: true,
  loop: true,
});
// 兼容滚动事件
import 'default-passive-events';
// 移动端复制
Vue.use(Clipboard);

// 核心插件
Vue.use(CoreModule);

// 时间滤镜
Vue.use(vueFiltersDate);

Vue.use(LongTap);
// 引入animate.css
import 'animate.css';

//  TODO:  正式环境移除
Vue.use(new VConsole());

// import VueImageSwipe from '@/components/base/previewImage/index'
// import 'vue-image-swipe/dist/vue-image-swipe.css';
// Vue.use(VueImageSwipe);

/**
 * Vuejs 单页应用在iOS系统下部分APP的webview中
 * 标题不能通过 document.title = xxx 的方式修改 该插件只为解决该问题而生(兼容安卓)
 */
Vue.use(require('vue-wechat-title'));

// TODO: 正式环境移除
import '@/mock';
import Mock from 'mockjs';

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 获取用户信息
    UserModule.SET_USER({
      userId: Mock.mock('@id'),
      realname: Mock.mock('@cname'),
    });
  },
}).$mount('#app');
