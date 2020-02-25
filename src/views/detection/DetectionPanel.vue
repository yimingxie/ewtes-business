<template>
  <div id="DetectionPanel" class="xym">
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

        <div class="xddetail-list clearfix">
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-hour"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">近一小时人流量</div>
              <div class="stat-head-box-info-p">{{oneHouse}}</div>
            </div>
          </div>
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-day"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">本日人流量</div>
              <div class="stat-head-box-info-p">{{today}}</div>
            </div>
          </div>
          <div class="stat-head-box clearfix">
            <div class="stat-head-box-icon stat-head-box-icon-area"></div>
            <div class="stat-head-box-info">
              <div class="stat-head-box-info-h">检测区域</div>
              <div class="stat-head-box-info-p">{{monitorCount}}</div>
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
            <!-- <div class="detreal-box">
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
            </div> -->



            <div class="detreal-box" v-for="(item, i) in realList" :key="i">
              <div class="detreal-box-title">
                <div class="detreal-box-title-icon"></div>
                <div class="detreal-box-title-p">{{item.pointName}}</div>
              </div>
              <div class="detreal-box-data clearfix" :class="item.abnormalCount > 0 ? 'warn' : ''" @click="getDetDetail(item)">
                <div class="detreal-box-data-people clearfix">
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">异常人数</div>
                    <div class="drbd-people-flow-p">
                      <span>{{item.abnormalCount}}</span>人
                    </div>
                  </div>
                  <div class="drbd-people-flow">
                    <div class="drbd-people-flow-h">本日人流量</div>
                    <div class="drbd-people-flow-p">
                      <span>{{item.today}}</span>人
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
              <div class="xtitle-heading-h-p">今日记录</div>
            </div>

            <div class="detection-history-choose">
              <div class="x-select-box x-select-box-status" style="width: 102px;">
                <el-select class="x-select" v-model="historyParams.valid" @change="historyStatusChange" placeholder="全部状态" clearable>
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="x-select-box x-select-box-monitor" style="width: 130px;">
                <el-select class="x-select" v-model="historyParams.pointId" @change="historyMoniChange" placeholder="全部检测区域" clearable>
                  <el-option v-for="item in monitorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>

          </div>


          <div class="x-no-data" style="margin-top: 100px;" v-if="historyList.length === 0">暂无数据</div>
          

          <div class="det-history-table" v-else>
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
              <!-- <div class="det-history-tr warn clearfix">
                <div class="det-history-td">
                  <div class="det-history-avatar">
                    <img src="../../assets/images/xym/avatar.png" alt="">
                  </div>
                </div>
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">洗手间</div>
                <div class="det-history-td">10分钟前</div>
              </div> -->

              <div class="det-history-tr clearfix" :class="item.valid === 0 ? 'warn' : ''" v-for="(item, i) in historyList" :key="i">
                <div class="det-history-td">
                  <div class="det-history-avatar">
                    <img v-if="item.url" :src="item.imgUrl" alt="">
                    <img v-else src="../../assets/images/xym/avatar.png" alt="">
                  </div>
                </div>
                <div class="det-history-td">{{item.name ? item.name : '--'}}</div>
                <div class="det-history-td">{{item.value}}℃</div>
                <div class="det-history-td">{{item.pointName}}</div>
                <div class="det-history-td">{{item.time | timeDiff2}}</div>
              </div>
            </div>

            <!-- 分页 -->
            <div class="list-page" style="padding-bottom: 20px;margin-top: 0px;">
              <el-pagination
                @size-change="pageSizeChangeDetail"
                @current-change="currentPageChangeDetail"
                :current-page="currentPageDetail"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSizeDetail"
                layout="prev, pager, next, sizes, jumper"
                :total="totalPageDetail">
              </el-pagination>
            </div>


          </div>

        </div>

      </div>


    </div>


    <!-- 检测区域详情 -->
    <div class="detdetail-slider" :class="sliderShow ? 'on' : ''">
      <div class="detdetail-slider-close" @click="closeSliderShow"></div>
      <div class="detdetail-slider-title">
        <div class="detdetail-slider-title-line"></div>
        <div class="detdetail-slider-title-h">检测区域详情</div>
      </div>

      <div class="detdetail-info">
        <div class="detdetail-info-title">
          <div class="detdetail-info-title-icon"></div>
          <div class="detdetail-info-title-p">{{detDetailInfo.pointName}}</div>
        </div>
        <div class="detdetail-info-data clearfix">
          <div class="detdetail-info-data-box">
            <div class="detdetail-info-data-box-h">本日异常人数</div>
            <div class="detdetail-info-data-box-p" style="color: #F56B25;">
              <span>{{detDetailInfo.abnormalCount}}</span>人
            </div>
          </div>
          <div class="detdetail-info-data-box">
            <div class="detdetail-info-data-box-h">本日人流量</div>
            <div class="detdetail-info-data-box-p">
              <span>{{detDetailInfo.today}}</span>人
            </div>
          </div>
        </div>

        <!-- TODO 任务 -->

      </div>


      <div class="detdetail-block"></div>

      <div class="detdetail-warn">
        <div class="detdetail-warn-title">今日告警</div>
        <div class="detdetail-warn-container">
          <div class="x-no-data" style="margin-top: 100px;" v-if="detailWarnList.length === 0">今日暂无告警</div>

          <div class="det-history-table" v-else>
            <div class="det-history-thead">
              <div class="det-history-tr clearfix">
                <div class="det-history-th">姓名</div>
                <div class="det-history-th">测温结果</div>
                <div class="det-history-th">时间</div>
                <div class="det-history-th">处理结果</div>
              </div>
            </div>
            <div class="det-history-tbody">
              <!-- <div class="det-history-tr warn clearfix" @click="openDialogDeal">
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">15:20</div>
                <div class="det-history-td">去处理</div>
              </div> -->
              <div class="det-history-tr clearfix" :class="item.result == 1 ? 'warn' : ''" v-for="(item, i) in detailWarnList" :key="i" @click="openDialogDeal(item.id)">
                <div class="det-history-td">{{item.name ? item.name : '--'}}</div>
                <div class="det-history-td">{{item.celsius ? item.celsius : '--'}}℃</div>
                <div class="det-history-td">{{item.time | dateFormatNoSecond}}</div>
                <div class="det-history-td">{{item.result | returnWarnResult}}</div>
              </div>
        
            </div>

            <!-- 分页 -->
            <div class="list-page" style="padding-bottom: 20px;margin-top: 0px;">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="currentPageInfo"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSizeInfo"
                layout="prev, pager, next, sizes, jumper"
                :total="totalPageInfo">
              </el-pagination>
            </div>

          </div>
        </div>

      </div>



    </div>


    <!-- 异常处理弹窗 -->
    <el-dialog :visible.sync="dialogDeal" title="异常处理" :show-close="false" width="800px">
      <div class="dia-content">
        <div class="det-deal clearfix">

          <div class="det-deal-left">
            <div class="det-deal-avator">
              <img v-if="diaDealInfo.url" :src="diaDealInfo.imgUrl" alt="">
              <img v-else src="../../assets/images/xym/avatar.png" alt="">
            </div>
            <div class="det-deal-temper">
              <div class="det-deal-temper-h">体温</div>
              <div class="det-deal-temper-p">
                <span>{{diaDealInfo.celsius}}</span>℃
              </div>
            </div>
          </div>

          <div class="det-deal-mid">
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">姓名</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.userName ? diaDealInfo.userName : '--'}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">所属部门</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.depaName ? diaDealInfo.depaName : '--'}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">位置</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.pointName ? diaDealInfo.pointName : '--'}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">时间</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.time | dateFormat}}</div>
            </div>
          </div>

          <div class="det-deal-right">
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">处理结果</div>
              <div class="ddeal-radio" v-if="diaDealState == 'put'">
                <!-- <el-radio-group v-model="dealRadioValue"> -->
                  <!-- <el-radio v-for="item in pointDataRadio" :key="item.value" :label="item.value">{{item.label}}</el-radio> -->
                  <el-radio v-model="dealRadioValue" :label="2">已处理</el-radio>
                  <el-radio v-model="dealRadioValue" :label="3">解除告警</el-radio>
                <!-- </el-radio-group> -->
              </div>
              <div class="det-deal-mid-box-p" v-else>{{diaDealInfo.result | returnWarnResult}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">处理描述</div>
              <div class="ddeal-desc" v-if="diaDealState == 'put'">
                <textarea class="ddeal-desc-textarea" maxlength="200" v-model="dealDesc"></textarea>
              </div>
              <div class="det-deal-mid-box-p" style="line-height: 24px;" v-else>{{diaDealInfo.description}}</div>
            </div>

          </div>

        </div>
      
        <div class="dia-btn-con" style="text-align: right;" v-if="diaDealState == 'put'">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogDeal">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitDialogDeal">完成</div>
        </div>
        <div class="dia-btn-con" style="text-align: right;" v-else>
          <!-- <div class="dia-btn dia-btn-cancel" @click="dialogDeal=false">取消</div> -->
          <div class="dia-btn dia-btn-submit" @click="closeDialogDeal">关闭</div>
        </div>

      </div>
    </el-dialog>


  </div>
</template>

<script>
import api from '../../api'
import xymFun from '../../utils/xymFun';
export default {
  data() {
    return {
      parentCode: '',
      timer: '',

      // --统计--
      epedIdOptions: [],
      epedIdValue: '',
      epedName: '',
      oneHouse: 0,
      today: 0,
      monitorCount: 0,
      abnormalCount: 0,

      // --实时状态--
      realList: [],

      // --历史记录--
      historyList: [],
      historyParams: {
        epedId: "",
        valid: "", // -1 -全部 0 -正常 1 -异常
        pointId: "",
        limit: 10,
        offset: 1
      },
      currentPageDetail: 1,
      totalPageDetail: 1,
      pageSizeDetail: 10,
      statusOptions: [
        // {label: '全部', value: -1},
        {label: '异常', value: 0},
        {label: '正常', value: 1},
      ],
      monitorOptions: [],

      // --检测区域详情侧滑--
      currentInfo: '',
      sliderShow: false,
      abnormalCount: 0,
      processCount: 0,
      unProcessCount: 0,
      closedCount: 0,
      detailWarnList: [],
      // 详情靠传值
      detDetailInfo: {
        pointName: '',
        today: '',
        abnormalCount: ''
      },
      detDetailInfoParams: {
        "pointId": "",
        "limit": 10,
        "offset": 1
      },
      currentPageInfo: 1,
      totalPageInfo: 1,
      pageSizeInfo: 10,


      // --告警处理弹窗--
      dialogDeal: false,
      diaDealState: '', // 默认为只读，编辑则为'put'
      dealRadioValue: 2,
      currentWarnId: '', // 记录正在处理的告警工单id
      diaDealInfo: {
        "taskId": "",
        "url": "",
        "userName": "",  
        "depaName": "",    
        "time": "",
        "celsius": "",         
        "result": "" 
      },
      dealDesc: '',

         


    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
    this.epedIdValue = this.$route.query.epedId
  },
  
  mounted() {
    // 获取防疫点下拉
    this.getEpedIdOptions()

    // 获取监测区域下拉
    this.getMoniList()

    // 获取实时状态
    this.getRealList()

    // 历史记录
    this.getHistoryList()

    // 统计
    this.getDetStat()

    // 开启定时器
    // this.setTimer()

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    // 开启定时器
    setTimer() {
      // return false // 关闭定时器
      const that = this
      if (that.timer) clearInterval(that.timer)
      this.timer = setInterval(() => {
        that.getRealList()
        that.getDetStat()
        that.getHistoryList()
      }, 10000) // 10秒TODO
    },

    // 获取实时状态
    getRealList() {
      api.detection.getRealData(this.parentCode).then(res => {
        console.log('实时状态', res.data)
        this.realList = res.data.data
      })
    },

    // 获取防疫点下拉
    getEpedIdOptions() {
      let param = {
        "epedId": "",
        "areaCode": "",
        "useDepartment": "",
        "limit": 10000,
        "offset": 1 
      }
      this.epedIdOptions = []
      api.digital.getEpidemicList(param).then(res => {
        console.log('表头下拉', res.data)
        let detail = res.data.data.records
        detail.forEach(item => {
          this.epedIdOptions.push({
            label: item.epedName,
            value: item.epedId
          })
        })
      })
    },

    // 筛选-获取监测区域下拉
    getMoniList() {
      api.digital.getEpidemicMonitorList(this.parentCode).then(res => {
        console.log('监测区域下拉', res.data)
        let detail = res.data.data
        this.monitorOptions = []
        detail.forEach(item => {
          this.monitorOptions.push({
            label: item.pointName,
            value: item.pointId
          })
        })
      })
    },

    // 切换防疫点
    epedIdValueChange() {
      // TODO reset...

      this.$router.push({
        path: '/detection-panel',
        query: {
          epedId: this.epedIdValue
        }
      })
    },

    // 统计
    getDetStat() {
      api.detection.getStatistics(this.parentCode).then(res => {
        console.log('统计', res.data)
        let detail = res.data.data
        this.epedName = detail.epedName
        this.oneHouse = detail.oneHouse
        this.today = detail.today
        this.monitorCount = detail.monitorCount
        this.abnormalCount = detail.abnormalCount
      })
    },

    // 历史记录（今日）
    getHistoryList() {
      this.historyParams.epedId = this.parentCode
      api.detection.getHistoryList(this.historyParams).then(res => {
        console.log('历史记录', res.data)
        this.historyList = res.data.data.records || []
        this.historyList.forEach(item => {
          if (item.url && item.url !== '') {
            item.imgUrl = api.accountApi.viewPic(item.url)
          }
        })

        // 分页
        this.currentPageDetail = res.data.data.current
        this.totalPageDetail = res.data.data.total
        console.log('this.historyList', this.historyList)

        
      })
    },

    // 历史记录当前分页改变
    currentPageChangeDetail(current) {
      this.historyParams.offset = current
      this.getHistoryList()
    },

    // 历史记录分页大小改变
    pageSizeChangeDetail(size) {
      this.historyParams.limit = size
      this.getHistoryList()
    },

    // 筛选历史记录状态
    historyStatusChange() {
      this.historyParams.offset = 1
      this.getHistoryList()
    },

    // 筛选历史记录检测区域
    historyMoniChange() {
      this.historyParams.offset = 1
      this.getHistoryList()
    },

    // 获取检测区域详情
    getDetDetail(item) {
      let info = item
      this.currentInfo = item
      this.sliderShow = true
      // let param = {
      //   "pointId": info.pointId,
      //   "limit": 10000,
      //   "offset": 1
      // }
      this.detDetailInfoParams.pointId = info.pointId
      this.detDetailInfo.pointName = info.pointName
      this.detDetailInfo.today = info.today
      this.detDetailInfo.abnormalCount = info.abnormalCount

      api.detection.getAbnormalDetail(this.detDetailInfoParams).then(res => {
        console.log('检测区域详情', res.data)
        let abInfo = res.data.data
        this.abnormalCount = abInfo.abnormalCount
        this.processCount = abInfo.processCount
        this.unProcessCount = abInfo.unProcessCount
        this.closedCount = abInfo.closedCount

        this.detailWarnList = abInfo.data.records
        this.currentPageInfo = abInfo.data.current
        this.totalPageInfo = abInfo.data.total
      })
    },

    // 当前分页改变
    currentPageChange(current) {
      this.detDetailInfoParams.offset = current
      this.getDetDetail(this.currentInfo)
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.detDetailInfoParams.limit = size
      this.getDetDetail(this.currentInfo)
    },

    // 打开异常处理弹窗
    openDialogDeal(taskId) {
      api.detection.getWarnDetail(taskId).then(res => {
        console.log('告警信息详情', res.data)
        this.dialogDeal = true
        this.diaDealInfo = res.data.data
        this.diaDealInfo.imgUrl = api.accountApi.viewPic(this.diaDealInfo.url)

        // 未处理
        if (this.diaDealInfo.result == 1) {
          this.diaDealState = 'put'
        } else {
          this.diaDealState = ''
        }
      })
      

    },

    // 关闭异常处理弹窗
    closeDialogDeal() {
      this.currentWarnId = ''
      this.dialogDeal = false
      // 获取实时状态
      this.getRealList()
      // 历史记录
      this.getHistoryList()
      // 统计
      this.getDetStat()
    },

    

    // 提交处理异常
    submitDialogDeal() {
      let param = {
        "taskId": this.diaDealInfo.taskId,
        "result": this.dealRadioValue,
        "description": this.dealDesc
      }
      api.detection.dealWarn(param).then(res => {
        console.log('处理异常', res.data)
        this.$message.success('提交成功')
        // 更新数据
        // 获取实时状态
        // this.getRealList()
        // // 历史记录
        // this.getHistoryList()
        // // 统计
        // this.getDetStat()
        // this.dialogDeal = false
        // this.sliderShow = false

        this.closeSliderShow()

      })

    },

    // 关闭侧滑
    closeSliderShow() {
      // reset
      this.detDetailInfoParams = {
        "pointId": "",
        "limit": 10,
        "offset": 1
      }
      // 更新数据
      // 获取实时状态
      this.getRealList()
      // 历史记录
      this.getHistoryList()
      // 统计
      this.getDetStat()
      this.dialogDeal = false
      this.sliderShow = false
    },

  },
  components: {

  }
}
</script>

<style>

.x-select .el-input__inner{
  border: none !important;
  height: 32px !important;
  line-height: 32px !important;
}
.det-head-select .el-input__inner{
  font-size: 20px !important;
  color: #3572FF !important;
  font-weight: bold !important;
  text-align: center;
}
.el-select.x-select .el-input .el-select__caret{
  font-size: 14px !important;
}
.el-select.det-head-select .el-input .el-select__caret{
  color: #3572FF !important;
  font-weight: bold !important;
  font-size: 22px !important;
}
.x-select-box .el-input__inner{
  text-align: center;
}

@media screen and (max-width: 1600px) {
  .x-select-box-status{
    width: 80px !important;
  }
  .x-select-box-monitor{
    width: 110px !important;
  }
  .x-select-box-status .el-input__inner{
    padding-left: 0 !important;
    padding-right: 25px !important;
  }
  .x-select-box-monitor .el-input__inner{
    padding-left: 0 !important;
    padding-right: 25px !important;
  }

}

</style>

<style lang="stylus" scoped>
#DetectionPanel{
  padding-bottom: 30px;
  .det-history-table{
    height: calc(100vh - 340px);
    overflow: auto;    
  }

  .xddetail-name{
    width: 232px;
  }
  .xddetail-list{
    padding-left: 252px;
  }

  .x-digital-detail{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .det-history-tbody{
    padding-bottom: 20px;
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
      width 30%;
    }
    .det-history-thead .det-history-th:nth-child(4),.det-history-tbody .det-history-td:nth-child(4){
      width 24%;
    }

  }

  

}


@media screen and (max-width: 1600px) {
  #DetectionPanel{
    .xtitle-heading-h-p{
      font-size: 20px;
    }
    .detection-history-choose{
      right: 0 !important;
    }
    
    
    .det-history-table{
      padding: 0 5px;
    }
    .det-history-td,.det-history-th{
      padding: 10px 5px;
    }
    
  }
}

@media screen and (max-width: 1400px) {
  #DetectionPanel{
    min-width: 1200px;
  }
}

</style>
