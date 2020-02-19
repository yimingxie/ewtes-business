<template>
<div class="main-wrap" id="entryRecord">
  <div class="pageTitle">防疫点出入记录</div>
  <div class="row" >

    <div class="panel topSelect">
       <div class="subSelect">
        <el-date-picker
          v-model="value1"
          class="datePicker"
          type="date"
          placeholder="选择日期"
          
          >
        </el-date-picker>
        <span class="splitLine">|</span>
        <el-select @change="depSelectChange()" clearable v-model="queryParam.depId" placeholder="全部单位" class="regionPicker">
          <el-option
            v-for="item in getAllDepJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="splitLine">|</span>

        <!-- <radio-group :items="periods" :value.sync="period">
          <span slot="label">角色类型：</span>
        </radio-group>
        <span class="splitLine">|</span> -->
        <radio-group :items="periods1" :value.sync="period1">
          <span slot="label">防疫点类型：</span>
          <!-- <template slot="item" scope="props">
            <li>{{ props.text }}</li>
          </template> -->
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
          <el-table-column prop="username" label="防疫点名称">
          </el-table-column>
      
          <el-table-column prop="name" label="所属单位">
          </el-table-column>
          
          <el-table-column  label="检测区域数">
            <template slot-scope="scope">
              <span v-if="scope.row.roleName" v-html="scope.row.roleName" ></span>
              <span v-if="scope.row.type == 'administrator'" >超级管理员</span>
            </template>
          </el-table-column>
          <!-- <el-table-column  label="账号状态">
            <template slot-scope="scope">
              <span v-html="scope.row.status"></span>
              <el-switch
                v-model="scope.row.status"
                active-color="#E2E6E8"
                inactive-color="#E3E7E9"
                :active-value="1"
                :inactive-value="0"
                active-text="启用"
                inactive-text="停用"
                :width=28
                
                @change='changeStatus($event,scope.$index,scope.row)'
                >
              </el-switch>
            </template>
          </el-table-column> -->
          <!-- <el-table-column  label="日人流量" align="center">
            <template slot-scope="scope" >
              <el-switch
                v-model="scope.row.valid"
                active-color="#E2E6E8"
                inactive-color="#E3E7E9"
                :active-value="1"
                :inactive-value="0"
                :width=28
                @change='changeStatus($event,scope.$index,scope.row)'
              >
              </el-switch>
            </template>
          </el-table-column> -->
          <el-table-column prop="username" label="日人流量">
          </el-table-column>

          <el-table-column label="告警数">
            <template slot-scope="scope">
              <span v-text="scope.row.name" style="color: #F56B25;"></span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <!-- 1.在封装好的组件上使用，所以要加上.native才能click
              2.prevent就相当于..event.preventDefault() -->
              <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">查看详情
              </el-button>
              <!-- <el-button class="deleteTextBtn" @click.native.prevent="openDeleteDialog(scope.row)" type="text">删除
              </el-button>
              <el-button @click.native.prevent="openResetPasswordDialog(scope.row)" type="text">重置登录密码
              </el-button> -->
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

  <!-- 添加账号  弹窗  Start -->
  <el-dialog width="662px" title="添加账号" :visible.sync="add_dialogFormVisible">
    <el-form :model="addAccountForm" :label-width="formLabelWidth" :rules="addAccountRules" ref="addForm" :hide-required-asterisk='true'>
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="addAccountForm.account" placeholder="请输入登录账号，即手机号" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="addAccountForm.name" placeholder="请输入账号真实姓名" auto-complete="off" clearable size="small"></el-input>
      </el-form-item>
      
    
      <el-form-item label="角色：" prop="roleId" >
        <el-select v-model="addAccountForm.roleId" placeholder="请选择角色" size="small">
          <el-option
            v-for="item in rolesJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer"  class="dialog-footer tac">
      <el-button @click="add_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="confirmAddAccount()" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!--添加账号  弹窗 End -->

  <!-- 编辑账号  弹窗  Start -->
  <el-dialog  width="662px" title="编辑账号" :visible.sync="edit_dialogFormVisible" custom-class="addAccount" @closed="editDialogClose">
    <div class="showName">{{ EditAccountForm.name }}</div>
    <el-form :model="EditAccountForm" :label-width="formLabelWidth" :rules="editAccountRules" ref="editForm" :hide-required-asterisk='true'>
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="EditAccountForm.account" placeholder="请输入登录账号，即手机号" auto-complete="off" disabled clearable size="small"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="EditAccountForm.name" placeholder="请输入账号真实姓名" auto-complete="off" clearable size="small"></el-input>
      </el-form-item>
      
      <!-- <el-form-item label="手机号：" prop="phoneNumber">
        <el-input v-model="EditAccountForm.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位id：" prop="ownerUnitId" >
        <el-select v-model="EditAccountForm.ownerUnitId" placeholder="请选择角色所属单位id">
          <el-option v-for="enterprise in allEnterprise_Json" :key="enterprise.unitName" :label="enterprise.unitName" :value="enterprise.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="角色：" prop="roleId" v-if="adType !='administrator'">
        <!-- <el-input v-model="addRoleForm.ownerUnitId" auto-complete="off"></el-input> -->
        <!-- <el-select v-model="edit_roleNameArr" multiple placeholder="请选择账户角色"  @change="changeSelect">
          <el-option v-for="role in rolesJson" :key="role.name" :label="role.name" :value="role.name"></el-option>
        </el-select> -->
        <el-select v-model="EditAccountForm.roleId" placeholder="请选择角色" size="small">
          <el-option
            v-for="item in rolesJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->

  <!-- 重置密码对话框 -->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="resetPasswordDialogVisoble">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <!-- <img src="../../assets/images/xym/dia-question.png" alt=""> -->
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">是否确认重置登录密码 ?</div>
          <p style="margin-bottom: 20px;">（重置后，登录密码为666666）</p>
        </div>
      </div>
      
    </div>
    <div slot="footer"  class="dialog-footer tac">
      <el-button @click="cancelResetPassword()" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="resetPassword(confirmReset)" class="dialogSure">确 认</el-button>
    </div>
  </el-dialog>

  <!-- 删除账号 弹窗-->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="deleteDialogVisoble">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <!-- <img src="../../assets/images/xym/dia-warn.png" alt=""> -->
        </div>
        <div class="dia-con-p" style="margin-bottom: 30px;">
          <div class="confirDialogText1">是否删除账号，删除后，无法复原</div>
          <!-- <p>关闭后不可复原，请谨慎操作</p> -->
        </div>
      </div>
      <!-- <div style="margin:20px 0 40px" class="tac">
        <div style="font-size: 20px;margin-bottom: 10px">任务信息</div>
        <el-row style="border-bottom: 1px solid #bdc3d1;">
          <el-col :span="8"><div class="grid-content bg-purple">电梯注册代码</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">作业时间</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">作业类型</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">作业人员</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{confirmCloseTask.elevCode}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCloseTask.beginTime}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{ typeText[confirmCloseTask.type] }}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCloseTask.persons}}</div></el-col>
        </el-row>
      </div> -->
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="cancelDelete()">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="deleteAccount(confirmDelete)">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 关闭确认 弹窗 end-->

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
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        account: '',
        password: '666666',
        corpId: window.localStorage.getItem('corpId'),
        name:'',
        // accountType: "1",
        // userType: 1, //维保创建自己的账号 类型为0；通用创建维保管理员 类型为1；通用创建通用为2
        roleId:'',
      },
      edit_dialogFormVisible: false,
      EditAccountForm: {
        uid: "",
        name: "",
        // account: "",
        roleId : "222",
      },
      query:'',
      searchKey:'',
      queryTypeOptions: [
        { label: 'MAC', value: 'mac' },
        { label: '设备ID', value: 'id' }
      ],
      queryType: {
        label: 'MAC',
        value: 'mac'
      },
      act_index:'0',
      totalPageSize:0, // 总页数
      queryParam:{
        offset:1,
        limit:10,
        // column: "create_time",
        // order: false,
        queryStr: "",
        // corpId:window.localStorage.getItem('corpId'),
        // phone:'',
        // name:'',
        status:'',
        roleId:''
      },
      getAllAccountJson: [],
      roleQueryParam:{
        limit:10,
        offset:1,
        column: "create_time",
        order: true,
        corpId:window.localStorage.getItem('corpId'),
        queryStr: ""
      },
      periods: [
        { label: '全部', value: "" },
      ],
      period:"",
      periods1: [
        { label: '全部', value: "" },
        { label: '正常', value: "1" },
        { label: '异常', value: "0" },
      ],
      period1:"",
      bindRoleForm:{
        userId:"",
        roleId:""
      },
      adType:'',
      addAccountRules: {
        account: [
          {required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 11, max: 11, message: '登录账号错误，请输入11位手机号', trigger: 'blur' },
          {
            required: true,
            pattern: /(^((1[3-9][0-9])\d{8}$))/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { max: 20, message: '真实姓名字符长度过长，请控制在20位字符以内', trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      
      },
      editAccountRules: {
        // account: [
        //   {required: true, message: '请输入登录账号', trigger: 'blur' },
        //   { min: 11, max: 11, message: '登录账号错误，请输入11位手机号', trigger: 'blur' },
        //   {
        //     required: true,
        //     pattern: /(^((1[3-9][0-9])\d{8}$))/,
        //     message: '请输入正确的手机号',
        //     trigger: 'change'
        //   }
        // ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        roleId: [
          {required: true, message: '请选择角色', trigger: 'change' }
        ],
      
      },
      resetPasswordDialogVisoble: false,
      confirmReset:{},
      deleteDialogVisoble: false,
      confirmDelete:{},
      getAllDepJson:[],
      value1:''
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
  },
  watch:{
    period(val){
      this.queryParam.roleId = val
      this.getAllAccountData()
    },
    period1(val){
      this.queryParam.status = val
      this.getAllAccountData()
    }
  },
  mounted() {
    // this.queryParam.corpId = window.localStorage.getItem('corpId')
    this.getAllRoleData()
    this.getAllAccountData()
    this.getAllDepartmentData()
  },
  methods: {
    // 查询所有部门
    getAllDepartmentData(){
      api.accountApi.getDepartments(this.queryDepartParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data.records
          // this.totalPageSize = res.data.data.total

        } else {
          this.getAllDepJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    // 根据部门筛选
    depSelectChange() {
      if(this.queryParam.depId !== '') {
        this.searchKey = this.queryParam.staffName = this.queryParam.phone = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
    // 查询所有账户
    getAllAccountData(){
      api.accountApi.getAccounts(this.queryParam).then((res) => {
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
      // api.log.getAllAccount(this.currentPage,this.pageSize).then((res) => {
        //   if(res.data.success){
            
        //     this.getAllAccountJson = res.data.result.records
        //     this.totalPageSize = res.data.result.total
        //     // 遍历所有账户，查询其角色
        //     this.getAllAccountJson.forEach((item) => {

        //       // console.log('iddddddddddddddddddddd=======' + item.id)
        //       // this.rolesJson.forEach((item2) => {
        //           // console.log('rolesJson=======' + this.rolesJson)

        //         var roleNames = ''
        //         var roleIds = []
        //         api.log.getAccount_Role(item.id).then((res1) => {
        //           if(res1.data.result){
        //             for(var i = 0; i<res1.data.result.length ; i++){
        //               roleNames = res1.data.result[i].name + " </br> " + roleNames
        //               roleIds.push(res1.data.result[i].id)
        //             }
        //           }
                  
        //           Vue.set(item, 'roleName', roleNames)
        //           Vue.set(item, 'roleIds', roleIds)
        //         })
                
        //       // })
        //     })
        //   }
        // }).catch((res) => {
        
      // })
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
    // 编辑账号
    editAccount(index, row) {
      this.EditAccountForm.uid = row.id
      this.EditAccountForm.account = row.username
      this.EditAccountForm.name = row.name
  
      this.EditAccountForm.roleId = "-1"
      if(row.roleId) {
        this.EditAccountForm.roleId = row.roleId
      }
      this.adType = row.type
      // this.EditAccountForm.phoneNumber = row.phoneNumber
      // this.edit_roleNameArr = row.roleName.split(',')
      this.edit_dialogFormVisible = true

      // // 重置
      // this.$nextTick(()=>{
      //   this.$refs['editForm'].resetFields();
        
      // })
    },

    // 确认修改
    confirmEdit(){
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
        // 修改账号名
          api.accountApi.editAccount(this.EditAccountForm).then((res) => {
            
            if(res.data.code == 200){
              // 超管修改
              // if (this.adType =='administrator') {
                this.$message.success(res.data.message);
                this.getAllAccountData()
                this.edit_dialogFormVisible = false
              // }
              // // 普通管理员修改
              // else if (this.adType !='administrator') {
              //   api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {

              //     if (res.data.code === 200) {
              //       this.$message.success('修改成功！');
              //       this.edit_dialogFormVisible = false
              //       this.getAllAccountData()
              //     } else {
              //       this.$message.error(res.data.message);
              //     }
              //   }).catch((res) => {})
              //   // this.getAllAccountData()
              //   // this.edit_dialogFormVisible = false
                
              // }
              // this.getAllAccountData()
            } else {
              if(res.data.message == "无权"){
                this.$message.error("账号操作权限不足");
              } else {
                this.$message.error(res.data.message);
              }
            }

          }).catch((res) => {
            
          })
      }})
      
    },
    // 打开删除账号确认弹窗
    openDeleteDialog(account){
      this.deleteDialogVisoble = true
      this.confirmDelete = account
    },
    // 关闭删除账号确认弹窗
    cancelDelete(){
      this.deleteDialogVisoble = false
      this.confirmDelete = {}
    },
    // 删除账号
    deleteAccount(row){
      // console.log("row" + JSON.stringify(row))
      // this.$confirm(`此操作将永久删除账号 ${row.username}, 是否继续?`, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'error'
      // }).then(() => {
        api.accountApi.deleteAccount({'uid':row.id}).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('删除成功！');
            this.getAllAccountData()
            this.deleteDialogVisoble = false
          } else {
            if(res.data.message == "无权"){
              this.$message.error("账号操作权限不足");
            } else {
              this.$message.error(res.data.message);
            }
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      // }).catch(() => {
      //   this.$message.info("取消删除");            
      // });
      
    },
  
    // 改变账号状态
    changeStatus(event,index,row){
      // console.log('event==' + event)
      // console.log('index==' + index)
      // console.log('row==' + JSON.stringify(row))
      api.accountApi.enableAccount({"uid":row.id, "enable":event}).then((res) => {
        
        // console.log("res.data.code" + res.data.data.records[0])
        if (res.data.code == 200) {
          this.$message.success('修改账号状态成功！');
        } else {
          if(res.data.message == "无权"){
            this.$message.error("账号操作权限不足");
          } else {
            this.$message.error(res.data.message);
          }
        }
        this.getAllAccountData()

      }).catch((res) => {
        
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
    
    // 查询所有角色
    getAllRoleData(){
      api.accountApi.getRoles(this.roleQueryParam).then((res) => {
        if (res.data.code === 200) {
          this.rolesJson = res.data.data.records

          this.periods = [{ label: '全部', value: "" }]
          
          this.rolesJson.forEach((item) =>{
            var roleType = { label: "", value: "" }
            roleType.label = item.name
            roleType.value = item.id
            this.periods.push(roleType)
          })
        }
      }).catch((res) => {
        
      })
    },

    // 打开添加账号弹窗
    addAccountDialog(){
      this.add_dialogFormVisible = true

      // 重置
      this.$nextTick(()=>{
        this.$refs['addForm'].resetFields();
      })
    },

    // 确认添加账号
    confirmAddAccount() {
      
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          console.log('submit!');
          api.accountApi.createAccount(this.addAccountForm).then((res) => {
            this.adding = false
            
            if (res.data.code === 200) {
              // 修改角色
              // this.bindRoleForm.userId = 
              // api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
              //   if (res.data.code === 200) {
              this.$message.success('创建成功！');
              this.getAllAccountData()
              this.add_dialogFormVisible = false
                
              //   }
              // }).catch((res) => {
              //   this.$message.error(res.data.message);
              // })
              
            } else {
              this.$message.error(res.data.message);
              
            }
            // this.resetAdd()
          })
        }
      })
      
    },

    // 搜索真实姓名/手机号
    searchAccount(){
      this.queryParam.offset = 1
      this.queryParam.queryStr = this.searchKey
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
