<template>
<!-- 通用后台 登录页面 -->
<div id="login">
  <div class="makeLoginCenter">
    <div class="title">
      <div class="title1">欢迎使用</div>
      <div class="title2">防疫防控客户运营后台</div>
    </div> 
    <div class="loginFormWrap">
      <div class="box">
        <form @submit.prevent="onSubmit" autocomplete="off" class="loginForm">
          
          <div>
            <div v-if="warningTip!==''" class="loginInput warningTip tal">{{warningTip}}</div>
            <div class="inputWrap">
              <div class="inputLabel">账户名</div>
              <input placeholder="请输入登录账号" v-model="loginForm.username" name="Name" type="text" class="loginInput">
              <!-- <input placeholder="请输入登录账号（手机号）" v-model="loginForm.username" name="Name" type="text" class="loginInput"> -->
            </div>
            <div class="inputWrap">
              <div class="inputLabel inputLabelPsd">密码</div>
              <input placeholder="请输入密码" v-model="loginForm.password" name="Password" type="password" class="loginInput">
              <!-- <input v-if="loginForm.type === 1" placeholder="请输入验证码" v-model="loginForm.password" class="loginInput"> -->
            </div>
            <!-- <div class="inputWrap">
              <label>
                <i class="fas fa-unlock-alt"></i>
                验证码
              </label>
              <input placeholder="请输入验证码" name="" type="text">
            </div> -->
            <!-- checkbox -->
          </div>
          <!-- <div class="wthreeText">
            <ul>
              <li v-if="loginForm.type === 0" style="float:left" @click="loginForm.type = 1">账号密码登录
              </li>
              <li v-if="loginForm.type === 1" style="float:left" @click="loginForm.type = 0">验证码登录
              </li>
              <li style="float:right">
                <label>
                  <radio-moni-radio class="radio_input">
                    <input type="checkbox" v-model="rememberPwd" slot='radio_original'/>
                  </radio-moni-radio>
                  记住我
                </label>
              </li>
            </ul>
          </div> -->
          <!-- //checkbox -->
          <input type="submit" value="登录" @keyup.enter="onSubmit" class="loginBtn" style="margin-top: 53px;">
        </form>
        <!-- .............................................. -->
        <!-- <div> -->
          <!-- <img class="loginImg" src="../../assets/images/hs/lift@1x.png"/> -->
          <!-- <div class="shadow"></div> -->
        <!-- </div> -->
      </div>
    </div>
    
  </div>
  <!-- <img class="loginLeft" src="../../assets/images/hs/loginLeft@1x.png"/>
  <img class="loginRight" src="../../assets/images/hs/loginRight@1x.png"/> -->
  <span class="loginBrand"></span>
</div>

</template>

