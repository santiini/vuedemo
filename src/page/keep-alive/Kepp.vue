<template>
  <div class="">
    <divider>组件缓存：{{$route.meta.keepAlive}}</divider>
    <group :title="title">
        <cell title="组件缓存" :link="{name: 'keep-alive'}"></cell>
        <cell title="组件不缓存" :link="{name: 'keep-not'}"></cell>
        <cell title="组件缓存demo" :link="{name: 'keep'}"></cell>
    </group>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
  import { Cell, Group, Divider } from 'vux';
  export default {
    name: 'keep',
    data() {
      return {
        title: '缓存组件demo'
      }
    },
    components: {
      Cell, Group, Divider
    },
    beforeRouteLeave (to, from, next) {
      if(to.name === 'keep-alive') {
        to.meta.keepAlive = true
      }
      next()
    }
  }
</script>
