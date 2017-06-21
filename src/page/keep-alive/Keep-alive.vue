<template>
  <div class="">
    <divider>组件缓存：{{$route.meta.keepAlive}}</divider>
    <group :title="title">
        <cell title="组件缓存" :link="{name: 'keep-alive'}"></cell>
        <cell title="组件不缓存" :link="{name: 'keep-not'}"></cell>
        <cell title="组件缓存demo" :link="{name: 'keep'}"></cell>
    </group>
    <group title="组件缓存输入">
      <x-input title="缓存输入" placeholder="请输入"></x-input>
    </group>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
  import { Cell, Group, XInput, Divider } from 'vux';
  export default {
    name: 'keep-alive',
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
    }
  }
</script>
