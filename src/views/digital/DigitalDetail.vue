<template>
  <div id="DigitalDetail" class="xym">
    <!-- TODO 面包屑 -->
    <!-- <div class="pageTitle">数字防疫点</div> -->
    <div class="bread-nav">
      <span @click="$router.push('/digital-list')">数字防疫点</span>
      <em>/ 防疫点档案</em>
    </div>

    <div class="x-container">
      <div class="digital-detail-tabTop clearfix" style="margin-top: 30px;">
        <div class="digital-detail-tab">
          <span class="on" style="z-index: 4" @click="goDigitalDetail">基本档案</span>
          <span style="z-index: 3" @click="goAbnormalDetail">异常档案</span>
        </div>

        <div class="digital-detail-tabTop-a clearfix">
          <div class="digital-detail-tabTop-anav" @click="goObserveList">检测任务管理</div>
          <div class="digital-detail-tabTop-anav-span">|</div>
          <div class="digital-detail-tabTop-anav" @click="goDiagnList">监测应用管理</div>
        </div>


      </div>

      <div class="la-result">
        <el-form :model="ruleForm" :rules="rules" ref="laForm">
          <div class="digital-detail-basic">
            <div class="xtitle-heading">
              <div class="xtitle-heading-h">
                <div class="xtitle-heading-h-line"></div>
                <div class="xtitle-heading-h-p">基本信息</div>
              </div>
            </div>
            <div class="digital-detail-basic-content">
              <div class="lar-con clearfix">
                <el-form-item prop="epedName" class="lar-box clearfix">
                  <div class="lar-box-h4"><span class="dia-citem-label-must" v-if="submitState == 'put'">*</span>防疫点名称</div>
                  <div class="lar-box-el-input" v-if="submitState == 'put'">
                    <el-input v-model="ruleForm.epedName" maxlength="100" placeholder="请输入防疫点名称" size="small"></el-input>
                  </div>
                  <div class="show-pp" v-else>{{ruleForm.epedName !== '' ? ruleForm.epedName : '--'}}</div>
                </el-form-item>
                <el-form-item prop="inNum" class="lar-box">
                  <div class="lar-box-h4"><span class="dia-citem-label-must" v-if="submitState == 'put'">*</span>内部编号</div>
                  <div class="lar-box-el-input" v-if="submitState == 'put'">
                    <el-input v-model="ruleForm.inNum" maxlength="100" placeholder="请输入防疫点内部编号" size="small"></el-input>
                  </div>
                  <div class="show-pp" v-else>{{ruleForm.inNum !== '' ? ruleForm.inNum : '--'}}</div>
                </el-form-item>

                


                <!-- 省市区街道级联 -->
                <el-form-item prop="areaCode" class="lar-box">
                  <div class="lar-box-h4"><span class="dia-citem-label-must" v-if="submitState == 'put'">*</span>区域</div>
                  <div class="lar-box-el-input" v-if="submitState == 'put'">
                    <city-choose ref="cityChooseRef" @childVal="getCity" :selectCity="special.areaCode"></city-choose>
                  </div>
                  <div class="show-pp" v-else>{{ruleForm.localArea !== '' ? ruleForm.localArea : '--'}}</div>
                </el-form-item>


                <el-form-item prop="address" class="lar-box">
                  <div class="lar-box-h4"><span class="dia-citem-label-must" v-if="submitState == 'put'">*</span>详细地址</div>
                  <div class="special-address-box">
                    <div class="lar-box-el-input lar-box-el-input-address" :class="submitState == 'put' ? 'special-address-opacity' : ''">
                      <el-input v-model="ruleForm.address" maxlength="100" size="small" id="address" placeholder="请输入详细地址"></el-input>
                    </div>
                    <div class="show-pp" :class="submitState == 'put' ? '' : 'special-address-opacity'">{{ruleForm.address !== '' ? ruleForm.address : '--'}}</div>
                  </div>
                  
                </el-form-item>

              </div>

              <div class="map-box">
                <div id="map-container"></div>
              </div>

              <div class="lar-box lar-box-parent clearfix" style="float: none; width: 100%;" v-if="submitState != 'put'">
                <div class="lar-box-h4" style="padding-right: 0; width: 92px; text-align: left;">所属上级</div>
                <!-- <div class="lar-box-el-input" v-if="submitState == 'put'">
                  <el-select v-model="ruleForm.parentId" placeholder="请选择所属上级" size="small" style="width: 100%;">
                    <el-option v-for="item in parentIdOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div> -->
                <div class="show-pp show-pp-parentname">{{ruleForm.parentName && ruleForm.parentName !== '' ? ruleForm.parentName : '--'}}</div>
              </div>  

            </div>

          </div>

          <!-- 编辑档案的检测区域 -->
          <div class="digital-detail-checkArea" v-if="submitState == 'put'">
            <div class="xtitle-heading">
              <div class="xtitle-heading-h">
                <div class="xtitle-heading-h-line"></div>
                <div class="xtitle-heading-h-p">检测区域（{{checkPoint.length}}）</div>
              </div>
            </div>

            <div class="digital-detail-checkArea-content clearfix">
              <div class="dd-checkArea-box" v-for="(item, i) in checkPoint" :key="i">
                <div class="dd-checkArea-box-close" @click="checkPointDelete(item, i)"></div>
                <div class="ddcarea-item">
                  <div class="ddcarea-item-label"><span class="dia-citem-label-must">*</span>检测区域名称</div>
                  <div class="ddcarea-item-input">
                    <el-input v-model="item.pointName" maxlength="50" size="small"></el-input>
                  </div>
                </div>
                <div class="ddcarea-item">
                  <div class="ddcarea-item-label"><span class="dia-citem-label-must">*</span>可测量数据</div>
                  <div class="ddcarea-item-input">
                    <!-- <el-select v-model="item.pointData" placeholder="请选择可测量数据" size="small" style="width: 100%;">
                      <el-option v-for="selectItem in pointDataOptions" :key="selectItem.value" :label="selectItem.label" :value="selectItem.value"></el-option>
                    </el-select> -->

                    <el-dropdown trigger="click" style="width: 100%;">
                      <span class="el-dropdown-link">
                        <div style="position: absolute;top:5px;right:10px;z-index:10;">
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-input class="ddcarea-item-input-cn" v-model="item.pointDataCN" size="small" placeholder="请选择部件"></el-input>
                      </span>
                      <el-dropdown-menu slot="dropdown" style="width: 260px;">
                        <div class="checkPoint-dropdown">
                          <el-checkbox-group v-model="item.pointData" @change="listPointDataChange(i)">
                            <el-checkbox v-for="itemSec in pointDataOptions" :label="itemSec.value" :key="itemSec.value" style="display: block !important; margin-left: 0px !important;margin-top: 10px;">{{itemSec.label}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>

          
                  </div>
                </div>
              </div>

              <div class="dd-checkArea-box" style="cursor: pointer;" @click="openDialogAddCheckPoint">
                <div class="add-check-point">
                  <div class="add-check-point-img"></div>
                  <div class="add-check-point-p">添加区域</div>
                </div>
              </div>

            </div>

          </div>

          <!-- 查看档案的检测区域 -->
          <div class="digital-detail-checkArea" v-else>
            <div class="xtitle-heading">
              <div class="xtitle-heading-h">
                <div class="xtitle-heading-h-line"></div>
                <div class="xtitle-heading-h-p">检测区域（{{ruleForm.checkPoint.length}}）</div>
              </div>
            </div>

            <div class="digital-detail-checkArea-content clearfix">
              <div class="ll-table" style="padding-left: 0px; padding-right: 0px;">
                <div class="llt-thead">
                  <div class="llt-tr clearfix">
                    <div class="llt-th">检测区域名称</div>
                    <div class="llt-th">已关联检测任务数</div>
                    <div class="llt-th">操作</div>
                  </div>
                </div>

                <div class="llt-tbody">
                  <div class="list-no-data" v-show="ruleForm.checkPoint.length == 0">暂无数据</div>

                  <div class="llt-tr clearfix" v-for="(item, i) in ruleForm.checkPoint" :key="i">
                    <div class="llt-tr-container clearfix">
                      <div class="llt-td">{{item.pointName}}</div>
                      <div class="llt-td">{{item.relatedNum}}</div>
                      <div class="llt-td">
                        <span class="llt-td-a" @click="openDialogCPDetail(i)">详情</span>
                      </div>
                    </div>
                  </div>


                </div>

       
              </div>
      
            </div>

          </div>



          <div class="xlist-btn-con clearfix" v-if="submitState == 'put'">
            <div class="xlist-btn xlist-btn-submit" style="float: left;" @click="submit">保存</div>
            <div class="xlist-btn xlist-btn-cancel" style="float: left; margin-left: 40px;" @click="backDetail">取消</div>
          </div>
          <div class="xlist-btn-con clearfix" v-else>
            <div class="xlist-btn xlist-btn-submit" style="float: left;" @click="goEdit">编辑</div>
          </div>

        </el-form>

      </div>

    </div>


    <!-- 添加检测区域弹窗 -->
    <el-dialog :visible.sync="dialogAddCheckPoint" title="添加检测区域" :show-close="false" width="700px">
      <div class="dia-content">
        <el-form :model="ruleFormCheckPoint" :rules="rulesCheckPoint" ref="checkPointRef" class="diaForm">
          <div class="dia-clist">
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>检测区域名称</div>
              <div class="dia-citem-ib">
                <el-input v-model="ruleFormCheckPoint.pointName" maxlength="50" size="small" placeholder="请选择部件"></el-input>
              </div>
            </div>
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must">*</span>可测量数据（多选）</div>
              <div class="dia-citem-ib">
                <!-- <el-select v-model="ruleFormCheckPoint.pointData" placeholder="请选择可测量数据" size="small" style="width: 100%;">
                  <el-option v-for="item in pointDataOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select> -->

                <el-dropdown trigger="click" style="width: 100%;">
                  <span class="el-dropdown-link">
                    <div style="position: absolute;top:5px;right:10px;z-index:10;">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-input v-model="ruleFormCheckPoint.pointDataCN" size="small" placeholder="请选择部件"></el-input>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width: 640px;">
                    <div class="checkPoint-dropdown">
                      <el-checkbox-group v-model="checkPointDataArr" @change="formPointDataChange">
                        <el-checkbox v-for="item in pointDataOptions" :label="item.value" :key="item.value" style="display: block !important; margin-left: 0px !important;margin-top: 10px;">{{item.label}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>

          </div>
        </el-form>

        <div class="dia-btn-con" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="closeDialogAddCheckPoint">取消</div>
          <div class="dia-btn dia-btn-submit" @click="saveCheckPoint">完成</div>
        </div>

      </div>


    </el-dialog>

    <!-- 检测区域详情弹窗 -->
    <el-dialog :visible.sync="dialogCheckPointDetail" title="检测区域详情" :show-close="false" width="700px">
      <div class="dia-content">
        <el-form :model="ruleFormCheckPointDetail" :rules="rulesCheckPointDetail" ref="checkPointDetailRef" class="diaForm">
          <div class="dia-clist">
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must" v-if="checkPointDetailState == 'put'">*</span>检测区域名称</div>
              <div class="dia-citem-ib" v-if="checkPointDetailState == 'put'">
                <el-input v-model="ruleFormCheckPointDetail.pointName" maxlength="50" size="small" placeholder="请选择部件"></el-input>
              </div>
              <div class="cpd-pp" v-else>{{ruleFormCheckPointDetail.pointName !== '' ? ruleFormCheckPointDetail.pointName : '--'}}</div>
            </div>
            <div class="dia-citem">
              <div class="dia-citem-label"><span class="dia-citem-label-must" v-if="checkPointDetailState == 'put'">*</span>可测量数据<i v-if="checkPointDetailState == 'put'">（多选）</i></div>
              <div class="dia-citem-ib" v-if="checkPointDetailState == 'put'">
                <el-dropdown trigger="click" style="width: 100%;">
                  <span class="el-dropdown-link">
                    <div style="position: absolute;top:5px;right:10px;z-index:10;">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-input v-model="ruleFormCheckPointDetail.pointDataCN" size="small" placeholder="请选择部件"></el-input>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width: 640px;">
                    <div class="checkPoint-dropdown">
                      <el-checkbox-group v-model="checkPointDetailDataArr" @change="formPointDetailDataChange">
                        <el-checkbox v-for="item in pointDataOptions" :label="item.value" :key="item.value" style="display: block !important; margin-left: 0px !important;margin-top: 10px;">{{item.label}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="cpd-pp" v-else>{{ruleFormCheckPointDetail.pointDataCN !== '' ? ruleFormCheckPointDetail.pointDataCN : '--'}}</div>

            </div>

            <!-- TODO -->
            <div class="dia-citem" v-if="checkPointDetailState != 'put'">
              <div class="dia-citem-label"><span class="dia-citem-label-must" v-if="checkPointDetailState == 'put'">*</span>已关联检测任务</div>
              <div class="cpd-pp">{{ruleFormCheckPointDetail.observeName !== '' ? ruleFormCheckPointDetail.observeName : '--'}}</div>
            </div>

          </div>
        </el-form>

        <div class="dia-btn-con" v-if="checkPointDetailState == 'put'" style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="dialogCheckPointDetail = false">取消</div>
          <div class="dia-btn dia-btn-submit" @click="editCheckPointSubmit">保存</div>
        </div>
        <div class="dia-btn-con" v-else style="text-align: right;">
          <div class="dia-btn dia-btn-cancel" @click="checkPointDetailState = 'put'">编辑</div>
          <div class="dia-btn dia-btn-submit" @click="dialogCheckPointDetail = false">关闭</div>
        </div>

      </div>


    </el-dialog>

  </div>
</template>

<script>
import api from '../../api'
import xymFun from '../../utils/xymFun'
import Footer from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose'


export default {
  data() {
    return {
      // --全局状态--
      parentCode: '',
      submitState: '',
      facility: '',
      partPoint: '',

      // --表单元素--
      ruleForm: {
        "epedName": "",
        "inNum": "",    
        "localArea": "",  
        "areaCode": "",    
        "address": "",      
        "latLon": "",
        "parentId": "",
        "checkPoint": []
      },
      rules: {
        epedName: [{ required: true, message: '必填', trigger: 'blur' }],
        inNum: [{ required: true, message: '必填', trigger: 'blur' }],
        areaCode: [{ required: true, message: '必填', trigger: 'change' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      // 用于特殊页面展示
      special: {
        areaCode: [],
        lng: '',
        lat: '',
      },
      deletingMonitorIdArr: [], // 记录要删除的检测区域id
      parentIdOptions: [],

      // --检测区域（编辑状态）--
      pointDataOptions: [
        {value: 1, label: '身份证+温度'},
        {value: 2, label: '人脸+温度'},
        {value: 3, label: '人脸+温度+身份证'},
      ],
      checkPoint: [
        // {"pointName" : "监测区域名称","pointData" : [1],"pointDataCN" : "身份证+温度"} // 提交时要处理pointData
      ],
      checkPointNative: [], // 原始checkPoint，用于编辑的比较和判断

      // --检测区域弹窗（编辑状态）--
      dialogAddCheckPoint: false,
      ruleFormCheckPoint: {
        pointName: '',
        pointData: [], // 存的是多选值
        pointDataCN: '' // 转化出的中文
      },
      rulesCheckPoint: {},
      checkPointDataArr: [], // 存的是值

      // --检测区域详情弹窗--
      checkPointDetailState: '', // 控制编辑还是只读状态
      dialogCheckPointDetail: false,
      ruleFormCheckPointDetail: {
        pointId: '',
        pointName: '',
        pointData: [], // 存的是多选值
        pointDataCN: '', // 转化出的中文
        observeName: ''
      },
      rulesCheckPointDetail: {},
      checkPointDetailDataArr: [], // 存详情多选框选中的数组值


    }
  },
  created() { 
    this.parentCode = this.$route.query.epedId
    this.submitState = this.$route.query.submitState

    // 当不存在，是无限加还是不给加？
    this.facility = localStorage.getItem('facility') ? parseInt(localStorage.getItem('facility')) : 100
    this.partPoint = localStorage.getItem('partPoint') ? parseInt(localStorage.getItem('partPoint')) : 100


  },
  mounted() {

    // 获取档案详情
    this.getDigitalDetail()

    this.searchMap()

    this.getCorpList()

  },
  methods: {
    // 获取上级
    getCorpList() {
      api.digital.getCorpList().then(res => {
        console.log('上级', res.data)
        this.parentIdOptions = []
        res.data.data.forEach(item => {
          this.parentIdOptions.push({
            label: item.name,
            value: item.id
          })
        })

      })
    },

    // 获取档案详情
    getDigitalDetail() {
      api.digital.getDigitalDetail(this.parentCode).then(res => {
        console.log('基本信息', res.data)
        let detail = res.data.data
        this.checkPointNative = xymFun.deepClone(detail.checkPoint)
        console.log('深拷贝的', this.checkPointNative)
        this.ruleForm = detail
        console.log('this.ruleForm',this.ruleForm.areaCode)
        // this.ruleForm.parentId = parseInt(res.data.data.parentId)


        // 特殊处理字段
        if (this.ruleForm.areaCode !== '') {
          this.special.areaCode = this.transformAreaCode(this.ruleForm.areaCode + '')
        }
        console.log('this.special.areaCode',this.special.areaCode)

        // 重新组装监测区域，方便编辑
        this.checkPoint = []
        if (this.ruleForm.checkPoint.length > 0) {
          this.ruleForm.checkPoint.forEach(item => {
            // 先转为数组["1","2","3"]，再将数组的字符串转为数值  map参数接收一个方法
            let pointDataTempArr = item.pointData.split('|').map(item => {
              return +item
            })
            let pointDataTempCNArr = []
            pointDataTempArr.forEach(itemCN => {
              pointDataTempCNArr.push(this.returnPointDataCN(itemCN))
            })
            this.checkPoint.push({
              "pointId": item.pointId,
              "pointName": item.pointName,
              "pointData": pointDataTempArr, // [], 处理成能多选的数组
              "pointDataCN": pointDataTempCNArr.join('，'),  // 转为中文
              "relatedNum": item.relatedNum,
              "observeName": item.observeName
            })

          })


        }


        this.searchMap(detail.latLon)

      })

    },

    // 判断监测数据
    returnPointDataCN(value) {
      if (value == 1) {
        return '身份证+温度'
      } else if (value == 2) {
        return '人脸+温度'
      } else if (value == 3) {
        return '人脸+温度+身份证'
      } else {
        return ''
      }
    },


    // 搜索地图，与LiftAddResult.vue有区别
    searchMap(latLon) {
      let that = this
      let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme1'
      console.log('经纬度latLon', latLon)

      // 地图基础配置
      var marker;
      var mapURL;
      
      // 深色主题
      if (theme == 'theme2') {
        mapURL = 'amap://styles/85ed8cccf4c51fa1c36fd40d443619eb'
      }
      // 浅色主题
      else {
        mapURL = 'amap://styles/db9065b28cc027a6a3240fc2ae093125'
      }
      var map = new AMap.Map("map-container", {
        resizeEnable: true,
        zoom: 20,
        mapStyle: mapURL,
      });

      let dragValue = false
      if (this.submitState == 'put') {
        dragValue = true
      }

      // 创建覆盖物
      function addMarker(lng, lat) {
        marker = new AMap.Marker({
          map: map,
          // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          content: 
          `
          <div class="point">
            <div class="point-light"></div>
            <div class="point-circle"></div>
          </div>
          `
          ,
          position: [lng, lat],
          draggable: dragValue
        });

        marker.setMap(map)
        that.special.lng = lng
        that.special.lat = lat
        // 拖拽
        marker.on('dragging', function (e) {
          that.special.lng = e.lnglat.lng
          that.special.lat = e.lnglat.lat
        });
      }

      if (latLon) {
        let lng = latLon.split(',')[0]
        let lat = latLon.split(',')[1]
        addMarker(lng, lat)
        map.setCenter([lng, lat]); //设置地图中心点
        // return
      }

      // 搜索
      let keywords = this.ruleForm.localArea + this.ruleForm.address
      console.log('搜索关键字', keywords)
      // 输入提示
      var auto = new AMap.Autocomplete({
        input: "address"
      });



      AMap.event.addListener(auto, 'select', function(e){
        console.log('e', e)
        map.clearMap()
        map.setZoomAndCenter(20, [e.poi.location.lng, e.poi.location.lat]); //设置地图中心点
        addMarker(e.poi.location.lng, e.poi.location.lat)
        that.ruleForm.address = e.poi.name
        // placeSearch.search(e.poi.name)

        // 联动优化测试
        that.special.areaCode = that.transformAreaCode(e.poi.adcode)
        console.log('that.special.areaCode', that.special.areaCode)
        that.ruleForm.areaCode = that.special.areaCode[that.special.areaCode.length - 1] || ""

        // 解析地址，分割
        var reg = /.+?(省|市|自治区|自治州|县|区)/g;
        that.ruleForm.localArea = e.poi.district.match(reg).join('/')
        console.log('切割地址', that.ruleForm.localArea)
        setTimeout(() => {
          that.$refs.laForm.clearValidate('areaCode')
        }, 100)

      })



      // 点击添加点
      if (this.submitState == 'put') {
        map.on('click', (e) => {
          map.clearMap()
          that.special.lng = e.lnglat.lng
          that.special.lat = e.lnglat.lat
          addMarker(e.lnglat.lng, e.lnglat.lat)
        });

      } else {
        
      }
      
    },

    // 特殊处理获得的areaCode区域码
    transformAreaCode(areaCode) {
      // 字符串转数组
      // "440305005000" => ["44", "4403", "440305", "440305005"]
      if (typeof areaCode == 'string') {
        let province = areaCode.substr(0, 2)
        let city = areaCode.substr(0, 4)
        let region = areaCode.substr(0, 6)
        let street = areaCode.substr(0, 9)
        let cityShow = []
        if (areaCode.length <= 2) {
          cityShow.push(province)
        } else if (areaCode.length > 2 && areaCode.length <= 4 ) {
          cityShow.push(province, city)
        } else if (areaCode.length > 4 && areaCode.length <= 6 ) {
          cityShow.push(province, city, region)
        } else {
          cityShow.push(province, city, region, street)
        }
        return cityShow
      }

      // 数组转字符串
      // ["44", "4403", "440305", "440305005"] => "440305005000"
      if (areaCode instanceof Array) {
        return areaCode[areaCode.length - 1]
      }

      console.log('areaCode传入类型错误')
    },

    // 获取省市区联动值
    getCity(arr, cityName) {
      this.ruleForm.areaCode = arr[arr.length - 1] || ""
      this.special.areaCode = arr
      this.ruleForm.localArea = cityName.join('/')
      console.log('省市区组件改变了', arr, cityName)

      // this.searchMap()
    },

    // 删除检测区域
    checkPointDelete(item, i) {
      let moniInfo = item
      if (moniInfo.relatedNum !== undefined && moniInfo.relatedNum !== 0) {
        
        return this.$message.error('有绑定检测任务，不允许删除')
      }
      if (moniInfo.pointId) {
        this.deletingMonitorIdArr.push(moniInfo.pointId)
      }
      this.checkPoint.splice(i, 1)
    },

    // 清空添加区域表单
    clearRuleFormCheckPoint() {
      this.ruleFormCheckPoint = {
        pointName: '',
        pointData: '',
        pointDataCN: '',
      }
      this.checkPointDataArr = []
    },

    // 打开弹窗
    openDialogAddCheckPoint() {
      // 曾经的弹窗，先注释
      // this.clearRuleFormCheckPoint()
      // this.dialogAddCheckPoint = true

      // 临时增加
      if (this.checkPoint.length >= this.partPoint) return this.$message.error('剩余可添加检测区域0')
      let ruleFormCheckPoint = {
        pointName: '',
        pointData: [], // 存的是多选值
        pointDataCN: '' // 转化出的中文
      }
      this.checkPoint.push(ruleFormCheckPoint)
    },

    // 关闭弹窗
    closeDialogAddCheckPoint() {
      this.clearRuleFormCheckPoint()
      this.dialogAddCheckPoint = false
    },

    // 添加检测区域
    saveCheckPoint() {
      let that = this
      if (this.checkPointDataArr.length === 0 || this.ruleFormCheckPoint.pointName === '') return this.$message.error('检测区域请填写完整')

      this.checkPoint.push(this.ruleFormCheckPoint)
      this.closeDialogAddCheckPoint()
    },

    // 弹窗表单检测区域多选
    formPointDataChange() {
      // 兼容写法，如果多选的value是数值的话，则修改判断
      let tempArrCN = []
      if (this.checkPointDataArr.length > 0) {
        this.checkPointDataArr.forEach((item, i) => {
          if (item == 1) {
            tempArrCN.push('身份证+温度')
          } else if (item == 2) {
            tempArrCN.push('人脸+温度')
          } else if (item == 3) {
            tempArrCN.push('人脸+温度+身份证')
          }
        })
      }
      this.ruleFormCheckPoint.pointDataCN = tempArrCN.join('，')
      this.ruleFormCheckPoint.pointData = this.checkPointDataArr
    },

    // 列表结果检测区域多选
    listPointDataChange(i) {
      // 兼容写法，如果多选的value是数值的话，则修改判断
      let tempArrCN = []
      if (this.checkPoint[i].pointData.length > 0) {
        this.checkPoint[i].pointData.forEach(item => {
          if (item == 1) {
            tempArrCN.push('身份证+温度')
          } else if (item == 2) {
            tempArrCN.push('人脸+温度')
          } else if (item == 3) {
            tempArrCN.push('人脸+温度+身份证')
          }
        })
      }
      this.checkPoint[i].pointDataCN = tempArrCN.join('，')
      // this.checkPoint[i].pointData = this.checkPointDataArr

    },

    // 打开只读状态的检测区域详情弹窗
    openDialogCPDetail(i) {
      this.checkPointDetailState = ''
      let cpDetail = this.checkPoint[i]
      console.log('cpDetail', cpDetail)
      this.dialogCheckPointDetail = true
      this.ruleFormCheckPointDetail = {
        pointId: cpDetail.pointId,
        pointName: cpDetail.pointName,
        pointData: cpDetail.pointData, // 存的是多选值
        pointDataCN: cpDetail.pointDataCN, // 转化出的中文
        observeName: cpDetail.observeName
      }
      this.checkPointDetailDataArr = cpDetail.pointData
      console.log('this.checkPointDetailDataArr', this.checkPointDetailDataArr)

    },

    // 关闭检测区域详情弹窗
    closeDialogCPDetail() {
      this.checkPointDetailState = ''
      this.dialogCheckPointDetail = false
    },

    // 检测区域弹窗详情多选更改
    formPointDetailDataChange() {
      let tempArrCN = []
      if (this.checkPointDetailDataArr.length > 0) {
        this.checkPointDetailDataArr.forEach((item, i) => {
          tempArrCN.push(this.returnPointDataCN(item))
        })
      }
      this.ruleFormCheckPointDetail.pointDataCN = tempArrCN.join('，')
      this.ruleFormCheckPointDetail.pointData = this.checkPointDataArr
    },

    // 编辑检测区域详情保存
    editCheckPointSubmit() {
      if (this.checkPointDetailDataArr.length === 0 || this.ruleFormCheckPointDetail.pointName === '') return this.$message.error('检测区域请填写完整')

      let param = {
        "pointId" : this.ruleFormCheckPointDetail.pointId, 
        "pointName" : this.ruleFormCheckPointDetail.pointName, 
        "pointData" : this.checkPointDetailDataArr.join('|')
      }

      api.digital.editEpidemicMonitor(param).then(res => {
        if (res.data.code == 200) {
          this.$message.success('保存成功')
          this.dialogCheckPointDetail = false
          this.getDigitalDetail()
        } else {
          this.$message.error(res.data.message)
        }
        
      })
    },

    // 提交
    submit() {
      let that = this
      let flag = true
      let flagMsg = ''
      this.$refs.laForm.validate(valid => {
        if (valid) {
          let lng = this.special.lng || ''
          let lat = this.special.lat || ''
          if (lng && lat) {
            this.ruleForm.latLon = `${lng},${lat}`
          } else {
            this.ruleForm.latLon = ''
          }
          if (!this.special.lng || !this.special.lat) return this.$message.error('请点击地图确定电梯具体位置')


          console.log('ruleForm', this.ruleForm)
          console.log('checkPointttttttt', this.checkPoint)

          // 简易校验监测区域
          let pointNameResult = this.checkPoint.some(item => {
            return item.pointName === ''
          })
          if (pointNameResult) return this.$message.error('监测区域名称不能为空')

          let pointDataResult = this.checkPoint.some(item => {
            return item.pointData.length === 0
          })
          if (pointDataResult) return this.$message.error('可监测数据不能为空')

          // 校验是否pointName重名
          function judgeRepeatName(arr){
            var repeatResult = false // false则没有重复，true则有重复
            var obj = {};
            for(var i=0; i < arr.length; i++){
              if (!obj[arr[i].pointName]) {
                obj[arr[i].pointName] = 1
              } else {
                obj[arr[i].pointName] ++
              }
            }

            for(var key in obj) {
              if (obj[key] > 1) {
                repeatResult = true
              }
            }
            return repeatResult
          }

          if (judgeRepeatName(this.checkPoint)) return this.$message.error('监测区域名重复')

          

          
          let param = {
            "epedId": this.parentCode,
            "epedName": this.ruleForm.epedName,
            "inNum": this.ruleForm.inNum,    
            "localArea": this.ruleForm.localArea,  
            "areaCode": this.ruleForm.areaCode,    
            "address": this.ruleForm.address,      
            "latLon": this.ruleForm.latLon,
            "parentId": this.ruleForm.parentId,
            // "parentName": this.ruleForm.parentName,
          }

          // 先调用编辑档案接口，再调用检测区域接口
          api.digital.editEpidemic(param).then(res => {
            console.log('编辑成功', res.data)

            /**
             * 根据checkPoint不同情况调用不同接口
             * 与checkPointNative作对比
             * 1. 没有id，则新增
             * 2. 有id，则作比较。存在则调用编辑接口，不存在就调用新增接口
             * 3. deletingMonitorIdArr数组遍历，调用删除接口，记得清空数组
             */

            console.log('checkPointttttttt', this.checkPoint)
            if (this.checkPoint.length === 0) {
              return this.$message.error('检测区域请填写完整')
            } else {
              this.checkPoint.forEach((item, i) => {
                if (item.pointId) {
                  // 编辑
                  let param = {
                    "pointId": item.pointId, 
                    "pointName": item.pointName, 
                    "pointData": item.pointData.join('|')  //1.身份证+温度 2.人脸+温度 3.人脸+温度+身份证
                  }
                  api.digital.editEpidemicMonitor(param).then(res => {
                    console.log('编辑成功', i, res.data)
                    if (res.data.code != 200) {
                      flag = false
                      flagMsg = res.data.message
                    }
                  })
                } else {
                  // 新增
                  let param = {
                    "epedId": this.parentCode,     
                    "pointName": item.pointName,
                    "pointData": item.pointData.join('|')  
                  }
                  api.digital.addEpidemicMonitor(param).then(res => {
                    console.log('新增成功', i, res.data)
                    if (res.data.code != 200) {
                      flag = false
                      flagMsg = res.data.message
                    }
                  })
                }
              })
            }
            
            // 遍历删除
            if (this.deletingMonitorIdArr.length > 0) {
              this.deletingMonitorIdArr.forEach(item => {
                api.digital.deleteEpidemicMonitor(item).then(res => {
                  console.log('删除成功', res.data)
                })
              })
            }

            // 跳转
            setTimeout(() => {
              if (res.data.code == 200 && flag) {
                this.$message.success('编辑成功')
                this.$router.push({
                  path: '/digital-detail',
                  query: {
                    epedId: this.parentCode,
                    submitState: 'get'
                  }
                })
                this.getDigitalDetail()
                
              } else {
                if (flagMsg) {
                  this.$message.error(flagMsg)
                } else {
                  this.$message.error(res.data.message)
                }
              }
              
            }, 500)
            
          })
          
        }
      })
    },

    // 跳转到编辑
    goEdit() {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': this.parentCode,
          'submitState': 'put'
        }
      })
    },

    // 返回详情
    backDetail() {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': this.parentCode,
          'submitState': 'get'
        }
      })
    },

    // 跳转到检测任务
    goObserveList() {
      this.$router.push({
        path: '/observe-list',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到监测应用
    goDiagnList() {
      this.$router.push({
        path: '/diagnosis-list',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到基本档案
    goDigitalDetail() {
      this.$router.push({
        path: '/digital-detail',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

    // 跳转到异常档案
    goAbnormalDetail() {
      this.$router.push({
        path: '/digital-abnormal',
        query: {
          'epedId': this.parentCode,
        }
      })
    },

  },
  components: {
    'city-choose': CityChoose,
    'footer-temp': Footer,

  }
}
</script>

<style>
#DigitalDetail .el-dialog__body {
  padding: 0 !important;
}
.checkPoint-dropdown{
  padding: 0 20px 10px;
}
.ddcarea-item-input-cn input{
  padding-right: 40px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cpd-pp{
  line-height: 32px;
  font-size: 16px;
  color: #333333;
}
</style>


<style lang="stylus" scoped>
#DigitalDetail{
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 46%;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 41%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 13%;
  }

}

/* 适配 */
@media screen and (max-width: 1550px) {
  #DigitalDetail{
    .lar-box-h4{
      padding-right: 14px !important;
    }
    .lar-con .lar-box:first-child .lar-box-h4{
      width: 30%;
    }
    .lar-box-parent .lar-box-h4{
      width: 7% !important;
    }
  }
}
</style>
