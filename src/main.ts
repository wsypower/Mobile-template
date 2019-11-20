import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import CoreModule from '@/plugin/core/index';
import vueFiltersDate from './plugin/filter/moment';

// 核心插件
Vue.use(CoreModule);

// 时间滤镜
Vue.use(vueFiltersDate);

// 引入animate.css
import 'animate.css';

/**
 * Vuejs 单页应用在iOS系统下部分APP的webview中
 * 标题不能通过 document.title = xxx 的方式修改 该插件只为解决该问题而生(兼容安卓)
 */
Vue.use(require('vue-wechat-title'));

// TODO: 正式环境移除
import '@/mock';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
