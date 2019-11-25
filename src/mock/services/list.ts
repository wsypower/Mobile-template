import { builder, getBody } from '../util';
import Mock, { Random } from 'mockjs';
// 返回的数据
let list = [];

for (let i = 0; i < 10; i++) {
  // 点赞的人
  let likePeople = Mock.mock({
    'array|0-1': [Mock.mock('@cname'), Mock.mock('@cname'), Mock.mock('@cname')],
  });
  // 图片
  let image = Mock.mock({
    'images|2': [
      {
        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
        alt: 'picture1',
        title: 'Image Caption 1',
        w: 600,
        h: 400,
      },
      {
        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
        alt: 'picture2',
        title: 'Image Caption 2',
        w: 1200,
        h: 900,
      },
    ],
    // 'images|1-6': ['http://192.168.71.33:50000//upload/file/2019/11/12/20191112171532422153.jpg'],
  });
  let Data = {
    // 朋友圈ID
    id: Mock.mock('@id'),
    // 发布人名字
    name: Mock.mock('@cname'),
    // 时间戳
    // time: date,
    time: Mock.mock('@datetime'),
    // 说说文字
    text: Mock.mock('@cparagraph(1, 10)'),
    // 图片
    images: image.images,
    // 点赞的人
    likes: likePeople.array,
    // likes: likePeople.array,
    // 本人有没有点赞
    star: Mock.mock('@boolean'),
    // 评论栏内容
    comment: Mock.mock('@boolean'),
  };
  list.push(Data);
  likePeople = [];
}

const listData = (options: any) => {
  const body = getBody(options);

  return builder(
    {
      list,
    },
    '登录成功',
    0,
    { 'Custom-Header': Mock.mock('@id') },
  );
};
Mock.mock(/\/@test\/list/, 'post', listData);
