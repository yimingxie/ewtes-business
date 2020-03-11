<template>
<!-- 选项组 经营报表tab-->
  <div data-toggle="buttons" class="tab-radio">
    <slot name="label" ></slot>
    <label v-for="item in items" :class="{'active': item.value === value,'activePurple':(item.value === value && item.label == '超时'),'activeRed':(item.value === value && item.label == '事件'),'activeYellow':(item.value === value && item.label == '故障')}" class="btn btn-default " :key="item.value">
      <i v-if="item.colorClass" :class="item.colorClass">●</i>
      <input type="radio" autocomplete="off" @click="onSelect(item.value)"/>{{ item.label }}
    </label>
    
    <!-- <ul>
      <slot name="item" v-for="item in items" :text="item.text">默认值</slot>
    </ul> -->
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        twoWay: true
      },
      items: {
        type: Array,
        default: []
      },
      header: '来自子组件的头部消息'
    },
    
    // data(){
    //   return{
    //     items:[
    //     {id:1,text:'第1段'},
    //     {id:2,text:'第2段'},
    //     {id:3,text:'第3段'},
    //     ]
    //   }
    // },
    methods: {
      onSelect (value) {
        // this.value = value
        this.$emit('update:value', value)
        
      }
    }
  }
</script>

<style lang="stylus">

.tab-radio
  display: inline-block;
  
  .btn
    position relative
    height 22px
    line-height 22px
    text-align: center;
    cursor pointer
    display: inline-block;
    // transition: all .3s; 
    font-size: 16px;
    color: #999999
    letter-spacing: 0.03px;
    white-space: nowrap;
    border-radius: 4px;
    margin-right 35px
    font-weight: 300;
    width:72px
    &.active
      color: #4272FF;
      border-radius: 4px;
      font-weight: 600;
      &:after
        content:''
        background: #3572FF;
        display: inline-block;
        height: 8px;
        position: absolute;
        // width:100%;
        left: 0;
        right: 0;
        bottom: -33px;
    &.activePurple
      color: #9C71D8;
      &:after
        background: #9C71D8;
    &.activeYellow
      color: #FFC60B;
      &:after
        background: #FFC60B;
    &.activeRed
      color: #FA4F43;
      &:after
        background: #FA4F43;

    input[type="radio"]
      absolute left top
      appearance none
      opacity 0
    i 
      width: 7px;
      display: inline-block;
      border-radius: 50%;
  span
    display inline-block
    color: rgba(0,0,0,0.85);
</style>
