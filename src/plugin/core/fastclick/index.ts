/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:27:36
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-31 17:24:00
 */
// @ts-ignore
import FastClick from 'fastclick';

/**
 *  解决 ios 300ms延迟
 *
 * @param { Window } window window
 * @param { Document } document document
 * @returns {void}
 *
 */

(function(window: Window, document: Document): void {
  if (!FastClick) {
    throw new Error('you should npm install `fastclick` --save at first ');
  }
  if ('addEventListener' in document && 'ontouchstart' in window) {
    FastClick.prototype.focus = (targetElement: HTMLElement) => {
      targetElement.focus();
    };
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        // @ts-ignore
        FastClick.attach(document.body);
      },
      false,
    );
  }
})(window, document);
