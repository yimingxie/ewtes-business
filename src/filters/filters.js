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
 * @return {string} "2019-04-16 15:50:30"
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

export function dateFormat3(timestamp) {
  // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
  if (typeof timestamp != 'number') return timestamp
  var dateObj = new Date(timestamp)
  var year = dateObj.getFullYear(),
    month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
    date = ("0" + dateObj.getDate()).slice(-2),
    hour = ("0" + dateObj.getHours()).slice(-2),
    minute = ("0" + dateObj.getMinutes()).slice(-2),
    second = ("0" + dateObj.getSeconds()).slice(-2);

  var result = year + '-' + month + '-' + date
  return result;
}

// 格式化时间戳，不保留秒
export function dateFormatNoSecond(timestamp) {
  // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
  if (typeof timestamp != 'number') return timestamp.substring(0, 16)
  var dateObj = new Date(timestamp)
  var year = dateObj.getFullYear(),
    month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
    date = ("0" + dateObj.getDate()).slice(-2),
    hour = ("0" + dateObj.getHours()).slice(-2),
    minute = ("0" + dateObj.getMinutes()).slice(-2),
    second = ("0" + dateObj.getSeconds()).slice(-2);

  var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  return result;
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


/**
 * 判断监测数据，返回中文信息
 * @param {number} value 
 */
export function returnPointDataCN(value) {
  if (value == 1) {
    return '身份证+温度'
  } else if (value == 2) {
    return '人脸+温度'
  } else if (value == 3) {
    return '人脸+温度+身份证'
  } else {
    return ''
  }
}


/**
 * 返回处理状态
 * @param {number} value 
 */
export function returnWarnResult(value) {
  if (value == 1) {
    return '未处理'
  } else if (value == 2) {
    return '已处理'
  } else if (value == 3) {
    return '解除警告'
  } else {
    return '--'
  }
}

/**
 * 返回阈值
 * 0 - == 等于, 1 - > 大于, 2 - < 小于, 3 - >= 大于等于, 4 - <= 小于等于, 5 - != 不等于
 * @param {number} value 
 */
export function returnOperatorCN(value) {
  if (value == 0) {
    return '等于'
  } else if (value == 1) {
    return '大于'
  } else if (value == 2) {
    return '小于'
  } else if (value == 3) {
    return '大于等于'
  } else if (value == 4) {
    return '小于等于'
  } else if (value == 5) {
    return '不等于'
  } else {
    return ''
  }
}


/**
 * 分割时间
 * @param {string} "2019-04-16 15:50:30"
 * @return {string} "15:50:30"
 */
export function splitFormatDate(time) {
  let str = time + ''
  return str.substring(11, 19)
}


/**
 * 
 * @param {string} d1 "2019-04-16 15:50:30 或者 标准时间"
 * @return 自定义：距离当前时间小于等于30分钟内，则显示具体的N分钟内，否则显示时分秒，00:00:00
 */
export function timeDiff(d1) {//di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let tt = d1
  if (typeof d1 == 'number') {
    var dateObj = new Date(d1)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    tt = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  }

  let dateBegin = new Date(tt.replace(/-/g, "/"));//将-转化为/，使用new Date
  let dateEnd = new Date();//获取当前时间
  let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000)
  // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
  // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
  //   , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");

  if (minutes < 30) {
    return (minutes + 1) + '分钟内'
  } else {
    console.log('tttt', tt.substring(11, 19))
    return tt.substring(11, 19)
  }
}


export function timeDiff2(d1) {//di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let tt = d1
  if (typeof d1 == 'number') {
    var dateObj = new Date(d1)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    tt = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  }

  var b = Date.parse(tt);
  var e = Date.now()

  var minutes = Math.floor((e - b) / 60 / 1000);



  if (minutes < 30) {
    return (minutes + 1 ) + '分钟内'
  } else {
    console.log('tttt', tt.substring(11, 19))
    return tt.substring(11, 19)
  }
}
