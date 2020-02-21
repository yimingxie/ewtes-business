<template>
  <div id="PersonnelDetails">
    
    <!-- <div class="bread-nav">
      <router-link to="/staff">
        <span>员工管理</span>
      </router-link>
      <em>/</em>
      <span class="on">{{getStaffInfo.name}} - 员工详情</span>
    </div> -->
    <div class="main-wrap" >
      <div class="pageTitle">
        <router-link to="/personnel">
          <span class="preTitle">人员防疫记录</span>
        </router-link>
       / 人员详情</div>
      <div class="row" >
        <div class="panel topPanel " :class="{'highlightDiv hightLight' : 1 == getStaffInfo.warnStatus}">
          <!-- <el-avatar shape="square" :size="210" :fit="fits" :src="url" class="s_pic" style=""></el-avatar> -->
          <div class="s_pic" style="">
            <img :src="url"  alt="" width="190" height="190"/>
          </div>
          <div class="s_contain">
            <!-- <router-link :to="{ name: 'editStaff', params: { staffId: this.$route.params.staffId }}"><span class="s_de_edit" ></span></router-link> -->
            <div v-if="getStaffInfo.warnStatus == 1" class="releaseBtn" @click="dialogRelease = true">解除异常状态</div>
            <p class="s_de_name">{{getStaffInfo.name}}
              <img v-if="getStaffInfo.sex == '0'" src="../../assets/images/hs/female.png"  alt="" />
              <img v-else src="../../assets/images/hs/male.png"  alt="" />
            </p>
            <!-- <p class="s_de_department">{{getStaffInfo.depName}}</p> -->
            <div class="s_de_details">
              <table>
                <tr>
                  <!-- <td><span class="tie" style="font-size: 38px;color: #3572FF;">36.8<span style="font-size: 16px;color: color: #173000;">℃</span></span></td> -->
                  <td><span class="tie">手机号码：</span><span >{{getStaffInfo.phone}}</span></td>
                  <td><span class="tie">出生日期：</span>
                    <span v-if="getStaffInfo.birthday">{{ getStaffInfo.birthday | dateformat(dateFormat)}} &nbsp;{{ birthdayFrom}}</span>
                    <span v-else>--</span>
                  </td>
                  <td><span class="tie">身份证号：</span><span style="color: #4272FF;">{{getStaffInfo.idCard}}</span></td>
                  
                </tr>
                <tr>
                  <!-- <td>
                    <div class="tie" style="font-size: 14px;">深林上城</div>
                    <div class="tie" style="font-size: 14px;">2020-02-10 16:29</div>
                   
                  </td> -->
                  <td><span class="tie">所属单位：</span><span>{{ getStaffInfo.corpName }}</span></td>
                  <td><span class="tie">所属部门：</span>
                    <span v-if="getStaffInfo.departmentName">{{ getStaffInfo.departmentName }}部</span>
                    <span v-else>--</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" >
        <div class="bigTitle">测温记录</div>
      </div>

      <div class="row" >
          
        <div class="panel" :class="open ? '':'closePanel'">
          <div class="title" style="border-bottom:none">
            <!-- <div class="label1">管辖电梯<span class="open" @click="open = !open" v-text="open ? '收起' : '展开'"></span></div> -->
            <!-- <div class="label1">管辖电梯 -->
              <!-- <span class="open">展开</span> -->
            <!-- </div> -->
          </div>
        
          <!-- 表格 Start -->
          <div style="position:relative;display:flex;">
            &nbsp;
            <el-table :data="getStaffInfo.data" style="margin-top:0!important;" >
              <el-table-column prop="time" label="时间">
              </el-table-column>
          
              <el-table-column prop="epedName" label="防疫点">
              </el-table-column>
              
              <el-table-column  label="检测区域">
                <template slot-scope="scope">
                  <span v-html="scope.row.pointName"></span>
                </template>
              </el-table-column>

              <el-table-column prop="elevCode" label="所属单位">
              </el-table-column>
          
              <el-table-column prop="value" label="体温">
              </el-table-column>
              
              <el-table-column prop="elevCode" label="检测状态">
                <template slot-scope="scope">
                  <span v-html="scope.row.valid ? '正常' :'异常'"></span>
                </template>
                
              </el-table-column>
          
              <el-table-column prop="areaName" label="处理结果">
              </el-table-column>

              <!-- <el-table-column prop="areaName" label="接触人数">
              </el-table-column> -->
             
              <el-table-column prop="areaName" label="是否为高危地点">
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                  2.prevent就相当于..event.preventDefault() -->
                  <el-button @click.native.prevent="openCheckDetails(scope.row)" type="text">查看详情
                  </el-button>
                 
                </template>
              </el-table-column>
            </el-table>
            &nbsp;
          </div>
          <!-- 表格 End -->
          
          <!-- 分页 Start -->
          <!-- <div class="pagination_block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              :page-size="staffMLiftParam.limit"
              :current-page="staffMLiftParam.offset"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPageSize">
            </el-pagination>
          </div> -->
          <!-- 分页 End -->

        </div>
        
      </div>

      <!-- 解除异常状态 弹窗-->
      <el-dialog width="500px" :show-close="false" title="解除异常状态" :visible.sync="dialogRelease">
        <div class="dialog-delete">
          <div class="dia-heading">
            <div class="dia-con-pic">
              <!-- <img src="../../assets/images/xym/dia-warn.png" alt=""> -->
            </div>
            <div class="dia-con-p">
              <div class="confirDialogText1">是否解除该人员异常状态？</div>
            </div>
          </div>
        
        </div>
        <div slot="footer"  class="dialog-footer tar">
          <span @click="dialogRelease = false" class="dialogCancel">取 消</span>
          <el-button type="primary" @click="confirmRelease()" class="dialogSure">确 认</el-button>
        </div>
      </el-dialog>
      <!-- 解除异常状态 弹窗 end-->

      <!-- 接触记录  弹窗  Start -->
      <el-dialog  width="954px" title="接触记录" :visible.sync="checkDetailsDialog" class="detailDialog">
        <!-- <div class="showName">{{ EditAccountForm.name }}</div> -->
        <el-form style="overflow: hidden;" :model="detailsList" ref="editForm" label-position="top" >
          
          <div class="detailsDiv">
            <span class="detailsSpan clearfix">
              <el-form-item label="位置" prop="account">
                <span class="formShowContent">{{detailsList.elevCode}}</span>
              </el-form-item>
            
              <el-form-item label="时间" prop="gender">
                <span class="formShowContent">{{detailsList.elevCode}}</span>
              </el-form-item>
            
            </span>
            <span class="detailsSpan">
              <el-form-item label="所属单位" prop="account">
                <span class="formShowContent">{{detailsList.elevCode}}</span>
              </el-form-item>
            
              <el-form-item label="是否为高危地点" prop="gender">
                <span class="formShowContent">{{detailsList.elevCode}}</span>
              </el-form-item>
            
            </span>
            <span class="detailsSpan" style="padding: 21px 0 0 70px;">
              <el-form-item label="接触人数" prop="account">
                <span class="formShowContent" style="font-size:30px">{{detailsList.elevCode}}</span><span>人</span>
              </el-form-item>
            
            </span>
          </div>
        </el-form>

        <!-- 表格 Start -->
        <div style="position:relative;display:flex;">
          &nbsp;
          <el-table :data="elevatorList" style="margin-top:0!important;margin-bottom: 32px;" height="450">
            <el-table-column prop="elevCode" label="姓名">
            </el-table-column>
        
            <el-table-column prop="areaName" label="检测时间">
            </el-table-column>
            
            <el-table-column prop="elevCode" label="测温结果">
            </el-table-column>
        
            <el-table-column prop="areaName" label="检测状态">
            </el-table-column>
        
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                2.prevent就相当于..event.preventDefault() -->
                <el-button @click.native.prevent="openCheckDetails(scope.row)" type="text">查看详情
                </el-button>
                
              </template>
            </el-table-column>
          </el-table>
          &nbsp;
        </div>
        <!-- 表格 End -->

        <div slot="footer" class="dialog-footer tar">
          <el-button type="primary" @click="checkDetailsDialog = false" class="dialogSure">确 定</el-button>

        </div>
      </el-dialog>
      <!-- 接触详情 弹窗 End -->

      <fotter></fotter>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from 'api' //api.person
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import moment from 'moment';
import newArea from "../../utils/newArea";

