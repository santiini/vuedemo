import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: resolve => require(['../page/Home.vue'], resolve),
        meta: {
            isShown: false
        }
    }, {
        path: '/better-scroll',
        name: 'better-scroll',
        component: resolve => require(['../page/BetterScroll'], resolve),
        meta: {
            isShown: true,
            name: 'better-scroll'
        }
    }, {
        path: '/uploader',
        name: 'uploader',
        component: resolve => require(['../page/VuxUploader'], resolve),
        meta: {
            isShown: true,
            name: 'vux-uploader'
        }
    }, {
        path: '/upload',
        name: 'upload',
        component: resolve => require(['../page/Upload'], resolve),
        meta: {
            isShown: true,
            name: '保协上传'
        }
    }, {
        path: '/preupload',
        name: 'pre-uploda',
        component: resolve => require(['../page/PreUpload'], resolve),
        meta: {
            isShown: true,
            name: '上传前处理'
        }
    }, {
        path: '/uploader2',
        name: 'uploader2',
        component: resolve => require(['../page/Uploader'], resolve),
        meta: {
            isShown: true,
            name: '改良uploader'
        }
    }, {
        path: '/plugins',
        name: 'plugins',
        component: resolve => require(['../page/VuxPlugins'], resolve),
        meta: {
            isShown: true,
            name: 'vux插件'
        }
    }, {
        path: '/draggable',
        name: 'draggable',
        component: resolve => require(['../page/VueDraggable'], resolve),
        meta: {
            isShown: true,
            name: 'vue-draggable'
        }
    }]
})