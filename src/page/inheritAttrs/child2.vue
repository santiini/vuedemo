<template>
  <div class="">
    <h4>child2内</h4>
    <p>boo: {{ boo }}</p>
    <p>attrs: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>

<script>
  import ChildCom3 from './child3'

  export default {
    props: ['boo'],
    inheritAttrs: false,
    components: {
      ChildCom3
    },
    created () {
      console.log(this.$attrs)
    }
  }
</script>
