<template>
  <div :class="disabled ? 'vux-checklist-disabled' : ''">
    <div v-if="title !== ''" class="weui-cells__title">{{title}}</div>
    <slot name="after-title"></slot>
    <div class="weui-cells weui-cells_checkbox" :class="{'weui-cell-no-title': title === ''}">
      <label class="weui-cell weui-check_label" :class="{'vux-checklist-label-left': labelPosition === 'left'}" v-for="(item,index) of options" :key="index" :for="`checkbox_${uuid}_${index}`">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" :id="disabled ? '' : `checkbox_${uuid}_${index}`" :value="getKey(item)" v-model="checkboxValue" @change="changeRadio" :disabled="ifDisable(getKey(item))">
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
          <input type="text" class="weui-input needsclick" :disabled="disabled" :placeholder="fillPlaceholder" v-model="fillValue" @focus="onFocus">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global'; // weui-cell 中check 的less;
@import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_check'; // 输入框的 less;
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
    // 开启检测 checkbox是否可以选中，false时 max,min无效;
    checkDisabled: {
      type: Boolean,
      default: true
    },
    // 该checkbbox是否为必须;
    required: Boolean,
    max: Number,
    min: Number,
    // labeld的位置;
    labelPosition: String,
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
    checkboxValue(newVal, oldVal) {
      if (this.isFocus) return
      if (newVal.length === 0) return
      this.$emit('input', newVal)
    },
    fillValue(newVal, oldVal) {
      if (!this.isFocus) return
      console.log(newVal)
      this.$emit('input', newVal)
    },
    value(newVal, oldVal) {
      console.log(newVal)
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
  computed: {
    _total() {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    // 最大数量和最小数量的处理；
    _min() {
      if (!this.required && !this.min) {
        return 0
      }
      if (!this.required && this.min) {
        return Math.min(this._total, this.min)
      }
      if (this.required) {
        if (this.min) {
          // 至少有一项;
          let max = Math.max(1, this.min)
          return Math.min(this._total, this.min)
        } else {
          return 1
        }
      }
    },
    // max
    _max() {
      if (!this.required && !this.max) {
        return this._total
      }
      if (this.max) {
        if (this.max > this.total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    }
  },
  methods: {
    changeRadio() {
      this.isFocus = false
      this.fillValue = ''
    },
    onFocus() {
      this.isFocus = true
      this.checkboxValue = []
      // console.log(this.fillValue)
      // 初次获得焦点时，this.checkboxValue = [], 则使父组件的值为 '';
      if (this.fillValue === '') {
        this.$emit('input', '')
      }
    },
    // checkbox是否可用： 可以设置max 和 min;
    ifDisable(key) {
      if (!this.checkDisabled) return false
      return this.checkboxValue.indexOf(key) === -1 && this.checkboxValue.length === this._max
    },
    getKey,
    getValue
  },
  mounted() {
    // 初始化阶段的值处理;
    if (typeof this.value === 'object') {
      this.checkboxValue = this.value
      this.fillValue = ''
    }
    if (typeof this.value === 'string') {
      this.checkboxValue = []
      this.fillValue = this.value
    }
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
