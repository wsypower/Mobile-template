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
 * @description 参数说明如下
 *  +--------------------------------------------------------------------|
 *  | userId *   |  用户ID             |  String      |      044....sda
 *  |--------------------------------------------------------------------|
 *  | lookId *   |  查看的ID            |  String      |     'hello world'
 *  +--------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetHistory = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/subjectList`,
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
 * 评论
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

/**
 * 删除评论
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | commentid *     |  评论ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncDeleteComment = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/deleteComment`,
    method: 'post',
    data,
  });
};

/**
 * 删除评论
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | subjectid *     |  朋友圈ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncDeleteSubject = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/deleteSubject`,
    method: 'post',
    data,
  });
};

/**
 * 获取头部信息数据
 *
 * @description 参数说明如下
 *  +--------------------------------------------------------------------|
 *  | userId *   |  用户ID             |  String      |      044....sda
 *  |--------------------------------------------------------------------|
 *  | lookId *   |  查看的ID            |  String      |     'hello world'
 *  +--------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetHeader = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/subjectHead`,
    method: 'post',
    data,
  });
};

/**
 * 获取详情
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | subjectid *     |  朋友圈ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetSubjectDetail = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/subjectDetail  `,
    method: 'post',
    data,
  });
};

/**
 * 获取个人信息
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | lookid *     |  查看谁的ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetUserInfo = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/userInfo  `,
    method: 'post',
    data,
  });
};

/**
 * 获取未读信息条目数
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | userId *     |  朋友圈ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetMessageCount = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/userInfo  `,
    method: 'post',
    data,
  });
};

/**
 * 清空消息列表
 *
 * @description 参数说明如下
 *  +-----------------------------------------------------------------------|
 *  | userId *     |  朋友圈ID     |  String       |       044....sda
 *  +-----------------------------------------------------------------------|
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncClearMessage = (data?: any): AxiosPromise => {
  return request({
    url: `pyq/clearMessage`,
    method: 'post',
    data,
  });
};
