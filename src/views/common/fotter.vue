<template>
 <footer id="fotter">
    <!-- <span>帮助</span>
    <span>隐私</span>
    <span>条款</span> -->
    <div>Copyright&nbsp; ©2019-2024 &nbsp;&nbsp;&nbsp;V1.0.0.6</div>
    <div class="loginBrand"></div>
  </footer>
</template>

<script>

export default {

  layout: 'admin',

  data() {
    return {

    }
  },
  mounted() {
    this.$store.commit('SWITCH_LAYOUT', 'admin')
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="stylus">
#fotter 
  position: relative;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: rgba(107, 105, 123, 0.4);
  margin-top: 51px;
  // span
  //   margin 5px 20px
  div
    font-size 12px
    margin-top 5px
  .loginBrand
    // absolute bottom 40px right 40px
    // display inline-block
    margin 12px auto 0;
    width: 289px;
    height: 18px;
    background: url('../../assets/images/hs/logo4.png') no-repeat center;
    background-size:289px 18px;
    background-repeat:no-repeat;
</style>
