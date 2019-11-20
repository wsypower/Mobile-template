/*
 * @Author: wei.yafei
 * @Date: 2019-11-19 17:33:01
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-19 20:59:32
 */

import dayjs, { Dayjs, ConfigType } from 'dayjs';

/**
 * 返回错误
 *
 * @author weiyafei
 * @date 2019-11-19-15:40:06
 */
type ErrorFunc = () => string;

/*=============================================
=                   dayjs拦截                  =
=============================================*/
/**
 *
 * @description
 * 函数P返回一个代理的对象，当访问这个对象上的方法时，如果
 * 该对象是 dayjs 对象，将正常返回此方法的返回结果；如果该
 * 对象不是 dayjs 对象将首先试图将此对象转换为 dayjs 对象
 * 然后返回相应方法，如果转换失败将返回错误信息。
 *
 * @author weiyafei
 * @date 2019-11-19
 * @param {Dayjs} Day dayjs 对象
 * @see [https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/API-reference.md]
 *
 */
const P = (Day: Dayjs) => {
  if (dayjs(Day).isValid()) {
    Day = dayjs(Day);
  } else {
    throw new Error('参数不是对象或不能转为dayjs对象');
  }
  return new Proxy(Day, {
    get(target, key: keyof Dayjs): Dayjs | Function | string {
      return dayjs.isDayjs(target)
        ? target[key]
        : dayjs(target).isValid()
        ? dayjs(target)[key]
        : () => {
            return '无效日期';
          };
    },
    set(target, key: keyof Dayjs, value: any): boolean {
      target[key] = value;
      return true;
    },
  });
};

export default P;
