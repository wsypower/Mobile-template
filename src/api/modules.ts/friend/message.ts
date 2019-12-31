import request from '@/plugin/axios/axios';
import { AxiosPromise } from 'axios';

/**
 * 获取列表数据
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------|
 *  | userId *   |  用户ID           |  String      |      044....sda
 *  |-----------------------------------------------------------------|
 *  | curpage *  |  获取页            |  String      |     'hello world'
 *  |-----------------------------------------------------------------|
 *  | pagesize * |  一页显示多少条      |  String      |        '208'
 *  +-----------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetMessageList = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/messageList`,
    method: 'post',
    data,
  });
};

/**
 * 删除单挑数据
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------|
 *  | userId *   |  用户ID           |  String      |      044....sda
 *  |-----------------------------------------------------------------|
 *  | curpage *  |  获取页            |  String      |     'hello world'
 *  |-----------------------------------------------------------------|
 *  | pagesize * |  一页显示多少条      |  String      |        '208'
 *  +-----------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncDeleteMessage = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/deleteMessage`,
    method: 'post',
    data,
  });
};
