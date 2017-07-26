<template>
  <div class="">
    <h4>child3</h4>
    <p>coo: {{ coo }}</p>
    <p>attrs:{{ $attrs }}</p>
  </div>
</template>

<script>
  export default {
    props: ['coo'],
    inheritAttrs: false,
    created () {
      console.log(this.$attrs)
    }
  }
</script>
