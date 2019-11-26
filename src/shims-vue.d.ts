/*
 * @Author: wei.yafei
 * @Date: 2019-10-22 15:36:18
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-26 15:29:14
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

// TODO: remove this part after ellipsis-plus has its typescript file
declare module 'ellipsis-plus';

// TODO: remove this part after LongTap has its typescript file
declare module '@/plugin/core/LongTap';

// TODO: remove this part after clipboard has its typescript file
declare module 'clipboard';

// TODO: remove this part after vue-preview has its typescript file
declare module 'vue-preview';

// TODO: remove this part after vue2-preview has its typescript file
declare module 'vue2-preview';

// TODO: remove this part after v-photoswipe has its typescript file
declare module 'v-photoswipe';

// TODO: remove this part after vue-image-swipe has its typescript file
declare module 'vue-image-swipe';
