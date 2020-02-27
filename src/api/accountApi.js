/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`
let url2 = `${http.localURL}/ewtes/business`


export default  {
  // 获取企业模块
  getCorModules(){
    return http.get(
      `${url2}/corp/function/list`
    )
  },
  // 获取部门

  
  // 角色绑定资源
  bindResoures(params){
    return http.post(
      `${url2}/role-resource`, params
    )
  },

  // -----------------账号------------------

  // 创建维保管理员的账户
  createAccount(params) {
    return http.post(
      `${url2}/user`, params
    )
  },
  // 修改账号
  editManager(params){
    return http.put(
      `${url2}/user`, params
    )
  },
  // 根据账户列表模糊查询 仅限account
  getAccounts(params){
    return http.post(
      `${url2}/user/list`, params
    )
  },
  
  // 修改账号的enable 状态 禁用
  // {
  //   "userId":"账号id",
  //   "valid":"状态: false:禁用;true:启用;"
  // }
  enableAccount(params){
    return http.put(
      `${url2}/user/valid`, params
    )
  },
  // // 修改账号的enable 状态 启用
  // pickAccount(params){
  //   return http.put(
  //     `${url2}/account/pick`, params
  //   )
  // },
  // 修改员工
  editAccount(params){
    return http.put(
      `${url2}/staff`, params
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
    return http.put(
      `${url2}/user/reset/password`,params
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
      `${url2}/user/space`
    )
  },
  // 用戶中心修改密码
  editPsd(params){
    return http.put(
      // `${url2}/user/center/p`, params
      `${url2}/user/center`, params
    )
  },

  // ------------------------部门管理--------------------------------
  // 创建员工的账号
  createDepartment(params) {
    return http.post(
      `${url2}/unit`, params
    )
  },
  // 获取部门列表
  getDepartments(id){
    return http.get(
      `${url2}/department?id=${id}`
    )
  },
  // 创建下级部门
  createDepartments(params){
    return http.post(
      `${url2}/department`, params
    )
  },
  // 编辑部门
  editDepartment(params){
    return http.put(
      `${url2}/department`, params
    )
  },
  // 删除部门
  deleteDepartment(params){
    return http.delete(
      `${url2}/department`, params
    )
  },
  // 获取公司下的部门
  // getCorpDepartments(params){
  //   return http.post(
  //     `${url2}/unit/list`, params
  //   )
  // },
  // 获取部门下的员工
  getDepStaffs(depId){
    return http.get(
      `${url2}/unit/staff?depId=${depId}`
    )
  },
  // ------------------------员工管理--------------------------------

  // 添加员工
  createStaff(params) {
    return http.post(
      `${url2}/staff`, params
    )
  },
  // 获取员工列表
  getStaffs(params){
    return http.post(
      `${url2}/staff/list`, params
    )
  },
  // 查询员工信息详情
  getStaffDetails(staffId){
    return http.get(
      `${url2}/staff?uid=${staffId}`
    )
  },
  // 编辑员工
  editStaff(params){
    return http.put(
      `${url2}/staff`, params
    )
  },
  // 员工账号停启
  // {
  //   "staffId":"员工id",
  //   "enable":"0:禁用,1:启用"
  // }
  enableStaff(params){
    return http.put(
      `${url2}/staff/enable`, params
    )
  },
  // 批量重置密码
  resetPsd(params){
    return http.post(
      `${url2}/staff/reset-password`, params
    )
  },
  // 删除员工
  deleteStaff(id){
    return http.delete(
      `${url2}/staff`,{ids:id}
    )
  },
  /**
   * 根据所选择的管辖区域电梯
   */
  // getElevatorByArea(corpId,areaCode){
  //   return http.get(
  //     `${url2}/staff/${corpId}/${areaCode}/elevator`
  //   )
  // },
  getElevatorByArea(params){
    return http.post(
      `${url2}/staff/elevator`,params
    )
  },
  /**
   * 员工管辖电梯
   */
  getStaffManageLift(params){
    return http.post(
      `${url2}/staff/manage/elevator`,params
    )
  },
  // 上传图片
  uploadPic(params){
    return http.post(
      `${http.localURL}/ewtes/business/upload/image`, params
    )
  },

  // 查看图片
  viewPic(picName){
    return `${url2}/view/image?filename=${picName}`
  },

  // 员工作业记录
  staffTaskList(params){
    return http.post(
      `${url2}/staff/record/log`, params
    )
  },


  // ------------------------角色管理--------------------------------
  // 创建角色
  createRole(params){
    return http.post(
      `${url2}/role`, params
    )
  },
  // 查询角色列表
  getRoles(params){
    return http.post(
      `${url2}/role/list`, params
    )
  },
  
  // 修改角色名称
  editRole(params){
    return http.put(
      `${url2}/role`, params
    )
  },
  // 查询角色下已绑定的模块
  roleGetmodule(id){
    return http.get(
      `${url2}/role/function?id=${id}`
    )
  },
  
  deleteRole(params){
    return http.delete(
      `${url2}/role`,params
    )
  },
  deleteAccount(params){
    return http.delete(
      `${url2}/user`,params
    )
  },
  staffDetail(id){
    return http.get(
      `${url2}/staff?id=${id}`
    )
  },
  // 获取员工部门
  getStaffDeps(){
    return http.get(
      `${url2}/staff/department/list`
    )
  },

  // 根据corpId获取部门列表
  getCorpDeps(params){
    return http.get(
      `${url2}/corp/department/list`, params
    )
  }
}








  

