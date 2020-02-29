// 电梯接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
// let url1 = `${protocol}//192.168.100.89:8080`
// let url1 = `${protocol}//192.168.100.7:8080`


let url1 = `${http.localURL}/ewtes/business`
// let url1 = `${protocol}//iot.gidomino.com/arctic`
// let url1 = `${protocol}//192.168.100.2/arctic`



export default {
  // 检测诊断统计
  getStatistics(epedId) {
    return http.get(`${url1}/epidemic/diagnosis/statistics?epedId=${epedId}`)
  },

  // 实时监测
  getRealData(epedId) {
    return http.get(`${url1}/epidemic/diagnosis/function?epedId=${epedId}`)
  },

  // 历史记录（今日）
  getHistoryList(params) {
    return http.post(`${url1}/epidemic/diagnosis/history`, params)
  },

  // 点监测区域查看异常总详情
  getAbnormalDetail(params) {
    return http.post(`${url1}/epidemic/abnormal/info`, params)
  },

  // 告警信息详情
  getWarnDetail(taskId) {
    return http.get(`${url1}/epidemic/diagnosis/info?taskId=${taskId}`)
  },

  // 处理告警信息
  dealWarn(params) {
    return http.put(`${url1}/epidemic/diagnosis/process`, params)
  },

  
}