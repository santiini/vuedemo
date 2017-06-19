// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import { sync } from 'vuex-router-sync';

import * as axios from './tools/axios.js';
Vue.prototype.axios = axios;

require('es6-promise').polyfill();
// require('./utils/fontResponse');
import 'lib-flexible';

import router from './router';
import store from './store';
import App from './App.vue';
import { parseUrl } from 'utils/parseUrl';

store.registerModule('vux', {
    state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
    },
    mutations: {
        updateDemoPosition(state, payload) {
            state.demoScrollTop = payload.top
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        }
    },
    actions: {
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top })
        }
    }
})

sync(store, router);

FastClick.attach(document.body)
    // 历史浏览的管理;
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

let isFirst = false;
router.beforeEach(function(to, from, next) {
    console.log(`time: ${new Date()}`)
        // 企业号中按钮的入口判断: state的第二个参数;
        // console.log(to)
        // console.log(from)
    let path = ''
    if (to.path === '/') {
        // if (to.path === '/' && !store.state.userId) {
        // if (!from.name && !isFirst) {
        isFirst = true
        console.log('改变地址')
        switch (Number(parseUrl('state0'))) {
            case 0:
                path = '/create';
                break;
            case 1:
                path = '/list/1';
                break
            case 2:
                path = '/list/2';
                break
            case 3:
                path = '/list/3';
                break
            case 4:
                path = '/list/4';
                break
            case 5:
                path = '/list/5';
                break
            case 6:
                path = '/list/6';
                break
            case 7:
                path = '/list/7';
                break
            default:
                path = '/list/1'
                break;
        }
        // return next(path)
        next(path) //这里需要return 来打断当前导航， 执行下一个导航;
        return false;
    }
    // x-header设置;
    if (to.meta.header) {
        store.dispatch('setHeader', to.meta.header)
    }
    // console.log('main中提交userId');
    // 用Promise控制 -- 当前用户userId;
    const getUserInfo = new Promise((resolve, reject) => {
        console.log('获取用户userId后执行一次')
            // console.log(`store.state.userId:${store.state.userId}`)
        if (!store.state.userId || store.state.userId === '') {
            console.log('请求')
                // store.commit('SET_USERID', {
                //     userId: 'xiaotao',
                //     phoneUserId: 59
                // })
                // resolve()
            store.dispatch('UpdateUserId')
                .then((result) => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        } else {
            resolve();
        }
    });

    getUserInfo
    // .then(() => {
    //     next(path)
    // })
        .then(() => {
            // 同步流程;
            store.commit('updateLoadingStatus', { isLoading: true })
            const toIndex = history.getItem(to.path)
            const fromIndex = history.getItem(from.path)

            if (toIndex) {
                if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
                    store.commit('updateDirection', { direction: 'forward' })
                } else {
                    store.commit('updateDirection', { direction: 'reverse' })
                }
            } else {
                ++historyCount
                history.setItem('count', historyCount)
                to.path !== '/' && history.setItem(to.path, historyCount)
                store.commit('updateDirection', { direction: 'forward' })
            }
            next()
                // if (/\/http/.test(to.path)) {
                //     console.log('-------------------------------------------------http')
                //     let url = to.path.split('http')[1]
                //     window.location.href = `http${url}`
                // } else {
                //     // next()
                //     // return path === '' ? next() : next(path)
                //     // next(path)
                //     next()
                // }
        })
        .catch(err => {
            // 停止导航;
            console.log('导航变化')
                // tips: next(false) => 回导致url重置，?参数消失;
                // next(path);
                // next(false);
            next()
            console.log(err)
                // next(false);
        });
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })

    // ga && ga('set', 'page', to.fullPath)
    // ga && ga('send', 'pageview')
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App),
    // 事件处理器, eventHub;
    data() {
        return {
            eventHub: new Vue()
        }
    }
}).$mount('#app-box')