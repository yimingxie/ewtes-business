// 电梯接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
// let url1 = `${protocol}//192.168.100.89:8080`
// let url1 = `${protocol}//192.168.100.7:8080`


let url1 = `${http.localURL}`
// let url1 = `${protocol}//iot.gidomino.com/arctic`
// let url1 = `${protocol}//192.168.100.2/arctic`



export default {
  // 检测诊断统计
  getStatistics(epedId) {
    return http.get(`${url1}/ewtes/epidemic/diagnosis/statistics?epedId=${epedId}`)
  },

  // 实时监测
  getRealData(epedId) {
    return http.get(`${url1}/ewtes/epidemic/diagnosis/function?epedId=${epedId}`)
  },

  // 历史记录（今日）
  getHistoryList(params) {
    return http.post(`${url1}/ewtes/epidemic/diagnosis/history`, params)
  },

  // 异常详情
  getAbnormalDetail(params) {
    return http.post(`${url1}/ewtes/epidemic/abnormal/info`, params)
  },


  
}