/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`// let url2 = `${protocol}//127.0.0.1/domino`
let url2 = `${http.localURL}/domino`



export default  {
  
  // 登录
  login(params) {
    return http.post(
      // `${url2}/login`, params

      `${http.localURL}/arctic/login`, params
      // `${http.localURL}/domino/login`, params
    )
  },
  // 通用后台登录
  login1(params) {
    return http.post(
      // `${url2}/login`, params

      // `${http.localURL}/elevcorp/login`, params
      `${http.localURL}/arctic/admin/login`, params
    )
  },
  // 获取验证码
  getSms(params){
    return http.post(
      // `${url2}/login`, params

      // `${http.localURL}/elevcorp/login`, params
      `${http.localURL}/arctic/sms`, params
    )
  },
  refreshToken(params) {
    return http.post(
      `${http.localURL}/arctic/refresh/token`, params
    )
  },
  // 批量录入电梯（地产）
  batchAddLift(params) {
    return http.post(`${http.localURL}/arctic/upload/parks/file`, params, 5 * 60 * 1000)
  },
}
