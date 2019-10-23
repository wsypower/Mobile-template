/*
 * @Author: wei.yafei
 * @Date: 2019-10-22 15:32:59
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-22 15:35:35
 */
import Vue, { VNode } from "vue";

/**
 * @description 允许你以.tsx结尾的文件，在Vue项目中编写jsx代码
 * @author vue官方
 * @date 2019-10-22
 * @interface Element
 * @extends {VNode}
 */
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
