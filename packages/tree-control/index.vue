<template>
  <div class="tree-container">
    <!-- tree过滤输入框 -->
    <el-input
      class="searchInput"
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      suffix-icon="el-icon-search"
      clearable
      size="mini"
      @input="filterTree"
    />
    <div class="treeDiv">
      <!-- 树形列表 -->
      <el-tree
        ref="tree"
        highlight-current
        node-key="id"
        :show-checkbox="showCheckbox"
        :data="treeData"
        :props="defaultProps"
        :default-expanded-keys="treeData.length > 0 ? [treeData[0].id] : []"
        :expand-on-click-node="true"
        :current-node-key="currentNodeKey"
        :filter-node-method="handleFilterNode"
        @check="handleChangeNode"
        @node-click="handleNodeClick"
        @node-contextmenu="showMenu"
        @handleAdd="handleAdd"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      >
        <slot slot-scope="{ node, data }" :node="node" :data="data">
          <span class="ceshislot">{{ node.label }}</span>
        </slot>
      </el-tree>
      <!-- 右键菜单 -->
      <vue-context-menu
        :contextMenuData="contextMenuData"
        @handleAdd="handleAdd"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import VueContextMenu from '../tree-contextmenu/VueContextMenu.vue'

export default {
  name: 'treeControl',
  components: {VueContextMenu},
  props: {
    title: {
      type: String,
      default: '树形列表'
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 树列表数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 树节点是否默认展开
    treeExpandAll: {
      type: Boolean,
      default: true
    },
    // 树节点名称
    defaultProps: {
      type: Object,
      default: function () {
        return {label: 'name', children: 'children'}
      }
    },
    renderContent: {
      type: Function,
      default: function (h, {node, data, store}) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>);
      }
    },
    menulists: {
      type: Object,
      default: function () {
        return [
          {fnHandler: 'handleAdd', icoName: 'el-icon-plus', btnName: '添加'},
          {fnHandler: 'handleEdit', icoName: 'el-icon-edit', btnName: '编辑'},
          {fnHandler: 'handleDelete', icoName: 'el-icon-delete', btnName: '删除'}
        ]
      }
    }
  },
  data() {
    return {
      // 树形列表过滤关键字
      filterText: '',
      // 树节点唯一标识
      currentNodeKey: '',
      // 右击选中的节点数据
      currentNodeNode: null,
      // 右键菜单数据
      contextMenuData: {
        menuName: 'demo',
        axis: {x: null, y: null},
        menulists: []
      }
    }
  },
  watch: {},
  mounted() {
    if (this.treeData.length > 0) {
      // 设置默认选中节点
      this.$refs.tree.setCurrentKey(this.treeData[0].id)
    }
    this.contextMenuData.menulists = this.menulists;
  },
  methods: {
    // 点击右键,显示右键菜单
    showMenu(event, data) {
      this.currentNodeNode = data
      // 设置为选中节点
      this.$refs.tree.setCurrentKey(data.id)
      this.currentNodeKey = data.id
      event.preventDefault()
      const x = event.clientX
      const y = event.clientY
      // 获取右键菜单得位置
      this.contextMenuData.axis = {x, y}
    },
    // 添加新增按钮
    handleAdd() {
      // 将proxy对象序列化
      // JSON.stringify()——将 JavaScript 对象转换为 JSON 字符串
      // JSON.parse()——将JSON字符串转为一个对象
      const data = JSON.parse(JSON.stringify(this.currentNodeNode))
      this.$emit('handleAdd', data)
    },
    // 点击删除按钮
    handleDelete() {
      const data = JSON.parse(JSON.stringify(this.currentNodeNode))
      this.$emit('handleDelete', data)
    },
    // 点击编辑按钮
    handleEdit() {
      const data = JSON.parse(JSON.stringify(this.currentNodeNode))
      this.$emit('handleEdit', data)
    },
    // 点击回调时间
    handleClickMenu() {

    },
    // 点击节点
    handleNodeClick(data) {

    },
    // 关键字进行过滤节点
    handleFilterNode(value, data) {
      // 若没有输入值，则显示所有节点
      if (!value) return true
      // 是否包含关键字，不区分大小写
      return data.name.toLowerCase().includes(value.toLowerCase())
    },
    filterTree() {
      this.$refs.tree.filter(this.filterText)
    },
    handleChangeNode() {
      const data = this.$refs["tree"].getCheckedKeys();
      this.$emit('getCheckedData', data);
    }
  }
}
</script>
<style lang="scss" scoped>
.treeDiv {
  margin-top: 10px;
}

.white-body-view {
  width: 100%;
  min-width: 320px;
}

.structure-tree {
  .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  #my-tree .el-tree > .el-tree-node {
    min-width: 100%;
    display: inline-block;
  }

  .el-tree-node__content {
    margin-bottom: 10px;
  }

  .tooltip {
    margin-right: 5px;
    font-size: 13px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 4px;
  }

  .operation-view {
    display: inline-block;
    padding: 0 5px;
    margin-left: 5px;
    color: #777777;
  }

  .small-operation-btn {
    margin: 0 3px;
  }
}

.el-icon-plus:hover {
  color: #1c92e0;
}

.el-icon-edit:hover {
  color: #1c92e0;
}

.el-icon-delete:hover {
  color: #1c92e0;
}

::v-deep .el-tree {
  color: #333333;
}
</style>
