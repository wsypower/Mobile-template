/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:27:36
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-23 21:28:42
 */
// @ts-ignore
import FastClick from "fastclick";

/**
 * @description 解决 ios 300ms延迟
 */

(function(window: any, document: any): void {
  if ("addEventListener" in document && "ontouchstart" in window) {
    FastClick.prototype.focus = (targetElement: HTMLElement) => {
      targetElement.focus();
    };
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        // @ts-ignore
        FastClick.attach(document.body);
      },
      false
    );
  }
})(window, document);
