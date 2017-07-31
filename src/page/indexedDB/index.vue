<template>
  <div class="">
    <group title="indexedDB"></group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'indexedDB',
    components: {
      Group, Cell
    },
    created() {
      this.$store.dispatch('setHeader', {
        title: 'indexedDB'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>

