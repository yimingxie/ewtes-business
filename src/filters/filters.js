/**
 * 日期格式化
 * @param  {String} value 目标日期字符串
 * @return {String}
 */
export function formatDate (date) {
  if (typeof date !== 'undefined' && date.length > 0) {
    return date.replace('T', ' ').replace('Z', '').slice(0, date.indexOf('.'))
  } else {
    return date
  }
}



/**
 * 格式化时间戳
 * @param {number} timestamp 时间戳
 * @return {string} "2019-4-16 15:50:30"
 */
export function dateFormat(timestamp) {
  // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
  if (typeof timestamp != 'number') return timestamp
  var dateObj = new Date(timestamp)
  var year = dateObj.getFullYear(),
    month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
    date = ("0" + dateObj.getDate()).slice(-2),
    hour = ("0" + dateObj.getHours()).slice(-2),
    minute = ("0" + dateObj.getMinutes()).slice(-2),
    second = ("0" + dateObj.getSeconds()).slice(-2);

  var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  return result;
}

export function dateFormat2(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

/**
 * 单位转化，秒转化为分秒格式
 * @param {number} second 秒
 * @return {string} "4小时3分20秒"
 */
export function secondFormat(value) {
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = "" + parseInt(secondTime) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}
