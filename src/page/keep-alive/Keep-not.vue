<template>
  <div class="">
    <divider>组件缓存：{{$route.meta.keepAlive}}</divider>
    <group :title="title">
        <cell title="组件缓存" :link="{name: 'keep-alive'}"></cell>
        <cell title="组件不缓存" :link="{name: 'keep-not'}"></cell>
        <cell title="组件缓存demo" :link="{name: 'keep'}"></cell>
    </group>
    <group title="组件不缓存">
      <x-input title="输入内容不缓存" placeholder="不缓存输入"></x-input>
    </group>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
  import { Cell, Group, XInput, Divider } from 'vux';
  export default {
    name: 'keep-not',
    data() {
      return {
        title: '缓存组件demo'
      }
    },
    components: {
      Cell, Group, XInput, Divider
    },
    activated() {
      console.log('这是缓存组件的activated钩子')
    },
    created() {
      console.log('这是组件的一般周期：created')
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'keep-alive') {
        to.meta.keepAlive = false
      }
      next()
    }
  }
</script>
