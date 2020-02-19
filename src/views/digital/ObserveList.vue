<template>
  <div id="ObserveList" class="xym">
    <div class="bread-nav">
      <span>数字防疫点</span>
      <span>/ 档案</span>
      <em>/ 观察任务管理</em>
    </div>

    <div class="x-container">
      <div class="x-digital-detail">
        <div class="xddetail-name">
          <div class="xddetail-name-p">{{epedNme}}</div>
        </div>
        <div class="xddetail-list clearfix">
          <div class="xddetail-list-item clearfix" style="width: 100%">
            <div class="xddetail-list-item-title">内部编号</div>
            <div class="xddetail-list-item-p">{{inNum}}</div>
          </div>
          <div class="xddetail-list-item clearfix">
            <div class="xddetail-list-item-title">区域</div>
            <div class="xddetail-list-item-p">{{localArea}}</div>
          </div>
          <div class="xddetail-list-item clearfix">
            <div class="xddetail-list-item-title">详细地址</div>
            <div class="xddetail-list-item-p">{{address}}</div>
          </div>
          <div class="xddetail-list-item clearfix">
            <div class="xddetail-list-item-title">所需上级</div>
            <div class="xddetail-list-item-p" style="padding-right: 0;">??</div>
          </div>
        </div>

      </div>

      <div class="x-list">
        <div class="xlist-choose clearfix">
   
          <div class="xlist-choose-si">
            <!-- <search-input ref="searchInputRef" placeholderValue="搜索园区名称/创建人" @search="searchTask" @cancel="clearTask"></search-input> -->
            <search-input ref="searchInputRef" placeholderValue="搜索观察任务名称" @search="searchTask" @cancel="clearTask"></search-input>
          </div>
        </div>

        <div class="xlist-operator">
          <div class="xlist-operator-content clearfix">
            <div class="xop-btn-submit" @click="openDialogAddObserve">添加观察任务</div>
            <div class="xop-btn-delete">删除任务</div>
          </div>
        </div>

        <div class="x-list-block"></div>


        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">观察任务名称</div>
              <div class="llt-th">检测区域</div>
              <div class="llt-th">观察数据类型</div>
              <div class="llt-th">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="observeList.length == 0">暂无数据</div>

            <div class="llt-tr clearfix" :class="item.status == 1 ? '' : 'offline'" v-for="(item, i) in observeList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLifts" @change="checkedLiftsChange">
                    <el-checkbox :label="item.observedId" :key="i">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.observedName}}</div>
                <div class="llt-td">{{item.pointName}}</div>
                <div class="llt-td">{{item.pointData}}</div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="openDialogEditObserve(item)">编辑</span>
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


    <!-- 添加观察任务弹窗 -->
    <el-dialog :visible.sync="dialogAddObserve" :title="dialogAddObserveTitle" :show-close="false" width="700px">
      <div class="dia-content">
        <el-form :model="ruleFormAddObserve" :rules="rulesAddObserve" ref="addObserveRef" class="diaForm">
          <div class="dia-clist">
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>任务名称：</div>
              <div class="dia-citem-ib">
                <el-input v-model="ruleFormAddObserve.observedName" size="small" placeholder="请输入任务名称"></el-input>
              </div>
            </div>
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>检测区域：</div>
              <div class="dia-citem-ib">
                <!-- <el-input v-model="ruleFormCheckPoint.pointName" size="small" placeholder="请选择部件"></el-input> -->
                <el-select v-model="ruleFormAddObserve.pointId" @change="pointIdChange" placeholder="请选择检测区域" size="small" style="width: 100%;">
                  <el-option v-for="item in observePointOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>检测数据：</div>
              <div class="dia-citem-ib">
                <div v-if="ruleFormAddObserve.pointId">
                  <el-radio-group v-model="ruleFormAddObserve.pointData">
                    <el-radio v-for="item in pointDataRadio" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                    <!-- <el-radio :label="2">TODO人脸+温度 </el-radio>
                    <el-radio :label="3">TODO人脸+温度+身份证</el-radio> -->
                  </el-radio-group>
                </div>
              </div>
            </div>

          </div>
        </el-form>

        <div class="dia-btn-con" v-if="dialogAddObserveTitle=='添加观察任务'" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogObserve">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitAddObserve">完成</div>
        </div>
        <div class="dia-btn-con" v-else style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogObserve">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitEditObserve">完成</div>
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


