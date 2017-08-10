# vux0606

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 2017.6.6

### vux2.2 学习配合上 node 8.0

> 问题反馈，解决的问题

* upload, 基于html5的上传:  不同的几个版本， 需要根据项目来更变;

* vux插件的用法： loading, toast, alert, confirm等， 用法:

```js

  // show() 和close()方法;
  this.$vux.loading.show({
    text： '加载中...'
  })
  this.$vux.loading.chose()

  // toast的多项配置;
  this.$vux.toast.show({
      text: '提示文字',
      type: 'warn',    // success, warn, cancel, text
      time: 2000,
      width: '7.6em',
      position: 'default',  // 'default, top, middle, bottom'
      'is-show-mask': false
  })

  // confirm等需要选择项的配置和回调;
      this.$vux.confirm.show({
            title: 'Title',   // 标题;
            content: 'Content',  // 内容;
            onShow () {
              // 出现回调;
              console.log('plugin show')
            },
            onHide () {
              console.log('plugin hide')
            },
            onCancel () {
              // 取消回调;
              console.log('plugin cancel')
            },
            onConfirm () {
              // 确认回调;
              console.log('plugin confirm')
            }
          })

```

## 组件学习

### Radio/checklist组件的学习研究；

1. radio/checkList 的值和input的值的同步处理;

2. fillMode其他选项的处理;

3. disabled 的处理； 利用 label for的ID和input的Id, 动态修改input的Id；

## VUX框架的研究学习;

1. less 文件的分布式管理，书写;

2. router的一般性处理，灵活利用meta 选项来配置内容，meta内容无法动态更改;

3. vuex 的使用有2个注意点： 1. action, mutation, state 三者的分离和关联； 2. store 的模块化处理，对于大项目，分多个modules处理store, 更灵活清晰;

4. filters, mixins，directive指令 等组件配置项的分离和全局配置，复用性强；

5. vue 插件的开发方法, 这是一个大学问，有待深入研究；

6. axios 的使用和分离, 分离axios, 单独配置，并利用axios 的钩子统一处理错误逻辑；

7. axios, api, store 的分离和使用;

> 1. axios 中负责axios 的配置信息，拦截器处理， 请求和返回值的处理， 错误的集中处理等；

> 2. api.js 文件中，理接口请求的处理， url, method, params等参数的处理;

> 3. store.js 文件中，负责全局信息的存储，请求前的判断等;

8. store.dispatch() 可以是个Promise, 这样就可以处理后续逻辑;

```js
// 在store.js中,
  prevProblem({ commit, state }) {
    // 返回Promise;
            return new Promise((resolve, reject) => {
                try {
                    commit('changeProblem', {
                        // index: 1
                        index: state.problemIndex - 1
                    });
                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        },
// 在组件中，store的Promise使用;
this.$store.dispatch('prevProblem')
        .then(() => {
          // console.log(this.$store.getters.curProblem)
          this.intPro()
        })

```

9. vux中使用sass

### sass和less 的相同之处;

    1. BEM的使用，灵活使用& 父选择器，它可以：
        1.继承父选择器，生成新的选择器;
        2.为父级选择器添加 :hover, :after等伪类；
        3.直接替换父级选择器，在后代选择器等中间使用;

```css
  .sass-demo {
    <!--1.生成新的选择器-->
     &-selector {
       color: red;
     }

     <!--2.伪类-->
     &:hover {
       background-color: blue;
     }

     <!--3.在其他选择器的替换使用-->
     & .child {
       font-size: 14px;
     }
  }
```

    2.都可以使用 mixin, 并传递参数，但又在定义，使用方式上有所不同;
        1. sass的mixins 定义时使用关键字@mixin, 使用时用关键字@include, less则直接使用，传递参数一样，都可以设置默认参数;

    3.都可以自定义函数，但是sass的函数使用更加强大，广泛;
    4.都可以css继承, sass必须借助于 @extend 继承，less既可以使用@extend,也可以直接使用;
    5.都可以使用变量；sass的变量声明更灵活，可以添加 !default等关键字;

### sass, less变量的全局使用 -- sass-resources-loader

修改文件： build文件夹，找到util.js

参考文章： https://juejin.im/entry/5975b1b3f265da6c4977c666

## 下一项：vue-ssr
