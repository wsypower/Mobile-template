/* eslint-disable no-unused-vars */
'use strict';
/*
 * @Author: wei.yafei
 * @Date: 2019-06-12 15:19:30
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-11-12 22:28:42
 */
/*=============================================
=                    axios                    =
=============================================*/

import axios from 'axios';
import Qs from 'qs';
import { message } from 'ant-design-vue';
import util from '@/utils/util';

/*=============================================
=              axios-全局错误捕获               =
=============================================*/

// 创建一个错误
const errorCreate = msg => {
  const error = new Error(msg);
  errorLog(error);
  throw error;
};

/**
 * @description 记录和显示错误
 * @author weiyafei
 * @date 2019-06-16-17:57:43
 * @param {error} catch捕获的错误
 */
const errorLog = error => {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    // util.log.danger('>>>>>> Error >>>>>>')
    util.log.danger(`
    ===============================================
    >>>>>>>              Error              >>>>>>>
    ===============================================
    `);
    console.log(error);
  }
  // 显示提示,依赖于Ant Dedign of Vue
  message.error(error.message);
};
/*=============================================
=                axios-成功提示                =
=============================================*/
/**
 * @description 提示连接成功
 * @author weiyafei
 * @date 2019-06-16-17:57:43
 */
const success = success => {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    // util.log.danger('>>>>>> Error >>>>>>')
    util.log.success(`>>>>>>> 连接成功： ${success}   >>>>>>>`);
  }
};
//axios默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//axios config配置
let config = {
  baseURL: process.env.VUE_APP_API,
  timeout: 60 * 100, // 请求超时时间
  //修改请求数据添加必填项 userId
  transformRequest: [
    function(data) {
      //给所有的数据请求添加参数userId
      const userId = util.cookies.get('userId');
      const dataModify = Object.assign((data = {}), { userId });
      // 对 data 进行任意转换处理 => 转为fromData(按照实际后台约定修改转换)
      return Qs.stringify(dataModify, { arrayFormat: 'repeat' });
    },
  ],
};

/*=============================================
=                创建axios实例                 =
=============================================*/

const service = axios.create(config);

/*=============================================
=                   请求拦截器                  =
=============================================*/

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 执行请求错误后的操作
    // 发送失败
    console.log(error);
    return Promise.reject(error);
  },
);

/*=============================================
=                   响应拦截器                  =
=============================================*/
service.interceptors.response.use(
  /*----------  对响应数据进行的操作  ----------*/

  /* 正确响应数据 => response */
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code } = dataAxios;

    //根据 code 进行判断
    switch (Number(code)) {
      case 0:
        // [ 示例 ] code === 0 代表成功
        success(response.config.url);
        return dataAxios.result;
      case 401:
        // [ 示例 ] code === 401 代表没有权限
        errorCreate(`${dataAxios.msg}`);
        break;
      default:
        // 不是正确的 code
        errorCreate(`${dataAxios.msg}: ${response.config.url}`);
        break;
    }
  },
  /* 对错误响应数据的操作 => error */
  error => {
    console.log(0);
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

export default service;
