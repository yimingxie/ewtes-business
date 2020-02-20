<template>
<div class="main-wrap" id="account">
   
  <div class="pageTitle">账号管理</div>
  <div class="wrapper" style="">
    <div class=" " style="position: absolute;">
      <div class="panel panelLeft" style=" ">
        <tab-radio :items="tabPeriods" :value.sync="tabPeriod" style="padding: 33px 0 32px 32px;border-bottom:1px solid #d8dddf;width: 100%;">
        </tab-radio>
        <span></span>
        <!-- 角色列表 -->
        <ul class="roleList" v-if="tabPeriod == 1">
          <!-- <li v-for="(role,index) in rolesJson" :key="index" @click="activeRole = index" :class="{active: index == activeRole}">
            {{role.name}}
          </li> -->
          <button class="btn blueBtn" @click="addRoleDialog">添加角色</button>

        </ul>
        <!-- 组织列表 -->
        <!-- <Tree v-if="tabPeriod == 0" :treeData="treeData"></Tree> -->
        <el-tree
            v-if="tabPeriod == 0"

            :expand-on-click-node="false"

            node-key="id"

            :load="loadNode1"

            :props= defaultProps

            lazy

            :check-on-click-node= "true"
            @node-click="handleLeftclick"
            ref="tree"
          
          >

            <span class="slot-t-node" slot-scope="{ node, data }">

              <span v-show="!data.isEdit">

                <span :class="[data.id>= 99 ? 'slot-t-node--label' : '']">{{node.label}}</span>
                <span class="operatioDropdownSpan">
                  <el-dropdown  trigger="click" >
                    <span class="operationBtn" @click="rightClick($event,node, data)">...</span>
                    <el-dropdown-menu slot="dropdown" class="operatioDropdown">
                      <el-dropdown-item>
                        <div class="edit" @click="editNode()">编辑</div>
                      </el-dropdown-item>
                      <el-dropdown-item><div class="delete" @click="deleteDepDialog = true;alert(1)">删除</div></el-dropdown-item>
                      <el-dropdown-item><div class="add" @click="addChildNode()">添加下级</div></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
              <!-- // 编辑 -->
              <span v-show="data.isEdit">

                <el-input class="slot-t-input" size="mini" autofocus

                  v-model="data.name"

                  :ref="'slotTreeInput'+data.id"

                  @blur.stop="NodeBlur(node,data)"

                  @keydown.native.enter="NodeBlur(node,data)">

                </el-input>

                <!-- <span>保存</span>
                <span>取消</span> -->

              </span>
              
            </span>
            
        </el-tree>

      </div>
    </div>
    <!-- 账号列表 -->
    <div class="panelRight" v-if="tabPeriod == 0">
      <div class="row" >

        <div class="panel topSelect">
          <div class="subSelect">
 

          <radio-group :items="periods1" :value.sync="period1">
            <span slot="label">人员状态：</span>
            <!-- <template slot="item" scope="props">
              <li>{{ props.text }}</li>
            </template> -->
          </radio-group>
          <search-input v-model.trim="searchKey" placeholderValue="搜索账号/姓名" @search="searchAccount()" @cancel="searchAccount()"></search-input>
          </div>
          <div class="subBtns">
            <button class="btn blueBtn" @click="addAccountDialog">添加账号</button>
            
            <button class="btn whiteBtn fr deleteStaff" @click="deleteStaffDialog()">删除账号</button>
          
          </div>
        </div>
      </div>
      <div class="row" >

        <div class="panel scdPanel" style="height:594px">
          
          <!-- 表格 Start -->
          <div style="position:relative;;display:flex;">
            &nbsp;
            <el-table :data="getAllAccountJson" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">

              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column prop="name" label="名称">
              </el-table-column>

              <el-table-column prop="username" label="账号">
              </el-table-column>
          
              <el-table-column  label="角色">
                <template slot-scope="scope">
                  <span v-if="scope.row.roleName" v-html="scope.row.roleName" ></span>
                  <span v-if="scope.row.type == 'administrator'" >超级管理员</span>
                </template>
              </el-table-column>
              
              <el-table-column  label="账号状态" align="center">
                <template slot-scope="scope" >
                  <span v-text="scope.row.valid== 1? '启用':'停用'"></span>
                  <!-- <el-switch
                    v-model="scope.row.valid"
                    active-color="#E2E6E8"
                    inactive-color="#E3E7E9"
                    :active-value="1"
                    :inactive-value="0"
                    :width=28
                    @change='changeStatus($event,scope.$index,scope.row)'
                  >
                  </el-switch> -->
                </template>
              </el-table-column>

               <el-table-column prop="name" label="创建人">
              </el-table-column>

               <el-table-column prop="name" label="创建时间">
              </el-table-column>

              <el-table-column  label="状态" align="center">
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
              </el-table-column>

              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                  2.prevent就相当于..event.preventDefault() -->
                  <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
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
    </div>
    <!-- 账号列表end -->

    <!-- 角色详情 -->
    <div class="panelRight rolePnael" v-if="tabPeriod == 1">
      <div class="row" >

        <div class="panel ">
          <div class="bigTitle">基本信息</div>
          <div class="role_content">
              <div class="role_p">
                <div class="role_title">角色名称</div>
                <!-- <div>{{rolesJson[activeRole].name}}</div> -->
              </div>
              <div class="role_p">
                <div class="role_title">角色描述</div>
                <!-- <div>{{rolesJson[activeRole].info}}</div> -->
              </div>
          </div>
        </div>
      </div>
      <div class="row" >

        <div class="panel ">
          <div class="bigTitle">功能权限</div>
          <div class="role_content">
              <div class="role_p">
                <div class="role_title">角色名称</div>
                <!-- <div>{{rolesJson[activeRole].name}}</div> -->
              </div>
              <div class="role_p">
                <div class="role_title">角色描述</div>
                <!-- <div>{{rolesJson[activeRole].info}}</div> -->
              </div>
          </div>
        </div>
      </div>
    </div>
     <!-- 角色详情 end -->
  </div>
  <!-- 添加账号  弹窗  Start -->
  <el-dialog width="500px" title="添加账号" :visible.sync="add_dialogFormVisible">
    <el-form :model="addAccountForm" :label-width="formLabelWidth" :rules="addAccountRules" ref="addForm" label-position="top">
      
          <el-form-item label="名称" prop="name">
            <el-input v-model="addAccountForm.name" placeholder="请输入名称" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>
        
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="addAccountForm.account" placeholder="请输入11位手机号" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>

          <el-form-item label="初始密码" prop="password" >
            <el-input v-model="addAccountForm.password" placeholder="请输入数字和字母组合6位以上的密码" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>
        
          <el-form-item label="账号角色" prop="roleId" >
            <el-select v-model="addAccountForm.roleId" placeholder="请选择账号角色" size="small">
              <el-option
                v-for="item in rolesJson"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
    
      
    </el-form>
    <div slot="footer"  class="dialog-footer tar">
      <span @click="add_dialogFormVisible = false" class="dialogCancel">取 消</span>
      <el-button type="primary" @click="confirmAddAccount()" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!--添加账号  弹窗 End -->

  <!-- 编辑账号  弹窗  Start -->
  <el-dialog  width="500px" title="编辑账号" :visible.sync="edit_dialogFormVisible" custom-class="addAccount" @closed="editDialogClose">
    <el-form :model="EditAccountForm" :label-width="formLabelWidth" :rules="editAccountRules" ref="editForm" label-position="top">

      <el-form-item label="名称" prop="name">
        <el-input v-model="EditAccountForm.name" placeholder="请输入名称" auto-complete="off" clearable size="small"></el-input>
      </el-form-item>

      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="EditAccountForm.account" placeholder="请输入登录账号，即手机号" auto-complete="off" disabled clearable size="small"></el-input>
      </el-form-item>
      
      
      <!-- <el-form-item label="手机号：" prop="phoneNumber">
        <el-input v-model="EditAccountForm.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位id：" prop="ownerUnitId" >
        <el-select v-model="EditAccountForm.ownerUnitId" placeholder="请选择角色所属单位id">
          <el-option v-for="enterprise in allEnterprise_Json" :key="enterprise.unitName" :label="enterprise.unitName" :value="enterprise.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="账号角色" prop="roleId" v-if="adType !='administrator'">
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

      <el-form-item label="所属组织" prop="roleId" v-if="adType !='administrator'">
   
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
    <div slot="footer" class="dialog-footer ">
      <span class="tal">
        <span @click="edit_dialogFormVisible = false; resetPasswordDialogVisoble = true" class="dialogCancel" style="position:absolute;left:32px;bottom:40px;">重置密码</span>
      </span>
      <span  class="tar">
         <span @click="edit_dialogFormVisible = false" class="dialogCancel ">取 消</span>
        <el-button type="primary" @click="confirmEdit" class="dialogSure ">确 认</el-button>
      </span>
     

    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->

  <!-- 重置密码对话框 -->
  <el-dialog  width="500px" title="重置密码" :show-close="false" :visible.sync="resetPasswordDialogVisoble">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <!-- <img src="../../assets/images/xym/dia-question.png" alt=""> -->
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">重置后密码默认为手机号后6位，是否确认重置？</div>
        </div>
      </div>
      
    </div>
    <div slot="footer"  class="dialog-footer tar">
      <span @click="cancelResetPassword()" class="dialogCancel">取 消</span>
      <el-button type="primary" @click="resetPassword(confirmReset)" class="dialogSure">确 认</el-button>
    </div>
  </el-dialog>


  <!-- 删除账号 弹窗-->
  <el-dialog width="500px" :show-close="false" title="删除账号" :visible.sync="dialogDelete">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <!-- <img src="../../assets/images/xym/dia-warn.png" alt=""> -->
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">是否确认删除所选账号，删除后不可复原，请谨慎操作</div>
        </div>
      </div>
    
    </div>
    <div slot="footer"  class="dialog-footer tar">
      <span @click="cancelResetPassword()" class="dialogCancel">取 消</span>
      <el-button type="primary" @click="resetPassword(confirmReset)" class="dialogSure">确 认</el-button>
    </div>
  </el-dialog>
  <!-- 删除电梯 弹窗 end-->

  <!-- 删除组织 弹窗-->
    <el-dialog width="500px" :show-close="false" title="删除组织" :visible.sync="deleteDepDialog">
      <div class="dialog-delete">
        <div class="dia-heading">
          <div class="dia-con-pic">
            <!-- <img src="../../assets/images/xym/dia-warn.png" alt=""> -->
          </div>
          <div class="dia-con-p">
            <div class="confirDialogText1">删除组织将同时删除组织内账号，是否确认删除？</div>
          </div>
        </div>
      
      </div>
      <div slot="footer"  class="dialog-footer tar">
        <span @click="deleteDepDialog = false" class="dialogCancel">取 消</span>
        <el-button type="primary" @click="deleteNode()" class="dialogSure">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 删除组织 弹窗 end-->

  <fotter></fotter>

  <!-- 添加角色  弹窗  Start -->
  <el-dialog width="500px" title="添加角色" :visible.sync="addRole_dialog">
    <el-form :model="addRoleForm" :label-width="formLabelWidth" :rules="addRoleFormRule" ref="addRoleForm" label-position="top">
      
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addRoleForm.name" placeholder="请输入角色名称" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>
        
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="addRoleForm.description" placeholder="请填写角色描述" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>

          <el-form-item label="功能权限" prop="ids">
            <el-checkbox-group v-model="addRoleForm.ids">
              <el-col :span="6" v-for="(moudel,index) in getCorModuleList" :key="index">
                
                <el-checkbox  :label="moudel.id" >{{moudel.name}}</el-checkbox>
                
              </el-col>
            </el-checkbox-group>
          </el-form-item>
        
      
    </el-form>
    <div slot="footer"  class="dialog-footer tar">
      <span @click="addRole_dialog = false" class="dialogCancel">取 消</span>
      <el-button type="primary" @click="confirmAddRole()" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!--添加角色  弹窗 End -->
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import TabRadio from "../../components/TabRadio";
import Tree from "../../components/Tree";

