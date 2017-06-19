<template>
  <div class="wrapper" ref="wrapper">
      <ul class="content">
          <li v-for="item of list">{{item}}</li>
      </ul>
  </div>
</template>

<style lang="less" scoped>
    .content {
        li {
            // margin: 20px;
            padding: 20px;
        }
    }

    .wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>

<script>
    // 引入better-scroll;
    import BScroll from 'better-scroll';
    import * as axios from 'utils/staticAxios.js';
    export default {
        name: 'better-scroll',
        data() {
            return {
                list: [],
                scroll: null
            }
        },
        methods: {
            loadMore() {
                console.log('get list')
                axios.get('static/data1.json')
                    .then(response => response.data)
                    .then(result => {
                        this.list = result.data

                        this.$nextTick(() => {
                            if (!this.scroll) {
                                this.scroll = new BScroll(this.$refs.wrapper, {})
                                    // 绑定事件;
                                this.scroll.on('touchend', pos => {
                                    console.log(`position: ${pos}`)
                                    console.log(pos)
                                    // 上拉加载时， y为负值;
                                    // 下拉加载时，y为正值，比较y的偏移量 or 50;
                                    if (pos.y > 50) {
                                        this.loadMore()
                                    }
                                })
                            } else {
                                // 已存在则刷新;
                                this.scroll.refresh()
                            }
                        })
                    })
                    .catch(err => console.log(err))
            },

            // 初次初始化;
            fetchData() {
                // 静态json文件的访问;
                // this.axios({url: '/static/data1.json', method: 'get'})
                axios.get('/static/data1.json')
                    .then(response => response.data)
                    .then(result => {
                        console.log(result)
                        this.list = result.data

                        // 异步初始化BScroll;
                        this.$nextTick(() => {
                            this.scroll = new BScroll(this.$refs.wrapper, {})
                        })
                    })
                    .catch(err => console.log(err))
            }
        },
        created() {
          this.loadMore()
        }
    }
</script>
