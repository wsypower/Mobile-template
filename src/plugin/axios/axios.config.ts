'use strict';
/*
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:24:29
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 20:47:48
 */

import Qs from 'qs';
import baseUrl from './axios.baseurl';

/**
 * axios config配置
 */
const config = {
  baseURL: baseUrl,
  timeout: 60 * 100, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  /**
   * @desc:只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
   */
  transformRequest: [
    function(data: any) {
      // 对 data 进行任意转换处理 => 转为fromData(按照实际后台约定修改转换)
      return Qs.stringify(data, { arrayFormat: 'repeat' });
    },
  ],
  /**
   * @desc:必须是一个无格式对象(plain object)或 URLSearchParams 对象(GET)
   */
  paramsSerializer: function(params: any) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
};
export default config;
