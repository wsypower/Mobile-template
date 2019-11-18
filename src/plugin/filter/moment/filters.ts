/*
 * @description 日期时间相关 filter
 * @Author: wei.yafei
 * @Date: 2019-07-11 17:31:05
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-18 23:01:48
 */

import dayjs, { Dayjs, ConfigType, OptionType, UnitType, Ls } from 'dayjs';

/**
 * dayjs对象代理
 *
 *
 * 函数P返回一个代理的对象，当访问这个对象上的方法时，如果
 * 该对象是 dayjs 对象，将正常返回此方法的返回结果；如果该
 * 对象不是 dayjs 对象将首先试图将此对象转换为 dayjs 对象
 * 然后返回相应方法，如果转换失败将返回错误信息。
 *
 * @author weiyafei
 * @date 2019-11-18
 * @param { Dayjs } Day
 * @returns dayjs.Dayjs | string
 * @see [https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/API-reference.md]
 *
 */
type keyword =
  | 'clone'
  | 'isValid'
  | 'year'
  | 'month'
  | 'date'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'
  | 'set'
  | 'get'
  | 'add'
  | 'subtract'
  | 'startOf'
  | 'endOf'
  | 'format'
  | 'diff'
  | 'valueOf'
  | 'unix'
  | 'daysInMonth'
  | 'toDate'
  | 'toJSON'
  | 'toISOString'
  | 'toString'
  | 'utcOffset'
  | 'isBefore'
  | 'isSame'
  | 'isAfter'
  | 'locale';

const P = (Day: dayjs.Dayjs) => {
  return new Proxy(Day, {
    /**
     * dayjs读取行为
     * @author weiyafei
     * @date 2019-11-18
     * @param {*} target
     * @param {(string | number | symbol)} key
     * @returns {*}
     */
    get<T, K extends keyof T>(target: T, key: K): T[K] | dayjs.Dayjs | string | Error {
      if (dayjs.isDayjs(target)) {
        // 是 Dayjs 对象，正常返回
        return target[key];
      } else {
        // 不是 Dayjs 对象
        if (dayjs(target as any).isValid()) {
          // 尝试帮用户解析成 Dayjs 对象
          // return '';
          let day = dayjs(target as any);
          return day[key];
        } else {
          // 无法解析
          throw new Error('无效日期');
        }
      }
    },

    /**
     * dayjs设置行为
     *
     * @author weiyafei
     * @date 2019-11-18
     * @param {*} target
     * @param {(string | number | symbol)} key
     * @param {*} value
     * @param {*} receiver
     * @returns {*}
     */
    set(target: any, key: string | number | symbol, value: any, receiver: any): any {
      target[key] = value;
    },
  });
};

// // ---------- [ 定义周 ] ----------

// const WEEK_DATE: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
// export default {
//   // ---------- [ dayjs 解析 ] ----------

//   // 时间字符串 | Date 对象 | Unix 时间戳 (毫秒)
//   day: value => dayjs(value),
//   // Unix 时间戳 (秒)
//   date_unix: value => dayjs.unix(value),
//   // ---------- [ 获取 ] ----------

//   date_year: Day => P(Day).year(),
//   date_month: Day => P(Day).month(),
//   date_date: Day => P(Day).date(),
//   date_day: Day => WEEK_DATE[P(Day).day()],
//   date_week: Day => WEEK_DATE[P(Day).day()],
//   date_hour: Day => P(Day).hour(),
//   date_minute: Day => P(Day).minute(),
//   date_second: Day => P(Day).second(),
//   date_millisecond: Day => P(Day).millisecond(),
//   // ---------- [ 设置 ] ----------
//   // date | day | month | year | hour | minute | second | millisecond
//   // 对大小写不敏感

//   date_set: (Day, unit, value) => P(Day).set(unit, value),
//   // ---------- [ 操作 ] ----------

//   // 增加
//   date_add: (Day, value, unit) => P(Day).add(value, unit),
//   // 减少
//   date_subtract: (Day, value, unit) => P(Day).subtract(value, unit),
//   // 开头时间
//   date_startof: (Day, unit) => P(Day).startOf(unit),
//   // 末尾时间
//   date_endof: (Day, unit) => P(Day).endOf(unit),
//   // ---------- [ 显示 ] ----------

//   // 格式化
//   date_format: (Day, setting = 'YYYY-MM-DD HH:mm:ss') => P(Day).format(setting),
//   // 时间差
//   date_diff: (Day, Day2 = '', unit = 'millisecond', accurate = false) =>
//     P(Day).diff(dayjs(Day2), unit, accurate),
//   // Unix 时间戳 (毫秒)
//   date_value_millisecond: Day => P(Day).valueOf(),
//   // Unix 时间戳 (秒)
//   date_value_second: Day => P(Day).unix(),
//   // 月份的天数
//   date_days_in_month: Day => P(Day).daysInMonth(),
//   // Date 对象
//   date_to_date: Day => P(Day).toDate(),
//   // JSON
//   date_to_json: Day => P(Day).toJSON(),
//   // ISO8601 格式
//   date_to_iso: Day => P(Day).toISOString(),
//   // 字符
//   date_to_string: Day => P(Day).toString(),
//   // ---------- [ 查询 ] ----------
//   // 是否之前
//   date_is_before: (Day, Day2, unit = 'millisecond') => P(Day).isBefore(dayjs(Day2), unit),
//   // 是否之后
//   date_is_after: (Day, Day2, unit = 'millisecond') => P(Day).isAfter(dayjs(Day2), unit),
//   // 是否相同
//   date_is_same: (Day, Day2, unit = 'millisecond') => P(Day).isSame(dayjs(Day2), unit),
// };
