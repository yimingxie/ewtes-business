<template>
  <div id="page-container">
    
    
    

    <div class="page-container-lay">
      
    </div>
    <div id="page-container-layout" class="ant-layout ant-layout-has-sider" :key="appKey">

      <!-- Start: 菜单栏 -->
      
      <!-- 维保 -->
      <el-menu v-if="layout === 'admin'" @select="routerSelect" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div class="logoCollapse">
        </div>
       
        <el-menu-item  index="/digital-list" route="/digital-list"> 
          <i class="menu_icon icon-prevent"></i>
          <span slot="title">数字防疫点</span>
        </el-menu-item>
        
        <el-menu-item  index="/detection-query" route="/detection-query" >
          <i class="menu_icon icon-diagnosis"></i>
          <span slot="title">检测诊断</span>
        </el-menu-item>
     
        <el-submenu index="1" >
          <template slot="title">
            <i class="menu_icon icon-record"></i>
            <span slot="title">防疫记录</span>
          </template>

          <el-menu-item index="/personnel" route="/personnel" >人员防疫记录</el-menu-item>

          <el-menu-item index="/entryRecord" route="/entryRecord">防疫点出入记录</el-menu-item>
          
        </el-submenu>

        <el-submenu index="2" >
          <template slot="title">
            <i class="menu_icon icon-setting"></i>
            <span slot="title">系统</span>
          </template>

          <el-menu-item index="/account" route="/account" >账号管理</el-menu-item>

          <el-menu-item index="/staff" route="/staff">员工管理</el-menu-item>

        </el-submenu>
     
      </el-menu>
      <!-- 维保 end -->
      
      

      <div class="ant-layout">
        <!-- Start: 头部 -->
        <keep-alive>
          <!-- <transition name="header" mode="out-in"> -->
            <header class="header the-header" v-if="layout==='admin'" >
              
            
              <a class="logo"></a>
            
              <div class="user_navigation">
                <el-dropdown @command="clickDrop">
                  <a class="personalCenter"></a>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="center">个人中心</el-dropdown-item>
                    <el-dropdown-item command="quit">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              
            </header>
          <!-- </transition> -->
        </keep-alive>
        <!-- End: 头部 -->

        <!-- Start: 路由视图 -->
        <!-- <transition name="view" mode="out-in"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        <!-- </transition> -->
        <!-- End: 路由视图 -->
      </div>
      
    </div>
    
  </div>
</template>

