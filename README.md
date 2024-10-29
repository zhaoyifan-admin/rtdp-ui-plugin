# rtdp-ui-plugin

## 简介

轻量，易用，无需投入其他学习成本。

### [文档地址](https://zhaoyifan-admin.github.io/tool-plugins/) - [在线访问]() - [GitHub]() - [掘金]()

### 重要更新


## 快速上手

> 先 npm 下载插件

`npm install rtdp-ui-plugin --save`

或

`npm i rtdp-ui-plugin -S`

```js
import rtdp from "rtdp-ui-plugin";
import "rtdp-ui-plugin/lib/rtdp-ui-plugin.css"
Vue.use(rtdp);
```

> 然后你可以像使用普通组件一样使用 rtdp-ui-plugin

```js
    <template>
      <div>
        // 你的代码
        ...
        // 使用树形穿梭框组件
        <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @add-btn='add' @remove-btn='remove' :mode='mode' height='540px' filter openAll>
      </tree-transfer>
      </div>
    </template>

    <script>
      export defult {
        data(){
          return:{
            mode: "transfer", // transfer addressList
            fromData:[
              {
                id: "1",
                pid: 0,
                label: "一级 1",
                children: [
                  {
                    id: "1-1",
                    pid: "1",
                    label: "二级 1-1",
                    disabled: true,
                    children: []
                  },
                  {
                    id: "1-2",
                    pid: "1",
                    label: "二级 1-2",
                    children: [
                      {
                        id: "1-2-1",
                        pid: "1-2",
                        children: [],
                        label: "二级 1-2-1"
                      },
                      {
                        id: "1-2-2",
                        pid: "1-2",
                        children: [],
                        label: "二级 1-2-2"
                      }
                    ]
                  }
                ]
              },
            ],
            toData:[]
          }
        },
        methods:{
          // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
          changeMode() {
            if (this.mode == "transfer") {
              this.mode = "addressList";
            } else {
              this.mode = "transfer";
            }
          },
          // 监听穿梭框组件添加
          add(fromData,toData,obj){
            // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
            // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
            console.log("fromData:", fromData);
            console.log("toData:", toData);
            console.log("obj:", obj);
          },
          // 监听穿梭框组件移除
          remove(fromData,toData,obj){
            // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
            // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
            console.log("fromData:", fromData);
            console.log("toData:", toData);
            console.log("obj:", obj);
          }
        },
      }
    </script>

    <style>
    ...
    </style>
```

## 文档
| 序号 | 参数 | 说明 | 类型 | 默认值 | 补充 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | width | 宽度 | String |  100% | 建议在外部盒子设定宽度和位置|
| 2 | height | 高度 | String | 320px | - |
| 3 | title | 标题 | String |  ["源列表", "目标列表"] | - |
| 4 | button_text | 按钮名字 | Array | - | - |
| 5 | from_data | 源数据 | Array | - | 数据格式同element-ui tree组件，但必须有id和pid |
| 6 | to_data | 目标数据 | Array | - | 数据格式同element-ui tree组件，但必须有id和pid |
| 7 | defaultProps | 配置项-同el-tree中props | Object | { label: "label", children: "children", isLeaf: "leaf", disable: "disable" } | 用法和el-tree的props一样 |
| 8 | node_key | 自定义node-key的值，默认为id | String | id | 必须与treedata数据内的id参数名一致，必须唯一 |
| 9 | pid | 自定义pid的参数名，默认为"pid" | String | pid | 有网友提出后台给的字段名不叫pid，因此增加自定义支持 |
| 10 | leafOnly | 废弃 | - | - | - |
| 11 | filter | 是否开启筛选功能 | Boolean | false | 根据defaultProps参数的label字段筛选 |
| 12 | openAll | 是否默认展开全部 | Boolean | false | 存在性能问题 |
| 13 | ~~renderContent~~ renderContentLeft, renderContentRight | 自定义树节点， 用法同element-ui tree | Function | - | 2.2.3版本拆为两个函数分别定义左右两侧自定义节点 |
| 14 | mode | 设置穿梭框模式 | String | transfer | mode默认为transfer模式，即树形穿梭框模式，可配置字段为addressList改为通讯录模式，通讯录模式时按钮不可自定义名字，如要自定义标题名在title数组传入四个值即可，addressList模式时标题默认为通讯录、收件人、抄送人、密送人 |
| 15 | transferOpenNode | 穿梭后是否展开穿梭的节点 | Boolean | true | 默认为true即展开穿梭的节点，便于视觉查看，增加此参数是因为数据量大时展开会有明显卡顿问题，但注意，如此参数设置为false则穿梭后不展开，毕竟无法确定第几层就会有庞大数据 |
| 16 | defaultCheckedKeys | 默认选中节点 | Array | false | 只匹配初始时默认节点，不会在你操作后动态改变默认节点 |
| 17 | placeholder | 设置搜索框提示语 | String | 输入关键词进行筛选 | - |
| 18 | defaultTransfer | 是否自动穿梭一次默认选中defaultCheckedKeys的节点 | Boolean | false | 用来满足用户不想将数据拆分成fromData和toData的需求 |
| 19 | arrayToTree | 是否开启一维数组转化为树形结构 | Boolean | false | 数据必须存在根节点，并且不会断节，数据格式详见github上app.vue，根据id、pid对应关系转化，存在一定的性能问题 |
| 20 | addressOptions | 通讯录模式配置项 | Object | {num: Number, suffix: String, connector: String} | num-> 所需右侧通讯录个数,默认3 suffix-> label后想要拼接的字段（如id，即取此条数据的id拼接在后方）默认suffix connector -> 连接符（字符串）默认- |
| 21 | lazy | 是否启用懒加载 | Boolean | false | 效果动el-tree懒加载，不可和openAll或默认展开同时使用 |
| 22 | lazyFn | 懒加载的回调函数 | Function | - | 当适用lazy时必须传入回调函数，示例:lazyFn='loadNode',返回参数loadNode(node, resolve, from), node->当前展开节点node，resolve->懒加载resolve，from -> left/right 表示回调来自左侧/右侧 |
| 23 | high-light | 是否高亮当前选中节点| Boolean | false | - |
| 24 | filterNode | 自定义搜索函数 | Function | - | 不传则仍默认根据defaultProps参数的label字段筛选 |
| 25 | defaultExpandedKeys | 默认展开节点 | Array | - | 要展开的节点id数组，会自动去重生效在左右两侧 |
| 26 | lazyRight |  2.2.9 版本lazy属性只对左侧树生效，如果需要右侧也是用懒加载->lazyRight | Boolean | - | - | - |
| 27 | sjr | 通讯录模式，设置右侧收件人数据 | Array | - | - | 
| 28 | csr | 通讯录模式，设置右侧抄送人数据 | Array | - | - | 
| 29 | msr | 通讯录模式，设置右侧密送人数据 | Array | - | - | 
| 30 | rootPidValue | 穿梭框模式，根节点数据pid的值，用于匹配退出循环，重要 | String,Number | 0 | - | - | 插件不再强制将你的数据根节点pid都改为0 |
| 31 | checkStrictly | 是否父子不关联 | Boolean | false | 此模式不支持lazy，返回的fromData和toData是最新数据，obj里面的keys，nodes不完整。且对删空子节点后的父节点左右两边处理逻辑有差异：当授权时既然要在右边出现，必然需要左侧父节点，而删除授权时，移除子权限并不代表想移除父权限 |
| 32 | renderAfterExpand | 是否在第一次展开某个树节点后才渲染其子节点 | Boolean | true | - |
| 33 | expandOnClickNode | 是否在点击节点的时候展开或者收缩节点 | Boolean | true | - | 
| 34 | checkOnClickNode | 是否在点击节点的时候选中节点 | Boolean | false | - |
| 35 | indent | 相邻级节点间的水平缩进，单位为像素 | Number | 16 | - |
| 36 | icon-class | 自定义树节点的图标 | String | - | - |
| 37 | draggable | 是否开启拖拽节点功能 | Boolean | false | - |
| 38 | allow-drag | 判断节点能否被拖拽 | Function(node) | - | - |
| 39 | allow-drop | 拖拽时判定目标节点能否被放置 | Function(draggingNode, dropNode, type) | - | type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 |

