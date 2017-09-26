<template>
  <div class="">
    <group :title="title">
    </group>
    <sub-com></sub-com>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import SubCom from './demo11'

  export default {
    name: 'provide-inject-demo1',
    components: {
      Group, Cell, SubCom
    },
    inject: [ 'demo', 'name' ],
    created() {
      console.log(this.demo.list)
    },
    data() {
      return {
        title: 'child1'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

