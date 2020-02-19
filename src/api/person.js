/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`
let url2 = `${http.localURL}/arctic`


export default  {
 
    // 修改用户账号
  editAccount(params){
    return http.put(
      `${url2}/manage/staff`, params
    )
  },
  
  // 删除用户账号
  deleteAccount(params){
    return http.delete(
      `${url2}/manage/staff`, params
    )
  },
  // 重置账户密码
  // params:{userId:""}
  resetAccount(params){
    return http.post(
      `${url2}/staff/reset-password`,params
    )
  },
  // 账户绑定角色
  accountBindRole(params){
    return http.put(
      `${url2}/manage/staff/role`,params
    )
  },
  
  // 获取账户详情
  getAccountDetail(){
    return http.get(
      `${url2}/user/center`
    )
  },
  
}








  

