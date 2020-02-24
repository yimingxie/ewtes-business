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
    return http.post(`${url1}/ewtes/business/epidemic/list`, params)
  },

  // 添加防疫点
  addEpidemic(params) {
    return http.post(`${url1}/ewtes/business/epidemic`, params)
  },

  // 编辑防疫点
  editEpidemic(params) {
    return http.put(`${url1}/ewtes/business/epidemic`, params)
  },

  // 删除防疫点
  deleteEpidemic(epedIds) {
    return http.delete(`${url1}/ewtes/business/epidemic?epedId=${epedIds}`)
  },

  // 防疫点搜索框
  searchEpidemic(title) {
    return http.get(`${url1}/ewtes/business/epidemic/search?title=${title}`)
  },

  // 查询防疫点档案详情
  getDigitalDetail(epedId) {
    return http.get(`${url1}/ewtes/business/epidemic?epedId=${epedId}`)
  },

  // 查询防疫点下的检测区域
  getEpidemicMonitorList(epedId) {
    return http.get(`${url1}/ewtes/business/epidemic/monitor/list?epedId=${epedId}`)
  },

  // 新增检测区域
  addEpidemicMonitor(params) {
    return http.post(`${url1}/ewtes/business/epidemic/monitor`, params)
  },

  // 编辑检测区域
  editEpidemicMonitor(params) {
    return http.put(`${url1}/ewtes/business/epidemic/monitor`, params)
  },

  // 删除检测区域
  deleteEpidemicMonitor(pointId) {
    return http.delete(`${url1}/ewtes/business/epidemic/monitor?pointId=${pointId}`)
  },


  // 获取检测任务列表
  getObserveList(params) {
    return http.post(`${url1}/ewtes/business/epidemic/observed/list`, params)
  },

  // 查看检测任务
  getObserveDetail(observedId) {
    return http.get(`${url1}/ewtes/business/epidemic/observed?observedId=${observedId}`)
  },

  // 添加检测任务
  addObserve(params) {
    return http.post(`${url1}/ewtes/business/epidemic/observed`, params)
  },

  // 编辑检测任务
  editObserve(params) {
    return http.put(`${url1}/ewtes/business/epidemic/observed`, params)
  },

  // 删除任务
  deleteObserve(observedIds) {
    return http.delete(`${url1}/ewtes/business/epidemic/observed?observedId=${observedIds}`)
  },


  // 查看监测应用列表
  getDiagnosisList(params) {
    return http.post(`${url1}/ewtes/business/diagnosis/list`, params)
  },

  // 查询监测应用
  getDiagnosis(id) {
    return http.get(`${url1}/ewtes/business/diagnosis?id=${id}`)
  },

  // 添加监测应用
  addDiagnosis(params) {
    return http.post(`${url1}/ewtes/business/diagnosis`, params)
  },

  // 编辑监测应用
  editDiagnosis(params) {
    return http.put(`${url1}/ewtes/business/diagnosis`, params)
  },

  // 删除监测应用
  deleteDiagnosis(params) {
    return http.delete(`${url1}/ewtes/business/diagnosis`, params)
  },

  // 未绑定监测应用检测任务列表
  getUnusedTask(epId) {
    return http.get(`${url1}/ewtes/business/diagnosis/unused/task/list?epId=${epId}`)
  },

  // 停启用监测应用
  switchDiagnosis(params) {
    return http.put(`${url1}/ewtes/business/diagnosis/enable`, params)
  },


  // 异常档案列表
  getAbnormalList(params) {
    return http.post(`${url1}/ewtes/business/epidemic/abnormal`, params)
  },

  // 编辑防疫点所属上级列表
  getCorpList() {
    return http.get(`${url1}/ewtes/business/epidemic/corp/list`)
  },

  // 筛选条件单位下拉
  getUseDepartment() {
    return http.get(`${url1}/ewtes/business/epidemic/useDepartment`)
  },

  
  
}