<script>
  import api from '../../api'
  import RadioMoniRadio from '../../components/RadioMoniRadio'

  export default {
    name: 'LoginForm',


    // layout: 'auth',

    components: {
      'radio-moni-radio': RadioMoniRadio
    },
    computed: {
      // ...mapState({
      //   logining: state => state.system.loading
      // })
    },
    data () {
      return {
     
        loginForm: {
          username: '',
          password: '',
          // type:0
        },
        isLoginSuccess: false,
        rememberPwd: Boolean(this.getCookie('rememberPwd')) || false,
        warningTip:''
      }
    },
    watch: {
     
    },
    mounted () {
      // if (this.rememberPwd) {
      //   this.loginForm.username = this.getCookie('account')
      //   this.loginForm.password = this.getCookie('password')
      // }
    },
    methods: {
      onSubmit () {
        
        api.log.login1(this.loginForm).then((res) => {
          if(res.data.code === 200){
            
            // 存储token、refreshToken、type
            window.localStorage.setItem('accessToken', res.data.data.token)
            window.localStorage.setItem('refreshToken', res.data.data.token)
            window.localStorage.setItem('type', res.data.data.type)

            this.$message.success('登录成功！');
            window.localStorage.setItem('theme', 'theme1')
            this.$router.push('/corp')
            // if(res.data.data.modules){
            //   window.localStorage.setItem('modules', JSON.stringify(res.data.data.modules))
            // }
            // if(res.data.data.corpId){
            //   window.localStorage.setItem('corpId', res.data.data.corpId)
            // }
            // 设置记住密码
            // console.log('this.rememberPwd===' + this.rememberPwd)
            // if (this.rememberPwd) {
            //   this.setCookie('rememberPwd', true)
            //   this.setCookie('account', this.loginForm.u)
            //   this.setCookie('password', this.loginForm.password)
            // } else {
            //   this.delCookie('rememberPwd')
            //   this.delCookie('account')
            //   this.delCookie('password')
            // }
            // 获取用户权限,并跳转页面
            // if(res.data.data.type == 'administrator' || res.data.data.type.indexOf('manager') > -1) { // GI管理员
            //   this.$message.success('登录成功！');
            //   this.$router.push('/map')
            // } else if(res.data.data.type == 'domino') { // 通用超级管理员
            //   this.$message.success('登录成功！');
            //   this.$router.push('/corpApi')
            // } else if(!res.data.data.modules){
            //   this.$message.error('暂无权限，请联系管理员');
            // }
            
          } else {
            this.warningTip = res.data.message
          }
          
          // this.$route.router.go({path: '/statistic/users'})
        }).catch((res) => {
          // this.setLoadingStatus(false)
          console.log('logining:::' + this.logining)
          // this.handleError(res)
          // console.log('aaa:::' + JSON.stringify(res.data))
          // if (typeof res.data !== 'undefined' && typeof res.data.error !== 'undefined') {
          //   switch (res.data.error.code) {
          //     case 4031003:
          //       // this.showNotice({
          //       //   type: 'error',
          //       //   content: locales[Vue.config.lang].errors[res.data.error.code]
          //       // })
          //       this.$router.push('/')
          //       break
          //     default:
          //       this.showWrong = true
          //       // this.showError(res.data.error)
          //   }
          // }
        })
        
      },
      // 根据用户名获取用户权限,并跳转页面
      getUserPerm(username){
        api.log.getUser_pers(username).then((res) => {
          if(res.data.success){
            console.log('---------accountRole=======' + JSON.stringify(res))
            window.localStorage.setItem('_role_', JSON.stringify(res.data.result))
            this.$router.push('/admin')
          }
        }).catch((res) => {
        
        
        })
      },
      // 设置 Cookies
      setCookie (name, value) {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
      },

      // 读取 Cookies
      getCookie (name) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        var arr = document.cookie.match(reg) || {}
        if (arr.length) {
          return unescape(arr[2])
        } else {
          return null
        }
      },

      // 删除 Cookies
      delCookie (name) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        if (cval != null) {
          document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
      },
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/utilities'
#login
  background #4272FF
  size 100%
  display: flex;
  align-items: center;
  justify-content center
  background: url('../../assets/images/hs/loginBg.png') no-repeat center #3576FF;
  .loginLeft
    absolute bottom 0 left 0
  .loginRight
    absolute bottom 0 right 0
  .loginBrand
    absolute bottom 40px right 40px
    display inline-block
    width: 293px;
    height: 18px;
    background: url('../../assets/images/hs/logo3.png') no-repeat center;
    background-size:293px 18px;
    background-repeat:no-repeat;
  .title
    font-size: 48px;
    color: #FFFFFF;
    text-align left 
    width: 424px;
    margin: 0 auto 32px;
    .title1
      color: #FFFFFF;
      line-height 75px
      font-weight: 400;
      font-size: 34px;
    .title2
      font-size: 24px;
      color: #FFFFFF;
      font-weight: 400;
  .makeLoginCenter
    vertical-align middle
    // border 1px solid red
    position relative
    overflow: hidden;
    width 75%
  .loginFormWrap
    size  424px 336px
    border-radius: 15px;
    box-sizing:  border-box;
    padding: 1px; 
    margin: 0 auto;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 6px 6px 2px rgba(32,33,58,0.03);
    border-radius: 10px;
    // border-image:-webkit-linear-gradient(left, red 0%, blue 30%, yellow 60%, rgba(0,0,0,0) 90%,  rgba(0,0,0,0) 100%) 5;
    // background-image: -webkit-linear-gradient(90deg, #C3D4FF 0%, rgba(255,255,255,0.00) 98%);
    // background-image: linear-gradient(90deg, #C3D4FF 0%, rgba(255,255,255,0.00) 98%);
    .box
      size 100%
      // background: rgba(255,255,255,0.06);
      // border: 1px solid rgba(255,255,255,0.15);
      // box-shadow: 0 6px 6px 2px rgba(32,33,58,0.03);
      // border-radius: 10px;
  .loginForm
    // padding 116px 0 0 88px
    size 424px 336px
    position relative
    text-align center
    z-index: 99;
    box-sizing:border-box
    padding:0 52px
  .loginInput
    border-radius: 8px;
    width: 100%;
    height: 32px;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(0,0,0,0);
    font-size: 14px;
    color: #fff;
    background: rgba(18,46,109,0.14);
    border-radius: 4px;
  .loginBtn
    // background: #FFFFFF;
    // box-shadow: 0 8px 20px -10px rgba(35,69,167,0.60);
    // border-radius: 24px;
    size 240px 40px
    cursor pointer
    margin-top 25px
    text-align center
    background: rgba(255,255,255,0.10);
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    width: 100%;
  .inputLabel
    font-size: 16px;
    color: #FFFFFF;
    background: url('../../assets/images/hs/account.png') 2px 7px no-repeat;
    background-size 12px auto
    text-align: left;
    text-indent: 27px;
    vertical-align: middle;
    margin-bottom: 10px;
  .inputLabelPsd
    background: url('../../assets/images/hs/password.png') 2px 7px no-repeat;
    background-size 12px auto

  .inputWrap
    margin-top 26px
    position: relative;
  .wthreeText
    font-size: 14px;
    color: #FFFFFF;
    margin-top 25px
    cursor pointer
  .warningTip
    background: url('../../assets/images/hs/warning.png') #E9645D no-repeat 12px center;
    border: 1px solid #C03333;
    border-radius: 8px;
    vertical-align middle
    line-height 30px
    text-indent 20px

  .loginImg
    absolute right 15px top 0
  .shadow
    size 503px 308px
    background: #305cdc;
    -webkit-box-shadow: 4px 4px 20px #305cdc;
    box-shadow: 4px 4px 2px #305cdc;
    transform: rotateY(45deg);
    -ms-transform: rotate(7deg);
    -moz-transform: rotate(7deg);
    -webkit-transform: rotate(120deg);
    -o-transform: rotate(7deg);
    position: absolute;
    top: 259px;
    right: 318px;
    /* z-index: -99; */
  .smsSpan
    position absolute
    color: #FFFFFF;
    top: 14px;
    right: 17px;
    cursor: pointer;
// @media screen and (max-width: 1920px) {
//   #login {
    
//     .loginFormWrap{
//       margin: 56px 0 58px 96px;
//     }
    
//   }
// }
@media screen and (max-width: 1680px) {
  #login {
    .makeLoginCenter {
      width 85.7%
    }
    // .loginFormWrap{
    //   margin:41px 0 73px 107px;
    // }
    .loginImg{
      absolute right 33px top 0
    }
  }
  
}
@media screen and (max-width: 1440px) {
  #login {
    .makeLoginCenter {
      width 100%
    }
    // .loginFormWrap{
    //   margin:58px 0 56px 153px;
    // }
    .loginImg{
      absolute right 77px top 0
    }
  }
}
@media screen and (max-width: 1280px) {
  #login {
    
    // .loginFormWrap{
    //   margin:10px 0 10px 53px;
    // }
    .loginImg{
      absolute right 7px top -20px
    }
  }
}
</style>