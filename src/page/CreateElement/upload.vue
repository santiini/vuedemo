<script>
// 引入依赖;
import Vue from 'vue'

Vue.component('com1', {
  template: '<div>Componnet111111</div>'
});
Vue.component('com2', {
  template: '<div>Componnet22222</div>'
});
const Demo1 =  Vue.component('demo1', {
  template: '<div>Demo11111</div>'
});


export default {
  name: 'upload',
  provide: {
    uploader: this
  },
  props: {
    title: 'title',  // 页面title
    list: {
      type: Array,
      default: () => []
    },
    type: [String, Number],
    label: String,
    value: [String, Array]
  },
  components: {
    Demo1
  },
  watch: {
    currentIndex: {
      immediate: true,
      handler(index) {
        console.log(index)
        this.currentItem = this.list[index]
      }
    }
  },
  methods: {

  },
  data() {
    return {
      currentValue: undefined,  // 当前项的值;
      currentIndex: 0, // 当前项的索引
      currentItem: [], // 当前项的对象;
    }
  },
  render(h) {
    // 多项
    let listCom =
        <Demo1
          lit={this.list}
          label={this.label}
          ></Demo1>;

    // 单项;
    let singleData = {
      props: {
        label: this.label,
        value: this.value
      },
      ref: 'upload-single'
    };

    const uploadComponent = type === 1
      ? <com1 {...singleData}></com1>
      : <com2 {...singleData}></com2>,
      trigger = this.$slots.trigger || this.$slots.default;

    return (
      <div>
        { this.type === 1 ? listCom : '' }
        {
          this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent
        }
      </div>
    )
  }
}
</script>
