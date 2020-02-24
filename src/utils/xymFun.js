import api from '../api'



/**
 * 自定义校验规则
 */
let myReg = {
  // 仅限数字
  numAndDecimal: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
  // 仅限整数（包括负数）
  numAndMinus: /^-?[0-9]\d*$/,
  // 仅限正整数
  num: /^[1-9]\d*$/,
  // 仅限正数和0
  numAndPositive: /^(0|[1-9][0-9]*)(\.\d+)?$/,
}


export default {
  /**
   * 格式化时间戳
   * @param {number} timestamp 时间戳
   * @return {string} "2019-04-16 15:50:30"
   */
  dateFormat(timestamp) {
    // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
    if (typeof timestamp == 'string') return timestamp

    var dateObj = new Date(timestamp)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  },

  dateFormat3(timestamp) {
    // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
    if (typeof timestamp == 'string') return timestamp

    var dateObj = new Date(timestamp)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    var result = year + '-' + month + '-' + date;
    return result;
  },

  /**
   * 将格式化的时间转为时间戳
   * @param {string} "2019-04-16 15:50:30 或者 标准时间"
   * @return {number} timestamp 时间戳
   */
  transformTimestamp(dateString) {
    if (!dateString) return ''
    let timestamp = new Date(dateString).getTime()
    return timestamp
  },

  /**
   * 获取当前月份天数
   * @param {number} year 年份
   * @param {number} month “当前”月份
   * @return {number} 天数
   */
  currentMonthDay(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
  },

  /**
   * 两个日期相差的天数
   * @param {number} timestamp 时间戳
   * @return {number} 天数
   */
  getNumberOfDays(date1, date2){
    // date1：开始日期，date2结束日期
    // 核心：时间戳相减，然后除以天数
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24));
    return day
  },


  /**
   * 深拷贝 
   * （用于echarts配置封装）
   */
  deepClone(obj) {
    var result = Array.isArray(obj) ? [] : {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this.deepClone(obj[key]) // 递归复制
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  },

  /**
   * 判断监测数据，返回中文信息
   * @param {number} value 
   */
  returnPointDataCN(value) {
    if (value == 1) {
      return '身份证+温度'
    } else if (value == 2) {
      return '人脸+温度'
    } else if (value == 3) {
      return '人脸+温度+身份证'
    } else {
      return ''
    }
  },

  /**
   * 
   * @param {string} d1 "2019-04-16 15:50:30 或者 标准时间"
   * @return 自定义：距离当前时间小于等于30分钟内，则显示具体的N分钟内，否则显示时分秒，00:00:00
   */
  timeDiff(d1) {//di作为一个变量传进来
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
      return d1.substring(11, 19)
    }
  },

  /**
   * 导出自定义校验规则
   */
  myReg,


  /**
   * element-ui 自定义校验
   * 只限数字和小数，非必填
   */
  valiNumberPass(rule, value, callback) {
    let reg = myReg.numAndDecimal;
    if (value !== '' && !reg.test(value)) {
      callback(new Error('非法字符，请重新输入'));
    } else {
      callback();
    }
  },

  /**
   * element-ui 自定义校验
   * 只限数字和小数，必填
   */
  valiNumberPass2(rule, value, callback) {
    let reg = myReg.numAndDecimal;
    if (value === '') {
      callback(new Error('必填'));
    } else if (!reg.test(value)) {
      callback(new Error('非法字符，请重新输入'));
    } else {
      callback();
    }
  },


  /**
   * element-ui 自定义校验
   * 只限正整数，非必填
   */
  valiNum(rule, value, callback) {
    let reg = myReg.num;
    if (value !== '' && !reg.test(value)) {
      callback(new Error('非法字符，请重新输入'));
    } else {
      callback();
    }
  },

  /**
   * element-ui 自定义校验
   * 只限整数（包含负数），非必填
   */
  valiNumAndMinus(rule, value, callback) {
    let reg = myReg.numAndMinus;
    if (value !== '' && !reg.test(value)) {
      callback(new Error('非法字符，请重新输入'));
    } else {
      callback();
    }
  },

  /**
   * element-ui 自定义校验
   * 只限正数和0，非必填
   */
  valiNumAndPositive(rule, value, callback) {
    let reg = myReg.numAndPositive;
    if (value !== '' && !reg.test(value)) {
      callback(new Error('非法字符，请重新输入'));
    } else {
      callback();
    }
  },



}
