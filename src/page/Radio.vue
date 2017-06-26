<template>
  <div>
    <h3>测试Radio组件:</h3>
    <group>
      <radio
        v-model="radioValue"
        :options="radioList"
        :fill-mode="true"
        fill-label="你自己的答案"
        fill-placeholder="没有提示字"
        :disabled="isDisabled"
        :selected-label-style="selectedCss"
        @on-change="showVal"></radio>
        <divider>radioValue:{{radioValue}}</divider>
      </group>
      <group>
        <x-button @click.native="radioValue = '11'">radio的赋值1</x-button>
        <x-button @click.native="radioValue = '22'">radio的赋值2</x-button>
        <x-button @click.native="radioValue = '33'">radio的赋值3</x-button>
        <x-button @click.native="radioValue = 'sdfsf'">radio的赋值4</x-button>
        <x-button @click.native="radioValue = '44'">radio的赋值5</x-button>
        <x-button @click.native="radioValue = '阿萨德若群翁'">radio的赋值6</x-button>
        <x-button @click.native="isDisabled = !isDisabled">{{isDisabled ? '启用' : '禁用'}}</x-button>
      </group>
  </div>
</template>

<style lang="less" scoped>
  // css, less的引用不能别名;
  @import '../style/common.less';
</style>

<script>
// 组件的引用： 同 .js一样，可以解析 index.vue;
  import Radio from 'components/Radio'
  import { Divider, XButton, Group } from 'vux'
  export default {
    name: 'radio-demo',
    components: {
      Radio, Divider, XButton, Group
    },
    methods: {
      showVal(val) {
        console.log(`@on-change:${val}`)
      }
    },
    data() {
      return {
        radioList: [
          {key: '11', value: '111'},
          {key: '22', value: '222'},
          {key: '33', value: '333'},
          {key: '44', value: '444'},
        ],
        radioValue: '332',
        isDisabled: false,
        selectedCss: {
          color: 'red'
        }
      }
    },
  }
</script>
