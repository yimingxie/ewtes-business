<template>
<div class="main-wrap" id="staff">
  <div class="pageTitle">员工管理</div>
  <div class="row" >

    <div class="panel topSelect">
      <div class="subSelect">
       
        <el-dropdown :hide-on-click="false" trigger="click" class="treeDep" style="width:168px!important">
          <span class="el-dropdown-link" >
            <span v-if="queryParam.departmentId !== ''">{{checkDepName1}}</span>
            <span v-else style="color:#C2C7CC;">请选择所属部门</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="liftDropdown" style="width:168px!important">
            <el-tree

              :expand-on-click-node="true"

              node-key="id"

              :load="loadNode1"

              :props= defaultProps

              lazy

              :check-on-click-node= "true"

              @node-click="handleLeftclick1"

              ref="tree"

              highlight-current

              >

              <span class="slot-t-node" slot-scope="{ node, data }" >

                <span>
                  <span >{{node.label}}</span>
                </span>
              
              </span>
              
            </el-tree>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <span class="splitLine">|</span>
        <radio-group :items="periods1" :value.sync="period1">
          <span slot="label">防疫点类型：</span>
         
        </radio-group> -->
        <search-input v-model.trim="searchKey" placeholderValue="搜索员工姓名/手机号" @search="searchAccount()" @cancel="searchAccount()"></search-input>
      </div>
      <div class="subBtns">
        <button class="btn blueBtn" @click="addAccountDialog">添加员工</button>
        <!-- <router-link :to="{ name: 'addStaff'}"><button class="btn blueBtn" >添加员工</button></router-link> -->
        
        <button class="btn whiteBtn" @click="openSubmitFile">批量导入</button>

        <button class="btn fr deleteList" @click="deleteStaffDialog()">删除员工</button>
       
      </div>
    </div>
  </div>
  <div class="row" >

    <div class="panel scdPanel">
      
      <!-- 表格 Start -->
      <div style="position:relative;;display:flex;">
        &nbsp;
        <el-table :data="getAllAccountJson" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
      
          <el-table-column prop="corpName" label="所属单位">
          </el-table-column>
          
          <el-table-column  label="部门">
            <template slot-scope="scope">
              <span v-html="scope.row.departmentName ? scope.row.departmentName: '--'" ></span>
            </template>
          </el-table-column>
          
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span v-html="scope.row.phone && scope.row.phone !== ''? scope.row.phone: '--'" ></span>
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

  <!-- 添加员工  弹窗  Start -->
  <el-dialog width="700px" title="添加员工" :visible.sync="add_dialogFormVisible">
    <el-form :model="addAccountForm" :label-width="formLabelWidth" :rules="addAccountRules" ref="addForm" label-position="top">
      <el-row :gutter="78">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addAccountForm.name" placeholder="请输入姓名" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="addAccountForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="78">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addAccountForm.phone" placeholder="请输入手机号" auto-complete="off" clearable size="small"  maxlength="11"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="所属部门" prop="departmentId" >
            <el-dropdown :hide-on-click="false" trigger="click" class="treeDep">
              <span class="el-dropdown-link" >
                <span v-if="addAccountForm.departmentId !== ''">{{checkDepName}}</span>
                <span v-else style="color:#C2C7CC;">请选择所属部门</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="liftDropdown">
                <el-tree

                  :expand-on-click-node="true"

                  node-key="id"

                  :load="loadNode1"

                  :props= defaultProps

                  lazy

                  :check-on-click-node= "true"

                  @node-click="handleLeftclick"

                  ref="tree"

                  highlight-current

                  >

                  <span class="slot-t-node" slot-scope="{ node, data }" >

                    <span>
                      <span >{{node.label}}</span>
                    </span>
                  
                  </span>
                  
                </el-tree>
              </el-dropdown-menu>
            </el-dropdown>
            
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="78">
        <el-col :span="12">
          <el-form-item label="身份证类型" prop="idType" >
            <el-select v-model="addAccountForm.idType" placeholder="请选择身份证类型" size="small">
              <el-option
                v-for="item in shenfen"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="addAccountForm.idType == 1">
          <el-form-item label="身份证号" prop="idCard" >
            <el-input v-model="addAccountForm.idCard" placeholder="请输入身份证号" auto-complete="off" clearable size="small" minlength="18" maxlength="18"></el-input>
          </el-form-item>
           
        </el-col>
        <el-col :span="12" v-if="addAccountForm.idType == 2">
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCardPre">
                  <el-input v-model="addAccountForm.idCardPre" placeholder="前六位" auto-complete="off" clearable size="small" required minlength="6" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-top:32px">
                <el-form-item label="" prop="idCardAfter">
                  <el-input v-model="addAccountForm.idCardAfter" placeholder="后六位" auto-complete="off" clearable size="small" required minlength="6" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </el-col>
      
      </el-row>
      
      
      
    </el-form>
    <div slot="footer"  class="dialog-footer tar">
      <span @click="add_dialogFormVisible = false" class="dialogCancel">取 消</span>
      <el-button type="primary" @click="confirmAddAccount()" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!--添加员工  弹窗 End -->

  <!-- 编辑员工  弹窗  Start -->
  <el-dialog  width="700px" title="员工详情" :visible.sync="edit_dialogFormVisible" custom-class="addAccount" @closed="editDialogClose">
    <!-- <div class="showName">{{ EditAccountForm.name }}</div> -->
    <el-form :model="EditAccountForm" :label-width="formLabelWidth" ref="editForm" label-position="top" class="detailDialog">
      
      <el-row :gutter="18">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <span class="formShowContent">{{EditAccountForm.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <span class="formShowContent">{{EditAccountForm.sex}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <span class="formShowContent">{{EditAccountForm.phone && EditAccountForm.phone !== '' ? EditAccountForm.phone : '暂无'}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row>

      <el-row :gutter="18">
        <el-col :span="12">
          <el-form-item label="身份证类型" prop="idType" >
            <span class="formShowContent">{{EditAccountForm.idType}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard" >
            <span class="formShowContent">{{EditAccountForm.idCard}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="18">
        <el-col :span="12">
          <el-form-item label="所属部门" prop="departmentName" >
            <span class="formShowContent">{{EditAccountForm.departmentName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer tar">
      <!-- <span @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</span> -->
      <el-button type="primary" @click="edit_dialogFormVisible = false" class="dialogSure">确 认</el-button>
      <!-- <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button> -->

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

  <!-- 删除员工 弹窗-->
  <el-dialog width="500px" :show-close="false" title="删除员工" :visible.sync="dialogDelete">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <!-- <img src="../../assets/images/xym/dia-warn.png" alt=""> -->
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">是否确认删除所选员工，删除后不可复原，请谨慎操作</div>
        </div>
      </div>
      <!-- <ul class="dia-ul clearfix">
        <li :class="checkedStaffs.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedStaffsName" :key="i">{{item}}</li>
      </ul> -->
      <!-- <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="dialogDelete=false">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="deleteStaff">确认</div>
      </div> -->
    </div>
    <div slot="footer" class="dialog-footer tar">
      <span @click="dialogDelete=false" class="dialogCancel">取 消</span>
      <el-button @click="deleteStaff" type="primary" class="dialogSure">完 成</el-button>
    </div>
  </el-dialog>
  <!-- 删除员工 弹窗 end-->

  <!-- 批量导入 -->
  <div class="dia-loading" v-show="diaLoading">
    <div class="dia-loading-p">导入时间较长，请耐心等待...</div>
  </div>

  <el-dialog :visible.sync="dialogBatch" title="批量导入" :show-close="false" width="500px">
    <div>
      <div class="dia-content">
        <div class="dia-clist">
          <div class="dia-citem clearfix">
            <div class="dia-citem-label">下载模板</div>
            <div class="dia-citem-ib">
              <a class="dia-download-link" href="http://lorns.gidomino.com/template/batch-import-template-complete.xlsx" target="_blank">《完整模板.excel》</a>
              <span style="color: #D8D8D8;margin:0 10px">|</span>
              <a class="dia-download-link" href="http://lorns.gidomino.com/template/batch-import-template-brief.xlsx" target="_blank">《简要模板.excel》</a>
            </div>
          </div>
          <div class="dia-citem clearfix" style="margin-top: 24px;">
            <div class="dia-citem-label" >上传文件</div>
            <div class="dia-citem-ib">
              <div class="dia-upload-icon">
                <div class="dia-upload-icon-p1">上传</div>
                <!-- <div class="dia-upload-icon-p2">请按模板填写</div> -->
                <input id="liftInputFile" name="file" class="dia-upfile" @change="changeUpfile" type="file" value="">
              </div>
            </div>
          </div>
          <div class="dia-citem clearfix" style="margin-top: 30px;">
            <div class="dia-citem-label">已上传</div>
            <div class="dia-citem-ib">
              <div class="dia-upload-list clearfix" v-if="upfile !== ''">
                <div class="dia-upload-list-icon" :class="upFileForwardFlag == 'error' ? 'upFileForwardError' : ''"></div>
                <div class="dia-upload-list-p">
                  <div class="dia-upload-list-p-name" :class="upFileForwardFlag == 'error' ? 'upFileForwardError' : ''">{{this.upfile.name}}</div>
                  <div class="dia-upload-list-p-error" v-if="upFileForwardFlag == 'error'">上传失败，请检查文件有效性后重新上传</div>
                </div>
                <div class="dia-upload-list-del" @click="deleteUpfileForward"></div>
              </div>

            </div>
          </div>
      
        </div>

      </div>

      

    </div>
    <div slot="footer" class="dialog-footer tar">
      <span @click="dialogBatch = false" class="dialogCancel">取 消</span>
      <el-button @click="submitFile" type="primary" class="dialogSure">完 成</el-button>
      <!-- <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogBatch = false">
          <input class="dia-btn dia-btn-submit" @click="submitFile" type="button" value="确认"> -->
    </div>
  </el-dialog>

  <!-- 导入结果 -->
  <el-dialog :visible.sync="dialogBatchResult" title="导入结果" :show-close="false" width="500px">
    <div>
      <div class="dia-content">
        <div class="batch-result">
          <div class="batch-result-item">
            <div class="batch-result-item-title success">导入成功</div>
            <div class="batch-result-item-p">
              <span class="batch-result-p-info">{{batchRes.successCnt}}条</span>
            
            </div>
          </div>
          <div class="batch-result-item" style="margin-top: 36px;">
            <div class="batch-result-item-title">导入失败（可下载错误日志，查看失败原因）</div>
            <div class="batch-result-item-p">
              
              <span class="batch-result-p-error">{{batchRes.failCnt}}条</span>
            </div>
          </div>
        </div>
        <!-- <div class="dia-citem-ib">
          <a class="dia-download-link" href="https://iot.gidomino.com/elevator/template/batch-import-template-property.xlsx" target="_blank">《完整模板.excel》</a>
          <span style="color: #D8D8D8;margin:0 10px">|</span>
          <a class="dia-download-link" href="https://iot.gidomino.com/elevator/template/batch-import-template-property.xlsx" target="_blank">《简要模板.excel》</a>
        </div> -->
        <div class="dia-download-link" @click="downloadError" style="margin-top: 28px;border-top: 1px solid #e9e9e9;padding: 22px 0 0;">下载错误日志</div>
      </div>

      <!-- <div class="diaN-btn-con clearfix " style="margin-top: 30px;"> -->
      
    </div>
    <div slot="footer"  class="dialog-footer tar">
      <el-button type="primary" @click="dialogBatchResult=false" class="dialogSure">完 成</el-button>
    </div>
  </el-dialog>

  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import mutiUpload from "../../components/mutiUpload";
import http from '../../utils/http'

export default {
  data() {
    return {
      isShow: false,

      currentData: "",

      currentNode: "",

      defaultProps: {
        children: "children",
        label: "name"
      },

      queryDepartParam:'corp',
      getAllDepJson:[],
      ///////////
      shenfen:[
        {id:1,name:'完整'},
        {id:2,name:'简单'}
      ],
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        phone: '',
        name:'',
        departmentId:'',
        sex:1,
        idType: 1,
        idCard: "",
        idCardPre:'',
        idCardAfter:''
     
      },
      // idCardPre:'',
      // idCardAfter:'',
      edit_dialogFormVisible: false,
      EditAccountForm: {
        phone: '',
        name:'',
        departmentName:'',
        sex:1,
        idType: 1,
        idCard: "",
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
        departmentId: "",
        search: ""
      },
      getAllAccountJson: [],
      roleQueryParam:{
        limit:10,
        offset:1,
        column: "create_time",
        order: true,
        corpId:window.localStorage.getItem('corpId'),
        search: ""
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
        // phone: [
        //   { min: 11, max: 11, message: '手机号错误，请输入11位手机号', trigger: 'blur' },
        //   {
        //     required: true,
        //     pattern: /(^((1[3-9][0-9])\d{8}$))/,
        //     message: '请输入正确的手机号',
        //     trigger: 'blur'
        //   }
        // ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { max: 20, message: '真实姓名字符长度过长，请控制在20位字符以内', trigger: 'blur' },
        ],
        idType: [
          {required: true, message: '请选择身份证类型', trigger: 'change' }
        ],
        idCard:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        idCardPre:[
          { required: true, message: '请输入身份证号前六位', trigger: 'blur' },
          { min: 6, message: '请输入身份证号前六位', trigger: 'blur' },
        ],
        idCardAfter:[
          { required: true, message: '请输入身份证号后六位', trigger: 'blur' },
          { min: 6, message: '请输入身份证号后六位', trigger: 'blur' },
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
      // 批量录入电梯
      dialogBatch: false,
      upfile: '',
      upFileForwardFlag: '',
      diaLoading: false,
      batchRes: {},
      // 录入结果
      dialogBatchResult: false,
      checkDepName:'',
      checkDepName1:''
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
    // this.getAllRoleData()
    this.getAllAccountData()
    // this.getAllDepartmentData()
  },
  methods: {
  //   UpperString(){
  //     console.log("this.addAccountForm.idCard===" + this.addAccountForm.idCard)
  // 　　if(this.addAccountForm.idCardue !== ''){
  //   　　this.addAccountForm.idCardue = this.addAccountForm.idCard.toUpperCase();
  // 　　}
  // console.log("this.addAccountForm.idCard===" + this.addAccountForm.idCard)
  //   },
    // 添加员工
    handleLeftclick(data, node) {
      console.log("data" + JSON.stringify(data))
      this.checkDepName = data.name
      this.addAccountForm.departmentId = data.id
    },
    // 懒加载
    loadNode1(node, resolve) {
      this.resolve = resolve
      this.getAllDepartmentData(node,resolve)
      // api.accountApi.getDepartments('corp').then((res) => {
      //   if(res.data.code === 200 && res.data.message === 'success'){

      //   }
      // })
    },
    // 查询所有部门
    getAllDepartmentData(node,resolve){
      console.log("222===" + node)
      api.accountApi.getDepartments(node.level && node.level !== 0 ?  node.data.id :'corp').then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data || []
          resolve(this.getAllDepJson);
        } else {
          this.getAllDepJson = []
        }
        
      }).catch((res) => {
      })
    },
    // 筛选部门
    handleLeftclick1(data, Node) {
      console.log("data" + Node.level)
      this.checkDepName1 = data.name
      this.queryParam.departmentId = Node.level == 1 ? '': data.id
      this.getAllAccountData()
    },
    
    // 打开批量录入弹窗
    openSubmitFile() {
      // reset TODO
      this.diaLoading = false
      this.upfile = ''
      this.upFileForwardFlag = ''
      this.dialogBatch = true
      setTimeout(() => {
        let fileBtn = document.getElementById('liftInputFile')
        fileBtn.value = ''
      }, 200)
    },

    // 删除前端上传文件
    deleteUpfileForward() {
      this.upfile = ''
      this.upFileForwardFlag = ''
      setTimeout(() => {
        let fileBtn = document.getElementById('liftInputFile')
        fileBtn.value = ''
      }, 200)
    },

    // 上传文件变化
    changeUpfile() {
      let fileBtn = document.getElementById('liftInputFile')
      console.log('监听', fileBtn.files[0])
      let name = fileBtn.files[0].name
      var suffix = name.substr(name.lastIndexOf("."));
      if(suffix == ".xls" || suffix == ".xlsx" ){
        this.upfile = fileBtn.files[0]
        this.upFileForwardFlag = 'success'
      } else {
        this.upfile = fileBtn.files[0]
        this.upFileForwardFlag = 'error'
      }
    },

    // 提交批量录入
    submitFile() {
      // 如果不是excel，则不允许上传
      if (this.upFileForwardFlag === '' || this.upFileForwardFlag == 'error') {
        return this.$message.error('请上传Excel文件')
      }
      let fileBtn = document.getElementById('liftInputFile')
      let formData = new FormData();
      console.log('uploadFile', fileBtn.files[0])
      formData.append('file', fileBtn.files[0])
      // console.log('formData', formData)

      // 请求
      this.diaLoading = true
      api.log.batchAddStaff(formData).then(res => {
        if(res.data.code == 200){
          console.log('录入', res)
          this.diaLoading = false
          this.batchRes = res.data.data

          // 展示出结果框
          this.dialogBatch = false
          this.dialogBatchResult = true
          this.getAllAccountData()
        } else {
          this.$message.error(res.data.message)
          this.diaLoading = false
        }
        

      }).catch(error => {
        // 超时
        this.diaLoading = false

      })
    },

    // 下载错误日志
    downloadError() {
      if (this.batchRes.failCnt !== 0) {
        let url = `${http.localURL}/ewtes/business/download/file?filename=` + this.batchRes.fileName
        window.open(url);
      } else {
        return this.$message.info('无错误日志')
      }

    },
    ///////////批量导入end////////////
    // 删除员工对话框
    deleteStaffDialog () {
      if (this.multipleSelection.length === 0) {
        return this.$message.error('请勾选需要删除的员工。员工删除后无法复原，请谨慎操作');
      } else {
         console.log("multipleSelection-===" + JSON.stringify(this.multipleSelection))
      }
      this.dialogDelete = true
    },
    // 删除员工账号
    deleteStaff(index, row){
      api.accountApi.deleteStaff(this.multipleSelection).then((res) => {
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
    // 查询所有部门
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
      api.accountApi.getStaffs(this.queryParam).then((res) => {
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
      //  phone: '',
      //   name:'',
      //   departmentName:'',
      //   sex:1,
      //   idType: 1,
      //   idCard: "",

      this.EditAccountForm.id = row.id
      this.EditAccountForm.phone = row.phone
      this.EditAccountForm.name = row.name
      this.EditAccountForm.departmentName = row.departmentName || '暂无'
      this.EditAccountForm.sex = row.sex  == 1 ? '男':"女"
      this.EditAccountForm.idType = row.idType == 1 ? '完整': '简单'
      this.EditAccountForm.idCard = row.idCard

      
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
      this.addAccountForm.idCard = ""
      this.addAccountForm.idCardPre = ''
      this.addAccountForm.idCardAfter = ''
      // 重置
      this.$nextTick(()=>{
        this.$refs['addForm'].resetFields();
      })
    },

    // 确认添加账号
    confirmAddAccount() {
      
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          if(this.addAccountForm.idType == 2){
            this.addAccountForm.idCard = this.addAccountForm.idCardPre + '******' + this.addAccountForm.idCardAfter
          }
          api.accountApi.createStaff(this.addAccountForm).then((res) => {
            // this.adding = false
            
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
@import '../../assets/stylus/upload'
#staff

  .showName
    font-size: 30px;
    color: #34414C;
    text-align: center;
    line-height 42px
    padding 0 0 30px 0
  .treeDep
    width 100%!important
    border-radius: 4px!important;
    border: 1px solid #dcdfe6!important;
    height: 32px !important;
    line-height: 32px !important;
    position relative!important
    padding: 0 10px!important;
    overflow: hidden!important;
    white-space: nowrap!important;
    text-overflow: ellipsis!important;
    .el-dropdown-link,.el-dropdown-menu
      width: 100%!important;
    .el-dropdown-link
      display: inline-block!important;
    .el-icon-arrow-down
      float: right!important;
      color: #c0c4cc!important;
      height: 32px!important;
      line-height: 29px!important;
.liftDropdown
  width 280px
  .search1 .search_input
    width: 415px;
    padding: 0 10px;
</style>
