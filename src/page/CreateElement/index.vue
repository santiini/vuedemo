<template>
  <div>
    <!-- <uploader></uploader> -->
    <group title="list">
      <cell v-for="(item,i) of list" :key="i" :title="item.name"></cell>
    </group>
    <child-demo></child-demo>
  </div>
</template>

<script>
  // import Uploader from './upload'
  import { Group, Cell } from 'vux'
  import ChildDemo from './demo1'

  const Provider = {
    provide: {
      list: [
        { name: 'provide1', id: 111 },
        { name: 'provide2', id: 222 },
        { name: 'provide3', id: 333 },
        { name: 'provide4', id: 444 },
        { name: 'provide5', id: 555 },
      ]
    }
  }

  export default {
    name: 'vue-create-element',
    components: {
      // Uploader
      Group, Cell,
      ChildDemo
    },
    // Provide 和 Inject 注入功能的使用：
    // inject: 相当于基于当前组件及其后代的全局性的props;

    // 形式一;
    // provide: {
    //   demo: this,
    //   name: '测试provide'
    // },
    // 形式二;
    provide() {
      // console.log(this)
      return {
        name: 'provide测试',
        demo: this,
      }
    },
    created() {
      this.$store.dispatch('setHeader', {
        title: 'createElement'
      })
    },
    data() {
      return {
        list: [
          { name: 'test111', id: 1 },
          { name: 'test222', id: 2 },
          { name: 'test333', id: 3 },
          { name: 'test444', id: 4 },
          { name: 'test555', id: 5 },
        ],
        currentIndex: 3
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

