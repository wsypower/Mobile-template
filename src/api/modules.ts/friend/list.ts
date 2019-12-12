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

/**
 * 点赞
 *
 * @description 参数说明如下
 *  +-------------------------------------------------------------------|
 *  | userId *     |  用户ID     |  String      |       044....sda
 *  |-------------------------------------------------------------------|
 *  | subjectid *  |  朋友圈ID    |  String      |      044....sda
 *  |-------------------------------------------------------------------|
 *  | type *       |  取消|点赞    |  number      |      0:取消，msg:点赞
 *  +-------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncSetStar = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/like`,
    method: 'post',
    data,
  });
};

/**
 * 点赞
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | userId *        |  回复人ID     |  String       |       044....sda
 *  |-----------------------------------------------------------------------|
 *  | subjectid *     |  朋友圈ID      |  String      |       044....sda
 *  |-----------------------------------------------------------------------|
 *  | replyid *       |  被回复人ID    |  number       |      044....sda
 *  |-----------------------------------------------------------------------|
 *  | content *       |  内容          |  String      |      'hello world'
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncSetComment = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/comment`,
    method: 'post',
    data,
  });
};
