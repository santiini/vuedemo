<template>
  <group class="sass-global">
    <cell class="" title="global-sass">
      <div class="global-sass">111111</div>
    </cell>
    <cell class="" title="global-sass">
      <div class="global-sass">222222</div>
    </cell>
    <cell class="" title="global-sass">
      <div class="global-sass">33333</div>
    </cell>
    <cell class="" title="global-sass">
      <div class="global-sass">44444</div>
    </cell>
  </group>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
   name: 'global-sass',
   components: {
     Group, Cell
   }
}
</script>

<style lang="scss">
// <style lang="sass">
  .global-sass{
    color: $primary-color;
    @include margin(top, 20px);
    @include margin(bottom, 10px);
  }
</style>

