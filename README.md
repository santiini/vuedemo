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

#### vux2.2 学习配合上 node 8.0

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


## 下一项：vue-ssr

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
