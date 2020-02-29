<template>
  <div id="DigitalList" class="xym">
    <!-- TODO 面包屑 -->
    <!-- <div class="pageTitle">数字防疫点</div> -->
    <div class="bread-nav">
      <em>数字防疫点</em>
    </div>

    <div class="x-container">
      <div class="x-list">
        <div class="xlist-choose clearfix">
          <div class="xlist-choose-content clearfix">
            <div class="xcc-box xcc-box-city">
              <city-choose2 :selectCity="selectCityFa" @childVal="selectCity"></city-choose2>
            </div>
            <div class="xcc-splitLine"></div>
            <div class="xcc-box" style="width: 110px;">
              <el-select class="digital-list-select" v-model="epListParams.useDepartment" @change="useDepartmentChange" clearable placeholder="全部单位" size="small">
                <el-option v-for="item in useDepartmentOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>

          </div>
          <div class="xlist-choose-si">
            <!-- <search-input ref="searchInputRef" placeholderValue="搜索园区名称/创建人" @search="searchTask" @cancel="clearTask"></search-input> -->
            <search-input ref="searchInputRef" @search="searchTask" @cancel="clearTask" placeholderValue="搜索防疫点名称/内部编号/详细地址"></search-input>
          </div>
        </div>

        <div class="xlist-operator">
          <div class="xlist-operator-content clearfix">
            <div class="xop-btn-submit" @click="goAdd">添加防疫点</div>
            <div class="xop-btn-delete" @click="openDialogDeleteCheckPoint">删除防疫点</div>
          </div>
        </div>

        <div class="x-list-block"></div>


        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">防疫点名称</div>
              <div class="llt-th">内部编号</div>
              <div class="llt-th">区域</div>
              <div class="llt-th">详细地址</div>
              <div class="llt-th">所属单位</div>
              <div class="llt-th">监测数</div>
              <div class="llt-th">上次告警</div>
              <!-- <div class="llt-th">状态</div> -->
              <div class="llt-th">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="digitalList.length == 0">暂无数据</div>

            <div class="llt-tr clearfix" :class="item.status ? '' : 'offline'" v-for="(item, i) in digitalList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLifts" @change="checkedLiftsChange">
                    <el-checkbox :label="item.epedId" :key="i">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.epedName}}</div>
                <div class="llt-td">{{item.inNum}}</div>
                <div class="llt-td">{{item.localArea}}</div>
                <div class="llt-td">{{item.address}}</div>
                <div class="llt-td">{{item.useDepartment ? item.useDepartment : '--'}}</div>
                <div class="llt-td">{{item.monitorNum}}</div>
                <div class="llt-td">{{item.lastTime | judgeYear}}</div>
                <!-- <div class="llt-td">
                  <div class="ll-table-switch">
                    <el-switch v-model="item.status" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 @change="switchChange($event, item.id)"></el-switch>
                  </div>
                </div> -->
                <div class="llt-td">
                  <span class="llt-td-a" @click="goDetail(item.epedId)">档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a" @click="goDiagn(item.epedId)">设置监测</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a" @click="goDetection(item.epedId)">诊断</span>
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

    <!-- 底部 -->
    <footer-temp></footer-temp>

    <!-- 删除防疫点弹窗 -->
    <el-dialog :visible.sync="dialogDeleteCheckPoint" title="删除防疫点" :show-close="false" width="700px">
      <div class="dia-content">
        <div class="dia-con-p">
          <h4>是否确认删除</h4>
          <!-- <p>删除后不可复原，请谨慎操作</p> -->
        </div>
        <!-- <ul class="dia-ul clearfix">
          <li :class="checkedLifts.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedLifts" :key="i">{{item}}</li>
        </ul> -->
        <div class="dia-btn-con" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="dialogDeleteCheckPoint=false">取消</div>
          <div class="dia-btn dia-btn-submit" @click="deleteCheckPoint">确认</div>
        </div>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import api from '../../api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import Footer from "../../views/common/fotter";
