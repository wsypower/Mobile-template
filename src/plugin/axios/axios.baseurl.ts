'use strict';
/*
 * 配置 baseurl
 *
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:21:52
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-12-09 17:08:53
 */

const addressUrl: Map<string, string> = new Map([
  // 开发环境 廖存涵服务器
  // ['development', 'http://192.168.71.72:8090/api/'],
  // 开发环境 33测试服务器
  ['development', 'http://192.168.71.33:9012/api/'],
  // 正式环境
  ['production', '/api/'],
]);

// 根据环境获取 baseurl
const baseUrl = addressUrl.get(process.env.NODE_ENV);

export default baseUrl;
