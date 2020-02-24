<template>
  <div id="DigitalAbnormal" class="xym">
    <div class="bread-nav">
      <span @click="$router.push('/digital-list')">数字防疫点</span>
      <em>/ 档案</em>
    </div>

    <div class="x-container">
      <div class="digital-detail-tabTop clearfix" style="margin-top: 30px;">
        <div class="digital-detail-tab">
          <span style="z-index: 4" @click="goDigitalDetail">基本档案</span>
          <span class="on" style="z-index: 3" @click="goAbnormalDetail">异常档案</span>
        </div>
        <div class="digital-detail-tabTop-a clearfix">
          <div class="digital-detail-tabTop-anav" @click="goObserveList">观察任务管理</div>
          <div class="digital-detail-tabTop-anav-span">|</div>
          <div class="digital-detail-tabTop-anav" @click="goDiagnList">监测应用管理</div>
        </div>
      </div>

      <div class="diab-content">
        <div class="xtitle-heading">
          <div class="xtitle-heading-h">
            <div class="xtitle-date-picker">
              <!-- <el-date-picker v-model="abnormalParams.date" class="datePicker" type="date" placeholder="选择日期"></el-date-picker> -->
              <year-month-picker :value.sync="defaultTimestamp" @childVal="getYearVal"></year-month-picker>

            </div>
            <div class="xtitle-heading-h-line"></div>
            <div class="xtitle-heading-h-p">记录</div>
          </div>
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">检测区域名称</div>
              <div class="llt-th">日期</div>
              <div class="llt-th">总数</div>
              <div class="llt-th" @click="getDetDetail">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="abnormalList.length == 0">暂无数据</div>
            <div class="llt-tr clearfix" v-for="(item, i) in abnormalList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">{{item.pointName}}</div>
                <div class="llt-td">{{item.date}}</div>
                <div class="llt-td">{{item.abnormalCount}}</div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="getDetDetail(item)">详情</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="list-page">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="currentPageChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPage">
            </el-pagination>
          </div>


        </div>

      </div>


    </div>


    <!-- 检测区域详情 -->
    <div class="detdetail-slider" :class="sliderShow ? 'on' : ''">
      <div class="detdetail-slider-close" @click="closeSlider"></div>
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
          <div class="detdetail-info-data-box" style="width: 25%">
            <div class="detdetail-info-data-box-h">异常总数</div>
            <div class="detdetail-info-data-box-p" style="color: #F56B25;">
              <span>{{abnormalCount}}</span>人
            </div>
          </div>
          <div class="detdetail-info-data-box" style="width: 25%">
            <div class="detdetail-info-data-box-h">未处理</div>
            <div class="detdetail-info-data-box-p" style="color: #F56B25;">
              <span>{{unProcessCount}}</span>人
            </div>
          </div>
          <div class="detdetail-info-data-box" style="width: 25%">
            <div class="detdetail-info-data-box-h">已处理</div>
            <div class="detdetail-info-data-box-p">
              <span>{{processCount}}</span>人
            </div>
          </div>
          <div class="detdetail-info-data-box" style="width: 25%">
            <div class="detdetail-info-data-box-h">解除告警</div>
            <div class="detdetail-info-data-box-p">
              <span>{{closedCount}}</span>人
            </div>
          </div>
        </div>

        <!-- TODO 任务 -->

      </div>


      <div class="detdetail-block"></div>

      <div class="detdetail-warn">
        <div class="detdetail-warn-title">告警列表</div>
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
                <div class="det-history-td">{{item.celsius}}℃</div>
                <div class="det-history-td">{{item.time | splitFormatDate}}</div>
                <div class="det-history-td">{{item.result | returnWarnResult}}</div>
              </div>
        
            </div>

            <!-- 分页 -->
            <div class="list-page">
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

    <!-- 异常处理弹窗 -->
    <el-dialog :visible.sync="dialogDeal" title="异常处理" :show-close="false" width="800px">
      <div class="dia-content">
        <div class="det-deal clearfix">

          <div class="det-deal-left">
            <div class="det-deal-avator">
              <img v-if="diaDealInfo.url" :src="diaDealInfo.url" alt="">
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
              <div class="det-deal-mid-box-p">{{diaDealInfo.userName}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">所属部门</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.depaName}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">位置</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.pointName}}</div>
            </div>
            <div class="det-deal-mid-box">
              <div class="det-deal-mid-box-h">时间</div>
              <div class="det-deal-mid-box-p">{{diaDealInfo.time}}</div>
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
import xymFun from '../../utils/xymFun'
import Footer from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose'
import YearMonthPicker from '../../components/YearMonthPicker'

