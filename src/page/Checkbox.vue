<template>
  <div>
    <h3>测试checkbox组件:</h3>
    <group>
        <checkbox :options="checkboxList" v-model="checkboxValue"></checkbox>
        <divider>checkboxValue:{{checkboxValue}}</divider>
      </group>
      <group>
        <x-button @click.native="checkboxValue = ['11']">checkbox的赋值1</x-button>
        <x-button @click.native="checkboxValue = ['11','22']">checkbox的赋值2</x-button>
        <x-button @click.native="checkboxValue = ['33']">checkbox的赋值3</x-button>
        <x-button @click.native="checkboxValue = ['22','44']">checkbox的赋值4</x-button>
        <x-button @click.native="checkboxValue = '44'">checkbox的赋值5</x-button>
        <x-button @click.native="checkboxValue = '阿萨德若群翁'">checkbox的赋值6</x-button>
      </group>
  </div>
</template>

<style lang="less" scoped>
  // css, less的引用不能别名;
  @import '../style/common.less';
</style>

<script>
// 组件的引用： 同 .js一样，可以解析 index.vue;
  import Checkbox from 'components/Checkbox'
  import { Divider, XButton, Group } from 'vux'
  export default {
    name: 'checkbox-demo',
    components: {
      Divider, XButton, Group, Checkbox
    },
    methods: {
      showVal(val) {
        console.log(`@on-change:${val}`)
      }
    },
    data() {
      return {
        checkboxList: [
          {key: '11', value: '111'},
          {key: '22', value: '222'},
          {key: '33', value: '333'},
          {key: '44', value: '444'},
        ],
        checkboxValue: '332',
      }
    }
  }
</script>
