<template>
  <div id="ObserveList" class="xym">
    <div class="bread-nav">
      <span @click="$router.push('/digital-list')">数字防疫点</span>
      <span @click="$router.go(-1)">/ 档案</span>
      <em>/ 检测任务管理</em>
    </div>

    <div class="x-container">
      <div class="x-digital-detail clearfix">
        <div class="xddetail-name">
          <div class="xddetail-name-p">{{epedName | splitEpedName}}</div>
          <div class="xddetail-name-p-full" v-if="epedName.length >= 10">{{epedName}}</div>
        </div>
        <div class="xddetail-list clearfix">
          <div class="xddetail-list-item-first clearfix">
            <div class="xddetail-list-item clearfix" style="width: 100%">
              <div class="xddetail-list-item-title">内部编号</div>
              <div class="xddetail-list-item-p">{{inNum}}</div>
            </div>

          </div>
          <div class="xddetail-list-item-second clearfix">
            <div class="xddetail-list-item clearfix">
              <div class="xddetail-list-item-title">区域</div>
              <div class="xddetail-list-item-p">{{localArea}}</div>
            </div>
            <div class="xddetail-list-item clearfix">
              <div class="xddetail-list-item-title">详细地址</div>
              <div class="xddetail-list-item-p" style="padding-right: 0;">{{address}}</div>
            </div>
          </div>
          <div class="xddetail-list-item-third clearfix">
            <div class="xddetail-list-item clearfix">
              <div class="xddetail-list-item-title">所属上级</div>
              <div class="xddetail-list-item-p xddetail-list-item-p-parent" ref="parentRef" style="padding-right: 0;">
                {{parentName ? parentName : '--'}}
                <div class="xddetail-name-p-full" v-if="parentNameShow">{{parentName}}</div>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      <div class="xdi-detail clearfix">
        <div class="xdi-detail-left">
          <div class="xdi-detail-name">{{epedName | splitEpedName}}</div>
          <div class="xdi-detail-name-full" v-if="epedName.length >= 10">{{epedName}}</div>
        </div>
        <div class="xdi-detail-right">
          <div class="xdi-detail-item-con">
            <div class="xdi-detail-item clearfix">
              <div class="xdi-detail-item-title">内部编号</div>
              <div class="xdi-detail-item-p">{{inNum}}</div>
            </div>
            <div class="xdi-detail-item clearfix">
              <div class="xdi-detail-item-title">区域</div>
              <div class="xdi-detail-item-p">{{localArea}}</div>
              <div class="xdi-detail-item-title">详细地址</div>
              <div class="xdi-detail-item-p xdi-detail-item-p-address">{{address}}</div>
            </div>
            <div class="xdi-detail-item clearfix">
              <div class="xdi-detail-item-title">所属上级</div>
              <div class="xdi-detail-item-p xdi-detail-item-p-parent" ref="parentRef" style="padding-right: 10px;">
                {{parentName ? parentName : '--'}}
                <div class="xddetail-name-p-full" v-if="parentNameShow">{{parentName}}</div>
              </div>
            </div>

          </div>
          



        </div>

      </div>





      <div class="x-list">
        <div class="xlist-choose clearfix">
          <div class="xlist-choose-si">
            <search-input ref="searchInputRef" placeholderValue="搜索检测任务名称" @search="searchTask" @cancel="clearTask"></search-input>
          </div>
        </div>

        <div class="xlist-operator">
          <div class="xlist-operator-content clearfix">
            <div class="xop-btn-submit" @click="openDialogAddObserve">添加检测任务</div>
            <div class="xop-btn-delete" @click="openDialogDeleteObserve">删除任务</div>
          </div>
        </div>

        <div class="x-list-block"></div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">检测任务名称</div>
              <div class="llt-th">检测区域</div>
              <div class="llt-th">检测数据类型</div>
              <!-- <div class="llt-th">操作</div> -->
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="observeList.length == 0">暂无数据</div>

            <div class="llt-tr clearfix" v-for="(item, i) in observeList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLifts" @change="checkedLiftsChange">
                    <el-checkbox :label="item.observedId" :key="i">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.observedName}}</div>
                <div class="llt-td">{{item.pointName}}</div>
                <div class="llt-td">{{item.pointData | returnPointDataCN}}</div>
                <!-- <div class="llt-td">
                  <span class="llt-td-a" @click="openDialogEditObserve(item.observedId)">编辑</span>
                </div> -->
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


    <!-- 添加检测任务弹窗 -->
    <el-dialog :visible.sync="dialogAddObserve" :title="dialogAddObserveTitle" @close="closeDialogObserve" :show-close="false" width="700px">
      <div class="dia-content">
        <el-form :model="ruleFormAddObserve" :rules="rulesAddObserve" ref="addObserveRef" class="diaForm">
          <div class="dia-clist">
            <div class="dia-citem">
              <el-form-item prop="observedName">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>检测任务名称：</div>
                <div class="dia-citem-ib">
                  <el-input v-model="ruleFormAddObserve.observedName" maxlength="50" size="small" placeholder="请输入检测任务名称"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="pointId">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>检测区域：</div>
                <div class="dia-citem-ib">
                  <!-- <el-input v-model="ruleFormCheckPoint.pointName" size="small" placeholder="请选择部件"></el-input> -->
                  <el-select v-model="ruleFormAddObserve.pointId" @change="pointIdChange" placeholder="请选择检测区域" size="small" style="width: 100%;">
                    <el-option v-for="item in observePointOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="pointData">
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
              </el-form-item>
              
            </div>

          </div>
        </el-form>

        <div class="dia-btn-con" v-if="dialogAddObserveTitle=='添加检测任务'" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogObserve">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitAddObserve">完成</div>
        </div>
        <div class="dia-btn-con" v-else style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogObserve">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitEditObserve">完成</div>
        </div>

      </div>


    </el-dialog>

    <!-- 删除检测任务弹窗 -->
    <el-dialog :visible.sync="dialogDeleteObserve" title="删除检测任务" :show-close="false" width="700px">
      <div class="dia-content">
        <div class="dia-con-p">
          <h4>是否确认删除</h4>
          <!-- <p>删除后不可复原，请谨慎操作</p> -->
        </div>
        <!-- <ul class="dia-ul clearfix">
          <li :class="checkedLifts.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedLifts" :key="i">{{item}}</li>
        </ul> -->
        <div class="dia-btn-con" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="dialogDeleteObserve=false">取消</div>
          <div class="dia-btn dia-btn-submit" @click="deleteObserve">确认</div>
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
      parentCode: '',

      // --详情--
      epedName: "",    
      inNum: "",         
      localArea: "",         
      address: "",  
      parentName: "",
      parentNameShow: '',  

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

      // --添加检测任务弹窗（编辑可共用？）--
      dialogAddObserveTitle: '添加检测任务',
      dialogAddObserve: false,
      ruleFormAddObserve: {
        "observedName": "",
        "pointId": "",   
        "epedId": "", 
        "pointData": "" // 1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
      },
      rulesAddObserve: {
        observedName: [{ required: true, message: '必填', trigger: 'blur' }],
        pointId: [{ required: true, message: '必填', trigger: 'change' }],
        pointData: [{ required: true, message: '必填', trigger: 'change' }],
      },
      observePointOptions: [],
      currentObId: '',
      pointDataRadio: [],


      // --删除弹窗--
      dialogDeleteObserve: false,

    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
    this.observeParams.epedId = this.$route.query.epedId
  },
  mounted() {
    // 获取检测任务列表
    this.getObList()

    // 获取详情
    this.getDigitalDetail()

    // 获取下拉
    this.getObservePointOptions()

    
    // 展示长度，临时
    const el = this.$refs.parentRef
    setTimeout(() => {
      this.parentNameShow = el.clientWidth < el.scrollWidth
    }, 300)
    window.addEventListener('resize', () => {
      this.parentNameShow = el.clientWidth < el.scrollWidth
    })

  },
  methods: {
    // 获取检测任务列表
    getObList() {
      api.digital.getObserveList(this.observeParams).then(res => {
        console.log('检测任务列表', res.data)
        this.observeList = res.data.data.records

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
        this.epedName = detail.epedName   
        this.inNum = detail.inNum       
        this.localArea = detail.localArea   
        this.address = detail.address
        this.parentName = detail.parentName
      })
    },

    // 获取检测区域下拉
    getObservePointOptions() {
      api.digital.getEpidemicMonitorList(this.parentCode).then(res => {
        console.log('下拉', res.data)
        let detail = res.data.data

        this.observePointOptions = []
        detail.forEach(item => {
          this.observePointOptions.push({
            value: item.pointId, 
            label: item.pointName,
            pointData: item.pointData
          })
        })
      })

    },

    // 任务多选
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

    // 打开添加检测任务弹窗
    openDialogAddObserve() {
      // 获取下拉
      this.getObservePointOptions()
      this.dialogAddObserveTitle = '添加检测任务'

      this.ruleFormAddObserve = {
        "observedName": "",
        "pointId": "",   
        "epedId": this.parentCode, 
        "pointData": "", // 1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
      },
      this.dialogAddObserve = true
    },

    // 弹窗检测区域改变
    pointIdChange() {
      console.log('区域id', this.ruleFormAddObserve.pointId)

      // 筛选出符合条件的对象，返回数组
      let selectPointArr = this.observePointOptions.filter(item => {
        return item.value == this.ruleFormAddObserve.pointId
      })

      // 动态渲染单选框
      this.pointDataRadio = []
      if (selectPointArr.length > 0) {
        let selectPointData = selectPointArr[0].pointData
        selectPointData.split('|').forEach(item => {
          this.pointDataRadio.push({
            value: parseInt(item),
            label: xymFun.returnPointDataCN(item)
          })
        })
      }

    },

    // 提交添加检测任务
    submitAddObserve() {
      let that = this
      this.$refs.addObserveRef.validate(valid => {
        if (valid) {
          console.log('添加检测任务', this.ruleFormAddObserve)
          let param = {
            "observedName": this.ruleFormAddObserve.observedName,
            "pointId": this.ruleFormAddObserve.pointId,
            "epedId": this.parentCode,
            "pointData": this.ruleFormAddObserve.pointData
          }
          api.digital.addObserve(param).then(res => {
            console.log('添加成功', res.data)
            if (res.data.code == 200) {
              this.$message.success('添加成功')
              this.dialogAddObserve = false
              this.getObList()
            } else {
              this.$message.error(res.data.message)
            }
            
          })

        }
      })
      
    },

    // 打开编辑检测任务弹窗
    openDialogEditObserve(observedId) {
      api.digital.getObserveDetail(observedId).then(res => {
        console.log('res', res.data)
        let obInfo = res.data.data
        this.dialogAddObserve = true

        this.currentObId = obInfo.observedId
        this.dialogAddObserveTitle = '编辑检测任务'
        this.ruleFormAddObserve = {
          "observedName": obInfo.observedName,
          "pointId": obInfo.pointId,   
          "epedId": this.parentCode, 
          "pointData": obInfo.pointData
        }
        this.pointIdChange()
      })
    },

    // 提交编辑检测任务
    submitEditObserve() {
      let that = this
      this.$refs.addObserveRef.validate(valid => {
        if (valid) {
          console.log('编辑检测任务', this.ruleFormAddObserve)
          let param = {
            "observedId": this.currentObId,
            "observedName": this.ruleFormAddObserve.observedName,
            "pointId": this.ruleFormAddObserve.pointId,
            "pointData": this.ruleFormAddObserve.pointData   
          }
          api.digital.editObserve(param).then(res => {
            if (res.data.code == 200) {
              this.$message.success('编辑成功')
              this.dialogAddObserve = false
              this.getObList()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
      
    },

    // 关闭弹窗
    closeDialogObserve() {
      this.$refs.addObserveRef.clearValidate()
      this.dialogAddObserve = false
      this.currentObId = ''
    },

    // 打开删除任务弹窗
    openDialogDeleteObserve() {
      if (this.checkedLifts.length === 0) return this.$message.error('请选择要删除的检测任务') 

      this.dialogDeleteObserve = true
    },

    // 删除任务
    deleteObserve() {
      let param = this.checkedLifts.join(',')
      api.digital.deleteObserve(param).then(res => {
        if (res.data.code == 200) {
          console.log('删除成功', res.data)
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.data.message)
        }
        
        this.dialogDeleteObserve = false
        this.checkedLifts = []
        this.checkedAll = false
        this.getObList()
      })
    },



  },
  filters: {
    // 超出长度10，显示省略号
    splitEpedName: function (str) {
      if (typeof str == 'string' && str.length >= 10) {
        return str.substring(0, 8) + '...'
      } else {
        return str
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

<style lang="stylus" scoped>
#ObserveList{
  .xddetail-list-item-p-parent{
    width: calc(100% - 200px) !important;
    padding-right: 0 !important;
  }
  .xddetail-name{
    min-width: 160px;
  }
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 4%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 35%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 32%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 29%;
  }
  // .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
  //   width 16%;
  // }

}

@media screen and (max-width: 1600px) {
  #ObserveList{
    .xddetail-list{
      width 63%;
    }
    .xddetail-list-item-second .xddetail-list-item-p{
      max-width: 250px;
      padding-right: 30px;
    }
  }
}
@media screen and (max-width: 1400px) {
  #ObserveList{
    .xddetail-list{
      width 60%;
    }
    .xddetail-list-item-second .xddetail-list-item-p{
      max-width: 216px;
      padding-right: 30px;
    }
  }
}

</style>
