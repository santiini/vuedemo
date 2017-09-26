<template>
    <!--tips: 这里，containerCss是没有必要的，因为uploader组件本身的css即为该css;-->
  <div class="uploader-container" @click="selectImage">
    <!--slot-label: 这是container的实体内容部分，和input自身没有关系，决定uploader的css显示;-->
    <slot></slot>
    <!-- input主体-->
    <!--移动端允许拍照选择-capture属性-->
    <!--兼容性也是IE10+， 移动端安卓4.0+，safari6.0+-->
    <!--<input capture="video" .../>-->
    <input
		v-show="false"
        ref="inputer"
        type="file"
        :id="inputId"
        accept="image/jpg,image/jpeg,image/png,image/gif"
        capture="video"
        multiple="false"
        @change="handleFileChange"
    />
    <!--accept="image/*,video/*;"-->
  </div>
</template>

<style lang="scss" scoped>
  // 上传组件的容器;
  .uploader {
    // input: type=file元素;
    &-input {
      // input绝对定位，占据整个容器, 但是通过opacity和position: absolute使其不可见;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    // 上传container;
    &-container {
      display: inline-block;
    }
  }
</style>

<script>
	import { getImgSize } from 'utils/h5'

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
        type: String,
        default: ''
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
      // 图片选择--回调;
      handleFileChange(e) {
		//   e: 上传事件对象;
        // console.log(e)
		// console.log(e.target.value)
        // 指向生成的input-file Dom实例和input-file的 fileList对象;
        let inputDOM = this.$refs.inputer
        this.file = inputDOM.files[0]
        this.errText = ''
		// console.log(this.file)  // 文件对象;

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
		// if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
		// 本地预览图片的方式:

		//   方式一： FileReader -- base64格式
          // 创建一个reader;
        //   let reader = new FileReader()
        //   // 转化图片为  base64格式
        //   reader.readAsDataURL(file)

        //   // 读取文件成功后的回调;
        //   reader.onloadend = (e) => {
        //     // this指向 reader实例, result是 base64的地址;
		// 	// console.log(e) // ProgressEvent： 事件对象;
        //     vm.dataUrl = reader.result
		// 	vm.$emit('on-change', vm.dataUrl, vm.fileName)
		// 	const sizeObj = getImgSize(vm.dataUrl)
		// 	console.log(sizeObj)
        //   }

		// 方式二： 利用 file对象，blob对象， 生成createObjectURL -- 本地链接;
			vm.dataUrl = window.URL.createObjectURL(file)
			vm.$emit('on-change', vm.dataUrl, vm.fileName)
			// const sizeObj = getImgSize(vm.dataUrl)
			// console.log(sizeObj)
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
      },
	  // 开始上传;
	  selectImage() {
		this.$refs.inputer.click()
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
