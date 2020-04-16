/**
 * 时间格式转yyyy-MM-dd hh:mm:ss 
 * @param {Number} dateTimeStamp 毫秒数
 * @param {String} fmt 指定格式 yyyy-MM-dd hh:mm:ss 
 */
export const format = (dateTimeStamp, fmt) => {
    dateTimeStamp = new Date(Number(dateTimeStamp * 1000))
    var o = {
        "M+": dateTimeStamp.getMonth() + 1, //月份 
        "d+": dateTimeStamp.getDate(), //日 
        "h+": dateTimeStamp.getHours(), //小时 
        "m+": dateTimeStamp.getMinutes(), //分 
        "s+": dateTimeStamp.getSeconds(), //秒 
        "q+": Math.floor((dateTimeStamp.getMonth() + 3) / 3), //季度 
        "S": dateTimeStamp.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTimeStamp.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};


/**
 * 中文时间
 * @param {Number} dateTimeStamp 毫秒数
 */
export const timeSwitchString = (dateTimeStamp) => {
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    dateTimeStamp = dateTimeStamp*1000
    var minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    // var halfamonth = day * 15
    var month = day * 30;
    var now = new Date().getTime(); // 获取当前时间毫秒
    var diffValue = now - dateTimeStamp; // 时间差
    var result;
    if (diffValue < 0) {
        return;
    }
    var minC = diffValue / minute; // 计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前";
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前";
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前";
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前";
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前";
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
    } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth =
            datetime.getMonth() + 1 < 10 ?
            "0" + (datetime.getMonth() + 1) :
            datetime.getMonth() + 1;
        var Ndate =
            datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        // var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
        // var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
        // var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
        result = Nyear + "-" + Nmonth + "-" + Ndate;
    }
    return result;
};

/**
 * 四舍五入
 * @param {Number} val 原始数据 v2（100 保留两位小数）
 */
export const format45 = (val, v2) => {
    if (isNaN(val) || val == undefined || val == null) {
        return null;
    }
    return Math.round(val * v2) / v2;
};