import CityChoose2 from '../../components/CityChoose2'
import xymFun from '../../utils/xymFun';



export default {
  data() {
    return {
      // --筛选条件--
      selectCityFa: [],
      useDepartmentOptions: [
        // {value: '选项1', label: '单位TODO1'}, 
        // {value: '选项2', label: '单位TODO2'},
      ],
      useDepartmentValue: '',

      // --列表--
      digitalList: [],
      test: '',
      liftselevCodeOptions: [],
      checkedLifts: [],
      checkedAll: false,
      epListParams: {
        "title": "",
        "epedId": "",
        "areaCode": "",
        "useDepartment": "",
        "limit": 10,
        "offset": 1
      },
      facility: '',
      partPoint: '',

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      // --弹窗--
      dialogDeleteCheckPoint: false,

    }
  },
  created() {
    // 当不存在，是无限加还是不给加？
    this.facility = localStorage.getItem('facility') ? parseInt(localStorage.getItem('facility')) : 100

  },
  mounted() {

    // 查询数字化设备列表
    this.getDigitalList()

    // 全部单位下拉
    this.getUseDepartmentOptions()


    

  },
  methods: {
    // 查询数字化设备列表
    getDigitalList() {
      api.digital.getEpidemicList(this.epListParams).then(res => {
        console.log('列表', res.data)
        this.digitalList = res.data.data.records
        // liftselevCodeOptions

        // 将所有电梯注册码填入选项，用于全选
        this.liftselevCodeOptions = []
        this.digitalList.forEach(item => {
          this.liftselevCodeOptions.push(item.epedId)
        })

        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total
      })
    },

    // TODO 全部单位下拉
    getUseDepartmentOptions() {
      
      api.digital.getUseDepartment().then(res => {
        console.log('下拉', res.data)
        
        this.useDepartmentOptions = []
        res.data.data.forEach(item => {
          this.useDepartmentOptions.push({
            label: item.name,
            value: item.id
          })
        })
      })

    },

    // 单位筛选
    useDepartmentChange() {
      this.epListParams.offset = 1
      this.getDigitalList()
    },

    // 区域筛选
    selectCity(cityArr, cnName) {
      if (cityArr.length === 0) {
        this.epListParams = {
          "title": "",
          "epedId": "",
          "areaCode": "",
          "useDepartment": "",
          "limit": 10,
          "offset": 1
        }
      } else {
        this.epListParams.offset = 1
        this.epListParams.areaCode = cityArr[cityArr.length-1] || ""
      }
      this.getDigitalList()
    },

    // 防疫点多选
    checkedLiftsChange(val) {
      let count = this.digitalList.length
      // 总数达到就全选
      this.checkedAll = val.length === count ? true : false
    },

    // 全选
    checkedAllChange(checkedBoolean) {
      this.checkedLifts = checkedBoolean ? this.liftselevCodeOptions : []
    },

    // 当前分页改变
    currentPageChange(current) {
      this.epListParams.offset = current
      this.getDigitalList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.epListParams.limit = size
      this.getDigitalList()
    },

    // 搜索
    searchTask(content) {
      this.epListParams.title = content
      this.epListParams.offset = 1
      this.getDigitalList()
    },

    // 清空
    clearTask() {
      this.epListParams.title = ''
      this.epListParams.offset = 1
      this.getDigitalList()
    },

    // 防疫点开关
    switchChange(enabledVal, id) {
      const that = this
      // api.detection.getMaintenOneTemplate(id).then(res => {
      //   let params = res.data.data
      //   params.enabled = enabledVal
      //   api.detection.editMonitorMainten(params).then(resEdit => {
      //     if (resEdit.data.code == 400) {
      //       this.$message.error(`${resEdit.data.message}`)
      //     } else {
      //       if (params.enabled) {
      //         this.$message.success('已启用')
      //       } else {
      //         this.$message.success('已停用')
      //       }
      //     }
      //   })
      // })
    },

    // 打开删除防疫点弹窗
    openDialogDeleteCheckPoint() {
      if (this.checkedLifts.length === 0) return this.$message.error('请选择要删除的防疫点') 

      this.dialogDeleteCheckPoint = true
    },

    // 删除防疫点
    deleteCheckPoint() {
      let that = this
      api.digital.deleteEpidemic(this.checkedLifts.join(',')).then(res => {
        console.log(res)
        if (res.data.code == '200') {
          this.dialogDeleteCheckPoint = false
          that.$message.success('删除成功')
          this.checkedLifts = []
          this.getDigitalList()
        } else {
          that.$message.error(res.data.message)
        }
      })
    },

    // 跳转到档案
    goDetail(epedId) {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': epedId
        }
      })
    },

    // 跳转到诊断
    goDetection(epedId) {
      this.$router.push({
        path: '/detection-panel',
        query: {
          'epedId': epedId
        }
      })
    },

    // 跳转到监测
    goDiagn(epedId) {
      this.$router.push({
        path: '/diagnosis-list',
        query: {
          'epedId': epedId
        }
      })
    },

    // 添加防疫点
    goAdd() {
      this.$router.push('/digital-add-result')

      // if (this.totalPage < this.facility) {
      //   this.$router.push('/digital-add-result')
      // } else {
      //   this.$message.error('剩余可添加防疫点0')
      // }
    },

  },
  filters: {
    // 年过滤器，当年则不显示年份，非当年则需要
    'judgeYear': function (time) {
      let timeStr = time
      if (time === '') return '--'
      if (typeof time == 'number') {
        timeStr = xymFun.dateFormat(time)
      }
      let currentYear = xymFun.dateFormat(Date.now()).substring(0, 4) // 当天日期 2020-02-24
      if (timeStr.substring(0, 4) == currentYear) {
        // 今年则返回02-24 20:20
        return timeStr.substring(5, 16)
      } else {
        // 非今年返回xx-02-24 20:20
        return timeStr.substring(2, 16)
      }
    }

  },

  components: {
    'city-choose2': CityChoose2,
    'search-input': SearchInput,
    'footer-temp': Footer,

  }
}
</script>

