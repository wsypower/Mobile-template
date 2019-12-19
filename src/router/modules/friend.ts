/*
 * @Author: wei.yafei
 * @Date: 2019-11-06 15:10:14
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-12-19 22:40:19
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
    component: () => import(/* webpackChunkName: "upload" */ '@views/upload.vue'),
    name: 'Upload',
    meta: {
      title: '朋友圈动态发布',
    },
  },
  {
    path: '/Friends/self/history',
    component: () => import(/* webpackChunkName: "history" */ '@views/selfHistory.vue'),
    name: 'SelfHistory',
    meta: {
      title: '历史动态',
    },
  },
  {
    path: '/Friends/self',
    component: () => import(/* webpackChunkName: "self" */ '@views/self.vue'),
    name: 'FriendsSelf',
    meta: {
      title: '朋友圈',
    },
  },
  {
    path: '/self/history/look/details',
    component: () => import(/* webpackChunkName: "details" */ '@views/details.vue'),
    name: 'Details',
    meta: {
      title: '详情',
    },
  },
  {
    path: '/self/history/message',
    component: () => import(/* webpackChunkName: "massage" */ '@views/Message.vue'),
    name: 'message',
    meta: {
      title: '历史消息',
    },
  },
];

export default Friends;
