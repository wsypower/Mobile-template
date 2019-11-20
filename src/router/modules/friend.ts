/*
 * @Author: wei.yafei
 * @Date: 2019-11-06 15:10:14
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-06 15:21:05
 */
import { RouteConfig } from 'vue-router';

/**
 * 懒加载
 * Detail see: https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
 */
const Friends: RouteConfig = {
  path: '/',
  component: () => import(/* webpackChunkName: "friends" */ '@views/FriendsPreview.vue'),
  name: 'Friends',
  meta: {
    title: '朋友圈',
    icon: 'Friends',
  },
};
export default Friends;