export default {
  data() {
    return {
      addRole_dialog:false,
      // 组织树形数据格式
      treeData: [
        {
          id: 1,

          label: "通用互联科技有限公司1111",

          isEdit: false,

          children: [
            {
              id: 4,

              label: "产品部",

              isEdit: false,

              children: [
                {
                  id: 9,

                  label: "UI",

                  isEdit: false
                },
                {
                  id: 10,

                  label: "原型",

                  isEdit: false
                }
              ]
            },
            {
              id: 5,

              label: "研发部",

              isEdit: false,
              children: [
                {
                  id: 6,

                  label: "前端开发",

                  isEdit: false
                },
                {
                  id: 17,

                  label: "后台开发",

                  isEdit: false
                }
              ]
            }
          ]
        },
        
      ],

      tabPeriods: [
        { label: '组织/账号', value: 0 },
        { label: '角色', value: 1},
      ],
      tabPeriod: 0,
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        name:'',
        account: '',
        password: '',
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
        // offset:1,
        // limit:10,
        // queryStr: "",
        // status:'',
        // roleId:''
        departmentId: "",
        limit: 10,
        offset: 0,
        search: ""
      },
      getAllAccountJson: [],
      roleQueryParam: {
        limit: 100,
        offset:1,
        search: "",
        // queryStr: ""
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
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 20, message: '名称字符长度过长，请控制在20位字符以内', trigger: 'blur' },
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
        gender: [
          {required: true, message: '请选择角色', trigger: 'change' }
        ],
      
      },
      resetPasswordDialogVisoble: false,
      confirmReset:{},
      deleteDialogVisoble: false,
      confirmDelete:{},
      getAllDepJson:[],
      value1:'',
      multipleSelection:[],
      dialogDelete: false,
      activeRole:0,

      ////////////tree
      deleteDepDialog:false,

      eleId: "",

      isShow: false,

      currentData: "",

      currentNode: "",

      menuVisible: false,

      firstLevel: false,

      // filterText: "",

      maxexpandId: 4,

      defaultProps: {
        children: "children",
        label: "name"
      },

      queryDepartParam:'corp',
      getAllDepJson:[],
      createDep:{
        name: "",
        parentId: ""
      },
      resolve:'',
      getCorModuleList:[],
      addRoleForm:{
        name:'',
        description:'',
        ids:[]
      },
      addRoleFormRule: {
       
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 20, message: '名称字符长度过长，请控制在20位字符以内', trigger: 'blur' },
        ],
      
      },
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    'tab-radio': TabRadio,
    'Tree':Tree
  },
  watch:{
    tabPeriod(val){
      // this.queryParam.roleId = val
      // this.getAllAccountData()
      console.log("value====" + value)
    },
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
    // this.getAllRoleData()
    this.getAllAccountData()
    // this.getAllDepartmentData()
    this.getAllDepartmentData()

    // this.getCorpMo()
  },
  methods: {
    // 获取公司模块
    getCorpMo(){
      this.getCorModuleList = []
      api.accountApi.getCorModules().then((res) => {
        if (res.data.code === 200) {
          this.getCorModuleList = res.data.data
        }
      }).catch((res) => {
        
      })
    },
    // 打开添加账号弹窗
    addRoleDialog(){
      this.addRole_dialog = true

      // 重置
      this.$nextTick(()=>{
        this.$refs['addRoleForm'].resetFields();
      })
    },

    // 确认添加角色
    confirmAddRole() {
      
      this.$refs['addRoleForm'].validate((valid) => {
        if (valid) {
          console.log('submit!');
          api.accountApi.createRole(this.addRoleForm).then((res) => {
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
    handleLeftclick(data, node) {
      console.log("data" + JSON.stringify(data))
      this.queryParam.departmentId = data.id
      this.getAllAccountData()
    },
    // 点击更多操作
    rightClick(event,Node,object) {
      // this.menuVisible = true;
      
      // debugger

      this.currentData = object;

      this.currentNode = Node;

      console.log("currentData==" + JSON.stringify(this.currentData))
      console.log("currentNode==" + this.currentNode)
    },
    // 增加下级
    addChildNode() {
      console.log(this.currentData);

      console.log(this.currentNode);

      if (this.currentNode.level >= 5) {
        this.$message.error("最多只支持五级！");

        return false;
      }
      let id = Math.ceil(Math.random() * 100);
      this.createDep.name = '新增节点'+id
      this.createDep.parentId = this.currentData.id
      api.accountApi.createDepartments(this.createDep).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){

          // this.$refs.tree.append(data, this.currentNode);
          this.currentNode.childNodes = [] // 这里把子节点清空，是因为再次调用 loadNode 的时候会往 childNodes 里 push 节点，所以会有节点重复的情况。
          // this.loadNode1(this.currentNode, this.resolve)
          this.refreshNode(this.currentData.id)

          // this.loadNode1(this.currentNode, resolve)
        }
      })
      // let id = Math.ceil(Math.random() * 100);
      
      // var data = { id: id, name: "新增节点" };
    },
    // deleteDialog(){
    //   this.deleteDialog = true
    // },
    // 删除节点
    deleteNode() {
      api.accountApi.deleteDepartment({id:this.currentData.id}).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){

          // this.$refs.tree.append(data, this.currentNode);
          console.log("this.currentNode==" + JSON.stringify(this.currentData))
          // this.currentNode.childNodes = [] // 这里把子节点清空，是因为再次调用 loadNode 的时候会往 childNodes 里 push 节点，所以会有节点重复的情况。
          // this.loadNode1(this.currentNode.parent, this.resolve)
          this.refreshNode(this.currentData.parentId)
          this.deleteDepDialog = false
          this.$message.success("删除组织成功")
        }
        else {
          this.deleteDepDialog = false
          this.$message.error(res.data.message);
        }
      })
      // this.$refs.tree.remove(this.currentNode);
    },

    refreshNode(id){
      let node = this.$refs.tree.getNode(id);
      node.loaded = false;
      node.expand();
    },

    // 编辑节点
    editNode() {
      // debugger
      if (!this.currentData.isEdit) {
        this.$set(this.currentData, "isEdit", true);

        this.$nextTick(() => {
          this.$refs["slotTreeInput" + this.currentData.id].$refs.input.focus();

        });
      }
    },

    // 编辑完成
    NodeBlur(Node, data) {
      // debugger

      console.log(Node, data);

      if (data.name.length === 0) {
        this.$message.error("名称不可为空！");

        return false;
      } else {
        if (data.isEdit) {
          api.accountApi.editDepartment({id:this.currentData.id,name:data.name}).then((res) => {
            if(res.data.code === 200 && res.data.message === 'success'){

              this.$set(data, "isEdit", false);
            }
          })
          

          console.log(data.isEdit);
        }

        // this.$nextTick(() => {
        //   this.$refs["slotTreeInput" + data.id].$refs.input.focus();
        // });
      }
    },
    // 懒加载
    loadNode1(node, resolve) {
      this.resolve = resolve
//       if (node.level === 0) {
// //         console.log("getAllDepJson111===" + JSON.stringify(this.getAllDepJson))
//         return resolve([{'corpId': "1229819391223214081",
// 'createTime': "2020-02-19 01:26:06",
// 'id': "1",
// 'name': "AAA商户",
// 'parentId': "1229819391223214081"}]);
//       }
      // if (node.level > 1) return resolve([]);.el
      // if(node.level >= 1) { // 二级节点
        this.getAllDepartmentData(node,resolve)
      // }
      // setTimeout(() => {
        // const data = [{
        //   id:1,
        //   name: 'leaf',
        //   leaf: true,
        //   isEdit: false,
        // }, {
        //   id:2,
        //   name: 'zone',
        //   isEdit: false,
        // }];

        // resolve(data);
      // }, 500);
    },
    // 查询所有部门
    getAllDepartmentData(node,resolve){
      // node.forEach(element => {
        console.log("222===" + node)

      // });
      api.accountApi.getDepartments(node.level == 0 ? 'corp' : node.data.id).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data || []
          // this.totalPageSize = res.data.data.total
          //  this.getAllDepJson[0].isEdit = false
          // console.log("getAllDepJson===" + JSON.stringify(this.getAllDepJson))
          // resolve(this.getAllDepJson)
          // if(this.getAllDepJson.length==0){
          //   this.$message.error('数据拉取失败，请刷新再试！');
          //   return;
          // }
          resolve(this.getAllDepJson);

        } else {
          this.getAllDepJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    tableRowClassName({row, rowIndex}) {
      if (row.valid === 0) {
        return 'gray-row';
      }
      return '';
    },
    // 删除账号对话框
    deleteStaffDialog () {
      if (this.multipleSelection.length === 0) {
        return this.$message.error('请勾选需要删除的账号。账号删除后无法复原，请谨慎操作');
      } else {
        // this.checkedStaffsName = []
        this.multipleSelection.forEach(item =>{
          var obj = this.getAllAccountJson.filter(function(value) {
            return value.id == item;
          })
          // this.checkedStaffsName.push(obj[0].name)
        })
      }
      this.dialogDelete = true
    },

    // 删除账号
    deleteStaff(index, row){
      api.accountApi.deleteStaff(this.checkedStaffs).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('删除成功！');
          this.getAllAccountData()
          this.dialogDelete = false
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        this.$message.error(res.data.message);
      })
      
    },

    // 多选框勾选
    handleSelectionChange(val) {
        
      this.multipleSelection = [];
      // this.selectData[Number(this.mParam.offset-1)] = []

      console.log("fdsg==" + JSON.stringify(val))

      val.forEach((item, index) =>{
        this.multipleSelection.push(item.id)
        // this.selectData[Number(this.mParam.offset-1)].push(index)
      })

      
      // val.forEach((item, index) => {
      //   console.log("fdsg==" + Number(this.mParam.offset-1))
      //   this.selectData[Number(this.mParam.offset-1)].push(index)
      // })

      // console.log("this.selectData===" + JSON.stringify(this.selectData))
    },
    // // 查询所有部门
    // getAllDepartmentData(){
    //   api.accountApi.getDepartments(this.queryDepartParam).then((res) => {
    //     if(res.data.code === 200 && res.data.message === 'success'){
    //       this.getAllDepJson = res.data.data.records
    //       // this.totalPageSize = res.data.data.total

    //     } else {
    //       this.getAllDepJson = []
    //     }
        
    //     // console.log("res.data.code" + res.data.data.records[0])s
    //   }).catch((res) => {
        
    //   })
      
    // },
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
            if(res.data.message == "账号重置成功,管理员账号需要更高权限"){
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

          // this.periods = [{ label: '全部', value: "" }]
          
          // this.rolesJson.forEach((item) =>{
          //   var roleType = { label: "", value: "" }
          //   roleType.label = item.name
          //   roleType.value = item.id
          //   this.periods.push(roleType)
          // })
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
      this.queryParam.search = this.searchKey
      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
#account
  .subSelect
    border-bottom: 1px solid #D8DDDF;
  .wrapper
    overflow: hidden;
    position relative
    height: 786px;
  .panelLeft
    width: 290px;height: 100%; 
    box-shadow: 8px 0 14px 2px rgba(196,203,239,0.39)
    border-radius: 8px 0px 0px 8px;
    margin-bottom: -9999px;
    z-index: 999;
    padding:0 0 9999px 0
    
  .panelRight
    margin-left: 290px;
  .showName
    font-size: 30px;
    color: #34414C;
    text-align: center;
    line-height 42px
    padding 0 0 30px 0
  .deleteStaff
    background url('../../assets/images/hs/delete.png') no-repeat left center;
    color #999999
    border: none;
    margin: 0;
    background-size: 21px;
  .roleList
    font-size: 16px;
    li 
      padding 13px 0 13px 22px
      margin 17px 0 0px;
      cursor pointer
    .active
      background: rgba(47,88,251,0.20);
      color: #2F58FB;
    .blueBtn
      margin: 42px 65px;
      width: 160px;
      border-radius: 10px;
  .rolePnael
    .panel
      padding 0
    .bigTitle
      margin 0
      border-bottom 1px solid rgb(216, 221, 223)
      height: 88px;
      line-height: 88px;
  .role_content
    padding: 5px 20px 26px 35px;
    height 275px
    .role_p
      padding 20px
    .role_title
      color: #999999;
      margin: 10px 0;
  .lalala{
    margin 21px;
    position: relative;
  }
  .text {
    font-size: 14px;
  }

  .el-tree {
    // width: 100%;
    // margin-top: 10px;
    margin: 23px;
  }

  .search {
    width: 20%;
  }

  .item {
    padding: 18px 0;
  }

  .add {
    cursor: pointer;
    margin-top: 10px;
  }

  .delete {
    margin: 10px 0;
    cursor: pointer;
  }

  .edit {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .search {
    cursor: pointer;
  }

  .box-card {
    width: 120px;
    position: absolute;
    z-index: 1000;
  }

</style>
