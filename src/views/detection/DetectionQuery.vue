<template>
  <div id="DetectionQuery" class="xym">
    <div class="bread-nav">
      <em>检测诊断</em>
    </div>
    <div class="x-container">
      <div class="x-digital-detail">
        <div class="xddetail-name">
          <div class="xddetail-name-p">
            <el-select class="x-select det-head-select" v-model="epedIdValue" @change="epedIdValueChange" placeholder="请选择防疫点">
              <el-option v-for="item in epedIdOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>

      </div>

      <div class="detection-content clearfix">
        <div class="detection-real">
          <div class="detection-content-bg"></div>
          <div class="detection-query-no-data"></div>

          <div class="xtitle-heading white-color" style="z-index: 3;border-bottom: none;">
            <div class="xtitle-heading-h">
              <div class="xtitle-heading-h-line"></div>
              <div class="xtitle-heading-h-p">实时状态</div>
            </div>
          </div>

        </div>

        <div class="detection-history">
          <div class="xtitle-heading">
            <div class="xtitle-heading-h">
              <div class="xtitle-heading-h-line"></div>
              <div class="xtitle-heading-h-p">今日记录</div>
            </div>
          </div>

  

        </div>

      </div>


    </div>



  </div>
</template>

<script>
import api from '../../api'
import xymFun from '../../utils/xymFun';
export default {
  data() {
    return {
      parentCode: '',

      // --统计--
      epedIdOptions: [],
      epedIdValue: '请选择防疫点',


    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
    this.epedIdValue = this.$route.query.epedId
  },
  mounted() {
    // 获取防疫点下拉
    this.getEpedIdOptions()

  },
  methods: {

    // 获取防疫点下拉
    getEpedIdOptions() {
      let param = {
        "epedId": "",
        "areaCode": "",
        "useDepartment": "",
        "limit": 10000,
        "offset": 1 
      }
      this.epedIdOptions = [
        {label: '请选择防疫点', value: '请选择防疫点'}
      ]
      api.digital.getEpidemicList(param).then(res => {
        console.log('表头下拉', res.data)
        let detail = res.data.data.records
        detail.forEach(item => {
          this.epedIdOptions.push({
            label: item.epedName,
            value: item.epedId
          })
        })
        this.epedIdValue = '请选择防疫点'
      
      })
    },

    // 切换防疫点
    epedIdValueChange() {
      // TODO reset...
      if (this.epedIdValue == '请选择防疫点') return

      this.$router.push({
        path: '/detection-panel',
        query: {
          epedId: this.epedIdValue
        }
      })
    },


  },
  components: {

  }
}
</script>

<style>

.x-select .el-input__inner{
  border: none !important;
  height: 40px !important;
  line-height: 40px !important;
}
#DetectionQuery .det-head-select .el-input__inner{
  font-size: 20px !important;
  color: #3572FF !important;
  font-weight: bold !important;
}
.el-select.x-select .el-input .el-select__caret{
  font-size: 14px !important;
}
.el-select.det-head-select .el-input .el-select__caret{
  color: #3572FF !important;
  font-weight: bold !important;
  font-size: 22px !important;
}

</style>

<style lang="stylus" scoped>
#DetectionQuery{
  padding-bottom: 0px;

  // 新增
  .x-digital-detail{
    height: 120px;
  }
  .xddetail-name-p{
    margin-top: 30px;
  }
  .xddetail-list{
    margin-left: 30px;
  }


  .xddetail-name{
    width: 170px;
    padding: 0;
  }
  

  .x-digital-detail{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


  .detection-history{
    .det-history-thead .det-history-th:nth-child(1),.det-history-tbody .det-history-td:nth-child(1){
      width 17%;
    }
    .det-history-thead .det-history-th:nth-child(2),.det-history-tbody .det-history-td:nth-child(2){
      width 17%;
    }
    .det-history-thead .det-history-th:nth-child(3),.det-history-tbody .det-history-td:nth-child(3){
      width 17%;
    }
    .det-history-thead .det-history-th:nth-child(4),.det-history-tbody .det-history-td:nth-child(4){
      width 22%;
    }
    .det-history-thead .det-history-th:nth-child(5),.det-history-tbody .det-history-td:nth-child(5){
      width 27%;
    }

  }

  .detdetail-warn{

    .det-history-table{
      padding: 0
      height: auto;
    }
    .det-history-tr{
      cursor pointer;
    }
    .det-history-td{
      font-size 14px;
    }
    .det-history-thead .det-history-th:nth-child(1),.det-history-tbody .det-history-td:nth-child(1){
      width 22%;
    }
    .det-history-thead .det-history-th:nth-child(2),.det-history-tbody .det-history-td:nth-child(2){
      width 23%;
    }
    .det-history-thead .det-history-th:nth-child(3),.det-history-tbody .det-history-td:nth-child(3){
      width 25%;
    }
    .det-history-thead .det-history-th:nth-child(4),.det-history-tbody .det-history-td:nth-child(4){
      width 30%;
    }

  }

  

}
</style>
