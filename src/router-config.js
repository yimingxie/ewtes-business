import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      meta: {
        title: "登录",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/common/Login.vue'], resolve)
    },
    {
      path: "/map",
      name: "map",
      meta: {
        title: "批量上传",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./components/mutiUpload.vue'], resolve)
    },
    {
      path: "/staff",
      name: "staff",
      meta: {
        title: "员工管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Staff.vue'], resolve)
    },
    {
      path: "/staffDetails/:staffId",
      name: "staffDetails",
      meta: {
        title: "员工详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/StaffDetails.vue'], resolve)
    },




    // 数字防疫点
    {
      path: "/digital-list",
      name: "digital-list",
      meta: {
        title: "数字防疫点",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/DigitalList.vue'], resolve)
    },
    {
      path: "/digital-add-result",
      name: "digital-add-result",
      meta: {
        title: "添加防疫点",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/DigitalAddResult.vue'], resolve)
    },
    {
      path: "/digital-detail",
      name: "digital-detail",
      meta: {
        title: "防疫点档案",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/DigitalDetail.vue'], resolve)
    },
    {
      path: "/observe-list",
      name: "observe-list",
      meta: {
        title: "观察任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/ObserveList.vue'], resolve)
    },

  ]
})


router.beforeEach((to, from, next) => {

  // console.log("token-=-" + JSON.stringify(to))
  let token = window.localStorage.getItem('accessToken')
  let refreshToken = window.localStorage.getItem('refreshToken')

  if((!token || token === null || !refreshToken || refreshToken === null) && to.path != '/') { //未登录，强制登录
    // console.log("234-=-" + token)
    // next({
    //   name:"Login"  // 将跳转的路由name作为参数，登录成功后跳转到该路由
    // });
    next();

  } else {
    // 设置标题
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next();
  }
  
})


export default router

