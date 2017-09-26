// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { sync } from 'vuex-router-sync';
import VueBetterScroller from 'vue-better-scroll'
import vuePayKeyboard from 'vue-pay-keyboard'
import VueMar from 'vue-marquee-ho'

//1. 引入单独的router;
import router from './router';
import store from './store';
sync(store, router);

// 2. 全局的axios;
import axios from './utils/axios.js';
// import * as axios from './utils/axios.js';
Vue.prototype.axios = axios;

// 3. 全部css文件的引用;
// less: less文件全局引入后，组件仍然需要单独引入，因为less中的变量和mixins 等在组件内不能直接使用;
// import './style/base.less';
import '../src/styles/main.scss';
import '../src/sass/index.scss';

// 该项目所有请求使用mockjs模拟
import './mock/index.js';


// 4.plugins: vux插件;
import { LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)

// 引入滚动插件;
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

// 引入vue-masonry 瀑布流插件;
import VueMasonryPlugin from 'vue-masonry';
Vue.use(VueMasonryPlugin);
console.log(VueMasonryPlugin)

// console.log(vuePayKeyboard)
// console.log(VueBetterScroller)
// console.log(VueMar)
// console.log(VueScroller)
// Vue.use(vuePayKeyboard)
Vue.use(VueBetterScroller)


// 引入vue-rx rxjs的使用;
import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';
Vue.use(VueRx, Rx);
// 减小体积;
// import { Observable } from 'rxjs/Observable'
// import { Subscription } from 'rxjs/Subscription' // 如果使用 RxJS 4 可自由使用
// import { Subject } from 'rxjs/Subject' // domStreams 选项所需
// Vue.use(VueRx, {
//   Observable,
//   Subscription,
//   Subject
// })

// 引用vue-idb indexedDB插件;
// import VUeIdb from 'vue-idb';
// Vue.use(VUeIdb);
// // 新建indexDB数据库;
// const idb = new VUeIdb({
//   version: 1,
//   database: 'test',
//   schemas: [
//     { tests: 'id, title, created_at, updated_at'},
//     { posts: 'id, owner'}
//   ]
// })

// console.log(idb)

// 用户自定义公共组件;
import { CommonPlugin, IndexedDB } from 'plugins';
Vue.use(CommonPlugin, store, router);
Vue.use(IndexedDB, {
  name: 'demo'
})

FastClick.attach(document.body)

Vue.config.productionTip = false


// 5.router的钩子函数;
router.beforeEach((to, from, next) => {
    // 1. 全局的x-header, 设置;
    next();
});

/* eslint-disable no-new */
// tips： 导出 Vue 实例， 可以在js中使用；

const app = new Vue({
    router,
    store,
    // idb,
    render: h => h(App),
    // // 事件处理器, eventHub;
    data() {
        return {
            // 这是 this.$root 上的数据;
            eventHub: new Vue()
        }
    }
}).$mount('#app-box')

// new Vue({
//     router,
//     render: h => h(App),
//     // // 事件处理器, eventHub;
//     data() {
//         return {
//             // 这是 this.$root 上的数据;
//             eventHub: new Vue()
//         }
//     }
// }).$mount('#app-box')

export default app;
