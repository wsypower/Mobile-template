'use strict';
/*
 *  @description axios 全局配置
 * @Author: wei.yafei
 * @Date: 2019-06-12 15:19:30
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-15 17:02:28
 */

import axios, { AxiosError } from 'axios';

import axiosRequestConfig from './axios.config';
import { success, errorCreate, errorLog } from './axios.tip';

/*=============================================
=                创建axios实例                 =
=============================================*/

const request = axios.create(axiosRequestConfig);

/*=============================================
=                   请求拦截器                  =
=============================================*/

request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 执行请求错误后的操作
    // 发送失败
    errorCreate(`服务器异常，请联系管理员！`);
    return Promise.reject(error);
  },
);

/*=============================================
=                   响应拦截器                  =
=============================================*/
request.interceptors.response.use(
  /*----------  对响应数据进行的操作  ----------*/

  /* 正确响应数据 => response */
  (response: any) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;

    // 获取url（排除baseUrl）
    const url: string = response.config.url.replace(response.config.baseURL, '');
    /**
     *  这个状态码是和后端约定的,111是防止无此状态码( 默认code 正确返回是 0 )
     */
    const { code = 111 } = dataAxios;

    // 根据 code 进行判断
    switch (code >>> 0) {
      case 0:
        /**
         * [ 示例 ] code === 0 代表成功
         */
        success(url);
        return dataAxios.result;
      case 401:
        /**
         * [ 示例 ] code === 401 代表没有权限
         */
        errorCreate(`${dataAxios.msg} | 报错接口: ${url}`);
        break;
      case 111:
        /**
         * [ 示例 ] code === 111 代表code不存在，为外部接口直接返回结果
         */
        success(url);
        return dataAxios;
      default:
        /**
         * 不是正确的 code
         */
        errorCreate(`${dataAxios.msg} | 报错接口: ${url}`);
        break;
    }
  },
  /* 对错误响应数据的操作 => error */
  (error: AxiosError) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请联系管理员';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    }
    errorLog(error);
    return Promise.reject(error);
  },
);

export default request;
