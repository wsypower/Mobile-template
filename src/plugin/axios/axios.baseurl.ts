'use strict';
/*
 * 配置 baseurl
 *
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:21:52
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 20:47:42
 */

const addressUrl: Map<string, string> = new Map([
  // 开发环境
  ['development', '/dev/api/'],
  // 正式环境
  ['production', '/api/'],
]);

// 根据环境获取 baseurl
const baseUrl = addressUrl.get(process.env.NODE_ENV);

export default baseUrl;
