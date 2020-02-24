<template>
<div class="main-wrap" id="entryRecord">
  <div class="pageTitle">防疫点出入记录</div>
  <div class="row" >

    <div class="panel topSelect">
       <div class="subSelect">
        <el-date-picker
          v-model="queryParam.date"
          class="datePicker"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="getAllAccountData()"
          :picker-options="pickerOptions"
          >
        </el-date-picker>
        <span class="splitLine">|</span>
        
        <el-select @change="corpSelectChange()" clearable v-model="queryParam.corpId" placeholder="全部单位" class="regionPicker">
          <el-option
            v-for="item in corpLists"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="splitLine">|</span>

        <radio-group :items="periods1" :value.sync="period1">
          <span slot="label">防疫点类型：</span>
        </radio-group>

        <search-input v-model.trim="searchKey" placeholderValue="搜索防疫点名称" @search="searchAccount()" @cancel="searchAccount()"></search-input>
      </div>
    </div>
  </div>
  <div class="row" >

    <div class="panel scdPanel">
      
      <!-- 表格 Start -->
      <div style="position:relative;;display:flex;">
        &nbsp;
        <el-table :data="getAllAccountJson">
          <el-table-column prop="epedName" label="防疫点名称">
          </el-table-column>
      
          <el-table-column prop="corpName" label="所属单位">
          </el-table-column>
          
          <el-table-column prop="pointNum" label="检测区域数">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.roleName" v-html="scope.row.roleName" ></span>
              <span v-if="scope.row.type == 'administrator'" >超级管理员</span>
            </template> -->
          </el-table-column>
          
          <el-table-column prop="countNum" label="日人流量">
          </el-table-column>

          <el-table-column label="异常人数">
            <template slot-scope="scope">
              <span v-text="scope.row.abnormalNum" style="color: #F56B25;"></span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <!-- 1.在封装好的组件上使用，所以要加上.native才能click
              2.prevent就相当于..event.preventDefault() -->
              <el-button @click.native.prevent="seeEpedDot(scope.$index, scope.row)" type="text">查看详情
              </el-button>
              
            </template>
          </el-table-column>
        </el-table>
        &nbsp;
      </div>
      <!-- 表格 End -->
      
      <!-- 分页 Start -->
      <div class="pagination_block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryParam.offset"
          :page-sizes="[10, 20, 30]"
          :page-size="queryParam.limit"
          layout="prev, pager, next, sizes, jumper"
          :total="totalPageSize">
        </el-pagination>
      </div>
      <!-- 分页 End -->

    </div>
    
  </div>


  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";

export default {
  data() {
    return {
      pickerOptions: { // 工单时间不让选择今天以后的
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      
      query:'',
      searchKey:'',
      act_index:'0',
      totalPageSize:0, // 总页数
      queryParam:{
        offset:1,
        limit:10,
        epedStatus:'',
        search:'',
        corpId:'',
        date:''
      },
      getAllAccountJson: [],
   
      periods1: [
        { label: '全部', value: "" },
        { label: '正常', value: "1" },
        { label: '异常', value: "0" },
      ],
      period1:"",
      confirmDelete:{},
      getAllDepJson:[],
      value1:'',
      corpLists:[],

    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
  },
  watch:{
    // period(val){
    //   this.queryParam.roleId = val
    //   this.getAllAccountData()
    // },
    period1(val){
      this.queryParam.epedStatus = val
      this.getAllAccountData()
    }
  },
  mounted() {
    // this.queryParam.corpId = window.localStorage.getItem('corpId')
    // this.getAllRoleData()
    // 防疫记录列表
    this.getAllAccountData()
    // 获取公司
    this.getCorps()
  },
  methods: {
    // 获取公司
    getCorps(){
      api.person.getCorps().then((res) => {
        if(res.data.code == 200) {
          this.corpLists = res.data.data || []
        }
      })
    },
    
    // 筛选单位（公司）
    corpSelectChange(){
      if(this.queryParam.corpId !== '') {
        this.searchKey = this.queryParam.search  = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
    // 根据部门筛选
    depSelectChange() {
      if(this.queryParam.depId !== '') {
        this.searchKey = this.queryParam.search  = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
    // 查询所有账户
    getAllAccountData(){
      api.person.getEntryRecord(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.totalPageSize = res.data.data.total
          // for(var i = 0; i < this.getAllAccountJson.length; i++){
            
          //   // console.log("aaaaaaaaaaaaa===" + this.rolesJson.length)
          //   for(var j =0 ;j < this.rolesJson.length;j++){
          //     // jsonArr[j] = this.rolesJson[j].name;
          //     if(this.getAllAccountJson[i].roleId === this.rolesJson[j].id){
          //       // console.log("1111===" + JSON.stringify(this.getAllAccountJson))
          //       this.$set(this.getAllAccountJson[i],'roleName',this.rolesJson[j].name)
          //     }
          //   }
          // }
          

        } else {
          this.getAllAccountJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    // 打开重置密码弹窗
    openResetPasswordDialog(account){
      this.resetPasswordDialogVisoble = true
      this.confirmReset = account
    },
    // 关闭重置密码弹窗
    cancelResetPassword(){
      this.resetPasswordDialogVisoble = false
      this.confirmReset = {}
    },
    // 确认重置密码
    resetPassword(row){
      // this.$confirm('是否重置密码?（重置后的密码为666666）', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'error'
      // }).then(() => {
        api.accountApi.resetAccount({"ids":row.id.split(",")}).then((res) => {
          if (res.data.code === 200) {
            this.getAllAccountData()
            this.resetPasswordDialogVisoble = false
            if(res.data.message == "员工重置成功,管理员账号需要更高权限"){
              this.$message.error("账号操作权限不足");
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            // this.$message.error(res.data.message);
            this.$message.error("账号操作权限不足");
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      // }).catch(() => {
      //   this.$message.info("取消重置密码");            
      // });
    },

    // 关闭编辑弹窗
    editDialogClose () {
      // console.log("1")
      this.$refs['editForm'].clearValidate();
      this.$refs['editForm'].resetFields()
      // console.log("2")
    },
    // 切换防疫点
    seeEpedDot(index, row) {
      // TODO reset...
      this.$router.push({
        path: '/detection-panel',
        query: {
          epedId: row.epedId
        }
      })
    },

    // 每页条数变化
    handleSizeChange(val) {
      this.queryParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getAllAccountData()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.queryParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getAllAccountData()
    },
    

    // 搜索真实姓名/手机号
    searchAccount(){
      this.queryParam.offset = 1
      this.queryParam.search = this.searchKey
      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
#entryRecord
  .showName
    font-size: 30px;
    color: #34414C;
    text-align: center;
    line-height 42px
    padding 0 0 30px 0
</style>
