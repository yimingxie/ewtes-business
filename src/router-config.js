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
      path: "/personnel",
      name: "personnel",
      meta: {
        title: "人员防疫记录",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/record/Personnel.vue'], resolve)
    },
    {
      path: "/person-detail",
      name: "personnelDetails",
      meta: {
        title: "人员详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/record/PersonnelDetails.vue'], resolve)
    },
    {
      path: "/entryRecord",
      name: "entryRecord",
      meta: {
        title: "防疫点出入记录",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/record/EntryRecord.vue'], resolve)
    },
    {
      path: "/account",
      name: "account",
      meta: {
        title: "账号管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Account.2.vue'], resolve)
    },
    // {
    //   path: "/role",
    //   name: "role",
    //   meta: {
    //     title: "账号管理",
    //     auto: false // 是否需要权限
    //   },
    //   component: (resolve) => require(['./views/settings/Role.vue'], resolve)
    // },
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
      path: "/center",
      name: "center",
      meta: {
        title: "个人中心",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/common/Center.vue'], resolve)
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
        title: "检测任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/ObserveList.vue'], resolve)
    },
    {
      path: "/observe-list2",
      name: "observe-list2",
      meta: {
        title: "检测任务管理2",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/ObserveList2.vue'], resolve)
    },
    {
      path: "/detection-query",
      name: "detection-query",
      meta: {
        title: "检测诊断",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/detection/DetectionQuery.vue'], resolve)
    },
    {
      path: "/detection-panel",
      name: "detection-panel",
      meta: {
        title: "检测诊断",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/detection/DetectionPanel.vue'], resolve)
    },
    {
      path: "/diagnosis-list",
      name: "diagnosis-list",
      meta: {
        title: "监测应用管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/DiagnosisList.vue'], resolve)
    },
    {
      path: "/digital-abnormal",
      name: "digital-abnormal",
      meta: {
        title: "异常档案",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/digital/DigitalAbnormal.vue'], resolve)
    },

    // {
    //   path: "/TreeEg",
    //   name: "TreeEg",
    //   meta: {
    //     title: "防疫防控客户运营后台",
    //     auto: false // 是否需要权限
    //   },
    //   component: (resolve) => require(['./views/settings/TreeEg.vue'], resolve)
    // },
    
  ]
})


router.beforeEach((to, from, next) => {

  // console.log("token-=-" + JSON.stringify(to))
  let token = window.localStorage.getItem('accessToken')
  let refreshToken = window.localStorage.getItem('refreshToken')

  if((!token || token === null || !refreshToken || refreshToken === null) && to.path != '/' ) { //未登录，强制登录
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