export default {
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      getStaffInfo:[],
      totalPageSize:0,
      // queryParam:{
      //   offset:1,
      //   limit:10,
      //   column: "create_time",
      //   order: false,
      //   queryStr: "",
      //   corpId:window.localStorage.getItem('corpId')
      // },
      fits:'cover',
      url: '',
      open: false,
      jobRecord:[],
      elevatorTotal:[],
      departmentName:'',
      birthdayFrom:'',
      entryTimeFrom:'',
      empTimeFrom:'',
      elevatorList:[],
      elevatorTotal:0,
      taskListParams:{
        userId: this.$route.params.staffId,
        limit: 10,
        offset: 0
      },
      totalPageSize2:0,
      statusText:{
        0:'无计划',
        1000:'可派单',
        2000:'未派单',
        3000:'已派单',
        4000:'已接单',
        5000:'已关闭',
        6000:'已超时',
        7000:'已完成',
      },
      typeText:{
        1015:'例行维保',
        1090:'季度维保',
        1180:'半年维保',
        1365:'年度维保',
        2000:'故障处理',
        4000:'事故救援',
      },
      staffMLiftParam:{
        userId:this.$route.params.staffId,
        limit:10,
        offset:1
      },
      dialogRelease: false,
      checkDetailsDialog: false,
      detailsList:[]
    }
  },
  components: {
    'fotter': fotter,
  },
  mounted() {
    console.log("params==" + this.$route.query.idCard)
    //人员详情
    this.getAllAccountData()
    // 获取员工管辖电梯
    // this.getStaffManageLift()
    // 获取员工作业记录
    // this.getStaffTaskList()
    
    // console.log("111111111111111::" + moment("20121031", "YYYYMMDD").fromNow())
  },
  methods: {
    
    moment,
    // 打开查看详情弹窗
    openCheckDetails(row){
      this.detailsList = row
      this.checkDetailsDialog = true
    },

    // 确认解除异常状态
    confirmRelease(){
      api.person.relievingAnomalies({id: this.getStaffInfo.id}).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success') {
          this.$message.success("解除异常状态成功")
          this.dialogRelease = false
        } else {
          this.$message.console.error(res.data.message);
        }
      })
      
    },

    getTypeColor(type){
      var colorClass =  ''
      if(type == '故障处理'){
        colorClass = 'statusColor1'
      } else if(type == '事故救援'){
        colorClass = 'statusColor5'
      }
      return colorClass
    },
  
    // 跳转到诊断
    goDetection(elevCode) {
      this.$router.push({
        path: '/detection-panel',
        query: {
          elevCode: elevCode
        }
      })
    },
  
    // 查询账户详情
    getAllAccountData(){
      api.person.getPersonDetail({idCard: this.$route.query.idCard, epedId: this.$route.query.epedId}).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success') {
          this.getStaffInfo = res.data.data
          // this.elevatorList = res.data.data.elevatorList
          // 头像
          this.url = api.accountApi.viewPic(this.getStaffInfo.avatar)

          var areaName1 = newArea.getAreaName(this.getStaffInfo.areaCode.join(",")).join('  ')
          Vue.set(this.getStaffInfo, 'areaName', areaName1)
          console.log("areaName1===" + areaName1)

          this.departmentName = res.data.data.depName
          this.elevatorTotal = res.data.data.elevatorTotal
          this.birthdayFrom = moment(moment(this.getStaffInfo.birthday).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          this.entryTimeFrom = moment(moment(this.getStaffInfo.entryTime).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          this.empTimeFrom = moment(moment(this.getStaffInfo.empTime).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          console.log("this.birthdayFrom---" + this.birthdayFrom)

          
          // this.totalPageSize = res.data.data.elevatorTotal
          // this.url = "http://192.168.100.7:8080/domino/view/image?filename=" + this.getStaffInfo.avatarUrl
          
          
          // this.elevatorList.forEach(item =>{
          //   var areaName = newArea.getAreaName(item.areaCode).join('')
          //   Vue.set(item, 'areaName', areaName)
          // })
          
          // 获取头像
          
          // this.jobRecord = res.data.data.jobRecord
          // this.jobRecord = res.data.data.jobRecord

          // this.totalPageSize = res.data.data.total

        } else {
          this.getStaffInfo = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
    // 获取员工管辖电梯
    getStaffManageLift(){
      console.log("this.staffMLiftParam==" + JSON.stringify(this.staffMLiftParam))
      api.accountApi.getStaffManageLift(this.staffMLiftParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.elevatorList = res.data.data.records
          // this.totalPageSize = res.data.data.count
          this.elevatorList.forEach(item =>{
            var areaName = newArea.getAreaName(item.areaCode).join('')
            Vue.set(item, 'areaName', areaName)
          })
        } else {
          this.elevatorList = []
        }
        
      })
    },
    // 跳转到工单详情
    goToDetail(index,row){
      this.$router.push({name: 'missionDetail', params: {'id': row.taskId}})
    },
    // 展开
    // open(){
      // 作业记录
    getStaffTaskList(){
      api.accountApi.staffTaskList(this.taskListParams).then((res) => {
        this.jobRecord = res.data.data.records || []
        this.totalPageSize2 = res.data.data.total
      })
    },
    // },
    // 每页条数变化
    handleSizeChange(val) {
      this.staffMLiftParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getStaffManageLift()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.staffMLiftParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getStaffManageLift()
    },
    // 每页条数变化
    handleSizeChange2(val) {
      this.taskListParams.limit = val
      // console.log(`每页 ${val} 条`);
      this.getStaffTaskList()
    },

    // 当前页变化
    handleCurrentChange2(val) {
      this.taskListParams.offset = val
      // console.log(`当前页: ${val}`);
      this.getStaffTaskList()
    },
    

  },
}
</script>

