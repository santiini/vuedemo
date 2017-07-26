<template>
  <group title="eventHub测试">
    <x-input title="姓名" v-model="name"></x-input>
    <!-- <selector
      v-model="type"
    ></selector> -->
    <cell title="单位" :link="{path: '/event-child'}" :value="departName"></cell>
    <cell title="时间" value="20170727"></cell>
  </group>
</template>

<script>
  import { Group, XInput, Selector, Cell } from 'vux'
  export default {
    name: 'event-hub',
    components: {
      Group, XInput, Selector, Cell
    },
    created() {
      // 基于根组件 vm.$root上 eventHub.vue的监听
      this.$root.eventHub.$on('selectDep', (department) => {
        console.log(department)
        this.departName = department.name
      })
    },
    data() {
      return {
        name: 'name111',
        type: '',
        typeList: [1, 2, 3, 4],
        departName: ''
      }
    }
  }
</script>

<style lang="scss">

</style>