export default {
  data() {
    return {
      parentCode: '',

      // --列表--
      observeList: [],
      test: '',
      liftselevCodeOptions: [],
      checkedLifts: [],
      checkedAll: false,
      observeParams: {
        "observedName": "",
        "epedId": "",   //必填 
        "limit": 10, 
        "offset": 1      
      },

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      // --添加观察任务弹窗（编辑可共用？）--
      dialogAddObserveTitle: '添加观察任务',
      dialogAddObserve: true,
      ruleFormAddObserve: {
        "observedName": "",
        "pointId": "",   
        "epedId": "", 
        "pointData": "" // 1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
      },
      rulesAddObserve: {},
      observePointOptions: [
        {value: 'todo检测区域v1', label: 'todo检测区域1', pointData: ''},
        {value: 'todo检测区域v2', label: 'todo检测区域2', pointData: ''},
      ],
      currentObId: '',
      pointDataRadio: [
        {value: 1, label: 'todo检测区域1'},
      ]

    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
    this.observeParams.epedId = this.$route.query.epedId
  },
  mounted() {
    // 获取观察任务列表
    this.getObList()

    // 获取详情
    this.getDigitalDetail()

    // 获取下拉
    this.getObservePointOptions()

  },
  methods: {
    // 获取观察任务列表
    getObList() {
      api.digital.getObserveList(this.observeParams).then(res => {
        console.log('观察任务列表', res.data)
        this.observeList = res.data.data || []

        // 用于全选
        this.liftselevCodeOptions = []
        this.observeList.forEach(item => {
          this.liftselevCodeOptions.push(item.observedId)
        })

        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total
      })
    },

    // 获取详情
    getDigitalDetail() {
      api.digital.getDigitalDetail(this.parentCode).then(res => {
        console.log('详情', res.data)
        let detail = res.data.data


        // 用于检测区域下拉
        this.observePointOptions = []
        detail.checkPoint.forEach(item => {
          this.observePointOptions.push({
            value: item.pointId, 
            label: item.pointName,
            pointData: item.pointData
          })
        })
      })
    },

    // 获取下拉
    getObservePointOptions() {
      api.digital.getEpidemicMonitorList(this.parentCode).then(res => {
        console.log('下拉', res.data)
      })

    },

    // 防疫点多选
    checkedLiftsChange(val) {
      let count = this.observeList.length
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
      this.observeParams.offset = current
      this.getObList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      console.log('当前分页Size改变')
      this.observeParams.limit = size
      this.getObList()
    },

    // 搜索
    searchTask(content) {
      this.observeParams.observedName = content
      this.observeParams.offset = 1
      this.getObList()
    },

    // 清空
    clearTask() {
      this.observeParams.observedName = ''
      this.observeParams.offset = 1
      this.getObList()
    },

    // 打开添加观察任务弹窗
    openDialogAddObserve() {
      this.ruleFormAddObserve = {
        "observedName": "",
        "pointId": "",   
        "epedId": this.parentCode, 
        "pointData": "" // 1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
      },
      this.dialogAddObserve = true
    },

    // 弹窗检测区域改变
    pointIdChange() {

    },

    // 提交添加观察任务
    submitAddObserve() {
      console.log('添加观察任务', this.ruleFormAddObserve)
      api.digital.addObserve(this.ruleFormAddObserve).then(res => {
        console.log('添加成功？', res.data)
      })
    },

    // 打开编辑观察任务弹窗
    openDialogEditObserve(obInfo) {
      // 查看观察任务接口有问题，列表和详情缺少pointId
      console.log('编辑', obInfo)
      this.currentObId = obInfo.observedId
      this.dialogAddObserveTitle = '编辑观察任务'
      this.ruleFormAddObserve = {
        "observedName": "",
        "pointId": "",   
        "epedId": this.parentCode, 
        "pointData": "" // 1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
      },
      this.dialogAddObserve = true
    },

    // 提交编辑观察任务
    submitAddObserve() {
      console.log('编辑观察任务', this.ruleFormAddObserve)
      let param = {
        "observedId": this.currentObId,
        "observedName": this.ruleFormAddObserve.observedName,
        "pointId": this.ruleFormAddObserve.pointId,
        "pointData": this.ruleFormAddObserve.pointData   
      }
      api.digital.editObserve(param).then(res => {
        console.log('编辑成功？', res.data)
      })
    },

    // 关闭弹窗
    closeDialogObserve() {
      this.dialogAddObserve = false
      this.currentObId = ''
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
#ObserveList{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 4%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 22%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 25%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 33%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 16%;
  }

}

</style>
