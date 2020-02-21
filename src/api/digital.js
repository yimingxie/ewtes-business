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
  // 数字防疫点列表
  getEpidemicList(params) {
    return http.post(`${url1}/ewtes/epidemic/list`, params)
  },

  // 添加防疫点
  addEpidemic(params) {
    return http.post(`${url1}/ewtes/epidemic`, params)
  },

  // 编辑防疫点
  editEpidemic(params) {
    return http.put(`${url1}/ewtes/epidemic`, params)
  },

  // 删除防疫点
  deleteEpidemic(epedIds) {
    return http.delete(`${url1}/ewtes/epidemic?epedId=${epedIds}`)
  },

  // 防疫点搜索框
  searchEpidemic(title) {
    return http.get(`${url1}/ewtes/epidemic/search?title=${title}`)
  },

  // 查询防疫点档案详情
  getDigitalDetail(epedId) {
    return http.get(`${url1}/ewtes/epidemic?epedId=${epedId}`)
  },

  // 查询防疫点下的检测区域
  getEpidemicMonitorList(epedId) {
    return http.get(`${url1}/ewtes/epidemic/monitor/list?epedId=${epedId}`)
  },

  // 新增检测区域
  addEpidemicMonitor(params) {
    return http.post(`${url1}/ewtes/epidemic/monitor`, params)
  },

  // 编辑检测区域
  editEpidemicMonitor(params) {
    return http.put(`${url1}/ewtes/epidemic/monitor`, params)
  },

  // 删除检测区域
  deleteEpidemicMonitor(pointId) {
    return http.delete(`${url1}/ewtes/epidemic/monitor?pointId=${pointId}`)
  },


  // 获取观察任务列表
  getObserveList(params) {
    return http.post(`${url1}/ewtes/epidemic/observed/list`, params)
  },

  // 查看观察任务
  getObserveDetail(observedId) {
    return http.get(`${url1}/ewtes/epidemic/observed?observedId=${observedId}`)
  },

  // 添加观察任务
  addObserve(params) {
    return http.post(`${url1}/ewtes/epidemic/observed`, params)
  },

  // 编辑观察任务
  editObserve(params) {
    return http.put(`${url1}/ewtes/epidemic/observed`, params)
  },

  // 删除任务
  deleteObserve(observedIds) {
    return http.delete(`${url1}/ewtes/epidemic/observed?observedId=${observedIds}`)
  },


  // 查看监测应用列表
  getDiagnosisList(params) {
    return http.post(`${url1}/ewtes/diagnosis/fetch/list`, params)
  },

  // 查询监测应用
  getDiagnosis(id) {
    return http.get(`${url1}/ewtes/diagnosis/fetch?id=${id}`)
  },

  // 添加监测应用
  addDiagnosis(params) {
    return http.post(`${url1}/ewtes/diagnosis/create`, params)
  },

  // 编辑监测应用
  editDiagnosis(params) {
    return http.put(`${url1}/ewtes/diagnosis/modify`, params)
  },

  // 删除监测应用
  deleteDiagnosis(id) {
    return http.delete(`${url1}/ewtes/diagnosis/delete?id=${id}`)
  },

  // 停启用监测应用
  switchDiagnosis(params) {
    return http.put(`${url1}/ewtes/diagnosis/fetch/enable`, params)
  },


  // 异常档案列表
  getAbnormalList(params) {
    return http.get(`${url1}/ewtes/epidemic/abnormal`, params)
  },




  
}