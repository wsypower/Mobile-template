import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import friendRouter from './modules/friend';

Vue.use(Router);

/**
 * ConstantRoutes
 * 没有权限要求的基本页面
 * 可以访问所有角色
 */
export const constantRoutes: RouteConfig[] = [friendRouter];

/**
 * 页面滚到顶部 scrollBehavior()
 */
const createRouter = () =>
  new Router({
    // mode: 'history', 开启 history,模式需后台配合
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
