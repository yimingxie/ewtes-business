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
            <div class="xcc-box">
              <city-choose2 :selectCity="selectCityFa" @childVal="selectCity"></city-choose2>
            </div>
            <div class="xcc-splitLine"></div>
            <div class="xcc-box">
              <el-select v-model="useDepartmentValue" clearable placeholder="全部单位" size="small">
                <el-option v-for="item in useDepartmentOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>

          </div>
          <div class="xlist-choose-si">
            <!-- <search-input ref="searchInputRef" placeholderValue="搜索园区名称/创建人" @search="searchTask" @cancel="clearTask"></search-input> -->
            <search-input ref="searchInputRef" placeholderValue="搜索防疫点名称/内部编号"></search-input>
          </div>
        </div>

        <div class="xlist-operator">
          <div class="xlist-operator-content clearfix">
            <div class="xop-btn-submit" @click="$router.push('/digital-add-result')">添加防疫点</div>
            <div class="xop-btn-delete">删除防疫点</div>
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
              <div class="llt-th">状态</div>
              <div class="llt-th">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="digitalList.length == 0">暂无数据</div>

            <div class="llt-tr clearfix" :class="item.status == 1 ? '' : 'offline'" v-for="(item, i) in digitalList" :key="i">
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
                <div class="llt-td">{{item.useDepartment}}</div>
                <div class="llt-td">{{item.monitorNum}}</div>
                <div class="llt-td">{{item.lastTime}}</div>
                <div class="llt-td">
                  <div class="ll-table-switch">
                    <el-switch v-model="item.status" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 @change="switchChange($event, item.id)"></el-switch>
                  </div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goDetail(item.epedId)">档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">设置监测</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">诊断</span>
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


  </div>
</template>

<script>
import api from '../../api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import Footer from "../../views/common/fotter";
import CityChoose2 from '../../components/CityChoose2'


export default {
  data() {
    return {
      // --筛选条件--
      selectCityFa: [],
      useDepartmentOptions: [
        {value: '选项1', label: '黄金糕'}, 
        {value: '选项2', label: '双皮奶'},
      ],
      useDepartmentValue: '',

      // --列表--
      digitalList: [],
      test: '',
      liftselevCodeOptions: [],
      checkedLifts: [],
      checkedAll: false,
      epListParams: {
        "epedId": "",
        "areaCode": "",
        "useDepartment": "",
        "limit": 10,
        "offset": 1
      },

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

    }
  },
  mounted() {

    // 查询数字化设备列表
    this.getDigitalList()

  },
  methods: {
    // 查询数字化设备列表
    getDigitalList() {
      api.digital.getEpidemicList(this.epListParams).then(res => {
        this.digitalList = res.data.data
      })
    },

    // 区域筛选
    selectCity(cityArr, cnName) {
      console.loog('区域筛选')
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
      console.log('全选')
    },

    // 当前分页改变
    currentPageChange(current) {
      console.log('当前分页改变')
      // this.digitalParams.offset = current
      // this.getDigitalParkList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      console.log('当前分页Size改变')
      // this.digitalParams.limit = size
      // this.getDigitalParkList()
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

    // 跳转到档案
    goDetail(epedId) {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': epedId
        }
      })

    },

  },
  components: {
    'city-choose2': CityChoose2,
    'search-input': SearchInput,
    'footer-temp': Footer,

  }
}
</script>

<style lang="stylus" scoped>
#DigitalList{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 3%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 8%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 8%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 14%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 14%;
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
    width 6%;
  }
  .llt-thead .llt-th:nth-child(10),.llt-tbody .llt-td:nth-child(10){
    width 14%;
  }
}

</style>
