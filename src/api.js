/**
 * API统一入口
 *
 * 调用方式：
    import api from '../api'
    api.product.get(productId).then((res) => {
      // 请求状态
      console.log(res.status)
      // 请求头信息
      console.log(res.headers())
      // 赋值
      this.$set('someData', response.data)
    }, (res) => {
      // 失败回调
    })
 */



import log from './api/login'
import accountApi from './api/accountApi'
import digital from './api/digital'
import person from './api/person'


export default {
  log,
  accountApi,



  digital,
  person,

}
