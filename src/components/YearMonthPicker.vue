<template>
  <div class="YearMonthPicker clearfix" >
    <!-- 测试年月选择 -->
    <div class="year-month-picker" :class="valueYear ? 'on' : ''">
      <div class="cal-icon"></div>
      <el-date-picker v-model="valueYear" format="yyyy全年" value-format="yyyy" type="year" placeholder="选择年份" @change="yearChange" :clearable="false"></el-date-picker>
    </div>
    <div class="year-month-picker" :class=" !valueYear && valueMonth && !valueDay ? 'on' : ''" style="border-radius: none;">
      <div class="cal-icon"></div>
      <el-date-picker v-model="valueMonth" type="month" placeholder="选择月份" value-format="yyyy-MM" @change="monthChange" :clearable="false" :disabled="monthDisabled"></el-date-picker>
    </div>
    <div class="year-month-picker" :class=" !valueYear && !valueMonth && valueDay ? 'on' : ''">
      <div class="cal-icon"></div>
      <el-date-picker v-model="valueDay" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="dayChange" :clearable="false" :disabled="monthDisabled"></el-date-picker>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    value: {
      twoWay: true
    },
    monthDisabled:false,
    valueMonthParent: {}
   
  },
  data() {
    
    return {
      valueYear: this.value,
      valueMonth: this.valueMonthParent,
      valueDay: this.valueDayParent,
      // valueMonth: this.value,
    }
  },

  watch: {
    // value(val) {
    //   // this.valueMonth = ''
    //   this.valueYear = val; //新增value的watch，监听变更并同步到valueYear
    //   // this.yearChange()
    //   if(val !== ''){
    //     this.valueMonth = ''
    //     this.valueDay = ''
    //   }
    // }
  },
  methods: {
    yearFocus(){
      // 未选中年份时，点击选择年份默认选中今年
      if(this.valueYear == ''){
        this.valueYear = new Date().getFullYear().toString() //今年
        this.valueMonth = ''
        this.valueDay = ''
        this.$emit('update:value', this.valueYear)
        this.$emit('childVal', this.valueYear)
      }
    },                      
    yearChange() {
      console.log("yearChange  valueMonth---" + this.valueMonth)
      // 选择年份清空月份
      this.valueMonth = ''
      this.valueDay = ''
      this.$emit('update:value', this.valueYear)
      this.$emit('childVal', this.valueYear)
    },

    monthChange() {
      // 选择月份清空年份
      console.log("monthChange  valueMonth---" + this.valueMonth)
      this.valueYear = ''
      this.valueDay = ''
      this.$emit('update:value', this.valueYear)
      this.$emit('childVal', this.valueMonth)
    },

    dayChange() {
      // 选择日清空年份
      console.log("dayChange  valueMonth---" + this.valueMonth)
      this.valueYear = ''
      this.valueMonth = ''
      this.$emit('update:value', this.valueYear)
      this.$emit('childVal', this.valueDay)
    },

  },
  components: {

  }
}
</script>

<style lang="stylus">
/* 全局样式 */
.year-month-picker .el-input__icon{
  line-height: 22px !important;
  height: 22px !important;
  // background: rgb(26,27,31) !important;
  margin-top: 1px !important;
}
.year-month-picker .el-input__prefix{
  display none !important;
}
.year-month-picker.on .el-icon-circle-close{
  width:20px!important;
  height 10px!important;
}
.year-month-picker.on .el-icon-circle-close:before{
  padding 0!important;
  margin 0!important;
  font-size 10px!important;
  top -1px!important;
  // right 5px!important;
}
.year-month-picker.on .el-input__icon{
  background: #4C74E9 !important;
}
.year-month-picker .el-date-editor.el-input{
  width: 100% !important;
}
.year-month-picker .el-input__inner{
  z-index: 99 !important;
  background: none !important;
  color: #fff !important;
  line-height: 22px !important;
  height: 22px !important;
  // border: 1px solid rgba(255,255,255,0.10)!important;
  border: 1px solid rgba(0,0,0,0.2)!important;
  padding: 0 10px!important
  cursor pointer;
  border-radius 0 !important;
}
.YearMonthPicker .year-month-picker:first-child .el-input__inner{
  border-top-left-radius 4px !important;
  border-bottom-left-radius 4px !important;
}
.YearMonthPicker .year-month-picker:last-child .el-input__inner{
  border-top-right-radius 4px !important;
  border-bottom-right-radius 4px !important;
}
.year-month-picker.on{
  background: #3f6aff !important;
  // background-image: linear-gradient(137deg, #3572ff 0%, #3596ff 100%) !important;
}
.year-month-picker .is-disabled .el-input__inner{
  background-color:  rgba(255,255,255,0.10)!important;
  border-color:  rgba(255,255,255,0.10)!important;
  color: rgba(255,255,255,0.30)!important;
}

</style>
<style lang="stylus" scoped>
.YearMonthPicker{

  .year-month-picker{
    cursor pointer;
    float left;
    width 116px;
    position relative;
    line-height 20px;
    height 22px;
  }
  .cal-icon{
    position absolute;
    top: 0;
    right 4px;
    width 24px;
    height 22px;
    background url('../assets/images/xym/calen.png') no-repeat center center;
    // background red;
    background-size 12px;
  }
  .year-month-picker.on .cal-icon{
    background url('../assets/images/xym/calen-on.png') no-repeat center center;
    background-size 12px;
    
  }

}

</style>
