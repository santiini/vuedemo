<template>
  <div class="weui-cells_radio" :class="disabled ? 'vux-radio-disabled' : ''">
    <label class="weui-cell weui-cell_radio weui-check__label" :for="`radio_${uuid}_${index}`" v-for="(one, index) in options" :key="index">
      <div class="weui-cell__bd">
        <slot name="each-item" :icon="one.icon" :item="one" :label="getValue(one)" :index="index" :selected="currentValue === getKey(one)">
          <p>
            <img class="vux-radio-icon" :src="one.icon" v-show="one && one.icon">
            <span class="vux-radio-label" :style="currentValue === getKey(one) ? (selectedLabelStyle || '') : ''">{{ one | getValue }}</span>
          </p>
        </slot>
      </div>
      <div class="weui-cell__ft">
        <input type="radio" class="weui-check"  v-model="currentValue" :id="disabled ? '' : `radio_${uuid}_${index}`" :value="getKey(one)">
        <span class="weui-icon-checked"></span>
      </div>
    </label>
    <div class="weui-cell" v-show="fillMode">
      <div class="weui-cell__hd">
        <label for="" class="weui-label">{{ fillLabel }}</label>
      </div>
      <div class="weui-cell__bd">
        <!--:disabled="disabled"-->
        <input class="weui-input needsclick" :disabled="disabled"  type="text" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()">
      </div>
      <div class="weui-cell__ft" v-show="value==='' && !isFocus">
        <i class="weui-icon-warn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Base from 'node/vux/src/libs/base'
import { getValue, getKey } from 'node/vux/src/components/checklist/object-filter'

export default {
  name: 'radio',
  mixins: [Base],
  filters: {
    getValue,
    getKey
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number],
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
    disabled: Boolean,
    selectedLabelStyle: Object
  },
  mounted() {
    this.handleChangeEvent = true
    // 组件生成时的赋值；
    if (!contains(this.options, this.value)) {
      this.fillValue = this.value
    }
  },
  methods: {
    getValue,
    getKey,
    onFocus() {
      this.currentValue = this.fillValue || ''
      this.isFocus = true
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(newVal) {
      var isOption = contains(this.options, newVal)
      if (newVal !== '' && isOption) {
        this.fillValue = ''
      }
      if (!isOption) {
        this.fillValue = newVal
      }
      this.$emit('on-change', newVal)
      this.$emit('input', newVal)
    },
    fillValue(newVal) {
      if (this.fillMode && this.isFocus) {
        this.currentValue = newVal
      }
    }
  },
  data() {
    return {
      fillValue: '',
      isFocus: false,
      currentValue: this.value
    }
  }
}

// 判断 单选的简单值 和 对象形式；
// this.currentValue 是简单值, 不是对象；
function contains(a, obj) {
  var i = a.length
  while (i--) {
    const value = typeof a[i] === 'object' ? a[i].key : a;
    if (value === obj) {
      return true
    }
  }
  return false
}
</script>

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
