<template>
<div class="main-wrap" id="Personnel">
  <div class="pageTitle">人员防疫记录</div>
  <div class="row" >

    <div class="panel topSelect">
      <div class="subSelect">
     
        <el-select @change="corpSelectChange()" clearable v-model="queryParam.depId" placeholder="全部单位" class="regionPicker">
          <el-option
            v-for="item in corpLists"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <!-- <span class="splitLine">|</span> -->
  
        <!-- <el-select @change="dotSelectChange()" clearable v-model="queryParam.epedId" placeholder="请选择防疫点" class="regionPicker">
          <el-option
            v-for="item in getAllDotJson"
            :key="item.epedId"
            :label="item.epedName"
            :value="item.epedId">
          </el-option>
        </el-select> -->
     
        <span class="splitLine">|</span>
        <radio-group :items="periods1" :value.sync="period1">
          <span slot="label">人员状态：</span>
          <!-- <template slot="item" scope="props">
            <li>{{ props.text }}</li>
          </template> -->
        </radio-group>
        <search-input v-model.trim="searchKey" placeholderValue="搜索人员姓名/手机号" @search="searchAccount()" @cancel="searchAccount()" >
        </search-input>
      </div>
    </div>
  </div>
  <div class="row" >

    <div class="panel scdPanel" >
      <!-- <div class="title"><div class="label1">员工管理</div></div> -->
      
      <!-- <div class="subBtns">
        <router-link :to="{ name: 'addStaff'}"><button class="btn blueBtn" >添加员工</button></router-link>
        
        <router-link :to="{ name: 'department'}"><button class="btn whiteBtn" >部门管理</button></router-link>
        <span class="fr" style="margin: 5px 10px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkbox16">全选</el-checkbox>
        </span>
        <button class="btn whiteBtn fr" @click="deleteStaffDialog()">删除员工</button>
        <button class="btn whiteBtn fr" @click="resetPasswordDialog()">重置密码</button>
        <button class="btn whiteBtn fr" >更改部门</button>
        

        <search-input v-model.trim="searchKey" placeholderValue="搜索部门名称" @search="searchAccount()" @cancel="searchAccount()">
        </search-input>
      </div> -->
      <!-- <div class="splitBar"></div> -->
    </div>
  </div>
  <!-- 员工列表 -->
  <div class="row" v-if="getAllAccountJson.length > 0">
    <div class="panel" style="padding: 0 20px 20px;border-top-left-radius: 0;border-top-right-radius: 0;margin-top: 0;">
      <!-- 列表 Start -->
      <el-row>
        <el-col :lg="8" :xl="6" :xs='8' :sm='8' :md='8' class="" v-for="(account, index) in getAllAccountJson" :key="index">
          <div class="staff-grid-content bg-purple " :class="{'highlightDiv staff_highlight' : account.warnStatus == 1}">
              <!-- <div class="grid_checkbox">
                <el-checkbox-group v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                  <el-checkbox :label="account.id" :key="index" class="checkbox16">{{nonetext}}</el-checkbox>
                </el-checkbox-group>
              </div> -->
              <div class="grid_content">
                <div class="stf_content">
                  <span class="stf_pic">
                    <img v-if="account.url" :src="account.url" alt="" width="88" height="88"/>
                    <img v-else src="../../assets/images/hs/header.png"  alt="" width="88" height="88"/>
                  </span>
                  <span class="stf_info">
                    <span class="stf_name">
                      <!-- <router-link :to="{ name: 'personnelDetails', params: { staffId: account.id }}"><span>{{account.name}}</span></router-link> -->
                      <router-link :to="{path:'/person-detail',query:{idCard: account.idCard, epedId:account.lastEpedId}}"><span>{{account.name}}</span></router-link>
                      <!-- <router-link :to="{ name: 'parkDetails', params: { staffId: account.id }}"><span>{{account.name}}</span></router-link> -->
                      <span v-if="account.sex == 0"><img src="../../assets/images/hs/female.png"  alt="" /></span>
                      <span v-else><img src="../../assets/images/hs/male.png"  alt="" /></span>
                    </span>
                    
                    <div class="stf_department">{{account.phone}}</div>
                    <div class="stf_wendu">
                      <span style="margin-right:20px">{{account.lastTemperature ? account.lastTemperature : '--'}}℃</span>
                      <!-- <span>{{account.lastEpedId}}</span> -->
                    </div>
                    <!-- <div class="stf_p stf_phone">{{account.username}}</div> -->
                    <div class="stf_p stf_area">{{account.corpName}}</div>
                    <div class="stf_p stf_liftnum">{{account.departmentName ? account.departmentName : '--'}} </div>
                  </span>
                  <span class="stf_active" :class="{'activeFree' : 1 == account.warnStatus}">
                    <i></i><span v-text="account.warnStatus == 0 ? '正常' : '异常'"></span>
                  </span>
                </div>
                
              </div>
              <!-- <div class="stf_status">
                <el-switch
                  v-model="account.valid"
                  :active-value="1"
                  :inactive-value="0"
                  :width=28
                  @change='changeStatus($event,account)'
                >
                </el-switch>
              </div> -->
            
          </div>
        </el-col>
      </el-row>
      <!-- 列表 End -->
      
      <!-- 分页 Start -->
      <div class="pagination_block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,9, 20, 30]"
          :page-size="queryParam.limit"
          :current-page="queryParam.offset"
          layout="prev, pager, next, sizes, jumper"
          :total="totalPageSize">
        </el-pagination>
      </div>
      <!-- 分页 End -->
    </div>
  </div>
  <div class="row" v-if="getAllAccountJson.length == 0">
    <div class="panel" style="border-top-left-radius: 0;border-top-right-radius: 0; padding:0 13px 20px;margin-top: 0;">
      <div class="noData">暂无查询数据</div>
    </div>
  </div>
  <!-- 员工列表 end-->
  <!-- 添加账号  弹窗  Start -->
  <el-dialog width="662px" title="添加账号" :visible.sync="add_dialogFormVisible">
    <el-form :model="addAccountForm" :label-width="formLabelWidth">
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="addAccountForm.account" auto-complete="off" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="addAccountForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
       -->
    
      <el-form-item label="角色：" prop="roleName" >
        <el-select v-model="addAccountForm.roleId" placeholder="请选择角色">
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
  <el-dialog  width="662px" title="编辑账号" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
    <div class="showName">{{ EditAccountForm.name }}</div>
    <el-form :model="EditAccountForm" :label-width="formLabelWidth">
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="EditAccountForm.account" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="EditAccountForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      
      <!-- <el-form-item label="手机号：" prop="phoneNumber">
        <el-input v-model="EditAccountForm.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位id：" prop="ownerUnitId" >
        <el-select v-model="EditAccountForm.ownerUnitId" placeholder="请选择角色所属单位id">
          <el-option v-for="enterprise in allEnterprise_Json" :key="enterprise.unitName" :label="enterprise.unitName" :value="enterprise.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="角色：" prop="roleName">
        <!-- <el-input v-model="addRoleForm.ownerUnitId" auto-complete="off"></el-input> -->
        <!-- <el-select v-model="edit_roleNameArr" multiple placeholder="请选择账户角色"  @change="changeSelect">
          <el-option v-for="role in rolesJson" :key="role.name" :label="role.name" :value="role.name"></el-option>
        </el-select> -->
        <el-select v-model="bindRoleForm.roleId" placeholder="请选择角色">
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

  <!-- 重置密码员工 弹窗 -->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogReset">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/hs/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">是否确认重置以下员工密码</div>
          <p>重置密码后不可复原，请谨慎操作</p>
        </div>
      </div>
      <ul class="dia-ul clearfix">
        <li :class="checkedStaffs.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedStaffsName" :key="i">{{item}}</li>
      </ul>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="dialogReset=false">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="resetPassword">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 重置密码员工 弹窗 end-->
  <!-- 删除电梯 弹窗-->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogDelete">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/hs/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <div class="confirDialogText1">是否确认删除以下员工</div>
          <p>删除后不可复原，请谨慎操作</p>
        </div>
      </div>
      <ul class="dia-ul clearfix">
        <li :class="checkedStaffs.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedStaffsName" :key="i">{{item}}</li>
      </ul>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="dialogDelete=false">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="deleteStaff">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 删除电梯 弹窗 end-->

  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose2'
