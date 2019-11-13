/*
 * @Author: wei.yafei
 * @Date: 2019-11-13 21:11:11
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 21:15:30
 */

/**
 * mock返回体的约束
 *
 * @author weiyafei
 * @date 2019-11-13
 * @export
 * @interface ResponseBody
 */
export interface ResponseBody {
  _headers?: any;
  _status?: number;
  // 后台返回请求状态信息
  msg: string;
  timestamp: number;
  // result 内才是真正的返回数据
  result: any;
  // 和后台约定的状态码
  code: number;
}
