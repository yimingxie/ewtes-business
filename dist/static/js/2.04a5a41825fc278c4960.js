webpackJsonp([2],{"+94q":function(t,a,e){t.exports=e.p+"static/images/staffErrorHeader.4cddf2e.png"},"4uqA":function(t,a){},HDtn:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAiFJREFUOBHNlD9oE3EUx9+73J3X9iihtaigWx0tDkVcHLTYLO3i4OAUQeniZhXBJTgIYu1SZ6lQF9dIptKYsVhbgoJ1CDQpKpKktuaiSX5393yn/dHfnbmSRfCW933/Pvfu/e4O4H+/sJcBny/TMEBrzPcT39KXjSIiUlzfocDsGvXX6+05QrgBREYA8Tyoko7pm5NWrhs0FpjPk74l2q8YlFIbf3YQhIulE0nz7NWL6Ki5QGvRgPS3vM5UFBbkVt8bsLapH98VYlTWqlZXnZD26LTq+z7Cm486bFc1QISB1Xda16eLBWoJrLguiE81zRge9KGwYUJt7w+D+EjKVdhTbyh1LHAoaWZL5c7b1+vG+cEBgu/Ng4F4Qv+kBZ8lRLWxO5wexx99Jly3DJhvOLCjNrEuLWawFYn9dmOBQXZm+shm7hHednaKNfJangTwhC+ljtpDgUFxJkM6iZbp1IqJtlMBXzQKfTY8jIKkf7AYGWFLRDhxB6b4e7jG+0+R226K5hfbJ9c2+pNXCgsjWaU8JP8CTszSGPiwxKAzocp9hxu+8tt7/5QNL7rtMQRM3aNR0YEN7rW7wSKxKoMfrMzhUzUe2qFwYaZHWMAY4SdZuHSXzsUCNR8+qMmeNIGr1oUmXJ7HZ7yDW/xa1NWirhrB5brZlce4ruZDO5SJdIas7QZc4N/WJJ/0OBAc40M6yoBdthX28xbCUu4JlmXPP7O/AMFYvaMp6QqqAAAAAElFTkSuQmCC"},kT0I:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAipJREFUOBHNkz1oFEEUx9+b3b3dM6iYO4kKNn5UglgoiCAiAQUxbbAQMaAEU1jY2V1lIRFtVUTELqVKqvgFNkGF0yaiOUROTvCMlzOXvY/dmeebmJyze7tHCgsHlvm/mfd+O+/NG4D/feB6DkgzszloWfsBVQ1OHXqHiJQW1xdIj99sAFCTHHwBiJwViIQq2HQeRw5PJ0FTgfScbGi8fsKgk2YgtQMASSUcGjyAx/c1zD2t7fhC1268PR2H6b1w7ouetjkb3T08F7VhjnQg0F7TkRRB+LEMqloHQBwI3pcSs+sDBB8IAvmj7ohNWQiKJaBf/p9/EIHzvcbk3pEOVGqWmh0ZFucdHPCAllvdaERQsDlb6S4YQhg6Kj1vDj3bs3dtJ4bFToMlLIz9/YMRmQ7sBDtBCLB278DF6kJThVIacVOGjshEIE1/crn/rmtPnWqoVLb6tWIt/axD0Gq/zAyKaxGKYSTXcOnbhKwsjPDXplbHzW/NO82m73PlXCFwCgvjq7djkFZlz9W3r9w9Cyq8T5IbO2HwhYREeA8z4pZ7Y/xD3CUCDC7fOaJIviKgyHo8SNsI+j3Tw0zu0hgWUK35RGooITyzHpgO1n5MPBfWbg+vwfQcAVoWPNIpmQ79NJ9S2o41b/pEgM7NiRkB9jFO6MVK85qevbosLDiBkxc/m1uptaKrD3KdZX+YMzvILTTE7zfPgYtcurJQ1jP76JanODpq9qbJ/Xf6N5uQz2MqRWreAAAAAElFTkSuQmCC"},rqvO:function(t,a,e){"use strict";e("1iFt")},yury:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("bOdI"),o=e.n(s),i=(e("7+uW"),e("n5Qe")),l=(e("TCsi"),e("s6tw")),n=e("PJh5"),r=e.n(n),c=(e("rqvO"),{data:function(){var t;return t={dateFormat:"YYYY-MM-DD",getStaffInfo:[],totalPageSize:0,fits:"cover",url:"",open:!1,jobRecord:[],elevatorTotal:[],departmentName:"",birthdayFrom:"",entryTimeFrom:"",empTimeFrom:"",elevatorList:[]},o()(t,"elevatorTotal",0),o()(t,"taskListParams",{userId:this.$route.params.staffId,limit:10,offset:0}),o()(t,"totalPageSize2",0),o()(t,"statusText",{0:"无计划",1000:"可派单",2000:"未派单",3000:"已派单",4000:"已接单",5000:"已关闭",6000:"已超时",7000:"已完成"}),o()(t,"typeText",{1015:"例行维保",1090:"季度维保",1180:"半年维保",1365:"年度维保",2000:"故障处理",4000:"事故救援"}),o()(t,"staffMLiftParam",{epedId:"",pointId:"",date:"",userId:""}),o()(t,"dialogRelease",!1),o()(t,"checkDetailsDialog",!1),o()(t,"detailsList",[]),o()(t,"result",["","未处理","已处理","解除警告"]),o()(t,"tableData",[]),o()(t,"tableDataQuery",{userId:this.$route.query.userId,epedId:this.$route.query.epedId,limit:7,offset:1}),t},components:{fotter:l.a},mounted:function(){this.getAllAccountData()},methods:{moment:r.a,openCheckDetails:function(t){this.detailsList=t,this.staffMLiftParam.epedId=t.epedId,this.staffMLiftParam.pointId=t.pointId,this.staffMLiftParam.date=t.time,this.staffMLiftParam.userId=t.userId,this.getStaffManageLift(),this.checkDetailsDialog=!0},confirmRelease:function(){var t=this;i.a.person.relievingAnomalies({userId:this.getStaffInfo.id}).then(function(a){200===a.data.code&&"success"===a.data.message?(t.$message.success("解除异常状态成功"),t.dialogRelease=!1,t.getAllAccountData()):t.$message.error(a.data.message)})},getTypeColor:function(t){var a="";return"故障处理"==t?a="statusColor1":"事故救援"==t&&(a="statusColor5"),a},goDetection:function(t){this.$router.push({path:"/detection-panel",query:{elevCode:t}})},getAllAccountData:function(){var t=this;i.a.person.getPersonDetail(this.tableDataQuery).then(function(a){200===a.data.code&&"success"===a.data.message?(t.getStaffInfo=a.data.data||[],t.tableData=t.getStaffInfo.data.records||[],t.totalPageSize=t.getStaffInfo.data.total||0,t.getStaffInfo.avatar&&""!=t.getStaffInfo.avatar&&null!=t.getStaffInfo.avatar&&(t.url=i.a.accountApi.viewPic(t.getStaffInfo.avatar))):(t.getStaffInfo=[],t.$message.error(a.data.message))}).catch(function(t){})},getStaffManageLift:function(){var t=this;i.a.person.contactRecord(this.staffMLiftParam).then(function(a){200===a.data.code&&"success"===a.data.message?t.elevatorList=a.data.data||[]:(t.elevatorList=[],t.$message.error(a.data.message))})},goToDetail:function(t,a){this.$router.push({name:"missionDetail",params:{id:a.taskId}})},handleSizeChange:function(t){this.tableDataQuery.limit=t,this.getAllAccountData()},handleCurrentChange:function(t){this.tableDataQuery.offset=t,this.getAllAccountData()}}}),f={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"PersonnelDetails"}},[s("div",{staticClass:"main-wrap"},[s("div",{staticClass:"pageTitle"},[s("router-link",{attrs:{to:"/personnel"}},[s("span",{staticClass:"preTitle"},[t._v("人员防疫记录")])]),t._v("\n     / 人员详情")],1),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"panel topPanel ",class:{"highlightDiv hightLight":1==t.getStaffInfo.warnStatus}},[s("div",{staticClass:"s_pic"},[t.url?s("img",{attrs:{src:t.url,alt:"",width:"190",height:"190"}}):0==t.getStaffInfo.warnStatus?s("img",{attrs:{src:e("/wC6"),alt:"",width:"190",height:"190"}}):s("img",{attrs:{src:e("+94q"),alt:"",width:"190",height:"190"}})]),t._v(" "),s("div",{staticClass:"s_contain"},[1==t.getStaffInfo.warnStatus?s("div",{staticClass:"releaseBtn",on:{click:function(a){t.dialogRelease=!0}}},[t._v("解除异常状态")]):t._e(),t._v(" "),s("p",{staticClass:"s_de_name"},[t._v(t._s(t.getStaffInfo.name)+"\n            "),"0"==t.getStaffInfo.sex?s("img",{attrs:{src:e("kT0I"),alt:""}}):s("img",{attrs:{src:e("HDtn"),alt:""}})]),t._v(" "),s("div",{staticClass:"s_de_details"},[s("table",[s("tr",[s("td",[s("span",{staticClass:"tie"},[t._v("手机号码：")]),s("span",[t._v(t._s(t.getStaffInfo.phone?t.getStaffInfo.phone:"--"))])]),t._v(" "),s("td",[s("span",{staticClass:"tie"},[t._v("出生日期：")]),t._v(" "),t.getStaffInfo.birthday?s("span",[t._v(t._s(t.getStaffInfo.birthday.substring(0,4)+"-"+t.getStaffInfo.birthday.substring(4,6)+"-"+t.getStaffInfo.birthday.substring(6,8)))]):s("span",[t._v("--")])]),t._v(" "),s("td",[s("span",{staticClass:"tie"},[t._v("身份证号：")]),s("span",[t._v(t._s(t.getStaffInfo.idCard))])])]),t._v(" "),s("tr",[s("td",[s("span",{staticClass:"tie"},[t._v("所属单位：")]),s("span",[t._v(t._s(t.getStaffInfo.corpName?t.getStaffInfo.corpName:"--"))])]),t._v(" "),s("td",[s("span",{staticClass:"tie"},[t._v("所属部门：")]),t._v(" "),t.getStaffInfo.departmentName?s("span",[t._v(t._s(t.getStaffInfo.departmentName?t.getStaffInfo.departmentName:"--"))]):s("span",[t._v("--")])])])])])])])]),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"panel",class:t.open?"":"closePanel"},[s("div",{staticClass:"title",staticStyle:{"border-bottom":"none"}}),t._v(" "),s("div",{staticStyle:{position:"relative",display:"flex"}},[t._v("\n           \n          "),s("el-table",{staticStyle:{"margin-top":"0!important"},attrs:{data:t.tableData}},[s("el-table-column",{attrs:{prop:"time",label:"时间","show-overflow-tooltip":!0}}),t._v(" "),s("el-table-column",{attrs:{prop:"epedName",label:"防疫点","show-overflow-tooltip":!0}}),t._v(" "),s("el-table-column",{attrs:{label:"检测区域","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",{domProps:{innerHTML:t._s(a.row.pointName)}})]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"corpName",label:"所属单位","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",{domProps:{textContent:t._s(a.row.corpName?a.row.corpName:"--")}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"体温"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.value)+"℃")])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"elevCode",label:"检测状态"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.valid?s("span",[t._v("正常")]):s("span",{staticStyle:{color:"#FF652C"}},[t._v("异常")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"处理结果"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.result&&""!==a.row.result?s("span",{style:{color:1==a.row.result?"#FF652C":""}},[t._v(t._s(t.result[a.row.result]))]):s("span",[t._v("--")])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"areaName",label:"是否为高危地点",width:"120"},scopedSlots:t._u([{key:"default",fn:function(a){return[1==a.row.dangerousFlag?s("span",{staticStyle:{color:"#FF652C"}},[t._v("是")]):s("span",[t._v("否")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("el-button",{attrs:{type:"text"},nativeOn:{click:function(e){return e.preventDefault(),t.openCheckDetails(a.row)}}},[t._v("查看详情\n                ")])]}}])})],1),t._v("\n           \n        ")],1),t._v(" "),s("div",{staticClass:"pagination_block"},[s("el-pagination",{attrs:{"page-sizes":[7,20,30],"page-size":t.tableDataQuery.limit,"current-page":t.tableDataQuery.offset,layout:"prev, pager, next, sizes, jumper",total:t.totalPageSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])]),t._v(" "),s("el-dialog",{attrs:{width:"500px","show-close":!1,title:"解除异常状态",visible:t.dialogRelease},on:{"update:visible":function(a){t.dialogRelease=a}}},[s("div",{staticClass:"dialog-delete"},[s("div",{staticClass:"dia-heading"},[s("div",{staticClass:"dia-con-pic"}),t._v(" "),s("div",{staticClass:"dia-con-p"},[s("div",{staticClass:"confirDialogText1"},[t._v("是否解除该人员异常状态？")])])])]),t._v(" "),s("div",{staticClass:"dialog-footer tar",attrs:{slot:"footer"},slot:"footer"},[s("span",{staticClass:"dialogCancel",on:{click:function(a){t.dialogRelease=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{staticClass:"dialogSure",attrs:{type:"primary"},on:{click:function(a){return t.confirmRelease()}}},[t._v("确 认")])],1)]),t._v(" "),s("el-dialog",{staticClass:"detailDialog",attrs:{width:"954px",title:"接触记录",visible:t.checkDetailsDialog},on:{"update:visible":function(a){t.checkDetailsDialog=a}}},[s("el-form",{ref:"editForm",staticStyle:{overflow:"hidden"},attrs:{model:t.detailsList,"label-position":"top"}},[s("div",{staticClass:"detailsDiv"},[s("span",{staticClass:"detailsSpan clearfix"},[s("el-form-item",{attrs:{label:"防疫点",prop:"account"}},[s("span",{staticClass:"formShowContent"},[t._v(t._s(t.detailsList.epedName))])]),t._v(" "),s("el-form-item",{attrs:{label:"时间",prop:"gender"}},[s("span",{staticClass:"formShowContent"},[t._v(t._s(t.detailsList.time))])])],1),t._v(" "),s("span",{staticClass:"detailsSpan"},[s("el-form-item",{attrs:{label:"检测区域",prop:"pointName"}},[s("span",{staticClass:"formShowContent"},[t._v(t._s(t.detailsList.pointName))])]),t._v(" "),s("el-form-item",{attrs:{label:"是否为高危地点",prop:"gender"}},[s("span",{staticClass:"formShowContent"},[t._v(t._s(1==t.detailsList.dangerousFlag?"是":"否"))])])],1)])]),t._v(" "),s("div",{staticStyle:{position:"relative",display:"flex"}},[t._v("\n         \n       \n        "),s("el-table",{staticStyle:{"margin-top":"0!important","margin-bottom":"32px"},attrs:{data:t.elevatorList,"max-height":"288"}},[s("el-table-column",{attrs:{label:"序号",type:"index",width:"80"}}),t._v(" "),s("el-table-column",{attrs:{label:"姓名"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("router-link",{staticStyle:{color:"#3572FF"},attrs:{to:{path:"/person-detail",query:{userId:a.row.userId,epedId:a.row.epedId}}}},[t._v("\n                "+t._s(""==a.row.name?"--":a.row.name)+"\n              ")])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"time",label:"检测时间"}}),t._v(" "),s("el-table-column",{attrs:{label:"测温结果"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.value)+"℃")])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"valid",label:"是否有异常"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.valid?s("span",{staticStyle:{color:"#FF652C"}},[t._v("有")]):s("span",[t._v("无")])]}}])})],1),t._v("\n         \n      ")],1),t._v(" "),s("div",{staticClass:"dialog-footer tar",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"dialogSure",attrs:{type:"primary"},on:{click:function(a){t.checkDetailsDialog=!1}}},[t._v("确 定")])],1)],1),t._v(" "),s("fotter")],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"bigTitle"},[this._v("测温记录")])])}]};var d=e("VU/8")(c,f,!1,function(t){e("4uqA")},null,null);a.default=d.exports}});