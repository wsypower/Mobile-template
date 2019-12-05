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
 * @description
 * @param {*} [data]
 * @returns {AxiosPromise}
 */
export const AsyncGetList = (data?: any): AxiosPromise => {
  return request({
    url: `@test/list`,
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
