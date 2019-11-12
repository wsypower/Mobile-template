/*
 * util type文件
 *
 * @Author: wei.yafei
 * @Date: 2019-11-12 19:52:50
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-12 22:42:40
 */

/**
 * 返回这个样式的颜色值
 *
 * @author weiyafei
 * @date 2019-06-13-22:22:05
 * @param {String} type      样式名称 [ default | primary | success | warning | danger ]
 */
export type TypeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * 打印一个 [ title | text ] 样式的信息
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Capsule
 * @param { String } title   标题
 * @param { String } info    信息
 * @param { TypeColor } type 样式名称 [ default | primary | success | warning | danger ]
 */
interface Capsule {
  (title: string, info: string, type: TypeColor): void;
}

/**
 * 打印彩色文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Colorful
 * @param { any[] } text    信息
 */
export interface Colorful {
  (text: any[]): void;
}

/**
 * 打印 Default 样式的文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Default
 * @param { String } text    信息
 */
interface Default {
  (text: string): void;
}

/**
 * 打印 Primary 样式的文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Primary
 * @param { String } text    信息
 */
interface Primary {
  (text: string): void;
}

/**
 * 打印 Success 样式的文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Success
 * @param { String } text    信息
 */
interface Success {
  (text: string): void;
}

/**
 * 打印 Warning 样式的文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Warning
 * @param { String } text    信息
 */
interface Warning {
  (text: string): void;
}

/**
 * 打印彩色文字
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Colorful
 * @param { String } text    信息
 */
interface Danger {
  (text: string): void;
}

/**
 * 打印彩色 log
 *
 * @author weiyafei
 * @date 2019-11-12
 * @interface Log
 */
export interface LogType {
  /**
   *
   * @type { Capsule }
   * @memberof Log
   */
  capsule: Capsule;
  /**
   *
   * @type { Default }
   * @memberof Log
   */
  default: Default;
  /**
   *
   * @type { Primary}
   * @memberof Log
   */
  primary: Primary;
  /**
   *
   * @type { Success }
   * @memberof Log
   */
  success: Success;
  /**
   *
   * @type { Warning }
   * @memberof Log
   */
  warning: Warning;
  /**
   *
   * @type { Danger }
   * @memberof Log
   */
  danger: Danger;
}
