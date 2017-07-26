<template>
  <div class="inherit-com">
    <h4>inheritAttrs测试</h4>
    <child-com1 :foo="foo" :boo="boo" :coo="coo" :doo="doo"></child-com1>
  </div>
</template>

<script>
  import ChildCom1 from './child1'
  export default {
    name: 'inheritAttr',
    components: {
      ChildCom1
    },
    data() {
      return {
        foo: 'Hello World 1',
        boo: 'Hello Javascript! 2',
        coo: 'Hello Vue 3',
        doo: 'Last 4'
      }
    }
  }
</script>

<style lang="scss">
.inherit-com {
  margin: 10px;
}
</style>
