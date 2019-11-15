import { builder, getBody } from '../util';
import Mock from 'mockjs';

const userId = ['123', '000'];

const login = options => {
  const body = getBody(options);
  if (!userId.includes(body.userId)) {
    return builder({ isLogin: true }, '您还没有权限访问，请联系管理员', 401);
  }

  return builder(
    {
      id: Mock.mock('@id'),
      name: Mock.mock('@name'),
      username: 'admin',
      realname: Mock.mock('@cname'),
      status: 1,
      creatorId: 'admin',
      role: 'admin',
    },
    '登录成功',
    0,
    { 'Custom-Header': Mock.mock('@id') },
  );
};
Mock.mock(/\/@test\/getuser/, 'post', login);
