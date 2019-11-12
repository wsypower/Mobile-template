/*
 * @Author: wei.yafei
 * @Date: 2019-11-12 19:40:42
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-12 22:07:33
 */

import log from './util.log';

const util = {
  log,
};

// /**
//  * @description 获取网址参数
//  * @author weiyafei
//  * @date 2019-06-28-15:00:04
//  * @param {String} 网址
//  * @returns {Object} 参数对象
//  */
// util.getURLParameters = prop => {
//   let params = {},
//     query = window.location.search.length > 0 ? window.location.search.substring(1) : '',
//     arr = query.split('&'),
//     rt
//   for (let i = 0, len = arr.length; i < len; i++) {
//     let item = arr[i],
//       tmp = item.split('='),
//       key = tmp[0],
//       val = tmp[1]
//     if (typeof params[key] == 'undefined') {
//       params[key] = val
//     } else if (typeof params[key] == 'string') {
//       params[key] = [params[key], val]
//     } else {
//       params[key].push(val)
//     }
//   }
//   rt = prop ? params[prop] : params
//   return rt
// }

// /**
//  * @description 更新标题
//  * @author weiyafei
//  * @date 2019-06-10-21:12:27
//  * @param {String} title 标题
//  */
// util.title = function(titleText) {
//   const processTitle = process.env.VUE_APP_TITLE || 'cgAdmin'
//   window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
// }

// /**
//  * @description 打开新页面
//  * @author weiyafei
//  * @date 2019-06-10-23:45:01
//  * @param {String} url 地址
//  */
// util.open = function(url) {
//   var a = document.createElement('a')
//   a.setAttribute('href', url)
//   a.setAttribute('target', '_blank')
//   a.setAttribute('id', 'cgadmin-link-temp')
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(document.getElementById('cgadmin-link-temp'))
// }

export default util;
