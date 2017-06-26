<template>
  <div :class="disabled ? 'vux-checklist-disabled' : ''">
    <div v-if="title !== ''" class="weui-cells__title">{{title}}</div>
    <slot name="after-title"></slot>
    <div class="weui-cells weui-cells_checkbox" :class="{'weui-cell-no-title': title === ''}">
      <label  class="weui-cell weui-check_label" v-for="(item,index) of options" :key="index" :for="`checkbox_${uuid}_${index}`">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" :id="`checkbox_${uuid}_${index}`" :value="getKey(item)" v-model="checkboxValue" @change="changeRadio">
          <i class="weui-icon-checked vux-checklist-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <slot name="each-item">
              <p>{{item | getValue}}</p>
          </slot>
        </div>
      </label>

      <div class="weui-cell" v-show="fillMode">
        <div class="weui-cell__hd">
          <label class="weui-label">{{fillLabel}}</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input needsclick" :placeholder="fillPlaceholder" v-model="fillValue" @focus="onFocus">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  // weui-cell 中check 的less;
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_check';
  // 输入框的 less;
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_form/weui_form_common';
  .weui-cells_checkbox .weui-check:checked+.vux-checklist-icon-checked:before {
    color: @checklist-icon-active-color;
  }

  .weui-cells_checkbox>label>* {
    pointer-events: none;
  }

  .vux-checklist-label-left {
    flex-direction: row-reverse;
  }
  .weui-cell-no-title {
    margin-top: 0;
  }
</style>

<script>
  import Base from 'lib/base'
  import { getKey, getValue } from 'lib/object-filter'
  import { XButton, Group, Divider } from 'vux'
  export default {
    name: 'checkbox',
    mixins: [Base],
    props: {
      options: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        default: ''
      },
      fillLabel: {
        type: String,
        default: '其他啊'
      },
      fillPlaceholder: {
        type: String,
        default: '其他提示'
      },
      fillMode: {
        type: Boolean,
        default: true
      },
      value: {
        type: [Array, String],
        default: () => []
      },
      max: Number,
      min: Number,
      disabled: Boolean
    },
    filters: {
      getKey,
      getValue
    },
    components: {
      XButton, Group, Divider
    },
    watch: {
      checkboxValue (newVal, oldVal) {
        if (this.isFocus) return
        if (newVal.length === 0) return
        this.$emit('input', newVal)
      },
      fillValue (newVal, oldVal) {
        if (!this.isFocus) return
        console.log(newVal)
        this.$emit('input', newVal)
      },
      value (newVal, oldVal) {
        if (typeof newVal === 'object') {
          this.checkboxValue = newVal
          this.fillValue = ''
        }
        if (typeof newVal === 'string') {
          this.checkboxValue = []
          this.fillValue = newVal
        }
      }
    },
    methods: {
      changeRadio() {
        this.isFocus = false
        this.fillValue = ''
      },
      onFocus () {
        this.isFocus = true
        this.checkboxValue = []
        // console.log(this.fillValue)
        // 初次获得焦点时，this.checkboxValue = [], 则使父组件的值为 '';
        if (this.fillValue === '') {
          this.$emit('input', '')
        }
      },
      // 是否可用： 可以设置max 和 min;
      ifDisable (key) {

      },
      getKey,
      getValue
    },
    mounted() {

    },
    data() {
      return {
        checkboxValue: [],
        fillValue: '',
        isFocus: false
      }
    }
  }
</script>
