/*
 * @Author: wei.yafei
 * @Date: 2019-10-23 21:21:10
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-10-31 17:02:09
 */

/**
 * 配合postcss-pxtorem做px转为rem
 *
 * @param { Window } window window
 * @param { Document } document document
 * @returns {void}
 *
 */

(function(window: Window, document: Document): void {
  const resize = () => {
    let ww = window.innerWidth;
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize);
    } else {
      if (ww > 750) {
        ww = 750;
      }
      document.documentElement.style.fontSize = (ww * 100) / 750 + 'px';
    }
  };
  resize();
  window.addEventListener('resize', resize);
})(window, document);
