import request from '@/plugin/axios/axios';
import { AxiosPromise } from 'axios';

export const AsyncGetUser = (data?: any): AxiosPromise => {
  return request({
    url: `@test/getuser`,
    method: 'post',
    data,
  });
};

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
export const AsyncGetList = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/list`,
    method: 'post',
    data,
  });
};

/**
 * 获取列表数据
 *
 * @description
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetHistory = (data?: any): AxiosPromise => {
  return request({
    url: `@test/history`,
    method: 'post',
    data,
  });
};
