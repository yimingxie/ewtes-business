// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router-config'
import vuex from 'vuex'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts'

import moment from 'moment';
import 'moment/locale/zh-cn';

// 过滤器
import * as filters from './filters/filters'

Vue.use(ElementUI);

// 全局挂在moment
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
// console.log("111111111111111::" + moment("20121031", "YYYYMMDD").fromNow())
Vue.filter('fromNow', function(dataStr, pattern = 'YYYYMMDD') {
  return moment(dataStr,pattern).fromNow()
})
// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input, fmtstring) {
  return moment.unix(Math.round(input/1000)).format(fmtstring)
})
// 注册全局过滤器
// ------------------------------
// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input, fmtstring) {
  return moment.unix(Math.round(input / 1000)).format(fmtstring)
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 加载多语言插件
// 手动切换语言设置 `Vue.config.lang = 'en-us'`
// 详见：https://github.com/kazupon/vue-i18n
// Vue.use(i18nobject)
// Vue.use(i18n, {
//   i18n: function(path, options) {
//     let value = i18n.t(path, options)
//     if (value !== null && value !== undefined) {
//       return value
//     }
//     return ''
//   }
// })
// Vue.config.lang = 'zh-cn'
// const i18n = new i18nobject({
//   locale: 'zh-cn',
//   messages: locales
// })
Vue.use(vuex)

// 全局挂在echarts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  // i18n,
  components: { App },
  template: '<App/>'
})
