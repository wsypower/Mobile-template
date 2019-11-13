/*
 * @Author: wei.yafei
 * @Date: 2019-06-12 02:44:03
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 17:28:09
 */

import { TypeColor, LogType, Colorful } from './type/util.log';

/**
 * @description 返回这个样式的颜色值
 * @author weiyafei
 * @date 2019-06-13-22:22:05
 * @param {String} type 样式名称 [ default | primary | success | warning | danger ]
 */

const typeColor = (type: TypeColor = 'default') => {
  let color: string = '';
  switch (type) {
    case 'default':
      color = '#35495E';
      break;
    case 'primary':
      color = '#3488ff';
      break;
    case 'success':
      color = '#43B883';
      break;
    case 'warning':
      color = '#e6a23c';
      break;
    case 'danger':
      color = '#FF0000';
      break;
    default:
      break;
  }
  return color;
};

/**
 * @description 打印彩色文字
 * @author weiyafei
 * @date 2019-06-13-21:12:27
 */
const colorful: Colorful = (textArr: any[]) => {
  console.log(
    `%c${textArr.map(t => t.text || '').join('%c')}`,
    ...textArr.map(t => `color: ${typeColor(t.type)};`),
  );
};

/**
 * @description 打印彩色文字
 * @author weiyafei
 * @date 2019-06-13-21:12:27
 */

const log: LogType = {
  /**
   * 打印一个 [ title | text ] 样式的信息
   *
   *
   * @param {String} title
   * @param {String} info
   * @param {TypeColor} type
   */
  capsule: (title: string, info: string, type: TypeColor = 'primary'): void => {
    console.log(
      `%c ${title} %c ${info} %c`,
      'background:#35495E; padding: 6px; border-radius: 5px 0 0 5px; color: #fff;font-weight:600',
      `background:${typeColor(
        type,
      )}; padding: 6px; border-radius: 0 5px 5px 0;  color: #fff;font-weight:600`,
      'background:transparent',
    );
  },

  /**
   * 打印 default 样式的文字
   *
   * @param { String } text 输出文字
   */
  default: (text: string): void => {
    colorful([{ text, type: 'primary' }]);
  },

  /**
   * 打印 primary 样式的文字
   *
   * @param { String } text 输出文字
   */
  primary: (text: string): void => {
    colorful([{ text, type: 'primary' }]);
  },

  /**
   * 打印 success 样式的文字
   *
   * @param { String } text 输出文字
   */
  success: (text: string): void => {
    colorful([{ text, type: 'success' }]);
  },

  /**
   * 打印 warning 样式的文字
   *
   * @param { String } text 输出文字
   */
  warning: (text: string): void => {
    colorful([{ text, type: 'warning' }]);
  },

  /**
   * 打印 danger 样式的文字
   *
   * @param { String } text 输出文字
   */
  danger: (text: string): void => {
    colorful([{ text, type: 'danger' }]);
  },
};

export default log;