<style lang="stylus">
#PersonnelDetails
  .detailDialog
    .el-table th
      padding: 10px 0 !important;
  .detailsSpan
    float left
    padding 0 70px 10px 0;
  .releaseBtn
    border: 1px solid #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(186,126,95,0.40);
    border-radius: 4px;
    display inline-block
    padding: 5px 22px;
    position: absolute;
    right: 30px;
    cursor pointer
  .hightLight
    background-image: linear-gradient(50deg, #F46D26 0%, #FD8D54 100%);
  .bread-nav
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    span 
      display: inline-block;
      font-size: 16px;
      color: #999999;
      &.on
        color: #34414C;
    em
      display: inline-block;
      font-size: 16px;
      color: #999999;
      margin: 0 10px;

  
  .s_contain
    height 238px
    padding: 33px 0
    margin-left:273px
  .s_pic
    height 190px
    width 190px
    position:absolute;
    margin: 23px 50px;
    // box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    img
      border-radius: 50%
      box-shadow: 0 4px 6px 1px rgba(154,154,154,0.31);
  .s_de_edit
    background url('../../assets/images/hs/edit.png') no-repeat center;
    width 14px
    height 14px
    display: inline-block
    position absolute 
    top 35px 
    right 26px
    cursor pointer
  .s_de_name
    font-size: 34px;
    margin-left: 36px
    margin-bottom 21px
    img
      margin-left:20px
  .s_de_department
    font-size: 14px;
    color: #999999;
    margin 10px 0 20px 36px
  .s_de_details 
    // margin-top: 20px;
    td
      // float left
      font-size: 14px;
      padding: 23px 42px 0px 37px;
      min-width: 201px;
      max-width: 301px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    .tie
      font-size: 12px;
      color: #999999;
  .open
    color: #4272FF;
    float: right;
    font-size: 14px;
    margin-right: 28px
    cursor pointer
  .closePanel
    // height: 303px;
    overflow: hidden;

</style>