> -----------------------------------------------------------

## 事件

| 序号 | 事件名称 | 说明 | 回调参数 |
| ---- | ---- | ---- | ---- |
| 1 | add-btn | 点击添加按钮时触发的事件(2.4.0以前为addBtn) | function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表 |
| 2 | remove-btn | 点击移除按钮时触发的事件(2.4.0以前为removeBtn) | function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表 |
| 3 | left-check-change | 左侧源数据勾选事件 | function(nodeObj, treeObj, checkAll)见el-tree组件check事件返回值, 新增checkAll参数表示是否全部选中 | 
| 4 | right-check-change | 右侧目标数据勾选事件 | function(nodeObj, treeObj, checkAll)见el-tree组件check事件返回值, 新增checkAll参数表示是否全部选中 |
| 5 | node-drag-start | 节点开始拖拽时触发的事件 | 共3个参数，依次为："left"/"right"、被拖拽节点对应的 Node、event |
| 6 | node-drag-enter | 拖拽进入其他节点时触发的事件 | 共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| 7 | node-drag-leave | 拖拽离开某个节点时触发的事件 | 	共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| 8 | node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、当前进入节点对应的 Node、event |
| 9 | node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共5个参数，依次为："left"/"right"、被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event |
| 10 | node-drop | 拖拽成功完成时触发的事件 | 共5个参数，依次为："left"/"right"、被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

> --------------------------------------------------------

## 方法

| 序号 | 名称 | 说明 |
| ---- | ---- | ---- |
| 1 | clearChecked | 清除选中节点，默认清除全部 `type：string left左边 right右边 all全部 默认all` |
| 2 | getChecked | 获取选中数据 | 
| 3 | setChecked | 设置选中数据 function(leftKeys = [], rightKeys = []) |

> --------------------------------------------------------

## slot

| 序号 | 名字 | 说明 |
| ---- | ---- | ---- |
| 1 | left-footer | 穿梭框左侧、右侧底部slot |
| 2 | right-footer | 穿梭框左侧、右侧底部slot |
| 3 | title-left | 穿梭框标题区左侧、右侧自定义内容 |
| 4 | title-right | 穿梭框标题区左侧、右侧自定义内容 |
| 5 | form | 左侧内容区上部slot |
| 6 | to | 右侧内容区上部slot | 
| 7 | content-left | 自定义左侧树节点 | 
| 8 | content-right | 自定义右侧树节点 |


## 版本说明

> 0.0.1 封装 tree-transfer 插件、注入多个坐标系转换、部分样式简化语句。
