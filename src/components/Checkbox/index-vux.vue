<template>
  <div :class="disabled ? 'vux-checklist-disabled' : ''">
    <div v-show="title" class="weui-cells__title">{{title}}</div>
    <slot name="after-title"></slot>
    <div class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check_label" :class="{'vux-checklist-label-left': labelPosition === 'left'}" :for="`checkbox_${uuid}_${index}`" v-for="(one, index) in currentOptions" :key="index">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" @change="changeInput" :name="`vux-checkbox-${uuid}`" :value="getKey(one)" v-model="currentValue" :id="disabled ? '' :  `checkbox_${uuid}_${index}`" :disabled="ifDisable(getKey(one))">
          <i class="weui-icon-checked vux-checklist-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <slot name="each-item" :item="one">
            <p v-html="getValue(one)"></p>
          </slot>
        </div>
      </label>
      <div class="weui-cell" v-show="fillMode">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{ fillLabel }}</label>
        </div>
        <div class="weui-cell__bd">
          <!--disabled的设置： readonly 后者 disabled-->
          <input class="weui-input needsclick" style="color:#000;" :disabled="disabled"  type="text" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()">
        </div>
        <div class="weui-cell__ft" v-show="value==='' && !isFocus">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import Base from 'node/vux/src/libs/base'
import Tip from 'node/vux/src/components/tip'
import Icon from 'node/vux/src/components/icon'
import { getValue, getKey } from 'node/vux/src/components/checklist/object-filter'
import shuffle from 'array-shuffle'

export default {
  components: {
    Tip,
    Icon
  },
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: {
    name: String,
    showError: Boolean,
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Array, String],
      default: () => []
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    fillPlaceholder: {
      type: String,
      default: '其他'
    },
    fillLabel: {
      type: String,
      default: '其他'
    },
    randomOrder: Boolean,
    checkDisabled: {
      type: Boolean,
      default: true
    },
    labelPosition: String,
    disabled: Boolean
  },
  data() {
    return {
      currentValue: [],
      currentOptions: this.options,
      fillValue: '',
      isFocus: false,
      checkValue: ''
    }
  },
  created() {
    this.handleChangeEvent = true
    if (this.value) {
      if (typeof this.value === 'object') {
        this.currentValue = this.value
      }
      if (typeof this.value === 'string') {
        this.fillValue = this.value
      }
    }
    if (this.randomOrder) {
      this.currentOptions = shuffle(this.options)
    } else {
      this.currentOptions = this.options
    }
  },
  methods: {
    getValue,
    getKey,
    ifDisable(key) {
      if (!this.checkDisabled) {
        return false
      }
      return this.currentValue.indexOf(key) === -1 && this.currentValue.length === this._max
    },
    onFocus() {
      this.currentValue = []
      // this.currentValue = this.fillValue || ''
      this.isFocus = true
    },
    changeInput() {
      // 通过change 事件改变 this.isFocus;
      this.isFocus = false
    }
  },
  computed: {
    _total() {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min() {
      if (!this.required && !this.min) {
        return 0
      }
      if (!this.required && this.min) {
        return Math.min(this._total, this.min)
      }
      if (this.required) {
        if (this.min) {
          let max = Math.max(1, this.min)
          return Math.min(this._total, max)
        } else {
          return 1
        }
      }
    },
    _max() {
      if (!this.required && !this.max) {
        return this._total
      }
      if (this.max) {
        if (this.max > this._total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    },
    valid() {
      return this.currentValue.length >= this._min && this.currentValue.length <= this._max
    }
  },
  watch: {
    value(newVal) {
      if (typeof newVal === 'object') {
        this.isFocus = false
        this.fillValue = '';
        if (JSON.stringify(newVal) !== JSON.stringify(this.currentValue)) {
          this.currentValue = newVal;
        }
      }
      if (typeof newVal === 'string') {
        this.isFocus = true
        this.currentValue = [];
        if (newVal !== this.fillValue) {
          this.fillValue = newVal;
        }
      }
    },
    options(val) {
      this.currentOptions = val
    },
    currentValue(newVal) {
      // 修改fillValue时， 初始化currentValue, 不会触发 ‘input', 'on-change';
      if (this.isFocus) return
      this.fillValue = ''
      // 新值为 array
      const val = pure(newVal)
      this.$emit('on-change', val)
      this.$emit('input', val)

      let err = {}
      if (this._min) {
        if (this.required) {
          if (this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        } else {
          if (this.currentValue.length && this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        }
      }
      if (!this.valid && this.dirty && Object.keys(err).length) {
        this.$emit('on-error', err)
      } else {
        this.$emit('on-clear-error')
      }
    },
    fillValue(newVal) {
      if (this.fillMode && this.isFocus) {
        // this.currentValue = newVal
        // 其他;
        this.currentValue = []
        this.$emit('on-change', newVal)
        this.$emit('input', newVal)
      }
    }
  }
}
function pure(obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="less">
@import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global.less';
@import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_check.less';

.weui-cells_checkbox .weui-check:checked+.vux-checklist-icon-checked:before {
  color: @checklist-icon-active-color;
}

.weui-cells_checkbox>label>* {
  pointer-events: none;
}

.vux-checklist-label-left {
  flex-direction: row-reverse;
}
</style>
