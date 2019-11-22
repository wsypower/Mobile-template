import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import CoreModule from '@/plugin/core/index';
import vueFiltersDate from './plugin/filter/moment';
import { UserModule } from './store/modules/user';
import LongTap from '@/plugin/core/LongTap';
import Clipboard from 'v-clipboard';
// 移动端复制
Vue.use(Clipboard);

// 核心插件
Vue.use(CoreModule);

// 时间滤镜
Vue.use(vueFiltersDate);

Vue.use(LongTap);
// 引入animate.css
import 'animate.css';

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