<style>
.x-select .el-input__inner{
  border: none !important;
}
.xcc-box-city{
  width: 140px;
}
.xcc-box-city .el-input__inner{
  border: none !important;
}
.digital-list-select .el-input__inner{
  height: 32px !important;
  line-height: 32px !important;
  border: none;
}

</style>

<style lang="stylus" scoped>
#DigitalList{
  
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 3%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 11%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 8%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 14%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 17%;
  }
  .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
    width 14%;
  }
  .llt-thead .llt-th:nth-child(7),.llt-tbody .llt-td:nth-child(7){
    width 7%;
  }
  .llt-thead .llt-th:nth-child(8),.llt-tbody .llt-td:nth-child(8){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(9),.llt-tbody .llt-td:nth-child(9){
    width 14%;
  }
  // .llt-thead .llt-th:nth-child(10),.llt-tbody .llt-td:nth-child(10){
  //   width 14%;
  // }
}


/* 适配 */
@media screen and (max-width: 1620px) {
  #DigitalList{
    .llt-td{
      font-size 12px !important;  
    }
    .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
      width 10%;
    }
    .llt-thead .llt-th:nth-child(8),.llt-tbody .llt-td:nth-child(8){
      width 15%;
    }
  }
}

@media screen and (max-width: 1500px) {
  #DigitalList{
    .llt-th, .llt-td{
      padding: 16px 10px !important;
    }
    .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
      width 15%;
    }
    .llt-thead .llt-th:nth-child(9),.llt-tbody .llt-td:nth-child(9){
      width 16%;
    }
  }
}

</style>
