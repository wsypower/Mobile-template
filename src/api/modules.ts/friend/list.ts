import request from '@/plugin/axios/axios';
import { AxiosRequestConfig, AxiosStatic, AxiosPromise } from 'axios';

export const AsyncGetUser = (data?: any): AxiosPromise => {
  return request({
    url: `@test/getuser`,
    method: 'post',
    data,
  });
};