<script>
  import api from 'api'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'
  export default {
    name: 'App',

    // mixins: [globalMixins],

    data () {
      return {
        allowResponse: true, // 自适应
        appKey: 1, // 监听地址栏参数
        title:'电梯行业监管战情室',
        // showMenu: true,
        isCollapse: false,
        modulesJson: window.localStorage.getItem("modules"),
        type: window.localStorage.getItem("type"),
        getAccountDetail:[],
        theme: "",
        corpType:'',
        auth:{}, //用户角色所拥有权限
        authDc:{} //用户角色所拥有权限
      }
    },
    components: {
      // 'fotter1': fotter,
    },
    computed: {
      
      ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         layout: state => state.system.layout, //注意这些与上面的区别就是state.footerStatus,
      })
    },
    watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
        // console.log('to----' + to)
        // console.log('theme', to.name)

        // 监听地址栏参数变化
        this.appKey = new Date().getTime(); 

        // 不需要菜单栏的页面
        if(to.name=='Login' || to.name=='LoginAdmin'|| to.name=='lift-print' || to.name=='panel-test'){
          this.$store.commit('SWITCH_LAYOUT', 'auth')
        } else {
          this.$store.commit('SWITCH_LAYOUT', 'admin')
        }

        // 登录页清除localStorage
        if(to.name=='Login' || to.name=='LoginAdmin'){
          window.localStorage.removeItem('accessToken')
          window.localStorage.removeItem('refreshToken')
          window.localStorage.removeItem('corpType')
          window.localStorage.removeItem('corpId')
          window.localStorage.removeItem('type')
          window.localStorage.removeItem('auth')
          window.localStorage.removeItem('theme')
        }

      },
      layout () {

        this.auth = {} // UI JSON 重置
        this.authDc = {} // UI JSON 重置

        if (this.layout === 'admin') {
          
          // 重新获取用户的权限信息
          this.type = window.localStorage.getItem('type')
          this.corpType = window.localStorage.getItem('corpType')
          this.modulesJson = window.localStorage.getItem('modules')
          if(window.localStorage.getItem('auth') && JSON.stringify(window.localStorage.getItem('auth')) !== '{}'){
            var uiJson = JSON.parse(window.localStorage.getItem('auth'))
            this.auth = uiJson.wb || {} // 维保页面json
            this.authDc = uiJson.dc || {} // 地产页面json
            // console.log("uiJson---" + JSON.stringify(uiJson))
          }

          // console.log("auth---" + JSON.stringify(this.auth))
          // this.showMenu = true
        }
      }
    },
        
    created(){
      // alert(2)
      // this.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme1'
      // let theme = this.description.indexOf('深色') > -1 ? 'theme2' : 'theme1'
      // this.changeTheme(this.theme)
    },

    mounted () {
      
    },

    methods: {
      // 打开侧边栏
      openSidebar(){
        this.isCollapse = false
        // 查询账户详情
        this.getAllAccountData()
      },
      // 切换路由
      routerSelect(index){
        // console.log("index===" + index)
        var routerName = index.replace('/','')
        // console.log("routerName===" + routerName)
        let flag = this.auth[routerName] && this.auth[routerName].show && this.auth[routerName].show == true
        if(flag || index == '') {
          this.$message.error("正式版开放使用");
          return
        }
      },
      aaa(){
        this.$message.error("正式版开放使用");
        return   
      },
      clickDrop(i){
        // console.log("111111==" + i)
        if(i == 'center'){
          this.gotoCenter()
        } else {
          this.quit()
        }
      },

      // 查询账户详情
      getAllAccountData(){
        // 屏蔽gi管理后台的
        if(localStorage.getItem('type') !== 'domino'){
          api.accountApi.getAccountDetail().then((res) => {

            this.getAccountDetail = res.data.data || []
            
          }).catch((res) => {
            
          })
        }
      },

      // 跳转用户中心
      gotoCenter(){
        this.$router.push('/center')
      },

      // 判断菜单是否可用
      ifDisabled(title) {
        var flag = false
        if(this.type.indexOf("administrator") > -1){
          flag = true
        }
        // 通用管理员与维保超管拥有全部权限
        // if(this.type.indexOf("domino") > -1 || this.type.indexOf("administrator") > -1) {
        //   flag = false
        // }
        // else {
        //   var modulesJson = JSON.parse(this.modulesJson)
        //   for(var i = 0; i < modulesJson.length ; i++) {
        //     // if( modulesJson[i].name.indexOf(title) !== -1 || modulesJson[i].name.indexOf('通用') !== -1 || modulesJson[i].name.indexOf('管理员专用') !== -1){
        //     if( modulesJson[i].name.indexOf(title) !== -1) {
        //       flag = false
        //     }
        //   }
        // }
        return flag 
        
      },

      // 打开二级菜单
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },

      // 关闭二级菜单
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
     
      /**
       * 退出登录
       * 移除保存在 window.localStorage中的 accessToken
       */
      quit () {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        window.localStorage.removeItem('corpType')
        window.localStorage.removeItem('corpId')
        window.localStorage.removeItem('type')
        window.localStorage.removeItem('auth')
        window.localStorage.removeItem('theme')
    
        this.$message.info('您已退出登录');
        this.$router.push('/')
      },

    }
  }
</script>

