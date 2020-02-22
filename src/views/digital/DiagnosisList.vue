<template>
  <div id="DiagnosisList" class="xym">
    <div class="bread-nav">
      <span @click="$router.push('/digital-list')">数字防疫点</span>
      <span @click="$router.go(-1)">/ 档案</span>
      <em>/ 监测应用管理</em>
    </div>

    <div class="x-container">
      <div class="x-digital-detail">
        <div class="xddetail-name">
          <div class="xddetail-name-p">{{epedName}}</div>
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
            <div class="xddetail-list-item-title">所属上级</div>
            <div class="xddetail-list-item-p" style="padding-right: 0;">{{parentName ? parentName : '--'}}</div>
          </div>
        </div>

      </div>

      <div class="x-list">
        <div class="xlist-choose clearfix">
          <radio-group :items="statusItem" :value.sync="statusValue" style="margin-top: 5px;float: left;">
            <span slot="label">状态：</span>
          </radio-group>
          <div class="xlist-choose-si">
            <search-input ref="searchInputRef" placeholderValue="搜索监测应用名称" @search="searchTask" @cancel="clearTask"></search-input>
          </div>
        </div>
        <div class="xlist-operator">
          <div class="xlist-operator-content clearfix">
            <div class="xop-btn-submit" @click="openDialogAddDiagn">添加监测应用</div>
            <div class="xop-btn-delete" @click="openDialogDeleteDiagn">删除应用</div>
          </div>
        </div>
        <div class="x-list-block"></div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">监测应用名称</div>
              <div class="llt-th">已关联观察任务(id)</div>
              <div class="llt-th">阈值判断类型</div>
              <div class="llt-th">阈值</div>
              <div class="llt-th">容错范围</div>
              <div class="llt-th">状态</div>
              <div class="llt-th">操作</div>
            </div>
          </div>

          <div class="llt-tbody">
            <div class="list-no-data" v-show="diagnList.length == 0">暂无数据</div>

            <div class="llt-tr clearfix" :class="item.enable ? '' : 'offline'" v-for="(item, i) in diagnList" :key="item.id">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLifts" @change="checkedLiftsChange">
                    <el-checkbox :label="item.id" :key="i">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.name}}</div>
                <div class="llt-td">{{item.taskName}}({{item.observeTaskId}})</div>
                <div class="llt-td">{{item.operator | returnOperatorCN}}</div>
                <div class="llt-td">{{item.value}}</div>
                <div class="llt-td">{{item.errValue}}</div>
                <div class="llt-td">
                  <div class="ll-table-switch">
                    <el-switch v-model="item.enable" @change="switchChange($event, item.id)" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28></el-switch>
                  </div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="openDialogEditDiagn(item.id)">编辑</span>
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


    <!-- 添加监测应用弹窗 -->
    <el-dialog :visible.sync="dialogAddDiagn" :title="dialogAddDiagnTitle" @close="closeDialogDiagn" :show-close="false" width="700px">
      <div class="dia-content">
        <el-form :model="ruleFormAddDiagn" :rules="rulesAddDiagn" ref="addDiagnRef" class="diaForm">
          <div class="dia-clist">
            <div class="dia-citem">
              <el-form-item prop="name">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>监测应用名称：</div>
                <div class="dia-citem-ib">
                  <el-input v-model="ruleFormAddDiagn.name" size="small" placeholder="请输入名称"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="observTaskId">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>观察任务：</div>
                <div class="dia-citem-ib">
                  <el-select v-model="ruleFormAddDiagn.observTaskId" placeholder="请选择观察任务" size="small" style="width: 100%;">
                    <el-option v-for="item in observTaskOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="operator">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>阈值判断类型</div>
                <div class="dia-citem-ib">
                  <el-select v-model="ruleFormAddDiagn.operator" placeholder="请选择阈值判断类型" size="small" style="width: 100%;">
                    <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="value">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>阈值：</div>
                <div class="dia-citem-ib">
                  <el-input v-model="ruleFormAddDiagn.value" size="small" placeholder="请输入阈值"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="dia-citem">
              <el-form-item prop="error">
                <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>容错范围：</div>
                <div class="dia-citem-ib">
                  <el-input v-model="ruleFormAddDiagn.error" size="small" placeholder="请输入容错值"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>

        <div class="dia-btn-con" v-if="dialogAddDiagnTitle=='添加监测应用'" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogDiagn">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitAddDiagn">完成</div>
        </div>
        <div class="dia-btn-con" v-else style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogDiagn">取消</div>
          <div class="dia-btn dia-btn-submit" @click="submitEditDiagn">完成</div>
        </div>

      </div>


    </el-dialog>

    <!-- 删除监测应用弹窗 -->
    <el-dialog :visible.sync="dialogDeleteDiagn" title="删除监测应用" :show-close="false" width="700px">
      <div class="dia-content">
        <div class="dia-con-p">
          <h4>是否确认删除</h4>
          <!-- <p>删除后不可复原，请谨慎操作</p> -->
        </div>
        <!-- <ul class="dia-ul clearfix">
          <li :class="checkedLifts.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedLifts" :key="i">{{item}}</li>
        </ul> -->
        <div class="dia-btn-con" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="dialogDeleteDiagn=false">取消</div>
          <div class="dia-btn dia-btn-submit" @click="deleteDiagn">确认</div>
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

      // --列表--
      diagnList: [],
      test: '',
      liftselevCodeOptions: [],
      checkedLifts: [],
      checkedAll: false,
      diagnParams: {
        "epId": "",   //必填 
        "limit": 10, 
        "offset": 1,
        "search": "",
        "status": "-1"  // 是否启用 -1全部 0停用 1启用    
      },
      statusItem: [
        {label: '全部', value: -1},
        {label: '启用', value: 1},
        {label: '停用', value: 0},
      ],
      statusValue: -1,

      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      // --添加监测应用弹窗（编辑共用）--
      dialogAddDiagnTitle: '添加监测应用',
      dialogAddDiagn: false,
      ruleFormAddDiagn: {
        "name": "名称",  //必填
        "epId": "防疫点Id",
        "observTaskId": "检测任务ID",   //必填
        "operator": 3, // 阀值判断类型: 0 - == 等于, 1 - > 大于, 2 - < 小于, 3 - >= 大于等于, 4 - <= 小于等于, 5 - != 不等于
        "value": 38.0, // 阀值
        "error": 0.5 // 容错范围
      },
      rulesAddDiagn: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        observTaskId: [{ required: true, message: '必填', trigger: 'change' }],
        operator: [{ required: true, message: '必填', trigger: 'change' }],
        value: [{ required: true, message: '必填', trigger: 'blur' }],
        error: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      observTaskOptions: [],
      currentDiagnId: '',
      operatorOptions: [
        {label: '≥', value: 3},
        {label: '≤', value: 4},
        {label: '=', value: 0},
        {label: '≠', value: 5},
      ],

      // --删除弹窗--
      dialogDeleteDiagn: false,


    }
  },
  created() {
    this.parentCode = this.$route.query.epedId
    this.diagnParams.epId = this.$route.query.epedId
  },
  mounted() {
    // 获取监测应用列表
    this.getDiagnList()

    // 获取详情
    this.getDigitalDetail()

    this.getObservTaskOptions()

  },
  methods: {
    // 获取监测应用列表
    getDiagnList() {
      api.digital.getDiagnosisList(this.diagnParams).then(res => {
        console.log('监测应用列表', res.data)
        this.diagnList = res.data.data.records

        // 用于全选
        this.liftselevCodeOptions = []
        this.diagnList.forEach(item => {
          this.liftselevCodeOptions.push(item.id)
        })

        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total
      })
    },

    // 获取下拉
    getObservTaskOptions() {
      api.digital.getUnusedTask(this.parentCode).then(res => {
        console.log('观察任务下拉', res.data)
        let detail = res.data.data
        this.observTaskOptions = []
        detail.forEach(item => {
          this.observTaskOptions.push({
            label: item.name,
            value: item.id
          })
        })
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

    // 任务多选
    checkedLiftsChange(val) {
      let count = this.diagnList.length
      // 总数达到就全选
      this.checkedAll = val.length === count ? true : false
    },

    // 全选
    checkedAllChange(checkedBoolean) {
      this.checkedLifts = checkedBoolean ? this.liftselevCodeOptions : []
    },

    // 当前分页改变
    currentPageChange(current) {
      console.log('当前分页改变')
      this.diagnParams.offset = current
      this.getDiagnList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      console.log('当前分页Size改变')
      this.diagnParams.limit = size
      this.getDiagnList()
    },

    // 搜索
    searchTask(content) {
      this.diagnParams.search = content
      this.diagnParams.offset = 1
      this.getDiagnList()
    },

    // 清空
    clearTask() {
      this.diagnParams.search = ''
      this.diagnParams.offset = 1
      this.getDiagnList()
    },

    // 打开添加监测应用弹窗
    openDialogAddDiagn() {
      this.dialogAddDiagnTitle = '添加监测应用'

      this.ruleFormAddDiagn = {
        "name": "",
        "epedId": this.parentCode, 
        "observTaskId": "",
        "operator": "",
        "value": "",
        "error": ""
      }
      this.dialogAddDiagn = true
    },

    // 提交添加监测应用
    submitAddDiagn() {
      let that = this
      this.$refs.addDiagnRef.validate(valid => {
        if (valid) {
          console.log('添加监测应用', this.ruleFormAddDiagn)
          let param = {
            "name": this.ruleFormAddDiagn.name,
            "epedId": this.parentCode, 
            "observeTaskId": this.ruleFormAddDiagn.observTaskId,
            "operator": this.ruleFormAddDiagn.operator,
            "value": this.ruleFormAddDiagn.value,
            "errValue": this.ruleFormAddDiagn.error
          }
          api.digital.addDiagnosis(param).then(res => {
            console.log('添加成功', res.data)
            this.$message.success('添加成功')
            this.dialogAddDiagn = false
            this.getDiagnList()
          })

        }

      })
      
    },

    // 打开编辑监测应用弹窗
    openDialogEditDiagn(id) {
      api.digital.getDiagnosis(id).then(res => {
        console.log('res查看', res.data)
        let diagnInfo = res.data.data
        this.dialogAddDiagn = true

        this.currentDiagnId = diagnInfo.id
        this.dialogAddDiagnTitle = '编辑监测应用'
        this.ruleFormAddDiagn = {
          "name": diagnInfo.name,
          "epId": this.parentCode, 
          "observTaskId": diagnInfo.observeTaskId,
          "operator": parseInt(diagnInfo.operator),
          "value": diagnInfo.value,
          "error": diagnInfo.errValue
        }
      })
    },

    // 提交编辑监测应用
    submitEditDiagn() {
      let that = this
      this.$refs.addDiagnRef.validate(valid => {
        if (valid) {
          console.log('添加监测应用', this.ruleFormAddDiagn)
          let param = {
            "id": this.currentDiagnId,
            "name": this.ruleFormAddDiagn.name,
            // "epId": this.parentCode, 
            "observeTaskId": this.ruleFormAddDiagn.observTaskId,
            "operator": this.ruleFormAddDiagn.operator,
            "value": this.ruleFormAddDiagn.value,
            "errValue": this.ruleFormAddDiagn.error
          }
          api.digital.editDiagnosis(param).then(res => {
            console.log('添加成功', res.data)
            this.$message.success('编辑成功')
            this.dialogAddDiagn = false
            this.currentDiagnId = ''
            this.getDiagnList()
          })

        }
      })
      
    },

    // 关闭弹窗
    closeDialogDiagn() {
      this.$refs.addDiagnRef.clearValidate()
      this.dialogAddDiagn = false
      this.currentDiagnId = ''
    },

    // 打开删除任务弹窗
    openDialogDeleteDiagn() {
      if (this.checkedLifts.length === 0) return this.$message.error('请选择要删除的监测应用') 

      this.dialogDeleteDiagn = true
    },

    // 删除任务
    deleteDiagn() {
      let param = {
        ids: this.checkedLifts
      }
      api.digital.deleteDiagnosis(param).then(res => {
        console.log('删除成功', res.data)
        this.$message.success('删除成功')
        this.dialogDeleteDiagn = false
        this.checkedLifts = []
        this.getDiagnList()
      })
    },

    // 监测应用开关
    switchChange(enabledVal, id) {
      const that = this
      let param = {
        "id": id,
        "enable": enabledVal
      }

      api.digital.switchDiagnosis(param).then(res => {
        console.log('开关', res.data)
        this.$message.success('成功')
      })
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

  },
  watch: {
    // 状态筛选
    statusValue(val, oldVal) {
      this.diagnParams.status = val
      this.diagnParams.offset = 1
      this.getDiagnList()
    },
  },
  components: {
    'city-choose2': CityChoose2,
    'search-input': SearchInput,
    'footer-temp': Footer,
    'radio-group': RadioGroup,

  }
}
</script>

<style lang="stylus" scoped>
#DiagnosisList{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 5%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 15%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 18%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 13%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 13%;
  }
  .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(7),.llt-tbody .llt-td:nth-child(7){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(8),.llt-tbody .llt-td:nth-child(8){
    width 12%;
  }

}

</style>
