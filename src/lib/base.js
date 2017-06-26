/**
 * vux解析---base: mixin使用：
 * tips: mixin 的拓展和覆盖;
 */
import uuidMixin from './mixin_uuid'
export default {
    mixins: [uuidMixin],
    props: {
        required: {
            type: Boolean,
            default: false
        }
    },
    // 当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。
    // 比如，同名钩子函数将混合为一个数组，因此都将被调用。
    // 另外，混合对象的 钩子将在组件自身钩子 之前 调用 ：
    created() {
        // ？？？？
        this.handleChangeEvent = false
    },
    computed: {
        dirty() {
            return !this.prisine
        },
        invalid() {
            return !this.valid
        }
    },
    // 值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。
    // 两个对象键名冲突时，取组件对象的键值对。
    methods: {
        setTouched() {
            this.touched = true
        }
    },
    watch: {
        value(newVal, oldVal) {
            if (this.prisine === true) {
                this.prisine = false
            }
            if (!this.handleChangeEvent) {
                this.$emit('on-change', newVal)
                this.$emit('input', newVal)
            }
        }
    },
    // data的混合 ？？
    data() {
        return {
            errors: {},
            prisine: true,
            touched: false
        }
    }
}