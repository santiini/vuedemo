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
    }, {
        path: '/keep',
        name: 'keep',
        component: resolve => require(['../page/keep-alive/Kepp'], resolve),
        meta: {
            isShown: true,
            name: 'keep-alive'
        }
    }, {
        path: '/keepalive',
        name: 'keep-alive',
        component: resolve => require(['../page/keep-alive/Keep-alive'], resolve),
        meta: {
            isShown: false,
            keepAlive: true
        }
    }, {
        path: '/keepnot',
        name: 'keep-not',
        component: resolve => require(['../page/keep-alive/Keep-not'], resolve),
        meta: {
            isShown: false,
            keepAlive: false
        }
    }, {
        path: '/radio',
        name: 'radio',
        component: resolve => require(['../page/Radio'], resolve),
        meta: {
            isShown: true,
            name: 'radio'
        }
    }, {
        path: '/pointer',
        name: 'pointer',
        component: resolve => require(['../page/PointEvent'], resolve),
        meta: {
            isShown: true,
            name: 'pointer-events'
        }
    }, {
        path: '/checkbox',
        name: 'checkbox',
        component: resolve => require(['../page/Checkbox'], resolve),
        meta: {
            isShown: true,
            name: 'checkbox'
        }
    }, {
        path: '/sass',
        name: 'sass',
        component: resolve => require(['../page/Sass'], resolve),
        meta: {
            isShown: true,
            name: 'sass'
        }
    }, {
        path: '/globalsass',
        name: 'global-sass',
        component: resolve => require(['../page/GlobalSass'], resolve),
        meta: {
          isShown: false
        }
    }, {
      path: '/mock',
      name: 'mock',
      component: resolve => require(['page/Mock'], resolve),
      meta: {
        isShown: true,
        name: 'mock'
      }
    }, {
      path: '/eventHub',
      name: 'eventHub',
      component: resolve => require(['page/EventHub'], resolve),
      meta: {
        isShown: true,
        name: 'eventHub',
        keepAlive: true
      }
    },{
      path: '/event-child',
      name: 'eventhub-child',
      component: resolve => require(['page/EventHub/child'], resolve)
    }, {
      path: '/inheritAttrs',
      name: 'inheritAttr',
      component: resolve => require(['page/inheritAttrs'], resolve),
      meta: {
        isShown: true,
        name: 'inheritAttrs'
      }
    }, {
      path: '/indexedDB',
      name: 'indexedDB',
      component: resolve => require(['page/indexedDB'], resolve),
      meta: {
        isShown: true,
        name: 'indexedDB'
      }
    }, {
      path: '/filterColor',
      name: 'filter-color',
      component: resolve => require(['page/FilterColor'], resolve),
      meta: {
        isShown: true,
        name: 'filterColor'
      }
    }
  ]
})
