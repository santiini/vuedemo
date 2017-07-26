<template>
  <x-button type="primary" mini @click.native="upload">
    上传</x-button>
  <!--<input type="file">-->
</template>

<style lang="less">

</style>

<script>
import {
  XButton
} from 'vux';
export default {
  name: 'upload2',
  data() {
    return {
      imageUrl: '',
      imageName: '',
    }
  },
  components: {
    XButton
  },
  methods: {
    // 上传;
    upload() {
      // step1: 通过 File API 获取图片。
      const fileElem = document.createElement('input'),
        vm = this;

      console.log(fileElem)
      fileElem.type = 'file';

      fileElem.click();

      fileElem.addEventListener('change', (event) => {
        // console.log(this)
        // this， 这里仍然指向Vue实例;
        //  const file = this.files[0];

        if (vm.$vux && this.$vux.loading) {
          vm.$vux.loading.show('正在上传')
        }
        const file = event.target.files[0];

        vm.imageUrl = window.URL.createObjectURL(file)
        vm.fileName = file.name

        // 直接上传;
        // let formData = new window.FormData()
        // formData.append('img', file)
        // fetch('/api/upload', { method: 'POST', body: formData })
        this.axios({
          url: 'http://localhost:3000/users/upload',
          type: 'post',
          data: file
        })
          .then(result => {
            console.log(result)
          })
          .catch(err => console.log(err));

        vm.$emit('uploadImage', vm.imageUrl, vm.fileName)

        // this.previewImage();
      })
    },
    // 预览;
    previewImage() {
      // 图片处理后再上传;
      console.log('预览图片')

      let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        MAX_WIDTH = 800,
        MAX_HEIGHT = 600,
        width = this.$refs.image.width,
        height = this.$refs.image.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // canvas处理;
      // 向画布上面绘制图片：
      ctx.drwaImage(img, 0, 0, width, height);
      canvas.toBlob(blob => {
        // 处理过后的文件进行上传;
        const formData = new FormData();
        // tips: FormData
        // 所有的输入元素都需要有name属性，否则无法访问到值;
        formData.append('file', blob);
        // fetch('/api/upload', { method: 'POST', body: form })
      });

    },
  },
  mounted() {
  }
}
</script>