<style lang="stylus">
// 配置
@import 'assets/stylus/base'
// -------------------------------------------------------
#page-container

  width: 100%;
  height: 100%;
 
  // 头部
  .the-header
    size 100% 64px
    background #fff

    // bg_color_main("")
    // bg_pic('hs','chaoshi.png')
    -webkit-box-shadow: 0 3px 10px 0 rgba(196,203,239,0.39);
    box-shadow: 0 3px 10px 0 rgba(196,203,239,0.39);
    position relative
    z-index: 999;
  // 头部淡入淡出
  .header-enter-active, .header-leave-active
    transition transform 0.4s, opacity 0.4s

  .header-enter
  .header-leave-to
    opacity 0
    transform translate3d(0, -10px, 0)
  // 侧栏淡入淡出
  .sidebar1-enter-active, .sidebar1-leave-active
    transition transform .1s, opacity .1s

  .sidebar1-enter
  .sidebar1-leave-to
    opacity 0
    transform translate3d(-10px, 0, 0)
  // 视图淡入淡出
  .view-enter-active, .view-leave-active
    transition transform .5s ease-in-out, opacity .5s ease-in-out

  .view-enter
  .view-leave-to
    opacity 0
    transform translate3d(10px, 0, 0)

  .ant-layout {
    box-sizing: border-box;
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #F5F7FD;
    // bg_color_submain("")
    min-height: calc(100vh);
    position: relative;
    width 100%
  }
  .ant-layout.ant-layout-has-sider {
    flex-direction: row;
  }
  .user_navigation {
    size 93px 100%
    display inline-block
    float: right;
    // margin-top 20px
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;

  }
  .infoAram {
    background url('assets/images/hs/info.png') no-repeat  center
    size 20px
    display inline-block
  }
  .personalCenter {
    background url('assets/images/hs/perCenter.png') no-repeat center
    background-size 18px auto;
    size 18px
    display inline-block
  }
  .logoCollapse
    background url('assets/images/hs/logo.png') no-repeat center ;
    size 100% 64px
    display inline-block
    box-shadow: 0 2px 6px 0 rgba(196,203,239,0.39);
  .logoUncollapse
    size 100% 250px
    .bg
      background url('assets/images/hs/logo2.png') no-repeat center #F4F6FC;
      // background url('assets/images/hs/logo44.png') no-repeat center #F4F6FC;

      size 100% 64px
    .headPic
      // background url('assets/imagesPark/hs/header.png') no-repeat center;
      size 100% 64px
      background-size 64px
      display inline-block
      margin-top 35px
    .name
      font-size: 16px;
      color: #34414C;
      text-align: center;
      line-height: 24px;
    .perTitle
      font-size: 12px;
      color: #7E8A95;
      text-align: center;
      line-height: 24px;
  .logoUncollapse2
    .bg
      // background url('assets/imagesPark/hs/logo2.png') no-repeat center #2E3138!important;
      // background url('assets/imagesPark/hs/logo44.png') no-repeat center #2E3138!important;

      background-size: 200px auto!important;
  .collapseImg
    background url('assets/images/hs/sliderCo.png') no-repeat center;
    size 64px 64px
    display inline-block
    cursor pointer
  .unCollapseImg
    background url('assets/images/hs/sliderUnco.png') no-repeat center;
  .el-menu-vertical-demo
    .el-menu-item,.el-submenu__title
      .menu_icon
        size 12px
        background-size 12px
        display inline-block
        margin-right: 10px;

  // 设置侧边栏图标 小图标 灰色图标
  // .icon-map
  //   background url('assets/images/hs/submenuIcon/openMap2.png') no-repeat center;
  // .icon-lift
  //   background url('assets/images/hs/submenuIcon/openLift2.png') no-repeat center;
  // .icon-diagnosis
  //   background url('assets/images/hs/submenuIcon/openZhen2.png') no-repeat center;
  // .icon-task
  //   background url('assets/images/hs/submenuIcon/openTask2.png') no-repeat center;
  // .icon-business
  //   background url('assets/images/hs/submenuIcon/openTable2.png') no-repeat center;
  
  .icon-prevent
    background url('assets/images/hs/submenuIcon/prevent2.png') no-repeat center;
  .icon-diagnosis
    background url('assets/images/hs/submenuIcon/jian2.png') no-repeat center;
  .icon-record
    background url('assets/images/hs/submenuIcon/record2.png') no-repeat center;
    background-size 12px
  .icon-setting
    background url('assets/images/hs/submenuIcon/set2.png') no-repeat center;
    background-size 12px
  // 鼠标移动后菜单高亮 黑色图标
  // .el-menu-item:not(.disabled):hover
  //   .icon-map
  //     background url('assets/images/hs/submenuIcon/openMap3.png') no-repeat center;
  //   .icon-lift
  //     background url('assets/images/hs/submenuIcon/openLift3.png') no-repeat center;
  //   .icon-diagnosis
  //     background url('assets/images/hs/submenuIcon/openZhen3.png') no-repeat center;
  //   .icon-task
  //     background url('assets/images/hs/submenuIcon/openTask3.png') no-repeat center;
  //   .icon-business
  //     background url('assets/images/hs/submenuIcon/openTable3.png') no-repeat center;
  // .el-submenu:not(.disabled):hover
  //   .icon-setting
  //     background url('assets/images/hs/submenuIcon/openSet3.png') no-repeat center;
  // 点击后菜单高亮 蓝色图标
  .el-menu-item.is-active:not(.disabled)
    // .icon-map
    //   background url('assets/images/hs/submenuIcon/openMap1.png') no-repeat center;
    // .icon-lift
    //   background url('assets/images/hs/submenuIcon/openLift1.png') no-repeat center;
    
    // .icon-task
    //   background url('assets/images/hs/submenuIcon/openTask1.png') no-repeat center;
    // .icon-business
    //   background url('assets/images/hs/submenuIcon/openTable1.png') no-repeat center;
    .icon-prevent
      background url('assets/images/hs/submenuIcon/prevent1.png') no-repeat center;
      background-size 12px
      margin-right 15px
    .icon-diagnosis
      background url('assets/images/hs/submenuIcon/jian1.png') no-repeat center;
      background-size 12px
      margin-right 15px
    
  // .el-submenu.is-active:not(.disabled)
  //   .icon-record
  //     background url('assets/images/hs/submenuIcon/record2.png') no-repeat center;
  //     background-size 12px
  //   .icon-setting
  //     background url('assets/images/hs/submenuIcon/set2.png') no-repeat center;
  //     background-size 12px
    // 设置侧边栏图标 end


  #contentDiv
    position: absolute;
    top: 0;
    left: 139px;
    p{
      padding: 10px;
      margin: 10px;
      float: left;
      background: #f0dfdf;
    }


@media screen and (max-width: 1280px) {
  #page-container{
    min-width: 1280px;
  }
}

</style>

