/*
 * @Author: wei.yafei
 * @Date: 2019-10-22 15:36:18
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-15 21:30:43
 */

/**
 * @description 主要用于 TypeScript 识别.vue 文件
 * @author vue官方
 * @date 2019-10-22 15:36:20
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

/**
 * 声明mand-mobile 类型
 *
 * @author weiyafei
 * @date 2019-11-15-16:34:42
 * @declare module 'mand-mobile/lib/*'; your introduction
 */
declare module 'mand-mobile/lib/*';

// TODO: remove this part after vue-star has its typescript file
declare module 'vue-star';
