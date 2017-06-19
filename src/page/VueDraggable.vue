<template>
  <div class="demo">
      <button-tab v-model="tabIndex">
        <button-tab-item>demo1</button-tab-item>
        <button-tab-item>demo2</button-tab-item>
      </button-tab>
      <!--demo1-->
      <group title="demo1" v-show="tabIndex === 0">
        <!--draggable组件参数：
        -->
          <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
            <!--形式1：draggable组件直接包裹数组元素; -->
              <div class="list-item" v-for="(element, index) in myArray" :key="index">{{element.name}}</div>
          </draggable>
          <divider>分割线: demo</divider>
          <draggable v-model="array2" :options="{group: 'user'}" @start="drag2 = true" @end="drag2 = false">
            <!--形式2：transition-group作为容器;
                transition-group：元素作为多个元素/组件的过渡效果。<transition-group> 渲染一个真实的 DOM 元素。-->
            <transition-group>
              <div class="list-item" v-for="(item, i) of array2" :key="i">{{item.title}}</div>
              </transition-group>
          </draggable>
      </group>
      <!--demo2-->
      <group title="demo2" v-show="tabIndex === 1">
          <div class="fluid container">
              <div class="form-group form-group-lg panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Sortbale control</h3>
                </div>
                <div class="panel-body">
                  <div class = "checkbox">
                    <label><input type = "checkbox" v-model="editable">Enable drag and drop</label>
                  </div>
                  <button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
                </div>
              </div>
              <div  class="col-md-3">
                  <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                      <li class="list-group-item" v-for="element in list" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                        {{element.name}}
                        <span class="badge">{{element.order}}</span>
                      </li>
                    </transition-group>
                </draggable>
              </div>
              <div  class="col-md-3">
                <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
                    <transition-group name="no" class="list-group" tag="ul">
                      <li class="list-group-item" v-for="element in list2" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                        {{element.name}}
                        <span class="badge">{{element.order}}</span>
                      </li>
                    </transition-group>
                </draggable>
              </div>
              <div  class="list-group col-md-3">
                <pre>{{listString}}</pre>
              </div>
              <div  class="list-group col-md-3">
                <pre>{{list2String}}</pre>
              </div>
          </div>
      </group>
  </div>
</template>

<style lang="less" scoped>
    @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
    @import '../../node_modules/font-awesome/less/font-awesome.less';
    .demo {
      margin-top: 10px;
    }
    .list-item {
        padding: 10px;
        position: relative;
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
    .flip-list-move {
      transition: transform 0.5s;
    }
    .no-move {
      transition: transform 0s;
    }
    .ghost {
      opacity: .5;
      background: #C8EBFB;
    }
    .list-group {
      min-height: 20px;
    }
    .list-group-item {
      cursor: move;
    }
    .list-group-item i{
      cursor: pointer;
    }
</style>

<script>
    import Draggable from 'vuedraggable';
    import {
        Group,
        Divider,
        ButtonTab,
        ButtonTabItem
    } from 'vux';

    const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]
    export default {
        name: 'vue-draggable',
        data() {
            return {
                tabIndex: 0,  // button-tab组件的控制变量;
                drap: false, // 拖拽的控制开关;
                drag2: false,
                myArray: [ // 拖拽的数组内容;
                    {
                        name: '项目1'
                    }, {
                        name: '项目2'
                    }, {
                        name: '项目3'
                    }, {
                        name: '项目4'
                    }, {
                        name: '项目5'
                    }, {
                        name: '项目6'
                    }, {
                        name: '项目7'
                    }, {
                        name: '项目8'
                    }, {
                        name: '项目9'
                    }, {
                        name: '项目10'
                    }, {
                        name: '项目11'
                    }, {
                        name: '项目12'
                    }
                ],
                array2: [
                  {
                    title: '测试111'
                  }, {
                      title: '测试222'
                  }, {
                      title: '测试333'
                  }, {
                      title: '测试444'
                  }, {
                      title: '测试555'
                  }, {
                      title: '测试666'
                  }, {
                      title: '测试777'
                  }, {
                      title: '测试888'
                  }, {
                      title: '测试999'
                  }, {
                      title: '测试101010'
                  }, {
                      title: '测试111111'
                  }, {
                      title: '测试121212'
                  }
                ],

                // demo2;
                list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
                list2:[],
                editable:true,
                isDragging: false,
                delayedDragging:false
            }
        },
        components: {
            Draggable,
            Group,
            Divider,
            ButtonTab,
            ButtonTabItem
        },
        computed: {
          dragOptions () {
            return  {
              animation: 0,
              group: 'description',
              disabled: !this.editable,
              ghostClass: 'ghost'
            };
          },
          listString(){
            return JSON.stringify(this.list, null, 2);
          },
          list2String(){
            return JSON.stringify(this.list2, null, 2);
          }
        },
        watch: {
            isDragging (newValue) {
              if (newValue){
                this.delayedDragging= true
                return
              }
              this.$nextTick( () =>{
                  this.delayedDragging =false
              })
            }
        },
        methods: {
          // demo2:
          orderList () {
            this.list = this.list.sort((one,two) =>{return one.order-two.order; })
          },
          onMove ({relatedContext, draggedContext}) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
          }
        }
    }
</script>
