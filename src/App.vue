<template>
  <div id="page-container">
    
    
    

    <div class="page-container-lay">
      
    </div>
    <div id="page-container-layout" class="ant-layout ant-layout-has-sider" :key="appKey">

      <!-- Start: 菜单栏 -->
      
      <!-- 维保 -->
      <el-menu @select="routerSelect" v-if="type !== 'administrator' && layout === 'admin' && corpType == '维保'" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div class="logoCollapse" v-if="isCollapse">
        </div>
        <!-- {{$route.path}} -->
        <div class="logoUncollapse" v-if="!isCollapse">
          <div class="bg"></div>
          <div class="tac">
            <i class="headPic"></i>
            <div class="name">{{getAccountDetail.name}}</div>
            <p v-if="getAccountDetail.roleName" class="perTitle">{{getAccountDetail.roleName.join(",")}}</p>
            <p v-if="getAccountDetail.type == 'administrator'" class="perTitle">超级管理员</p>
            <!-- <div class="perTitle">例行维保项目组-高级主管</div> -->
          </div>
        </div>
        <!-- disabled class="disabled" -->
        <!-- 深色版只显示可用菜单；浅色版显示所有菜单，禁用不可用菜单 -->
        <el-menu-item v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('作业地图')) || theme !== 'theme2')" index="/map" route="/map" :disabled="ifDisabled('作业地图')" :class="{'disabled' :ifDisabled('作业地图')}"> 
          <i class="icon-map"></i>
          <span slot="title">作业地图</span>
        </el-menu-item>
        <el-menu-item v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('数字电梯')) || theme !== 'theme2')" index="/lift-list" route="/lift-list" :disabled="ifDisabled('数字电梯')" :class="{'disabled' :ifDisabled('数字电梯')}">
          <i class="icon-lift"></i>
          <span slot="title">数字电梯</span>
        </el-menu-item>
        <el-menu-item v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('检测诊断')) || theme !== 'theme2')" index="/detection-query" route="/detection-query" :disabled="ifDisabled('检测诊断')" :class="{'disabled' :ifDisabled('检测诊断')}">
          <i class="icon-diagnosis"></i>
          <span slot="title">检测诊断</span>
        </el-menu-item>
        <el-menu-item v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('任务管理')) || theme !== 'theme2')" :index="auth.mission && auth.mission.show && auth.mission.show == true ? '' : '/mission'" :route="auth.mission && auth.mission.show && auth.mission.show == true ? '' : '/mission'" :disabled="ifDisabled('任务管理')" :class="{'disabled' :ifDisabled('任务管理')}">
          <i class="icon-task"></i>
          <span slot="title">任务管理</span>
        </el-menu-item>
        <el-menu-item v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('经营报表')) || theme !== 'theme2')" index="" route="" :disabled="ifDisabled('经营报表')" :class="{'disabled' :ifDisabled('经营报表')}">
          <i class="icon-business"></i>
          <span slot="title">经营报表</span>
        </el-menu-item>
        <!-- <el-menu-item index="/account" route="/account">
          
          <span slot="title">系统设置</span>
        </el-menu-item> -->
        <el-submenu v-if="type !== 'administrator' && ((theme == 'theme2' && !ifDisabled('系统设置')) || theme !== 'theme2')" index="1" :disabled="ifDisabled('系统设置')" :class="{'disabled' :ifDisabled('系统设置')}">
          <template slot="title">
            <i class="icon-setting"></i>
            <span slot="title">系统设置</span>
          </template>
          <!-- <el-menu-item-group title=""> -->
          <el-menu-item index="/account" route="/account">账号管理</el-menu-item>

          <el-menu-item index="/staff" route="/staff" >员工管理</el-menu-item>

          <el-menu-item index="/device" route="/device">设备管理</el-menu-item>
          <!-- </el-menu-item-group> -->
          
        </el-submenu>

        <!-- <template>
          <el-menu-item v-for="(item,index) in modulesJson" :key="index" >
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template> -->
      </el-menu>
      <!-- 维保 end -->

      <div class="ant-layout">
        <!-- Start: 头部 -->
        <keep-alive>
          <transition name="header" mode="out-in">
            <header class="header the-header" v-if="layout==='admin'" >
              <!-- <el-radio-group v-model="isCollapse" style="position:absolute;z-index: 999;" v-if="layout==='admin'">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
              </el-radio-group> -->
              <div class="collapseImg" v-if="isCollapse" @click="openSidebar">
              </div>
              <div class="collapseImg unCollapseImg" v-if="!isCollapse" @click="isCollapse = true">
              </div>
              <!-- <div id="contentDiv">
                <p @click="changeTheme('theme1')">111</p >
                <p @click="changeTheme('theme2')">222</p >
              </div> -->
              <a class="logo"></a>
              
              <!-- <div @mouseover="isShowUserNav = true" @mouseout="isShowUserNav = false" class="user-navigation">
                <span class="user-name">
                  <router-link to='/account'><i class="headPic"> </i><span style="margin:0 30px 0 74px">sss</span></router-link>
                  <a href="#" @click.prevent="openComfirmModal" class="quit"></a>
                </span>
              </div> -->
              <div class="user_navigation">
                <el-badge :value="9" :max="99" class="item" v-if="corpType == '维保'">
                  <a class="infoAram" @click="aaa()"></a>
                </el-badge>
                <span v-if="corpType == '维保'" style="margin: 0 15px;border-left:1px solid #919EA5;width:1px;height:10px "></span>
                <el-dropdown @command="clickDrop">
                  <a class="personalCenter"></a>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item @click.prevent="gotoCenter"><span>账户设置</span></el-dropdown-item>
                    <el-dropdown-item @click.prevent="quit"><span>退出登录</span></el-dropdown-item> -->
                    <el-dropdown-item command="center">账户设置</el-dropdown-item>
                    <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              
            </header>
          </transition>
        </keep-alive>
        <!-- End: 头部 -->

        <!-- Start: 路由视图 -->
        <transition name="view" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
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
        isCollapse: true,
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
    -webkit-box-shadow: 0 1px 4px 0 rgba(81,108,100,0.25);
    box-shadow: 0 1px 4px 0 rgba(81,108,100,0.25);
    position relative
    z-index: 99;
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
    background: #F1F5F7;
    // bg_color_submain("")
    min-height: calc(100vh);
    position: relative;
    width 100%
  }
  .ant-layout.ant-layout-has-sider {
    flex-direction: row;
  }
  .user_navigation {
    size 113px 100%
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
    size 20px
    display inline-block
  }
  .logoCollapse
    background url('assets/images/hs/logo1.png') no-repeat center #F4F6FC;
    // background url('assets/images/hs/logo33.png') no-repeat center #F4F6FC;

    size 100% 64px
    display inline-block
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
      i
        size 32px 16px
        display inline-block
  
  // 设置侧边栏图标 小图标 灰色图标
  .icon-map
    background url('assets/images/hs/submenuIcon/openMap2.png') no-repeat center;
  .icon-lift
    background url('assets/images/hs/submenuIcon/openLift2.png') no-repeat center;
  .icon-diagnosis
    background url('assets/images/hs/submenuIcon/openZhen2.png') no-repeat center;
  .icon-task
    background url('assets/images/hs/submenuIcon/openTask2.png') no-repeat center;
  .icon-business
    background url('assets/images/hs/submenuIcon/openTable2.png') no-repeat center;
  .icon-setting
    background url('assets/images/hs/submenuIcon/openSet2.png') no-repeat center;
  
  // 鼠标移动后菜单高亮 黑色图标
  .el-menu-item:not(.disabled):hover
    .icon-map
      background url('assets/images/hs/submenuIcon/openMap3.png') no-repeat center;
    .icon-lift
      background url('assets/images/hs/submenuIcon/openLift3.png') no-repeat center;
    .icon-diagnosis
      background url('assets/images/hs/submenuIcon/openZhen3.png') no-repeat center;
    .icon-task
      background url('assets/images/hs/submenuIcon/openTask3.png') no-repeat center;
    .icon-business
      background url('assets/images/hs/submenuIcon/openTable3.png') no-repeat center;
  .el-submenu:not(.disabled):hover
    .icon-setting
      background url('assets/images/hs/submenuIcon/openSet3.png') no-repeat center;
  // 点击后菜单高亮 蓝色图标
  .el-menu-item.is-active:not(.disabled)
    .icon-map
      background url('assets/images/hs/submenuIcon/openMap1.png') no-repeat center;
    .icon-lift
      background url('assets/images/hs/submenuIcon/openLift1.png') no-repeat center;
    .icon-diagnosis
      background url('assets/images/hs/submenuIcon/openZhen1.png') no-repeat center;
    .icon-task
      background url('assets/images/hs/submenuIcon/openTask1.png') no-repeat center;
    .icon-business
      background url('assets/images/hs/submenuIcon/openTable1.png') no-repeat center;
  .el-submenu.is-active:not(.disabled)
    .icon-setting
      background url('assets/images/hs/submenuIcon/openSet1.png') no-repeat center;
    // 设置侧边栏图标 end

  // 折叠菜单栏 大图标
  .el-menu--collapse
    // 设置侧边栏图标
    .icon-map
      background url('assets/images/hs/submenuIcon/map2.png') no-repeat center;
    .icon-lift
      background url('assets/images/hs/submenuIcon/lift2.png') no-repeat center;
    .icon-diagnosis
      background url('assets/images/hs/submenuIcon/zhen2.png') no-repeat center;
    .icon-task
      background url('assets/images/hs/submenuIcon/task2.png') no-repeat center;
    .icon-business
      background url('assets/images/hs/submenuIcon/table2.png') no-repeat center;
    .icon-setting
      background url('assets/images/hs/submenuIcon/set2.png') no-repeat center;
    // 鼠标移动后菜单高亮
    .el-menu-item:hover:not(.disabled)
      .icon-map
        background url('assets/images/hs/submenuIcon/map3.png') no-repeat center;
      .icon-lift
        background url('assets/images/hs/submenuIcon/lift3.png') no-repeat center;
      .icon-diagnosis
        background url('assets/images/hs/submenuIcon/zhen3.png') no-repeat center;
      .icon-task
        background url('assets/images/hs/submenuIcon/task3.png') no-repeat center;
      .icon-business
        background url('assets/images/hs/submenuIcon/table3.png') no-repeat center;
    .el-submenu:hover:not(.disabled)
      .icon-setting
        background url('assets/images/hs/submenuIcon/set3.png') no-repeat center;
    // 点击后菜单高亮
    .el-menu-item.is-active:not(.disabled)
      .icon-map
        background url('assets/images/hs/submenuIcon/map1.png') no-repeat center;
      .icon-lift
        background url('assets/images/hs/submenuIcon/lift1.png') no-repeat center;
      .icon-diagnosis
        background url('assets/images/hs/submenuIcon/zhen1.png') no-repeat center;
      .icon-task
        background url('assets/images/hs/submenuIcon/task1.png') no-repeat center;
      .icon-business
        background url('assets/images/hs/submenuIcon/table1.png') no-repeat center;
    .el-submenu.is-active:not(.disabled)
      .icon-setting
        background url('assets/images/hs/submenuIcon/set1.png') no-repeat center;
      // 设置侧边栏图标 end
  .icon-map,.icon-lift,.icon-diagnosis,.icon-task,.icon-business,.icon-setting
    background-size: 16px auto!important;
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

