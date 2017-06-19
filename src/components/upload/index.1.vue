<template>
    <!--tips: 这里，containerCss是没有必要的，因为uploader组件本身的css即为该css;-->
  <div :class="['uploader', containerCss]">
  <!--<div :class="['uploader', 'upload-btn', containerCss]">-->
  <!--<div class="uploader upload-btn">-->

    <!--label标签指向input:file，触发事件-->
    <label :for="readonly ? '' : inputId" :class="['uploader-label', labelCss]">{{labelText}}</label>
    <!-- input主体-->
    <!--移动端允许拍照选择-capture属性-->
    <!--兼容性也是IE10+， 移动端安卓4.0+，safari6.0+-->
    <!--<input capture="video" .../>-->
    <input ref="inputer" type="file" :id="inputId" accept="image/*,video/*;" capture="video" class="uploader-input" @change="handleFileChange"
    />
  </div>
</template>

<style lang="less">
  @import '../../style/common.less';
  // 上传组件的容器;
  .uploader {
    position: relative;
    // display: flex;
    // width: 1.5rem;
    // height: .5rem;
    // display: inline-block;
    // width: 260px;
    // height: 150px;
    // border-radius: 5px;
    background: #f0f0f0;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
    // 把真实input file移出屏幕，不可见;
    //  less选择器的方便写法;
    &-input {
      position: absolute;
      left: -9999px;
    }
    // label标签绝对定位，并且占满整个容器对象;
    &-label {
      position: relative;
      // position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      cursor: pointer;
      margin-bottom: 0;
      text-align: center;
      line-height: 200%;
      // hack: 背景色的设置;
      background-color: transparent;
    }
  }

  // 默认的按钮样式;
  .upload-btn {
    display: inline-block;
    // // display: block;
    width: 1.5rem;
    height: .5rem;
    border-radius: 5px;
  }
</style>

<script>
  export default {
    name: 'uploadFile',
    data() {
      return {
        inputId: '',   // input的id, 唯一id
        file: [],     // 文件对象file
        dataUrl: '',   // file base64位地址;
        fileName: '',   // 文件名称;
        errText: ''     // 错误文字;
      }
    },
    props: {
      // 图片地址：1. 已存在图片; 2. 没有图片;
      imgSrc: {
        default: '',
        type: String
      },
      // 图片大小限制;
      maxSize: {
        type: Number,
        default: 5120
      },
      // 是否可修改;
      readonly: {
        type: Boolean,
        default: false
      },
      // v-model的对应实体;
      value: {
        default: undefined
      },
      containerCss: {
        type: String,
        // default: 'upload-btn'
      },
      labelCss: String,
      labelText: {
        type: String
      }
    },
    watch: {
      // 图片地址的变化;
      imgSrc(newval, oldval) {
        if (newval) {
          this.dataUrl = newval;
        }
      },
      value(newval, oldval) {
        // 重置逻辑
        if (oldval && !newval) {
          this.file = [];
          this.dataUrl = '';
          this.errText = '';
          this.fileName = ''
        }
      }
    },
    methods: {
      // 生成唯一性ID;
      gengerateID() {
        let nonstr = Math.random().toString(36).substring(3, 8);
        if (!document.getElementById(nonstr)) {
          return nonstr
        } else {
          return this.gengerateID()
        }
      },
      // 图片上传--回调;
      handleFileChange(e, file) {
        // console.log(e)
        // console.log(file)
        // 指向生成的input-file Dom实例和input-file的 fileList对象;
        let inputDOM = this.$refs.inputer
        this.file = file || inputDOM.files[0]
        this.errText = ''

        // 大小限制;
        let size = Math.floor(this.file.size / 1024)
        if (size > this.maxSize) {
          this.errText = `文件大小不能超过${this.sizeHumanRead}`
          return false
        }

        // 双向绑定 --- 文件对象作为参数; v-model的值指向file对象;
        this.$emit('input', this.file)

        // 获取到文件对象进行预览;
        this.imgPreview(this.file)

        this.fileName = this.file.name
      },
      // 图片的预览
      imgPreview(file) {
        // 保存 Vue实例指针
        let vm = this

        // 查看对FileReader的支持
        if (!file || !window.FileReader) return

        // 文件类型
        if (/^image/.test(file.type)) {
          // 创建一个reader;
          let reader = new FileReader()
          // 转化图片为  base64格式
          reader.readAsDataURL(file)

          // 读取文件成功后的回调;
          reader.onloadend = function () {
            // this指向 reader实例, result是 base64的地址;
            vm.dataUrl = this.result
            vm.$emit('on-change', vm.dataUrl, vm.fileName)
          }
        }
      },
      // 图片大小--单位的转换;
      sizeHumanRead() {
        let result = 0
        if (this.maxSize < 1024) {
          result = this.maxSize + 'K'
        } else {
          //  整数位和小数位;
          result = (this.maxSize / 1024).toFixed(this.maxSize % 1024 > 0 ? 2 : 0) + 'M'
        }
        return result
      }
    },
    // inputId唯一性的处理;
    mounted() {
      //  初始化id
      this.inputId = this.id || this.gengerateID()
      // 初始化图片url
      if (this.imgSrc) {
        this.dataUrl = this.imgSrc
      }
    }
  }

</script>
