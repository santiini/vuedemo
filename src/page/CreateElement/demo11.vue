<template>
  <div class="">
    <group :title="title">
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'provide-inject-demo11',
    components: {
      Group, Cell
    },
    inject: [ 'demo', 'name' ],
    created() {
      console.log(this.demo.currentIndex)
    },
    data() {
      return {
        title: 'child11'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

