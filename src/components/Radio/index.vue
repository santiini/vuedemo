<template>
  <div class="weui-cells_radio" :class="disabled ? 'vux-radio-disabled' : ''">
    <!--一个lable对应一个radio选项-->
    <label class="weui-cell weui-cell_radio weui-check__label" v-for="(item, index) of options" :key="index" :for="`radio_${uuid}_${index}`">
      <div class="weui-cell__bd">
        <p>
          <img v-show="item.icon" :src="item.icon" class="vux-radio-icon">
          <!--选中时的文字css-->
          <span class="vux-radio-label" :style="currentValue === getKey(item) ? (selectedLabelStyle || '') : ''">{{item | getValue}}</span>
        </p>
      </div>
      <div class="weui-cell__ft">
        <!--UUID：生成唯一id;-->
        <input type="radio" class="weui-check" :id="disabled ? '' : `radio_${uuid}_${index}`" :value="getKey(item)" v-model="currentValue" @change="changeRadio">
        <span class="weui-icon-checked"></span>
      </div>
    </label>

    <!--fillMode的其他选项;-->
    <div class="weui-cell" v-show="fillMode">
      <div class="weui-cell__hd">
        <label for="" class="weui-label">{{ fillLabel }}</label>
      </div>
      <div class="weui-cell__bd">
        <input type="text" :disabled="disabled" class="weui-input needsclick" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus">
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_check';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_form/weui_form_common';
  @import '../../../node_modules/vux/src/styles/weui/icon/weui_icon_font';

  .weui-cell_radio>* {
    pointer-events: none;
  }

  .vux-radio-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

  .vux-radio-label {
    vertical-align: middle;
  }

  .weui-cells_radio.vux-radio-disabled .weui-check:checked+.weui-icon-checked:before {
    opacity: 0.5;
  }
</style>

<script>
  import Base from 'lib/base'
  import { getKey, getValue } from 'lib/object-filter'

  export default {
    name: 'radio',
    mixins: [Base],
    filters: {
      getKey,
      getValue
    },
    props: {
      // 选项对应的键值对: key:  , value:  ;
      options: {
        type: Array,
        required: true
      },
      value: [ String, Number ],
      fillMode: {
        type: Boolean,
        default: false
      },
      fillPlaceholder: {
        type: String,
        default: '其他'
      },
      fillLabel: {
        type: String,
        default: '其他'
      },
      // 禁用disabled 的实现;
      // 1. 取消 radio/checkbox的 Id, 使其值不能改变;
      // 2. 为 input (fillValue) 添加disabled, 无法输入;
      disabled: Boolean,
      // 选中后的状态css;
      selectedLabelStyle: Object
    },
    mounted() {
      // 第一次初始化时，value的处理;
      if (!this.value || this.value === '') return
      if (contains(this.options, this.value)) {
        this.currentValue = this.value
      } else {
        this.fillValue = this.value
      }
    },
    methods: {
      // isFocus 的控制开启和关闭 --- fillValue的影响;
      onFocus () {
        this.currentValue = ''
        this.isFocus = true
        if (this.fillValue === '') {
          this.$emit('input', '')
        }
      },
      // isFocus 的控制开启和关闭 --- radio值的影响;
      // tips: 待考虑的问题 --- radio 的 change事件只是由点击触发的， 其他的赋值并不会影响;
      changeRadio () {
        console.log('radio的值发生变化')
        if(this.isFocus) this.isFocus = false
        this.fillValue = ''
      },
      getKey,
      getValue
    },
    watch: {
      'currentValue': function (newVal, oldVal) {
        // 通过 this.isFocus 变量来决定是否触发其他影响;
        if (!!this.isFocus) return
        if (newVal === '') return
        // onchange 事件是input框的原生事件;
        // tips: 这里的 emit('on-change'有待观察);
        // this.$emit('on-change', newVal)
        this.$emit('input', newVal)
      },
      'fillValue': function (newVal, oldVal) {
        if (!this.isFocus) return
        this.$emit('input', newVal)
      },
      value (newVal, oldVal) {
        console.log(`value的值:${newVal}`)
          if (contains(this.options, newVal)) {
            this.currentValue = newVal
            this.fillValue = ''
          } else {
            this.fillValue = newVal
            this.currentValue = ''
          }
      }
    },
    data() {
      return {
        // radio的值;
        currentValue: '',
        // data中项的初始值可以使 prop中的传入值;
        // currentValue: this.value,
        // 其他选项的值;
        fillValue: '',
        // 是否修改fillValue;
        isFocus: false
      }
    }
  }

  // 判断单选的简单值 和 对象形式；
  // this.currentValue 是简单值, 不是对象；
  function contains (radioList, val) {
    return radioList.some(el => {
      return typeof el === 'object' ? (el.key === val) : (el === val)
    })
  }
</script>
