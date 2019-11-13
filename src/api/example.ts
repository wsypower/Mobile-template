/*
 * @Author: wei.yafei
 * @Date: 2019-07-19 17:12:05
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-13 21:01:38
 */

import request from '@/plugin/axios/axios';

/**
 * @description request Example
 */

/*========================================
=               post 请求示例             =
=========================================*/

export const AccountLogin = (data: any) => {
  return request({
    url: `@test/login`,
    method: 'post',
    data,
  });
};

/*========================================
=               get 请求示例              =
=========================================*/

export const Account = ({ ...params }) => {
  return request({
    url: `@test/login`,
    method: 'get',
    params: {
      params,
    },
  });
};

/*========================================
=            delete 请求示例              =
=========================================*/

export const deleteRole = () => {
  return request({
    url: `/role`,
    method: 'delete',
  });
};

/*========================================
=               put 请求示例              =
=========================================*/

export const updateRole = (data: any) => {
  return request({
    url: `/role`,
    method: 'put',
    data,
  });
};

/**
 * @description 配置自定义序列化参数
 */

/*=============================================
=          试例：配置post自定义序列化参数         =
=============================================*/
export const storagePointData = (data: any) => {
  return request({
    url: `/wfs`,
    method: 'post',
    /* 会将全局默认headers替换 */
    headers: {
      'Content-Type': 'text/xml ',
    },
    /* 会将全局默认transformRequest替换 */
    transformRequest: [
      function(data) {
        // 对 data 进行任意转换处理
        return data;
      },
    ],
    // 数据为xml格式
    data: `${data}`,
  });
};