export default {
  data() {
    return {
      // --全局状态--
      parentCode: '',

      // --列表--
      defaultTimestamp: '',
      abnormalList: [],
      abnormalParams: {
        "epedId": "",
        "date": "2020-02-23 00:00:00", // 今天的数据就传2020-02-23 00:00:00 这个月就2020-02-01 00:00:00  今年就2020-01-01 00:00:00
        "limit": 10,
        "offset": 1
      },

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      // --检测区域详情侧滑--
      currentDetailItem: '', // 当前查看的详情对象
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
      // 今日告警参数
      abnormalDetailParams: {
        "pointId": "",
        "date": "", 
        "allDate": "year",
        "limit": 10,
        "offset": 1
      },
      currentPageDetail: 1,
      totalPageDetail: 1,
      pageSizeDetail: 10,


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
    this.abnormalParams.epedId = this.$route.query.epedId

    // 默认以当前的年筛选
    // this.defaultTimestamp = xymFun.dateFormat(Date.now()).substring(0, 7) // 2019-12
    this.defaultTimestamp = new Date().getFullYear() + '-01-01 00:00:00'
    this.abnormalParams.date = this.defaultTimestamp

  },
  mounted() {
    // 获取异常档案列表
    this.getAbnormalList()

  },
  methods: {

    getYearVal(year) {
      console.log('筛选日期', year) // 2020 2020-02 2020-03-01
      this.defaultTimestamp = year

      let yearStr = year + ''
      // 查月份
      if (yearStr.length === 7) {
        this.abnormalParams.date = yearStr + '-01 00:00:00'
        this.abnormalParams.allDate = 'month'
      } 
      // 查日
      else if (yearStr.length === 10) {
        this.abnormalParams.allDate = 'day'
        this.abnormalParams.date = yearStr + ' 00:00:00'
      }
      // 查年
      else {
        this.abnormalParams.date = yearStr + '-01-01 00:00:00'
        this.abnormalParams.allDate = 'year'
      }
      console.log('时间重组', this.abnormalParams.date)
      this.closeSlider()
      this.getAbnormalList()

    },

    // 获取异常档案列表
    getAbnormalList() {
      api.digital.getAbnormalList(this.abnormalParams).then(res => {
        console.log('异常档案', res.data)
        this.abnormalList = res.data.data.records
        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total
      })
    },

    // 当前分页改变
    currentPageChange(current) {
      this.abnormalParams.offset = current
      this.getAbnormalList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.abnormalParams.limit = size
      this.getAbnormalList()
    },

    

    // 跳转到观察任务
    goObserveList() {
      this.$router.push({
        path: '/observe-list',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到监测应用
    goDiagnList() {
      this.$router.push({
        path: '/diagnosis-list',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到基本档案
    goDigitalDetail() {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到异常档案
    goAbnormalDetail() {
      this.$router.push({
        path: '/digital-abnormal',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 获取检测区域详情
    getDetDetail(item) {
      this.currentDetailItem = item
      let info = item
      this.sliderShow = true

      this.abnormalDetailParams.pointId = info.pointId

      this.detDetailInfo.pointName = info.pointName
      this.detDetailInfo.today = info.tody
      this.detDetailInfo.abnormalCount = info.abnormalCount

      this.abnormalDetailParams.date = info.date


      api.detection.getAbnormalDetail(this.abnormalDetailParams).then(res => {
        console.log('检测区域详情', res.data)
        let abInfo = res.data.data
        this.abnormalCount = abInfo.abnormalCount
        this.processCount = abInfo.processCount
        this.unProcessCount = abInfo.unProcessCount
        this.closedCount = abInfo.closedCount

        this.detailWarnList = abInfo.data.records
      })
    },

    // 当前分页改变
    currentPageChangeDetail(current) {
      this.abnormalDetailParams.offset = current
      this.getDetDetail(this.currentDetailItem)
    },

    // 分页大小改变
    pageSizeChangeDetail(size) {
      this.abnormalDetailParams.limit = size
      this.getDetDetail(this.currentDetailItem)
    },

    // 关闭详情侧滑
    closeSlider() {
      this.abnormalDetailParams = {
        "pointId": "",
        "limit": 10,
        "offset": 1
      }
      this.currentDetailItem = ''
      this.sliderShow = false
    },

    // 打开异常处理弹窗
    openDialogDeal(taskId) {
      api.detection.getWarnDetail(taskId).then(res => {
        console.log('告警信息详情', res.data)
        this.dialogDeal = true
        this.diaDealInfo = res.data.data
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
        if (res.data.code == 200) {
          this.$message.success('提交成功')
          this.dialogDeal = false
          this.closeSlider()
        } else {
          this.$message.error(res.data.message)
          this.dialogDeal = false
          this.closeSlider()
        }

      })

    },

  },
  components: {
    'year-month-picker': YearMonthPicker

  }
}
</script>

<style lang="stylus" scoped>
#DigitalAbnormal{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 30%;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 27%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 28%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 15%;
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
