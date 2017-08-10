/**
 * 公共插件;
 */
export default {
    install(Vue, $store, $router) {

        // 添加mixin-method;
        Vue.mixin({
            // watch: {
            //   isAxiosing(newVal, oblVal) {
            //     if (!this.$vux || !this.$vux.loading) return
            //     if (!!newVal) {
            //       this.$vux.loading.show()
            //     } else {
            //       this.$vux.loading.hide()
            //     }
            //   }
            // },
            // 方法;
            methods: {
                // 获取特定域名下的图片;
                getImage(url) {
                    if (!url || url === '') return '';
                    // return $store.state.domain + url
                    return 'http://cnpcportal.sinoapps.cn' + url
                },
                // 页面跳转;
                goPage(url) {
                    if (/^javas/.test(url) || !url) return;
                    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
                    if (useRouter) {
                        url === 'BACK' ? $router.go(-1) : $router.push(url)
                    } else {
                        window.location.href = url
                    }
                },
                // 获得时间的秒数用于比较;
                getTime(time) {
                    return new Date(time).getTime();
                }
            },
            // data 数据;
            data() {
                return {
                    // 这里的isLoading 会和组件实例的属性结合起来，共同组成一个data对象;
                    isAxiosing: true // 控制loading 和 页面内容的显示;
                }
            },
            // created() {
            // this.$vux.loading.show()
            // }
            beforeRouteEnter: (to, from, next) => {
                // 进入路由打开loading
                // 需要的路由打开loading效果;
                const loadingRoutes = ['introduction', 'schedule', 'signin', 'news', 'survey', 'files', 'photos', 'navigation']
                if (loadingRoutes.indexOf(to.name) !== -1) {
                    next(vm => {
                        // 通过 `vm` 访问组件实例
                        vm.$vux.loading.show()
                    })
                }
                next()
            },
            beforeRouteLeave(to, from, next) {
                // 倘若loading 出错，关闭loading效果;
                // console.log(this.$vux)
                if (!!this.$vux) {
                    this.$vux.loading.hide()
                    this.$vux.toast.hide()
                }
                next()
            }
        });

        // 注册全局filter;
        // fmt:  需要的时间格式;
        // 在组件内传参： 采用函数式传参，formatTime(fmt), 省略第一个参数;
        Vue.filter('formatTime', (timeStr, fmt = 'YYYY-MM-DD HH:mm:ss') => {
            // console.log(fmt)
            const date = new Date(timeStr);
            var o = {
                'M+': date.getMonth() + 1,
                'D+': date.getDate(),
                'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            var week = {
                '0': '\u65e5',
                '1': '\u4e00',
                '2': '\u4e8c',
                '3': '\u4e09',
                '4': '\u56db',
                '5': '\u4e94',
                '6': '\u516d'
            }
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                }
            }
            return fmt
        });
    }
}
