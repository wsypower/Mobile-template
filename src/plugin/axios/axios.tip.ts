'use strict';
/*
 * @Author: wei.yafei
 * @Date: 2019-11-13 20:41:33
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 20:49:34
 */
import { Toast } from 'mand-mobile';
import util from '@/util/util';

/*=============================================
=              axios-全局错误捕获               =
=============================================*/

/**
 * 创建一个错误
 *
 * @author weiyafei
 * @param {string} msg提示错误
 */
export const errorCreate = (msg: string) => {
  const error = new Error(msg);
  errorLog(error);
  throw error;
};

/**
 * log显示错误
 *
 * @author weiyafei
 * @param {error} catch捕获的错误
 */
export const errorLog = (error: { message: string }) => {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.capsule('Error', error.message, 'danger');
  }
  console.log(error);
  // 显示提示
  Toast.failed(`${error.message}`);
};
/*=============================================
 =                axios-成功提示                =
 =============================================*/
/**
 * @description 提示连接成功
 * @author weiyafei
 * @date 2019-06-16-17:57:43
 */
export const success = (success: string) => {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.capsule('YES', success, 'success');
  }
};
