<template>
  <div class="upload-test">
      <h4>上传测试：最新</h4>
      <div class="">
          <uploader @upload="preview"></uploader>
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
   import Uploader from 'components/upload/upload';
   export default {
     name: 'uploader2',
     data() {
       return {
        previewUrl: '',
        previewName: ''
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
     }
   }
</script>

