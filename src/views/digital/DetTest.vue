<template>
  <div id="DetTest">
    <div>测试专用</div>


    <!-- 测试下拉2 -->
    <div class="test-dropdown">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <span class="lift-selector-placeholder" v-if="dropValue">{{dropValue}}</span>
          <span class="lift-selector-placeholder" v-else>全部单位</span>


          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item" v-for="(item, i) in dropOptions" :key="i">{{item.label}}</el-dropdown-item>
     
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 测试下拉组件 -->
    <div style="margin-top: 50px;">
      <menu-drop :placeholder="'全部测试'" :options="testOptions"></menu-drop>
    </div>

  </div>
</template>

<script>
import MenuDrop from '../../components/MenuDrop.vue'

export default {
  data() {
    // 下拉组件变量：options数组, 宽度
    return {
      useDepartmentOptions: [
        {value: '选项1', label: '单位TODO1'}, 
        {value: '选项2', label: '单位TODO2'},
      ],
      useDepartment: '',

      dropOptions: [
        {value: 'a', label: '单位TODO1'}, 
        {value: 'b', label: '单位TODO2'},
        {value: 'c', label: '单位TODO3'},
        {value: 'd', label: '顺路快递机房两块三等奖付了款塑料袋咖啡机克里斯多夫就'},
      ],
      dropValue: '',
      testOptions: []
      

    }
  },
  mounted() {

  },
  methods: {
    handleCommand(value) {
      console.log('下拉', value)
      this.dropValue = value.label
      

    },

  },
  components: {
    'menu-drop': MenuDrop

  }
}
</script>

<style>
.lift-selector-placeholder{
  display: inline-block;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  margin-top: -2px;

}
</style>

<style lang="stylus" scoped>
#DetTest{

}

</style>
