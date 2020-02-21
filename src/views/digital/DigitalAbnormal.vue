<template>
  <div id="DigitalAbnormal" class="xym">
    <div class="bread-nav">
      <span>数字防疫点</span>
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
              <el-date-picker v-model="abnormalParams.date" class="datePicker" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="xtitle-heading-h-line"></div>
            <div class="xtitle-heading-h-p">记录</div>
          </div>
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">检测区域名称</div>
              <div class="llt-th">总数</div>
              <div class="llt-th" @click="getDetDetail">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="abnormalList.length == 0">暂无数据</div>
            <div class="llt-tr clearfix" v-for="(item, i) in abnormalList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">{{item.pointName}}</div>
                <div class="llt-td">{{item.abnormalCount}}</div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goDetail(item.pointId)">详情</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="list-page">
            <!-- <div class="list-page-record">共{{totalPage}}条记录</div> -->
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
              <!-- <div class="det-history-tr warn clearfix" @click="openDialogDeal">
                <div class="det-history-td">张晶晶</div>
                <div class="det-history-td">36.6℃</div>
                <div class="det-history-td">15:20</div>
                <div class="det-history-td">去处理</div>
              </div> -->
              <div class="det-history-tr clearfix" v-for="(item, i) in detailWarnList" :key="i" @click="openDialogDeal(item.id)">
                <div class="det-history-td">{{item.name}}</div>
                <div class="det-history-td">{{item.celsius}}℃</div>
                <div class="det-history-td">{{item.time}}</div>
                <div class="det-history-td">{{item.result | returnWarnResult}}</div>
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
import xymFun from '../../utils/xymFun'
import Footer from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose'
export default {
  data() {
    return {
      // --全局状态--
      parentCode: '',

      // --列表--
      abnormalList: [],
      abnormalParams: {
        "epedId": "",
        "date": "",
        "limit": 10,
        "offset": 1
      },

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      // --检测区域详情侧滑--
      sliderShow: false,
      abnormalCount: 0,
      processCount: 0,
      unProcessCount: 0,
      closedCount: 0,
      detailWarnList: [],

    }
  },
  created() { 
    this.parentCode = this.$route.query.epedId
    this.abnormalParams.epedId = this.$route.query.epedId

  },
  mounted() {
    // 获取异常档案列表
    this.getAbnormalList()

  },
  methods: {

    // 获取异常档案列表
    getAbnormalList() {
      api.digital.getAbnormalList(this.abnormalParams).then(res => {
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

    // 获取检测区域详情
    getDetDetail(pointId) {
      this.sliderShow = true
      let param = {
        "pointId": pointId,
        "limit": 10000,
        "offset": 1
      }
      api.detection.getAbnormalDetail(param).then(res => {
        console.log('检测区域详情', res.data)
        let abInfo = res.data.data
        this.abnormalCount = abInfo.abnormalCount
        this.processCount = abInfo.processCount
        this.unProcessCount = abInfo.unProcessCount
        this.closedCount = abInfo.closedCount

        this.detailWarnList = abInfo.records
      })
    },

    // 打开异常处理弹窗
    openDialogDeal() {
      this.dialogDeal = true
      

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

  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#DigitalAbnormal{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 44%;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 42%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 14%;
  }


}
</style>
