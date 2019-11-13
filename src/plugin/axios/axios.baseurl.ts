'use strict';
/*
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:21:52
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 20:47:42
 */

const addressUrl = new Map([
  ['development', '/dev/api/'],
  ['production', '/api/'],
]);
const baseUrl = addressUrl.get(process.env.NODE_ENV);

export default baseUrl;
