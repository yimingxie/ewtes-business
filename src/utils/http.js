/**
 * 封装请求
 */


//引入axios
import axios from 'axios'
import router from '../router-config'
import api from 'api'
import Vue from 'vue'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
// axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
//     //发起请求时，取消掉当前正在进行的相同请求
//     if (promiseArr[config.url]) {
//         promiseArr[config.url]('操作取消')
//         promiseArr[config.url] = cancel
//     } else {
//         promiseArr[config.url] = cancel
//     }
//       return config
// }, error => {
//     return Promise.reject(error)
// })

// //响应拦截器即异常处理
// axios.interceptors.response.use(response => {
  // 对响应数据做点什么
//   if (response.status === 200) {   
//     return Promise.resolve(response);  
//   } else {   
//     return Promise.reject(response);  
//   } 
// }, err => { // 服务器状态码不是200的情况 
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = '错误请求'
//           break;
//         case 401:
//           err.message = '未授权，请重新登录'
//           break;
//         case 403:
//           err.message = '拒绝访问'
//           break;
//         case 404:
//           err.message = '请求错误,未找到该资源'
//           break;
//         case 405:
//           err.message = '请求方法未允许'
//           break;
//         case 408:
//           err.message = '请求超时'
//           break;
//         case 500:
//           err.message = '服务器端出错'
//           break;
//         case 501:
//           err.message = '网络未实现'
//           break;
//         case 502:
//           err.message = '网络错误'
//           break;
//         case 503:
//           err.message = '服务不可用'
//           break;
//         case 504:
//           err.message = '网络超时'
//           break;
//         case 505:
//           err.message = 'http版本不支持该请求'
//           break;
//         default:
//           err.message = `连接错误${err.response.status}`
//       }
//     } else {
//       err.message = "连接到服务器失败"
//     }
//     message.err(err.message)
//       return Promise.resolve(err.response)
// })


//请求拦截器 
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let token = window.localStorage.getItem('accessToken')

  if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    // config.headers.token = `${token}`;
    // config.headers['G-Token'] = token;
    config.headers['token'] = token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // console.log("response===" + JSON.stringify(response))

  // token失效
  if(response.data.code == 407) {
    
    // if(localStorage.getItem('accessToken')) {
    //   // message.info(res.data.Errors + ',请重新登录', 3);
    //   alert('token失效，请重新登录');
    // }
    // // 清除token
    // localStorage.removeItem('accessToken');
    // // 跳转登陆页
    // router.push('/');

    let refreshToken = localStorage.getItem('refreshToken')

    // 通过refreshToken重新获取token
    api.log.refreshToken({'refreshToken': refreshToken}).then((res) => {

      if(res.data.code == 200){
        // 成功
        let token = res.data.data.token
        window.localStorage.setItem('accessToken', token)

        // // 将新的Token设置到重发的请求头
        // response.config.headers['G-Token'] = token;
        // // 请求重发
        // return axios.request(response.config);
      
      } else {
        // 失败，跳转至登录页
        if(localStorage.getItem('accessToken')) {
          Vue.prototype.$message({
            type: "error",
            message: "身份已过期，请重新登录"
          });
        }
        
        // 清除token
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        router.push('/');
      }

    })

  } else {
    return response;
  }
  
}, error => {
  // 对响应数据错误做操作
  console.log('请求error', error.code);

  var originalRequest = error.config;

  // 请求超时
	if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
    Vue.prototype.$message({
      type: "error",
      message: "当前网络不佳，请刷新重试"
    });
	}

  return Promise.reject(error);
})

//在main.js设置全局的请求次数，请求的间隙
 
axios.defaults.timeout = 10000

// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//     var config = err.config;
//     // If config does not exist or the retry option is not set, reject
//     if(!config || !config.retry) return Promise.reject(err);
    
//     // Set the variable for keeping track of the retry count
//     config.__retryCount = config.__retryCount || 0;
    
//     // Check if we've maxed out the total number of retries
//     if(config.__retryCount >= config.retry) {
//         // Reject with the error
//         return Promise.reject(err);
//     }
    
//     // Increase the retry count
//     config.__retryCount += 1;
    
//     // Create new promise to handle exponential backoff
//     var backoff = new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve();
//         }, config.retryDelay || 1);
//     });
    
//     // Return the promise in which recalls axios to retry the request
//     return backoff.then(function() {
//         return axios(config);
//     });
// });


let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// axios.defaults.baseURL = '/api'

let iot
let devURL
let xiaohuURL
let shupingURL
let localURL


if (process.env.NODE_ENV == 'development') {
  iot = `${protocol}//iot.gidomino.com`
  devURL = `${protocol}//192.168.100.2`
  xiaohuURL = `${protocol}//192.168.100.89:8080`
  shupingURL = `${protocol}//192.168.100.8:8080`
  localURL = `${protocol}//192.168.100.8:8080`
  localURL = `${protocol}//192.168.100.17:8081`
  // localURL = `${protocol}//iot.gidomino.com`
  // localURL = `${protocol}//192.168.100.3`
  // localURL = `${protocol}//192.168.100.17:8080`
  // localURL = `${protocol}//192.168.100.8:8080`
  localURL = `${protocol}//192.168.100.89:8080`
  // localURL = `${protocol}//lorns.gidomino.com`
} else if (process.env.NODE_ENV == 'production') {
  //  localURL = iot = devURL = xiaohuURL = shupingURL = `${protocol}//192.168.100.3`
  // localURL = iot = devURL = xiaohuURL = shupingURL = `${protocol}//iot.gidomino.com`
  // localURL = iot = devURL = xiaohuURL = shupingURL = `${protocol}//lorns.gidomino.com:23680`
  localURL = iot = devURL = xiaohuURL = shupingURL = `${protocol}//lorns.gidomino.com`
}

// let AUTH_TOKEN=(function(){
//   return window.localStorage.getItem('accessToken')
// })();
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/json; charset=utf-8",
  // 'Content-Type':'text/html; charset=utf-8',
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'Access-Token': window.localStorage.getItem('accessToken')
  // 'G-Token': AUTH_TOKEN
  // "Access-Control-Allow-Credentials": true
}
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


export default {
  iot,
  devURL,
  xiaohuURL,
  shupingURL,
  localURL,
  //get请求
  get (url,param) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //post请求
  post (url,param, timeoutParam) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        timeout: timeoutParam ? timeoutParam : 10000,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      }) 
    })
  },
  put(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  delete(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}
