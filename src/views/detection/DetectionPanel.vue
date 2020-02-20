<template>
  <div id="DetectionPanel" class="xym">
    <div class="bread-nav">
      <em>检测诊断</em>
    </div>
    <div class="x-container">
      <div class="x-digital-detail">
        <div class="xddetail-name">
          <div class="xddetail-name-p">{{epedName}}</div>
        </div>

        <div class="xddetail-list clearfix">
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-hour"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">近一小时人流量</div>
              <div class="stat-head-box-info-p">64</div>
            </div>
          </div>
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-day"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">本日人流量</div>
              <div class="stat-head-box-info-p">7083</div>
            </div>
          </div>
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-area"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">检测区域</div>
              <div class="stat-head-box-info-p">8</div>
            </div>
          </div>
        
        </div>

      </div>

      <div class="detection-content clearfix">
        <div class="detection-real">
          <div class="detection-content-bg"></div>

          <div class="xtitle-heading white-color" style="z-index: 3;border-bottom: none;">
            <div class="xtitle-heading-h">
              <div class="xtitle-heading-h-line"></div>
              <div class="xtitle-heading-h-p">实时状态</div>
            </div>
          </div>

          <div class="detection-real-content clearfix">
            <div class="detreal-box">
              <div class="detreal-box-title">
                <div class="detreal-box-title-icon"></div>
                <div class="detreal-box-title-p">入口</div>
              </div>
              <div class="detreal-box-data clearfix" @click="getDetDetail">
                <div class="detreal-box-data-people clearfix">
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">异常人数</div>
                    <div class="drbd-people-flow-p">
                      <span>0</span>人
                    </div>
                  </div>
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">本日人流量</div>
                    <div class="drbd-people-flow-p">
                      <span>1234</span>人
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="detreal-box">
              <div class="detreal-box-title">
                <div class="detreal-box-title-icon"></div>
                <div class="detreal-box-title-p">入口</div>
              </div>
              <div class="detreal-box-data clearfix" @click="getDetDetail">
                <div class="detreal-box-data-people clearfix">
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">异常人数</div>
                    <div class="drbd-people-flow-p">
                      <span>0</span>人
                    </div>
                  </div>
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">本日人流量</div>
                    <div class="drbd-people-flow-p">
                      <span>1234</span>人
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="detreal-box">
              <div class="detreal-box-title">
                <div class="detreal-box-title-icon"></div>
                <div class="detreal-box-title-p">入口</div>
              </div>
              <div class="detreal-box-data clearfix" @click="getDetDetail">
                <div class="detreal-box-data-people clearfix">
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">异常人数</div>
                    <div class="drbd-people-flow-p">
                      <span>0</span>人
                    </div>
                  </div>
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">本日人流量</div>
                    <div class="drbd-people-flow-p">
                      <span>1234</span>人
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="detreal-box">
              <div class="detreal-box-title">
                <div class="detreal-box-title-icon"></div>
                <div class="detreal-box-title-p">入口</div>
              </div>
              <div class="detreal-box-data clearfix" @click="getDetDetail">
                <div class="detreal-box-data-people clearfix">
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">异常人数</div>
                    <div class="drbd-people-flow-p">
                      <span>0</span>人
                    </div>
                  </div>
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">本日人流量</div>
                    <div class="drbd-people-flow-p">
                      <span>1234</span>人
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>




        </div>

        <div class="detection-history">
          <div class="xtitle-heading">
            <div class="xtitle-heading-h">
              <div class="xtitle-heading-h-line"></div>
              <div class="xtitle-heading-h-p">历史记录</div>
            </div>

            <div class="detection-history-choose">
              <div class="x-select-box" style="width: 102px;">
                <el-select class="x-select" v-model="historyParams.status" placeholder="全部状态" clearable>
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="x-select-box" style="width: 130px;">
                <el-select class="x-select" v-model="historyParams.monitor" placeholder="全部检测区域" clearable>
                  <el-option v-for="item in monitorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>

          </div>

          <div class="det-history-table">
            <div class="det-history-thead">
              <div class="det-history-tr clearfix">
                <div class="det-history-th"></div>
                <div class="det-history-th">姓名</div>
                <div class="det-history-th">体温</div>
                <div class="det-history-th">检测点</div>
                <div class="det-history-th">时间</div>
              </div>
            </div>
            <div class="det-history-tbody">
              <div class="det-history-tr clearfix">
                <div class="det-history-td">
                  <div class="det-history-avatar">
                    <img src="../../assets/images/xym/avatar.png" alt="">
                  </div>
                </div>
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">洗手间</div>
                <div class="det-history-td">10分钟前</div>
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>


    <!-- 检测区域详情 -->
    <div class="detdetail-slider" :class="sliderShow ? 'on' : ''">
      <div class="detdetail-slider-close" @click="sliderShow=false"></div>
      <div class="detdetail-slider-title">
        <div class="detdetail-slider-title-line"></div>
        <div class="detdetail-slider-title-h">检测区域详情</div>
      </div>

      <div class="detdetail-info">
        <div class="detdetail-info-title">
          <div class="detdetail-info-title-icon"></div>
          <div class="detdetail-info-title-p">1楼扶梯</div>
        </div>
        <div class="detdetail-info-data clearfix">
          <div class="detdetail-info-data-box">
            <div class="detdetail-info-data-box-h">本日异常人数</div>
            <div class="detdetail-info-data-box-p" style="color: #F56B25;">
              <span>28</span>人
            </div>
          </div>
          <div class="detdetail-info-data-box">
            <div class="detdetail-info-data-box-h">本日人流量</div>
            <div class="detdetail-info-data-box-p">
              <span>28</span>人
            </div>
          </div>
        </div>

        <!-- TODO 任务 -->

      </div>


      <div class="detdetail-block"></div>

      <div class="detdetail-warn">
        <div class="detdetail-warn-title">今日告警</div>
        <div class="detdetail-warn-container">
          <div class="det-history-table">
            <div class="det-history-thead">
              <div class="det-history-tr clearfix">
                <div class="det-history-th">姓名</div>
                <div class="det-history-th">测温结果</div>
                <div class="det-history-th">时间</div>
                <div class="det-history-th">处理结果</div>
              </div>
            </div>
            <div class="det-history-tbody">
              <div class="det-history-tr clearfix">
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">15:20</div>
                <div class="det-history-td">去处理</div>
              </div>
              <div class="det-history-tr warn clearfix">
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">15:20</div>
                <div class="det-history-td">去处理</div>
              </div>
              <div class="det-history-tr clearfix">
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">15:20</div>
                <div class="det-history-td">去处理</div>
              </div>
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
      epedName: '',
      oneHouse: '',
      today: '',
      monitorCount: '',
      abnormalCount: '',

      // --历史记录--
      historyParams: {
        epedId: "",
        status: "", // -1 -全部 0 -正常 1 -异常
        monitor: ""
      },
      statusOptions: [
        {label: 'label啊', value: 'value值'},
        {label: 'label啊2', value: 'value值2'},
      ],
      monitorOptions: [
        {label: 'label啊', value: 'value值'},
        {label: 'label啊2', value: 'value值2'},
      ],

      // --弹窗--
      sliderShow: false,

    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
  },
  mounted() {

  },
  methods: {
    // 统计
    getDetStat() {
      api.detection.getStatistics(this.parentCode).then(res => {
        let detail = res.data.data
        this.epedName = detail.epedName
        this.oneHouse = detail.oneHouse
        this.today = detail.today
        this.monitorCount = detail.monitorCount
        this.abnormalCount = detail.abnormalCount
      })
    },

    // 获取检测区域详情
    getDetDetail() {
      this.sliderShow = true
    },

  },
  components: {

  }
}
</script>

<style>
.x-select .el-input__inner{
  border: none !important;
}

</style>

<style lang="stylus" scoped>
#DetectionPanel{
  padding-bottom: 30px;


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
