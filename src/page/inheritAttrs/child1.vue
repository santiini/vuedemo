<template>
  <div class="">
    <h4>child1内</h4>
    <p>foo: {{foo}}</p>
    <p>attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>

<script>
  import ChildCom2 from './child2'

  export default {
    props: ['foo'],
    // inheritAttrs: false 组件将不会把未被注册的propb呈现为普通的HTML属性， 无论 true or false, 都会传值
    inheritAttrs: false,
    components: {
      ChildCom2
    },
    created () {
      console.log(this.$attrs)
    }
  }
</script>
