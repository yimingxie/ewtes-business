<template>
  <div id="MenuDrop">
    <div class="menu-drop-container">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <span class="menu-drop-p" v-if="dropValue">{{dropValue}}</span>
          <span class="menu-drop-p menu-drop-placeholder" v-else>{{dropPlaceholder}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item" v-for="(item, i) in dropOptions" :key="i">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
export default {
  props: ['options', 'placeholder'],

  data() {
    return {
      // dropOptions: [{'value': 0, 'label': '标签'}]
      dropOptions: this.options,
      dropValue: '',
      dropPlaceholder: this.placeholder ? this.placeholder : '全部单位'

    }
  },
  mounted() {

  },
  methods: {
    handleCommand(item) {
      console.log('下拉', item)
      this.dropValue = item.label
      this.$emit('selectedItem', item) // 选中的item传给父组件
    },

  },
  components: {

  },
  watch: {
    // 监听异步数组改变
    options: {
      handler(newArr) {
        this.dropOptions = newArr
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
<style lang="stylus" scoped>
#MenuDrop{
  .menu-drop-placeholder{
    opacity 0.5;
  }
}

</style>
