<template>
  <div class="wrapper">
    <vue-better-scroller
      class="wrapper"
      ref="scroller"
      :scrollbar="{ fade: true }"
      :data="list"
      :pullUpLoad="{ threshold: 0, text: { more: '更多加载', noMore: '没有了' } }"
      :startY="0"
      @pullingUp="getList">
      <div class="content">
        <group gutter="0">
          <cell v-for="(item,i) of list" :key="i" :title="item"></cell>
        </group>
      </div>
    </vue-better-scroller>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  export default {
    name: 'npm-plugins',
    components: {
      Group, Cell,
    },
    methods: {
      getList() {
        if (this.list.length > 55) {
          return this.$refs.scroller.forceUpdate()
        }
        this.list = this.list.concat(this.data)
      },
    },
    created() {
      this.getList()
    },
    data() {
      return {
        list: [],
        data: [111,222,333,444,555,666,777,888,999,1010,1111,1212],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    top: 46px;
  }
</style>
