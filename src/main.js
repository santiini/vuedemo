// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

//1. 引入单独的router;
import router from './router';

// 2. 全局的axios;
import axios from './utils/axios.js';
// import * as axios from './utils/axios.js';
Vue.prototype.axios = axios;

// 3. 全部css文件的引用;
import './style/base.less';

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