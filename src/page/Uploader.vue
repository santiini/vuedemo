<template>
  <div class="upload-test">
      <h4>上传测试：最新</h4>
      <div class="">
            <uploader @uploadImage="preview"></uploader>
      </div>
      <div class="">{{previewName}}</div>
      <div class="" v-if="previewUrl && previewUrl !== ''">
        <img :src="previewUrl" class="preview-image">
      </div>
  </div>
</template>

<style lang="less" scoped>
    .upload-test {
      padding: 10px;
    }
    .preview-image {
      width: 100px;
      height: 100px;
    }
</style>

<script>
// tips:
  // 1. 基于 Base64 格式的图片上传;
  // 2. 这里需要明确制定 upload.vue文件，因为同文件下的upload.js文件会被优先访问;
   import Uploader from 'components/upload/upload.vue';

   export default {
     name: 'uploader21',
     data() {
       return {
        previewUrl: '',
        previewName: '上传测试'
       }
     },
     components: {
       Uploader
     },
     methods: {
       preview(url, name) {
          this.previewUrl = url
          this.previewName = name
       }
     },
     created() {
       console.log('1111')
     }
   }
</script>

