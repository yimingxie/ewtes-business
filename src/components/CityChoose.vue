<template>
  <!-- 区域选择组件 需选到最后一级-->
  <div class="city-box">
    <el-cascader ref="cityCascader" placeholder="请选择区域"  :options="options" clearable v-model="selectedOptions" size="small" @change="handleChange" style="width: 100%;"></el-cascader>
  </div>
</template>

<script>
import pcas from '../utils/citySelector/pcas-code.json'

export default {
  props: ['selectCity'],
  data() {
    return {
      options: [],
      selectedOptions: this.selectCity,
      // 组装成新的数据结构
      newFormat: {},

    }
  },
  mounted() {

    // 一级循环，加载省市下拉选项
    pcas.forEach((item, i) => {
      let obj = {
        value: item.code,
        label: item.name,
        children: []
      }
      this.newFormat[item.code] = item.name

      if (item.children) {
        // 二级循环
        item.children.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.code,
            label: secondItem.name,
          }
          this.newFormat[secondItem.code] = secondItem.name

          if (secondItem.children) {
            secondObj.children = []

            // 三级循环
            secondItem.children.forEach((thirdItem, thirdI) => {
              let thirdObj = {
                value: thirdItem.code,
                label: thirdItem.name,
              }
              this.newFormat[thirdItem.code] = thirdItem.name

              // 去除街道
              // if (thirdItem.children) {
              //   thirdObj.children = []

              //   // 四级循环
              //   thirdItem.children.forEach((fourthItem, fourthI) => {
              //     let fourthObj = {
              //       value: fourthItem.code,
              //       label: fourthItem.name,
              //     }
              //     this.newFormat[fourthItem.code] = fourthItem.name

              //     thirdObj.children.push(fourthObj)
              //   })
              // }
              secondObj.children.push(thirdObj)

            })

          }
          obj.children.push(secondObj)
        })
      }
      this.options.push(obj)

    })


  },
  methods: {
    // 传给父组件
    handleChange(city) {
      console.log('子组件黑科技？', city, this.$refs['cityCascader'].currentLabels)
      // let cityName = ''
      // city.forEach(item => {
      //   cityName = cityName + this.newFormat[item]
      // })
      // // city = ["40", "4400"]   cityName = ["广东省", "深圳市"] -> "广东省深圳市"

      let labelArr = this.$refs['cityCascader'].currentLabels
      // this.$emit('childVal', city, labelArr.join(''))
      this.$emit('childVal', city, labelArr)
    }

  },
  components: {

  },
  // 传值类型是数组或者对象时，需要深度监听
  watch: {
    selectCity: {
      handler(newVal) {
        this.selectedOptions = newVal
      },
      deep: true
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>
