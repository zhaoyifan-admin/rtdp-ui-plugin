<template>
  <ul class="vue-contextmenu-listWrapper"
      :class="'vue-contextmenuName-' + contextMenuData.menuName"
      @contextmenu.stop="">
    <li v-for="item in contextMenuData.menulists"
        class="context-menu-list"
        :key="item.btnName">
      <div v-if="item.children && item.children.length > 0" class="has-child">
        <div class="parent-name btn-wrapper-simple" :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{item.btnName}}</span>
          <i class="icon"></i>
        </div>
        <Tree :itemchildren="item.children" @childhandler="fnHandler" :float="floatDirection" />
      </div>
      <div v-else>
        <div @click.stop="item.disabled === true ? '' : fnHandler(item)"
             class="no-child-btn btn-wrapper-simple"
             :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{item.btnName}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import Tree from './Tree.vue'
export default {
  name: 'context-menu-component',
  components: {
    Tree
  },
  data () {
    return {
      floatDirection: 'float-statue-1'
    }
  },
  props: {
    contextMenuData: {
      type: Object,
      required: false,
      default () {
        return {
          menuName: 'demo',
          axis: { x: null, y: null },
          menulists: [
            { fnHandler: '', icoName: '', btnName: ''}
          ]
        }
      }
    },
    transferIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    'contextMenuData.axis' (val) {
      const x = val.x
      const y = val.y
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      const _this = this
      const index = _this.transferIndex
      const menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
      const menu = document.getElementsByClassName(menuName)[index]
      menu.style.display = 'block'
      const menuHeight = this.contextMenuData.menulists.length * 30
      const menuWidth = 150
      menu.style.top = (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + 'px'
      menu.style.left = (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + 'px'
      document.addEventListener('mouseup', function (e) {
        // 解决mac电脑在鼠标右键后会执行mouseup事件
        if (e.button === 0) {
          menu.style.display = 'none'
        }
      }, false)
      if ((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) > innerHeight) {
        this.floatDirection = 'float-status-4'
      }
      if((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) > innerHeight) {
        this.floatDirection = 'float-status-1'
      }
      if((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) < innerHeight) {
        this.floatDirection = 'float-status-3'
      }
      if((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) < innerHeight) {
        this.floatDirection = 'float-status-2'
      }
    }
  },
  methods: {
    fnHandler (item) {
      this.$emit(item.fnHandler)
    }
  }
}
</script>
<style scoped>
.vue-contextmenu-listWrapper {
  display: none;
  position: fixed;
  z-index: 9999;
  background: #ffffff;
  top: 0;
  left: 0;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 #cccccc;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}
.vue-contextmenu-listWrapper .context-menu-list {
  position: relative;
  background: #ffffff;
  text-decoration: none;
  list-style: none;
  margin: 3px 0;
  padding: 5px 10px;
}
.context-menu-list:hover {
  background: #2894f8;
  color: #ffffff;
}
.context-menu-list .has-child {
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
}

.context-menu-list:hover > .has-child > .child-ul-wrapper {
  display: block;
}
.parent-name .icon {
  position: absolute;
  display: block;
  top: 4px;
  right: 0;
  border-top: 4px solid transparent;
  border-left: 8px solid #111111;
  border-bottom: 4px solid transparent;
  border-right: 4px solid transparent;
}
.no-child-btn {
  padding: 0px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.nav-icon-fontawe {
  position: absolute;
  left: 0;
}
.nav-name-right {
  margin: 0 20px;
  height: 16px;
  display: block;
}

.no-allow {
  color: #d3cfcf;
  cursor: not-allowed;
}

.btn-wrapper-simple {
  position: relative;
}
</style>
