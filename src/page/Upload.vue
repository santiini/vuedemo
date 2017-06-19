<template>
  <div class="container">
      <div class="">上传测试：</div>
      <div class="upload-container">
          <uploader v-model="uploadFile" class="uploader" labelText="上传" label-css="icon-upload" @on-change="getImgUrl">
            <button slot="label">上传文件</button>
          </uploader>
      </div>

      <div class="">图片名称：{{uploadImgName}}</div>
      <div class="">
        <img :src="uploadImage" class="image">
      </div>
  </div>
</template>

<style lang="less" scoped>
    @import '../style/common.less';
    @import '../style/base.less';
    // 1. 上传容器的css;
    //  container的Css决定上传的按钮的样式;
    .uploader {
        // display: flex;
        // justify-content: center;
        // height: 100%;
        // position: relative;
        // width: 25%;
    }

    // 2. 上传替代标志的css;
    // 3. 因为上传input, 已经不可见， 所以这里只用处理container和 label的css即可;
    // lable绝对定位，占据整个container;
    .icon-upload {
      position: relative !important;
    }

    .container {
        padding: 10px;
        position: relative;
        .flex;
        .flex-col;
    }
    .image {
      width: 100px;
      height: 100px;
    }
</style>

<script>
    import {
        Group
    } from 'vux';
    import Uploader from 'components/upload/index.vue';
    export default {
        name: 'upload',
        data() {
            return {
                uploadFile: undefined, // 上传实体;
                uploadImage: '', // 上传图片的预览地址;
                uploadImgName: '', // 图片名称;
            }
        },
        components: {
            Uploader,
            Group
        },
        methods: {
            getImgUrl(url, filename) {
                this.uploadImage = url
                this.uploadImgName = filename
            }
        }
    }
</script>
