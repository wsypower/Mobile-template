/*
 * @description 日期时间相关 filter
 * @Author: wei.yafei
 * @Date: 2019-07-11 17:31:05
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-20 10:16:14
 */

import dayjs, { Dayjs, ConfigType, UnitType } from 'dayjs';
// 引用相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
import { format } from 'timeago.js';
import P from './proxy';
import { TDate } from 'timeago.js/lib/interface';

dayjs.extend(relativeTime); // 相对时间插件

/**
 * filters接口定义
 *
 * @author weiyafei
 * @date 2019-11-19
 * @interface Filters
 */
interface Filters {
  [propName: string]: Function;
}

/*=============================================
=                  [ 定义周 ]                  =
=============================================*/

const WEEK_DATE: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const filters: Filters = {
  /*=============================================
  =                 [ dayjs 解析 ]               =
  =============================================*/

  /**
   * 时间字符串 | Date 对象 | Unix 时间戳 (毫秒)
   *
   * @param {ConfigType} [value]
   * @returns {number}
   */
  day: (value?: ConfigType): Dayjs => dayjs(value),

  /**
   * Unix 时间戳 (秒)
   *
   * @param {number} value
   * @returns {Dayjs}
   */
  date_unix: (value: number): Dayjs => dayjs.unix(value),

  /*=================================================
  = [ 获取 ] [年 — 月 - 日 - 周 - 时 - 分 - 秒 - 毫秒]  =
  ==================================================*/

  /**
   * 获取年份
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_year: (Day: Dayjs) => P(Day).year(),

  /**
   * 获取月份。从 0 开始
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_month: (Day: Dayjs) => P(Day).month(),

  /**
   * 获取日期。从 1 开始
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_date: (Day: Dayjs) => P(Day).date(),

  /**
   * 获取星期。从星期天 0 开始
   *
   * @param {Dayjs} Day
   * @returns {string}
   */
  date_day: (Day: Dayjs) => WEEK_DATE[P(Day).day()],

  /**
   * 获取星期。从星期天 0 开始
   *
   * @param {Dayjs} Day
   * @returns {string}
   */
  date_week: (Day: Dayjs): string => WEEK_DATE[P(Day).day()],

  /**
   * 获取小时。
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_hour: (Day: Dayjs) => P(Day).hour(),

  /**
   * 获取分钟。
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_minute: (Day: Dayjs) => P(Day).minute(),

  /**
   * 获取秒。
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_second: (Day: Dayjs) => P(Day).second(),

  /**
   * 获取毫秒。
   *
   * @param {Dayjs} Day
   * @returns {Dayjs}
   */
  date_millisecond: (Day: Dayjs) => P(Day).millisecond(),

  /*=============================================================================
  =  [ 设置 ] [date | day | month | year | hour | minute | second | millisecond] =
  ==============================================================================*/

  /**
   * 设置
   *
   * @param {Dayjs} Day
   * @param {UnitType} unit
   * @param {number} value
   * @returns {Dayjs}
   */
  date_set: (Day: Dayjs, unit: UnitType, value: number) => P(Day).set(unit, value),

  /*=============================================
  =                   [ 操作 ]                   =
  =============================================*/

  /**
   * 增加
   *
   * @param {Dayjs} Day
   * @param {string} unit
   * @param {UnitType} value
   * @returns {Dayjs}
   */
  date_add: (Day: Dayjs, unit: UnitType, value: number) => P(Day).add(value, unit),

  /**
   * 减少
   *
   * @param {Dayjs} Day
   * @param {UnitType} unit
   * @param {number} value
   * @returns {Dayjs}
   */
  date_subtract: (Day: Dayjs, unit: UnitType, value: number) => P(Day).subtract(value, unit),

  /**
   * 开头时间
   *
   * @param {Dayjs} Day
   * @param {UnitType} unit
   * @returns {Dayjs}
   */
  date_startof: (Day: Dayjs, unit: UnitType) => P(Day).startOf(unit),

  /**
   * 末尾时间
   *
   * @param {Dayjs} Day
   * @param {Dayjs} unit
   * @returns {Dayjs}
   */
  date_endof: (Day: Dayjs, unit: UnitType) => P(Day).endOf(unit),

  /*=============================================
  =                    [ 显示 ]                  =
  =============================================*/

  /**
   * 格式化 - 标准
   *
   * @param {Dayjs} Day
   * @param {string} [setting='YYYY-MM-DD HH:mm:ss']
   * @returns {string}
   */
  date_format: (Day: Dayjs, setting: string = 'YYYY-MM-DD HH:mm:ss'): string =>
    P(Day).format(setting),

  /**
   * 时间差
   *
   * @param {Dayjs} Day
   * @param [Dayjs] Day2
   * @param {string} [unit='millisecond']
   * @param {boolean} [accurate=false]
   * @returns {number}
   */
  date_diff: (
    Day: Dayjs,
    Day2: Dayjs | string = '',
    unit: UnitType = 'millisecond',
    accurate: boolean = false,
  ): number => P(Day).diff(dayjs(Day2), unit, accurate),

  /**
   * 时间差(多少年，月，日，秒之前)
   *
   * @param {TDate} value
   * @returns {string}
   */
  RelativeTime: (value: TDate): string => format(value, 'zh_CN'),

  /**
   * Unix 时间戳 (毫秒)
   *
   * @param {Dayjs} Day
   * @returns {number}
   */
  date_value_millisecond: (Day: Dayjs) => P(Day).valueOf(),

  /**
   * Unix 时间戳 (秒)
   *
   * @param {Dayjs} Day
   * @returns {number}
   */
  date_value_second: (Day: Dayjs): number => P(Day).unix(),

  /**
   * 月份的天数
   *
   * @param {Dayjs} Day
   * @returns {number}
   */
  date_days_in_month: (Day: Dayjs): number => P(Day).daysInMonth(),

  /**
   * Date 对象
   *
   * @param {Dayjs} Day
   * @returns {Date}
   */
  date_to_date: (Day: Dayjs): Date => P(Day).toDate(),

  /**
   * JSON
   *
   * @param {Dayjs} Day
   * @returns {string}
   */
  date_to_json: (Day: Dayjs): string => P(Day).toJSON(),

  /**
   * 格式
   *
   * @param {Dayjs} Day
   * @returns {string}
   */
  date_to_iso: (Day: Dayjs): string => P(Day).toISOString(),

  /**
   * 字符
   *
   * @param {Dayjs} Day
   * @returns {string}
   */
  date_to_string: (Day: Dayjs): string => P(Day).toString(),

  /*=============================================
  =                    [ 查询 ]                  =
  =============================================*/

  /**
   * 是否之前
   *
   * @param {Dayjs} Day
   * @param {Dayjs} Day2
   * @param {string} [unit='millisecond']
   * @returns {boolean}
   */
  date_is_before: (Day: Dayjs, Day2: Dayjs, unit: UnitType = 'millisecond'): boolean =>
    P(Day).isBefore(dayjs(Day2), unit),

  /**
   * 是否之后
   *
   * @param {Dayjs} Day
   * @param {Dayjs} Day2
   * @param {string} [unit='millisecond']
   * @returns {boolean}
   */
  date_is_after: (Day: Dayjs, Day2: Dayjs, unit: UnitType = 'millisecond'): boolean =>
    P(Day).isAfter(dayjs(Day2), unit),

  /**
   * 是否相同
   *
   * @param {Dayjs} Day
   * @param {Dayjs} Day2
   * @param {string} [unit='millisecond']
   * @returns {boolean}
   */
  date_is_same: (Day: Dayjs, Day2: Dayjs, unit: UnitType = 'millisecond'): boolean =>
    P(Day).isSame(dayjs(Day2), unit),
};
export default filters;
