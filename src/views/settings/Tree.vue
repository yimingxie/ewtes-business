<template>

<div class="lalala">

    <!-- <el-input

          placeholder="输入关键字进行过滤"

          v-model="filterText"

        class="search">

    </el-input> -->

    <el-tree

          :data="treeData"

          :expand-on-click-node="false"

          node-key="id"

          default-expand-all

          @node-click="handleLeftclick"

          @node-drag-start="handleDragStart"

          @node-drag-enter="handleDragEnter"

          @node-drag-leave="handleDragLeave"

          @node-drag-over="handleDragOver"

          @node-drag-end="handleDragEnd"

          @node-drop="handleDrop"

          :filter-node-method="filterNode"

          draggable

          :allow-drop="allowDrop"

          :allow-drag="allowDrag"

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
                  <el-dropdown-item><div class="delete" @click="deleteNode()">删除</div></el-dropdown-item>
                  <el-dropdown-item><div class="add" @click="addChildNode()">添加下级</div></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>

          <span v-show="data.isEdit">

              <el-input class="slot-t-input" size="mini" autofocus

                    v-model="data.label"

                    :ref="'slotTreeInput'+data.id"

                    @blur.stop="NodeBlur(node,data)"

                    @keydown.native.enter="NodeBlur(node,data)"></el-input>

          </span>
          
        </span>
        
    </el-tree>

    <el-card class="box-card" ref="card" v-show="menuVisible">

        <!-- <div @click="addSameLevelNode()" v-show="firstLevel">

            <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;同级增加

        </div> -->
        <div class="edit" @click="editNode()">编辑</div>
        <div class="delete" @click="deleteNode()">删除</div>
        <div class="add" @click="addChildNode()">添加下级</div>

        

    </el-card>

</div>

</template>

<script>
// import '../mock/mockfile.js'

import axios from "axios";

export default {
  name: "processManagement",

  data() {
    return {
      eleId: "",

      isShow: false,

      currentData: "",

      currentNode: "",

      menuVisible: false,

      firstLevel: false,

      // filterText: "",

      maxexpandId: 4,

      treeData: [
        {
          id: 1,

          label: "通用互联科技有限公司",

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

      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  methods: {
    test() {
      axios
        .get("http://test.cn")

        .then(response => {
          this.isShow = response.data.operations[0].pubResource.isVisiable;

          console.log(response.data.operations[0].pubResource);

          this.eleId = response.data.operations[0].pubResource.elementId;
        });
    },

    NodeBlur(Node, data) {
      // debugger

      console.log(Node, data);

      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");

        return false;
      } else {
        if (data.isEdit) {
          this.$set(data, "isEdit", false);

          console.log(data.isEdit);
        }

        this.$nextTick(() => {
          this.$refs["slotTreeInput" + data.id].$refs.input.focus();
        });
      }
    },

    // 查询

    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },

    handleDragStart(node, ev) {
      console.log("drag start", node);
    },

    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },

    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },

    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },

    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },

    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },

    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },

    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },

    // 鼠标右击事件

    rightClick(event,Node,object) {
      // this.menuVisible = true;
      console.log("object==" + JSON.stringify(object))
      // debugger

      this.currentData = object;

      this.currentNode = Node;

      // if (Node.level === 1) {
      //   this.firstLevel = true;
      // } else {
      //   this.firstLevel = false;
      // }

      // 操作栏显示
      

      // let menu = document.querySelector('#card')

      // /* 菜单定位基于鼠标点击位置 */

      // menu.style.left = event.clientX + 'px'

      // menu.style.top = event.clientY + 'px'

      // document.addEventListener("click", this.foo);

      // this.$refs.card.$el.style.left = event.clientX + 0 + "px";

      // this.$refs.card.$el.style.top = event.clientY + 0 + "px";
    },

    // 鼠标左击事件

    handleLeftclick(data, node) {
      // $(document).mouseup(function(e){
      //   var _con = $(' 目标区域 ');   // 设置目标区域
      //   if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
      //     some code...   // 功能代码
      //   }
      // // });
      // 点击除按钮之外的元素，关闭下拉框
      var _con = document.getElementById('page-container'); // 设置目标区域
      var btn = document.querySelector(".operationBtn"); // 设置目标区域
			if(!_con.contains(btn)) {
        // $('.tardiv').remove();
        this.foo();
			}

      // this.foo();
    },

    //  取消鼠标监听事件 菜单栏

    foo() {
     
      this.menuVisible = false;
      //  要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      document.removeEventListener("click", this.foo);
    },

    // 增加同级节点事件

    addSameLevelNode() {
      let id = Math.ceil(Math.random() * 100);

      var data = { id: id, label: "新增节点" };

      this.$refs.tree.append(data, this.currentNode.parent);
    },

    // 增加子级节点事件

    addChildNode() {
      console.log(this.currentData);

      console.log(this.currentNode);

      if (this.currentNode.level >= 3) {
        this.$message.error("最多只支持三级！");

        return false;
      }

      let id = Math.ceil(Math.random() * 100);

      var data = { id: id, label: "新增节点" };

      this.$refs.tree.append(data, this.currentNode);
    },

    // 删除节点

    deleteNode() {
      this.$refs.tree.remove(this.currentNode);
    },

    // 编辑节点

    editNode() {
      // debugger

      if (!this.currentData.isEdit) {
        this.$set(this.currentData, "isEdit", true);
      }
    }

  },

  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   }
  // },

  mounted() {
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

