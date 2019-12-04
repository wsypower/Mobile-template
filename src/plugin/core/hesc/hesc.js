window.hesc = {};
let _callback_count = 0;
let _callback_map = [];
// 记录需要失败回调的方法
let _errback_map = [];
// html调用终端硬件部分
// tags 是组件唯一标示,如id，定义哪个组件调用原生功能

var callMobile = function(handlerInterface, handlerMethod, parameters, tags, callback, errback) {
  //handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
  //handlerInterface：'Native' 调用原生  handlerMethod:具体原生功能方法名  parameters:json对象，供原生使用的值

  let requestTags = {
    tags: tags,
  };

  let callbackID = /* (_callback_count++).toString() */ ++_callback_count;

  if (typeof callback === 'function') {
    _callback_map[callbackID] = callback;
  }

  // _callback_map.join("@")

  if (errback !== null && typeof errback === 'function') {
    _errback_map[callbackID] = errback;
  }

  requestTags['callbackID'] = callbackID;

  let dic = {
    handlerInterface: handlerInterface,
    function: handlerMethod,
    parameters: parameters,
    tags: requestTags,
  };

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.webkit.messageHandlers[handlerInterface].postMessage(dic);
  } else {
    //安卓传输不了js json对象
    window[handlerInterface]['handler'](handlerMethod, JSON.stringify(dic));
  }
};

String.prototype.replaceAll = function(FindText, RepText) {
  let regExp = new RegExp(FindText, 'g');
  return this.replace(regExp, RepText);
};

// 终端调用JS方法，将硬件调用的返回结果发送给web
var fromMobile = function(handlerInterface, handlerMethod, parameters, tags) {
  // function fromMobile(handlerInterface, handlerMethod, parameters, tags) {
  let para = String(parameters);
  let strtags = String(tags);
  let re = JSON.parse(strtags);

  let param = para.replaceAll('"{', '{').replaceAll('}"', '}');

  if (handlerMethod === 'photo_get' && !Array.isArray(JSON.parse(param))) {
    // alert("photo_get"+parameters)
    _errback_map[re.callbackID](JSON.parse(param));
    delete _errback_map[re.callbackID];
  } else if (handlerMethod === 'chooseimg' && !Array.isArray(JSON.parse(param))) {
    // alert("chooseimg"+parameters)
    _errback_map[re.callbackID](JSON.parse(param));
    delete _errback_map[re.callbackID];
  } else {
    _callback_map[re.callbackID](JSON.parse(param)); // 回调函数，用完删除事件
  }
  delete _callback_map[re.callbackID];
};
