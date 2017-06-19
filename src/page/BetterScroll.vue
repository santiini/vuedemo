<template>
    <scroller class="wrapper"
        :data="list"
        :pulldown="pulldown"
        :pullup="true"
        @pulldown="fetchData"
        @scrollToEnd="fetchData"
    >
        <ul class="content">
            <li class="" v-for="item of list">{{item.ActivityTitle}}</li>
        </ul>
    </scroller>
</template>

<style lang="less" scoped>
    .content {
        li {
            // margin: 20px;
            padding: 20px;
        }
    }
</style>

<script>
    import Scroller from 'components/better-scroll/index.vue';
    import * as axios from 'utils/staticAxios';
    export default {
        name: 'betterscroll-demo',
        data() {
            return {
                list: [],
                pulldown: true
            }
        },
        components: {
          Scroller
        },
        methods: {
            fetchData() {
              console.log('下拉刷新')
                axios.get('/static/data1.json')
                    .then(response => response.data)
                    .then(result => {
                        console.log(result)
                        this.list = this.list.concat(result.rows)
                    })
                    .catch(err => console.log(err))
            }
        },
        created() {
            this.fetchData()
        }
    }
</script>
