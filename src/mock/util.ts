/*
 * @Author: wei.yafei
 * @Date: 2019-06-08 23:39:35
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 21:20:06
 */
import Qs from 'qs';
import { ResponseBody } from './types';

const responseBody: ResponseBody = {
  // 后台返回请求状态信息
  msg: '',
  timestamp: 0,
  // result 内才是真正的返回数据
  result: null,
  // 和后台约定的状态码
  code: 0,
};

/**
 * @description 请求返回体
 * @author weiyafei
 * @date 2019-06-13-10:21:15
 * @param {Array} data    返回值
 * @param {String} msg 返回提示信息
 * @param {Number} code
 * @param {Object} headers
 */

export const builder = (
  data: any,
  msg: string,
  code: number = 0,
  headers: any = {},
): ResponseBody => {
  responseBody.result = data;
  // tslint:disable-next-line: strict-type-predicates
  if (msg !== undefined && msg !== null) responseBody.msg = msg;
  // tslint:disable-next-line: strict-type-predicates
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

/**
 * @description url上获取参数 - get
 * @author weiyafei
 * @date 2019-06-13-10:25:18
 */
export const getQueryParameters = (options: any) => {
  const url = options.url;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
};
/**
 * @description 获取参数 - post
 * @author weiyafei
 * @date 2019-06-13-14:32:15
 * @param {Object} options axios上传的参数对象
 */
export const getBody = (options: any) => options.body && Qs.parse(options.body);
