<template>
  <div id="DigitalAddResult" class="xym">
    <!-- TODO 面包屑 -->
    <!-- <div class="pageTitle">数字防疫点</div> -->
    <div class="bread-nav">
      <span @click="$router.push('/digital-list')">数字防疫点</span>
      <em>/ 添加防疫点</em>
    </div>

    <div class="x-container">
      <!-- <div class="digital-detail-tabTop clearfix">
        <div class="digital-detail-tab">
          <span class="on" style="z-index: 4">基本档案</span>
          <span style="z-index: 3">异常档案</span>
        </div>
      </div> -->

      <div class="la-result" style="margin-top: 30px;">
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
                  <div class="lar-box-h4">防疫点名称<i class="must-fill-icon"></i></div>
                  <div class="lar-box-el-input">
                    <el-input v-model="ruleForm.epedName" maxlength="100" placeholder="请输入防疫点名称" size="small"></el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="inNum" class="lar-box">
                  <div class="lar-box-h4">内部编号<i class="must-fill-icon"></i></div>
                  <div class="lar-box-el-input">
                    <el-input v-model="ruleForm.inNum" maxlength="100" placeholder="请输入防疫点内部编号" size="small"></el-input>
                  </div>
                </el-form-item>
                <!-- 省市区街道级联 -->
                <el-form-item prop="areaCode" class="lar-box">
                  <div class="lar-box-h4">区域<i class="must-fill-icon"></i></div>
                  <div class="lar-box-el-input">
                    <city-choose ref="cityChooseRef" @childVal="getCity" :selectCity="special.areaCode"></city-choose>
                  </div>
                </el-form-item>
                <el-form-item prop="address" class="lar-box">
                  <div class="lar-box-h4">详细地址<i class="must-fill-icon"></i></div>
                  <div class="lar-box-el-input">
                    <el-input v-model="ruleForm.address" maxlength="100" size="small" id="address" placeholder="请输入详细地址"></el-input>
                  </div>
                </el-form-item>

              </div>

              <div class="map-box">
                <div id="map-container"></div>
              </div>  

            </div>

          </div>

          <div class="digital-detail-checkArea">
            <div class="xtitle-heading">
              <div class="xtitle-heading-h">
                <div class="xtitle-heading-h-line"></div>
                <div class="xtitle-heading-h-p">检测区域（{{checkPoint.length}}）</div>
              </div>
            </div>

            <div class="digital-detail-checkArea-content clearfix">
              <!-- <div class="dd-checkArea-box">
                <div class="dd-checkArea-box-close"></div>
                <div class="ddcarea-item">
                  <div class="ddcarea-item-label">检测区域名称</div>
                  <div class="ddcarea-item-input">
                    <el-input v-model="ruleForm.inNum" size="small"></el-input>
                  </div>
                </div>
                <div class="ddcarea-item">
                  <div class="ddcarea-item-label">可测量数据</div>
                  <div class="ddcarea-item-input">
                    <el-select v-model="ruleForm.pointData" placeholder="请选择可测量数据" size="small" style="width: 100%;">
                      <el-option v-for="item in pointDataOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
              </div> -->

              <div class="dd-checkArea-box" v-for="(item, i) in checkPoint" :key="i">
                <div class="dd-checkArea-box-close" @click="checkPointDelete(i)"></div>
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

          <div class="xlist-btn-con clearfix">
            <div class="xlist-btn xlist-btn-submit" style="float: left;" @click="submit">保存</div>
            <div class="xlist-btn xlist-btn-cancel" @click="$router.push('/digital-list')" style="float: left; margin-left: 40px;">取消</div>
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
                <el-input v-model="ruleFormCheckPoint.pointName" maxlength="50" size="small" placeholder="请输入部件名称"></el-input>
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
                    <el-input v-model="ruleFormCheckPoint.pointDataCN" size="small" placeholder="请选择可测量数据"></el-input>
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
      // --表单元素--
      ruleForm: {
        "epedName": "",
        "inNum": "",    
        "localArea": "",  
        "areaCode": "",    
        "address": "",      
        "latLon": "",
        "checkPoint": [
          // {
          //   "pointName" : "监测区域名称",
          //   "pointData" : "可监测数据"
          // }
        ]

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

      // 检测区域
      pointDataOptions: [
        {value: 1, label: '身份证+温度'},
        {value: 2, label: '人脸+温度'},
        {value: 3, label: '人脸+温度+身份证'},
      ],
      checkPoint: [
        // {"pointName" : "监测区域名称","pointData" : [1, 2],"pointDataCN" : "身份证+温度"} // 提交时要处理pointData
      ],

      // 检测区域弹窗
      dialogAddCheckPoint: false,
      ruleFormCheckPoint: {
        pointName: '',
        pointData: [], // 存的是多选值
        pointDataCN: '' // 转化出的中文
      },
      rulesCheckPoint: {},
      checkPointDataArr: [] // 存的是值


    }
  },
  mounted() {

    this.searchMap()

  },
  methods: {

    // 搜索地图
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

      // 创建覆盖物
      function addMarker(lng, lat, pointShowPa) {
        let pointShow = pointShowPa ? 'point-tip-show' : ''
        marker = new AMap.Marker({
          map: map,
          // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          content: 
          `
          <div class="point" id="pp">
            <div class="point-light"></div>
            <div class="point-circle"></div>
          </div>
          `
          ,
          position: [lng, lat],
          draggable: true
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
      
      // 初始化marker
      addMarker(map.getCenter().lng, map.getCenter().lat, true)
      marker.on('mousedown', function () {
        document.getElementById('point-tip').style.display = 'none'
      })

      if (latLon) {
        let lng = latLon.split(',')[0]
        let lat = latLon.split(',')[1]
        addMarker(lng, lat)
        map.setCenter([lng, lat]); //设置地图中心点
        return
      }

      // 搜索
      let keywords = this.ruleForm.localArea + this.ruleForm.address
      console.log('搜索关键字', keywords)
      // 输入提示
      var auto = new AMap.Autocomplete({
        input: "address"
      });
      AMap.event.addListener(auto, 'select', function(e){
        console.log('详细地址select', e)
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
      map.on('click', (e) => {
        map.clearMap()
        that.special.lng = e.lnglat.lng
        that.special.lat = e.lnglat.lat
        addMarker(e.lnglat.lng, e.lnglat.lat)
      });
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
    checkPointDelete(i) {
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
      this.clearRuleFormCheckPoint()
      this.dialogAddCheckPoint = true
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

    // 提交
    submit() {
      let that = this
      console.log('钱钱ruleForm', this.ruleForm)

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

          
          let param = {
            "epedName": this.ruleForm.epedName,
            "inNum": this.ruleForm.inNum,    
            "localArea": this.ruleForm.localArea,  
            "areaCode": this.ruleForm.areaCode,    
            "address": this.ruleForm.address,      
            "latLon": this.ruleForm.latLon,
            "checkPoint": []
          }

          let tempCheckPoint = []
          if (this.checkPoint.length === 0) {
            return this.$message.error('检测区域请填写完整')
          } else {
            this.checkPoint.forEach(item => {
              tempCheckPoint.push({
                'pointName': item.pointName,
                'pointData': item.pointData.join('|')
              })
            })

            // for (let i = 0; i < this.checkPoint.length; i++) {
            //   let pointNameTemp = this.checkPoint[i].pointName
            //   let pointDataTemp = this.checkPoint[i].pointData.join('|')
            //   // console.log('pointDataTemp', pointDataTemp)
              
            //   if (pointNameTemp === '' || pointDataTemp === '') {
            //     return this.$message.error('检测区域请填写完整')
            //   } else {
            //     tempCheckPoint.push({
            //       'pointName': pointNameTemp,
            //       'pointData': pointDataTemp
            //     })
            //   }
            // }
          }
          param.checkPoint = tempCheckPoint

          console.log('param----', param)
          api.digital.addEpidemic(param).then(res => {
            if (res.data.code == 200) {
              that.$message.success('添加成功')
              that.$router.push({path: '/digital-list'})
            } else {
              that.$message.error(res.data.message)
            }
          })

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
#DigitalAddResult .el-dialog__body {
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
</style>


<style lang="stylus" scoped>
#DigitalAddResult{

}

/* 适配 */
@media screen and (max-width: 1550px) {
  #DigitalAddResult{
    .lar-box-h4{
      padding-right: 14px !important;
    }
  }
}

</style>
