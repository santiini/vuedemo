<template>
  <div class="sun-cells_radio">
    <label class="sun-cell_radio" for="radio111">
      <div class="sun-cell__hd">Radio</div>
      <div class="sun-cell__bd">
        <input type="radio"  value="111" id="radio111" v-model="currentValue">
      </div>
      <div class="sun-cell__ft">link</div>
    </label>
    <label class="sun-cell_radio" for="radio222">
      <div class="sun-cell__hd">Radio</div>
      <div class="sun-cell__bd">
        <input type="radio"  value="222" id="radio222" v-model="currentValue">
      </div>
      <div class="sun-cell__ft">link</div>
    </label>
    <label class="sun-cell_radio" for="radio333">
      <div class="sun-cell__hd">Radio</div>
      <div class="sun-cell__bd">
        <input type="radio"  value="333" id="radio333" v-model="currentValue">
      </div>
      <div class="sun-cell__ft">link</div>
    </label>
    </div>
</template>

<style lang="less" scoped>
  @import '../../style/base.less';
  // tips: 在main.js中引用的全局css, base.less之后，只能作为类名使用，不能在组件的style 中作用于 less的语法中， 必须再引用一次base.less;
  @import '../../style/common.less';
  .sun-cell_radio {
    .flex;
    .pd(6px);
  }
</style>

<style lang="less">
</style>

<script>
  export default {
    name: 'radio',
    data() {
      return {
        currentValue: '',
        radio111: 'value11',
        radio222: 'value22',
        radio333: 'value33',
      }
    },
    props: {
      value: [String, Number]
    },
  }
</script>