import moment from 'moment';
import newArea from "../../utils/newArea";


export default {
  data() {
    return {
      // regionOptions: [],
      form: {
        city : '',
        area : '',
        minarea : '',
        selectedOptions: ["44","4403"],//地区筛选数组
      },
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        account: '',
        password: '111',
        corpId: window.localStorage.getItem('corpId'),
        accountType: "1",
        userType: "staff",
        roleId:''
      },
      edit_dialogFormVisible: false,
      EditAccountForm: {
        id: "",
        name: "",
        account: "",
        password: '123456',
        roleName : "",
        roleCode : "222",
        status : 1,
      },
      query:'',
      searchKey:'',
      act_index:'0',
      totalPageSize:0, // 总页数
      queryParam:{
        offset:0,
        limit:9,
        departmentId : "",        // 部门ID 
        epedId : "",   //防疫点ID
        search : "",   //名字或手机号
        warnStatus:""      //状态
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
        { label: '空闲', value: "0" },
        { label: '作业中', value: "1" },
      ],
      period: "",
      periods1: [
        { label: '全部', value: "" },
        { label: '正常', value: "0" },
        { label: '异常', value: "1" },
      ],
      period1: "",
      bindRoleForm:{
        accountId:"",
        roleId:""
      },
      checkAll: false,
      checkedStaffs: [],
      checkedStaffsName:[], //确认弹窗显示数据
      isIndeterminate: false,
      checkedAllStaff:[],
      nonetext:'',
      selectedDpt:'',
      departments:[{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      
      getAllDepJson:[],
      queryDepartParam:{
        offset: 1,
        limit: 100,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId'),
        depName:'',
        areaCode:''
      },
      selectArea:[],
      dialogDelete: false,
      dialogReset: false,
      corpLists:[],
      getAllDotJson:[],
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      }
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    'city-choose': CityChoose,
  },
  watch:{
    // 人员状态筛选
    period1(val) {
      if(val != ''){
        this.searchKey = this.queryParam.search = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0
      this.queryParam.warnStatus = val
      this.getAllAccountData()
    }
  },
  mounted() {
    // this.getAllRoleData()
    this.getCorps()
    // 所有员工列表
    this.getAllAccountData()
    // 所有部门列表
    // this.getAllDepartmentData()
    // 加载省市下拉选项
    // this.regionOptions = newArea.newAreaOption()
    // 防疫区域列表
    this.getDots()
  },
  methods: {
    loadNode1(node, resolve) {
      this.getAllDepartmentData(node,resolve)
    },
    // 级联懒加载
    handleItemChange(val) {
      console.log('active item:', val);
      if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
        this.options2[0].cities = [{
          label: '南京'
        }];
      } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
        this.options2[1].cities = [{
          label: '杭州'
        }];
      }
    },

    // 查询所有部门
    getAllDepartmentData(node,resolve) {

      api.accountApi.getDepartments(node.level && node.level !== 0 ?  node.data.id :'corp').then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data || []
          resolve(this.getAllDepJson);
        } else {
          this.getAllDepJson = []
          resolve([])
        }
        
      }).catch((res) => {
        
      })
      
    },

    getDots(){
      api.person.getEpidemicArea().then((res) => {
        if(res.data.code == 200) {
          this.getAllDotJson = res.data.data || []
        }
      })
    },
    // 获取公司
    getCorps(){
      api.person.getCorps().then((res) => {
        if(res.data.code == 200) {
          this.corpLists = res.data.data || []
        }
      })
    },
    // 查询防疫区域
    getEpidemicArea(){
      api.person.getEpidemicList().then((res) => {

      })
    },
    // 筛选单位（公司）
    corpSelectChange(){

    },
    // 筛选防疫点
    dotSelectChange(){
      if(this.queryParam.epedId !== '') {
        this.searchKey = this.queryParam.search = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
    // 根据部门筛选
    depSelectChange() {
      if(this.queryParam.depId !== '') {
        this.searchKey = this.queryParam.search = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
 
    // 区域筛选
    // selectCity(cityArr, cnName) {
     
    //   this.queryParam.areaCode = cityArr[cityArr.length-1]
    //   console.log(cnName)
    //   // 筛选时默认跳到第一页
    //   this.queryParam.offset = 0
    //   this.getAllAccountData()
    // },
   
    // 全选，非全选
    // handleCheckAllChange(val) {
    //   this.checkedStaffs = val ? this.checkedAllStaff : [];
    //   this.isIndeterminate = false;
    //   // console.log("check:" + this.checkedStaffs)
    // },
    // // 点击多选框
    // handleCheckedStaffsChange(value) {
    //   // console.log("check:" + value)
    //   // console.log("Allcheckop:==" + this.checkedAllStaff)
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.getAllAccountJson.length;
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    // },
    // 查询所有员工账户
    getAllAccountData(){
      api.person.getEpidemicList(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.getAllAccountJson.forEach(item =>{
            
            if(item.avatar && item.avatar != '' && item.avatar != null){
              // var url = "http://192.168.100.7:8080/domino/view/image?filename=" + item.avatar
              var url = api.accountApi.viewPic(item.avatar)

              Vue.set(item, 'url', url)
            }
            if(item.areaCode && item.areaCode != '' && item.areaCode != null){
              var areaName = newArea.getAreaName(item.areaCode).join('   ')
              Vue.set(item, 'areaName', areaName)
            }
            

          })
          this.totalPageSize = res.data.data.total

          // 重置多选
          this.checkedAllStaff = []
          this.checkedStaffs = []
          this.checkAll = false
          this.isIndeterminate = false
          // console.log("this.getAllAccountJson==" + JSON.stringify(this.getAllAccountJson))
          this.getAllAccountJson.forEach(item => {
            this.checkedAllStaff.push(item.id)
          })

        } else {
          this.getAllAccountJson = []
          this.checkedAllStaff = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
    //  // 重置密码对话框
    // resetPasswordDialog () {
    //   if (this.checkedStaffs.length === 0) {
    //     return this.$message.error('请勾选需要重置密码的员工');
    //   } else {
    //     this.checkedStaffsName = []
    //     this.checkedStaffs.forEach(item =>{
    //       var obj = this.getAllAccountJson.filter(function(value) {
    //         return value.id == item;
    //       })
    //       this.checkedStaffsName.push(obj[0].name)
    //     })
    //   }
    //   this.dialogReset = true
    // },
    // 重置密码
    resetPassword(index, row){
        var checkIds = this.checkedStaffs
        console.log("checkIds===" + checkIds)
        api.accountApi.resetPsd({"ids":checkIds}).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('重置密码成功！');
            this.getAllAccountData()
            this.dialogReset = false
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

    },
   
    // 编辑账号
    editAccount(index, row){
      this.EditAccountForm.id = row.id
      this.EditAccountForm.account = row.account

      this.bindRoleForm.accountId = row.id
      this.bindRoleForm.roleId = ""
      if(row.roleId){
        this.bindRoleForm.roleId = row.roleId
      }
      // this.EditAccountForm.phoneNumber = row.phoneNumber
      // this.edit_roleNameArr = row.roleName.split(',')
      this.edit_dialogFormVisible = true
    },

    // 确认修改
    confirmEdit(){
      // 修改账号名
      api.accountApi.editAccount(this.EditAccountForm).then((res) => {
        
        if (res.data.code === 200) {
          // 修改角色
          api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('修改成功！');
              this.getAllAccountData()
              this.edit_dialogFormVisible = false
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })
          
        }else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
      
    },
    // 删除电梯对话框
    deleteStaffDialog () {
      if (this.checkedStaffs.length === 0) {
        return this.$message.error('请勾选需要删除的员工。员工删除后无法复原，请谨慎操作');
      } else {
        this.checkedStaffsName = []
        this.checkedStaffs.forEach(item =>{
          var obj = this.getAllAccountJson.filter(function(value) {
            return value.id == item;
          })
          this.checkedStaffsName.push(obj[0].name)
        })
      }
      this.dialogDelete = true
    },
    // 删除员工账号
    deleteStaff(index, row){
      // console.log('删除选中电梯', this.checkedLifts)
      // if (this.checkedStaffs.length === 0) {
      //   return this.$message.error('请勾选需要删除的员工。员工删除后无法复原，请谨慎操作');
      // } else {
      //   this.$confirm('此操作将永久删除该员工账号, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'error'
      //   }).then(() => {
          // for(var i = 0 ; i < this.checkedStaffs.length; i++){
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
          // }
      //   }).catch(() => {
      //     this.$message.info("取消删除");            
      //   });
      // }
      
    },
  
    // 改变账号状态
    changeStatus(event,account){
      var enable = false
      
      if(event == 1){
        enable = true
      }

      api.accountApi.enableStaff({"userId":account.id,"enable": enable}).then((res) => {
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
          // this.periods = [{ label: '全部', value: "-1" }]
          
          
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

    // 确认添加账号
    confirmAddAccount() {
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
      }).catch((res) => {
        // this.handleError(res)
        // this.adding = false
      })
    },

    // 搜索真实姓名/手机号
    searchAccount(){
      // 筛选置空
      this.period = ""// 账号状态
      this.period1 = "" // 作业状态
      this.selectArea = []
      this.queryParam.areaCode = "" // 区域
      this.queryParam.depId = "" // 部门ID

      this.queryParam.search = this.searchKey
      // this.queryParam.phone = this.searchKey
      this.queryParam.offset = 1 //页数置为1

      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
// 工具类
@import '../../assets/stylus/utilities'

#Personnel
  a
    text-decoration: none;
    color #333
    &:hover
      text-decoration: none;
  .staff-grid-content 
    min-height: 36px;
    padding 16px 20px 20px 20px
    border-radius 8px;
    border: 1px solid #E8E8E8;
    vertical-align middle
    margin 20px
    clear both
    clearfix()
    height: 200px;
    // min-width: 350px
  .staff_highlight
    
    a, .stf_department, .activeFree
      color: #FFFFFF
    .activeFree i
      border:1px solid #ffffff
      &:before
        background : #FFFFFF
    .stf_area
      background url('../../assets/images/hs/area1.png') no-repeat left center;
      
    .stf_liftnum
      background url('../../assets/images/hs/liftnum1.png') no-repeat left center;
  .grid_checkbox
    float:left
    width:30px;
    height 132px;
    padding-top: 55px;
  .grid_content
    // margin-left:30px;
    // border-bottom: 1px solid #E9E9E9;
    position relative
  .stf_content
    padding-bottom 13px
  .stf_pic
    // border: 1px solid #E8E8E8;
    width:88px
    height 132px
    display inline-block
    margin: 0 29px 0 6px;
    img
      border-radius 50%
      object-fit: cover;
      margin-top: 43%;
  .stf_info
    height 132px
    display inline-block
    vertical-align: top;
    width: calc(100% - 131px);
  .stf_name
    font-size: 20px;
    color: #34414C;
    span
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      max-width 110px 
      display:inline-block
    &:hover
      text-decoration: none!important;
    img
      vertical-align -3px
  .stf_department
    color: #999999;
    margin 1px 0 7px 0
  .stf_wendu
    font-size: 18px;
    margin-bottom 16px
  .stf_p
    text-indent 30px
    margin: 12px 0;
    
  .stf_area
    background url('../../assets/images/hs/area.png') no-repeat left center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    
  .stf_liftnum
    background url('../../assets/images/hs/liftnum.png') no-repeat left center;
   
  .stf_status
    text-align: center
    margin 13px 0 0 0
  .stf_active
    color: #3572FF;
    font-size: 14px;
    absolute top 1px right 0
    i 
      border: 1px solid rgba(53,114,255,0.43);
      border-radius: 50%;
      size 10px
      display: inline-block
      position relative
      margin-right: 4px;
      box-sizing:border-box
      &:before
        content: ''
        background: #3572FF;
        border-radius: 50%;
        size 6px
        display:inline-block
        absolute top 1px left 1px
  .activeFree
    color: #9FB9F7;
    white-space: nowrap;
    i 
      border: 1px solid rgba(159,185,247,0.30);
      &:before
        content: ''
        background: #9FB9F7;
 
  
  .llct-area
    float left;
    width 120px;
    height 30px;
    .el-cascader__label, .el-input__inner
      padding-left:0!important
      border: none!important;

</style>
