<template>

<div class="lalala">

<!-- :data="treeData" -->
    <el-tree

        :expand-on-click-node="false"

        node-key="id"

        :load="loadNode1"

        :props= defaultProps

        lazy

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
                  <el-dropdown-item><div class="delete" @click="deleteDialog = true;alert(1)">删除</div></el-dropdown-item>
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

            <span>保存</span>
            <span>取消</span>

          </span>
          
        </span>
        
    </el-tree>

    <!-- <el-card class="box-card" ref="card" v-show="menuVisible">

        <div @click="addSameLevelNode()" v-show="firstLevel">

            <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;同级增加

        </div>
        <div class="edit" @click="editNode()">编辑</div>
        <div class="delete" @click="deleteNode()">删除</div>
        <div class="add" @click="addChildNode()">添加下级</div>

    </el-card> -->
    <!-- 删除账号 弹窗-->
    <el-dialog width="500px" :show-close="false" title="删除账号" :visible.sync="deleteDialog">
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
        <span @click="deleteDialog = false" class="dialogCancel">取 消</span>
        <el-button type="primary" @click="deleteNode()" class="dialogSure">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 删除电梯 弹窗 end-->
</div>

</template>

<script>
// import '../mock/mockfile.js'

import axios from "axios";
import api from '../api'


export default {
  name: "processManagement",
  props: {
    treeData: {
      type: Array
    },
  },
  data() {
    return {
      dialogDelete:false,

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
      resolve:''

    };
  },

  methods: {
    

    

    // // 查询
    // filterNode(value, data) {
    //   if (!value) return true;

    //   return data.label.indexOf(value) !== -1;
    // },


    // 点击更多操作
    rightClick(event,Node,object) {
      // this.menuVisible = true;
      
      // debugger

      this.currentData = object;

      this.currentNode = Node;

      console.log("currentData==" + JSON.stringify(this.currentData))
      console.log("currentNode==" + this.currentNode)
    },


    // 增加同级节点事件

    // addSameLevelNode() {
    //   let id = Math.ceil(Math.random() * 100);

    //   var data = { id: id, label: "新增节点" };

    //   this.$refs.tree.append(data, this.currentNode.parent);
    // },


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
          // this.loadNode1(this.currentNode, resolve)
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
          // api.accountApi.editDepartment({id:this.currentData.id}).then((res) => {
          //   if(res.data.code === 200 && res.data.message === 'success'){

          //   }
          // })
          this.$set(data, "isEdit", false);

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
//         console.log("getAllDepJson111===" + JSON.stringify(this.getAllDepJson))
//         return resolve([{'corpId': "1229819391223214081",
// 'createTime': "2020-02-19 01:26:06",
// 'id': "1",
// 'name': "AAA商户",
// 'parentId': "1229819391223214081"}]);
//       }
      // if (node.level > 1) return resolve([]);
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

  },

  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   }
  // },

  mounted() {
    this.getAllDepartmentData()

    // this.test();
  }
  
};
</script>

<style scoped lang="stylus">
.lalala{
  margin 21px;
  position: relative;
}
.text {
  font-size: 14px;
}

.el-tree {
  width: 100%;
  margin-top: 10px;
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
.operatioDropdownSpan{
  position absolute
  right 0
}
.operatioDropdown{
  .el-dropdown-menu__item{
    font-size 12px!important 
    line-height: 14px!important
    color: #3572FF!important
    text-align: center;
    &:hover{
      background none!important
    }
    .delete{
      color: #CCCCCC!important
    }
  }
}
.operationBtn{
  color:#999999;
  
  font-size: 18px;
  font-weight: 600;
  line-height: 13px;
}
</style>

