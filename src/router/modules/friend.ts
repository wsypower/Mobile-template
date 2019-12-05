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
const Friends: RouteConfig[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "friends" */ '@views/FriendsPreview.vue'),
    name: 'Friends',
    meta: {
      title: '朋友圈',
      icon: 'Friends',
    },
  },
  {
    path: '/upload',
    component: () => import(/* webpackChunkName: "friends" */ '@views/upload.vue'),
    name: 'Upload',
    meta: {
      title: '朋友圈动态发布',
    },
  },
  {
    path: '/self/history',
    component: () => import(/* webpackChunkName: "friends" */ '@views/selfHistory.vue'),
    name: 'SelfHistory',
    meta: {
      title: '朋友圈动态发布',
    },
  },
  {
    path: '/self/history/details',
    component: () => import(/* webpackChunkName: "friends" */ '@views/details.vue'),
    name: 'Details',
    meta: {
      title: '详情',
    },
  },
];

export default Friends;
