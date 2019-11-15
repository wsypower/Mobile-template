'use strict';
/*
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:24:29
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 20:47:48
 */

import Qs from 'qs';
import baseUrl from './axios.baseurl';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * axios config配置
 */
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: baseUrl,
  timeout: 60 * 100, // 请求超时时间
  // 需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
  },
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
export default axiosRequestConfig;
