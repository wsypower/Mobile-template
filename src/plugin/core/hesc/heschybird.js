/**
 * 调用原生接口方法
 * @param {Object} method 需要调用的方法名
 * @param {Object} params 原生所需的参数
 * @param {Object} successFun 成功回调函数
 * @param {Object} errorFun 失败回调函数
 */
let nativeMethod = function(method, params, successFun, errorFun) {
  //打电话
  if (method === 'call') {
    callMobile('Native', 'call', { phone: params.phone }, 'calltail');
  }
  //发送短信
  else if (method === 'sendmsg') {
    callMobile('Native', 'sendmsg', { phone: params.phone, msg: params.content }, 'sendmsg');
  }

  //拍照
  else if (method === 'takephone') {
    callMobile('Native', 'photo_get', { path: params.path }, 'photo_get', successFun, errorFun);
  }
  //选择照片
  else if (method === 'chooseimg') {
    callMobile(
      'Native',
      'chooseimg',
      { maxSelect: params.maxSelect },
      'openSystemPhotoGallery',
      successFun,
      errorFun,
    );
  }
  //开始录音
  else if (method === 'startRecord') {
    callMobile('Native', 'startRecord', { path: params.path }, 'startRecord', successFun, errorFun);
  }
  //停止录音
  else if (method === 'stopRecord') {
    callMobile('Native', 'stopRecord', { path: params.path }, 'stopRecord', successFun, errorFun);
  }
  //播放录音
  else if (method === 'playvoice') {
    callMobile('Native', 'playvoice', { path: params.path }, 'playvoice', successFun, errorFun);
  }
  //继续播放
  else if (method === 'resumeplayvoice') {
    callMobile(
      'Native',
      'resumeplayvoice',
      { path: params.path },
      'resumeplayvoice',
      successFun,
      errorFun,
    );
  }
  //暂停播放
  else if (method === 'pauseplayvoice') {
    callMobile(
      'Native',
      'pauseplayvoice',
      { path: params.path },
      'pauseplayvoice',
      successFun,
      errorFun,
    );
  }
  //停止播放
  else if (method === 'endvoice') {
    callMobile('Native', 'endvoice', { path: params.path }, 'endvoice', successFun, errorFun);
  }
  //获取位置信息
  else if (method === 'mapLocation') {
    callMobile('Native', 'mapLocation', { path: '' }, 'mapLocation', successFun, errorFun);
  }
  //打开第三方软件
  else if (method === 'launchapp') {
    callMobile(
      'Native',
      'launchapp',
      {
        path: params.path,
        activity: params.activity,
      },
      'launchapp',
      successFun,
      errorFun,
    );
  }
  //获取网络类型
  else if (method === 'networktype') {
    callMobile('Native', 'networktype', { path: params.path }, 'networktype', successFun, errorFun);
  }
  //保存缓存
  else if (method === 'savelocal') {
    callMobile(
      'Native',
      'savelocal',
      {
        key: params.key,
        value: params.value,
      },
      'savelocal',
      successFun,
      errorFun,
    );
  }
  //读取缓存
  else if (method === 'getlocal') {
    callMobile('Native', 'getlocal', { key: params.key }, 'getlocal', successFun, errorFun);
  }
  //删除缓存
  else if (method === 'deletelocal') {
    callMobile('Native', 'deletelocal', { key: params.key }, 'deletelocal', successFun, errorFun);
  }
  //图片预览
  else if (method === 'previewpic') {
    callMobile('Native', 'previewpic', { pics: params.paths }, 'previewpic', successFun, errorFun);
  }
  //打开第三方超链接
  else if (method === 'hrefurl') {
    callMobile('Native', 'hrefurl', { url: params.url }, 'hrefurl', successFun, errorFun);
  }
  //打开地图
  else if (method === 'mapapplication') {
    callMobile(
      'Native',
      'mapapplication',
      { strx: params.strx, stry: params.stry },
      'mapapplication',
      successFun,
      errorFun,
    );
  }
  //裁剪图片
  else if (method === 'clippicture') {
    callMobile('Native', 'clippicture', { path: '' }, 'clippicture', successFun, errorFun);
  }
  //alert
  else if (method === 'alert') {
    callMobile('Native', 'alert', params, 'alert', successFun, errorFun);
  }
  //confirm
  else if (method === 'confirm') {
    callMobile('Native', 'confirm', params, 'confirm', successFun, errorFun);
  }
  //toast
  else if (method === 'toast') {
    callMobile('Native', 'toast', params, 'toast', successFun, errorFun);
  }
  //日历选择
  else if (method === 'calendar') {
    callMobile('Native', 'calendar', params, 'calendar', successFun, errorFun);
  }
  //扫二维码
  else if (method === 'scanbar') {
    callMobile('Native', 'scanbar', params, 'scanbar', successFun, errorFun);
  }
  //单选
  else if (method === 'signalchoose') {
    callMobile('Native', 'signalchoose', params, 'signalchoose', successFun, errorFun);
  }
  //多选
  else if (method === 'multiechoose') {
    callMobile('Native', 'multiechoose', params, 'multiechoose', successFun, errorFun);
  }
  //打开word等
  else if (method === 'openword') {
    callMobile('Native', 'openword', params, 'openword', successFun, errorFun);
  }
  //车牌识别
  else if (method === 'platerecognition') {
    callMobile('Native', 'platerecognition', params, 'platerecognition', successFun, errorFun);
  }
  //打开翼T
  else if (method === 'onlinemeeting') {
    callMobile('Native', 'onlinemeeting', params, 'onlinemeeting', successFun, errorFun);
  }
  //打开人脸识别
  else if (method === 'facerecognition') {
    callMobile('Native', 'facerecognition', params, 'facerecognition', successFun, errorFun);
  }
  //语音转文字
  else if (method === 'voicetoword') {
    callMobile('Native', 'voicetoword', params, 'voicetoword', successFun, errorFun);
  } else if (method == 'webapplication') {
    callMobile(
      'Native',
      'webapplication',
      { url: params.url },
      'webapplication',
      successFun,
      errorFun,
    );
  } else if (method == 'mapback') {
    callMobile('Native', 'mapback', {}, 'mapback', successFun, errorFun);
  }
  //是否展示左侧按钮和文字
  else if (method === 'setLeft') {
    callMobile('Native', 'setLeft', params, 'setLeft', successFun, errorFun);
  }
  //设置标题栏文字
  else if (method === 'setTitle') {
    callMobile('Native', 'setTitle', params, 'setTitle', successFun, errorFun);
  }
  //设置右侧功能按钮
  else if (method === 'setRight') {
    callMobile('Native', 'setRight', params, 'setRight', successFun, errorFun);
  }
};

export default nativeMethod;
