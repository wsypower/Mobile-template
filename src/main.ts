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

// TODO: 正式环境移除
import '@/mock';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
