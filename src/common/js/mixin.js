/* eslint-disable */
/**
 * 开启接触touchmove默认事件
 * @param {Element} el
 */
export const openScroll = function (el) {
  el.addEventListener(
    "touchstart",
    function () {
      var top = el.scrollTop;
      var totalScroll = el.scrollHeight;
      var currentScroll = top + el.offsetHeight;
      if (top === 0) {
        el.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1;
      }
    }, {
      passive: true
    }
  );
  el.addEventListener(
    "touchmove",
    function (evt) {
      if (el.offsetHeight < el.scrollHeight) {
        evt._isScroller = true;
      }
    }, {
      passive: true
    }
  );
};
/**
 *
 * @param {Number} len uuid长度
 * @param {Number} radix uuid截取长度
 * @param {String} typeid uuid类型标识
 */
export const uuid = function (len, radix, typeid) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [];
  var typeid = typeid || "";
  var radix = radix || chars.length;
  var i;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return typeid + "-" + uuid.join("");
};

/**
 * url参数转JSON参数
 * @param {url}} url
 */
export const parseQueryString = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/;
  var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
  var arrUrl = regUrl.exec(url);
  var ret = {};
  if (arrUrl && arrUrl[1]) {
    var strPara = arrUrl[1];
    var result;
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
};
/**
 * 倒计时数组
 * 请勿使用'-'代替'/',在iPhone不支持
 * @param {String} setEndTime 2018/08/27 18:00
 */
export const countDownTime = function (setEndTime) {
  let endTime = new Date(setEndTime).getTime();
  let time = new Date().getTime();

  if (endTime <= time) {
    return [];
  } else {
    let HsecondNum = endTime - time;
    // let day = Math.floor(HsecondNum / (24 * 3600 * 1000))

    let dd = Math.floor(HsecondNum % (24 * 3600 * 1000));
    let hours = Math.floor(HsecondNum / (3600 * 1000));

    let minutesNum = dd % (3600 * 1000);
    let minutes = Math.floor(minutesNum / (60 * 1000));

    let secondNum = dd % (60 * 1000);
    let second = Math.floor(secondNum / 1000);
    return [hours, minutes, second];
  }
};

// 判断是否为微信
export const isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") { //eslint-disable-line
    return true;
  } else {
    return false;
  }
};
// 判断是否为QQ
export const isQQ = () => {
  let ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
};
// 判断是否为安卓
export const isAndroid = () => {
  let ua = navigator.userAgent;
  return ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
};
// 判断是否为ios
export const isIos = () => {
  let ua = navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储cookie
 */
export const setCookie = (objName, objValue, objHours = 30) => {
  var str = objName + "=" + escape(objValue);
  if (objHours != null) {
    var date = new Date();
    var ms = objHours * 3600 * 1000 * 24;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
};

/**
 * 获取cookie
 */
export const getCookie = objName => {
  var search = objName + "=";
  if (document.cookie.length > 0) {
    var offset = document.cookie.indexOf(search);
    if (offset !== -1) {
      offset += search.length;
      var end = document.cookie.indexOf(";", offset);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    } else {
      return "";
    }
  }
};
/**
 * 删除cookie
 */
export const delCookie = name => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
};
/**
 * 删除所有cookie
 */
export const clearCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
};
export const hasClass = (obj, cls) => {
  return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
};

export const addClass = (obj, cls) => {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls;
};

export const removeClass = (obj, cls) => {
  if (hasClass(obj, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    obj.className = obj.className.replace(reg, " ");
  }
};
// 身份证验证
export const IdCodeValid = function (code) {
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var row = {
    pass: true,
    msg: "验证成功"
  };
  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
      code
    )
  ) {
    row = {
      pass: false,
      msg: "身份证号格式错误"
    };
  } else if (!city[code.substr(0, 2)]) {
    row = {
      pass: false,
      msg: "身份证号地址编码错误"
    };
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split("");
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] != code[17].toUpperCase()) {
        row = {
          pass: false,
          msg: "身份证号校验位错误"
        };
      }
    }
  }
  return row;
};


export const isPassword = function( content , isGroup , acceptSpecial , starLength , endLength){
  isGroup = isGroup==undefined?false:isGroup
  acceptSpecial = acceptSpecial==undefined?false:acceptSpecial
  starLength = starLength==undefined?6:starLength
  endLength = endLength==undefined?10:endLength

  var regex_str = '';
  if(isGroup){
      regex_str += '(?=[\\s\\S]*[a-z])(?=[\\s\\S]*[A-Z])(?=[\\s\\S]*\\d)';
  }
  if(!acceptSpecial){
      regex_str += '(?=^\\w+$)';
  }
  regex_str += `[\\s\\S]{${starLength},${endLength}}$`;
  var regex = new RegExp(regex_str);
  return regex.test(content);
}

/**
* Check whether the content is Chinese
* @param {string} content
*/
export const isChinese = function( content ){
  return /^[\u4e00-\u9fa5]+$/.test(content);
}

/**
* Check whether the content is Email 
* @param {string} content
*/
export const isEmail = function( content ){
  return /^[\w-_]+@[\w-_]+(?:\.\w+)+$/.test(content);
}

/**
* Check whether the content is IDCard
* @param {string} content
*/
export const isIDCard = function( content ){
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(?:[0-9]|X)$|^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(content);
}

/**
* Check whether the content is Money
* @param {string} content
*/
export const isMoney = function( content ){
  return /^(?:(?:0)|[^0]\d*)(\.\d+)?$/.test(content);
}

/**
* Check whether the content is Phone
* @param {string} content
*/
export const isPhone = function( content ){
  return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(content);
}

