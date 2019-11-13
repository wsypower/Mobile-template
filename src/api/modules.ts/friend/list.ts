import request from '@/plugin/axios/axios';

export const GetUser = (data: any) => {
  return request({
    url: `@test/login`,
    method: 'post',
    data,
  });
};
