<template>
  <vux-group title="上传组件">
      <uploader
        title="上传"
        :images="images"
        :max="varmax"
        :showHeader="showHeader"
        :showTip="showTip"
        :readonly="false"
        :upload-url="uploadUrl"
        :autoUpload="autoUpload"
        size="small"
        @preview="previewMethod"
        @add-image="addImageMethod"
        @remove-image="removeImageMethod"
        @upload-image="uploadImage"
        ></uploader>
  </vux-group>
</template>

<style lang="less" scoped>

</style>

<script>
    // 引入第三方组件： vux-uploader， 上传组件;
      // tips: vux-uploader库 依赖于babel-preset-es2015库;
    import { Group } from 'vux';
    import Uploader from 'vux-uploader';
    export default {
        name: 'vux-uploader',
        data() {
            return {
              varmax: 2,   // 图片最大张数;
              images: [],  // 图片数组，格式为 [ { url: '/url/of/img.ong' }, ...]
              showHeader: true,  // 是否显示头部;
              showTip: true,   // 是否显示头部数字部分，即1/3部分;
              autoUpload: false,  // 是否自动上传;
              uploadUrl: '/upload/'  // 接收上传图片的url;
            }
        },
        components: {
            Uploader,
            VuxGroup: Group
        },
        methods: {
            previewMethod(pic) {
              console.log(pic)
            },
            addImageMethod() {
              console.log('addImageMethod')
            },
            removeImageMethod() {
              console.log('removeImageMethod')
            },
            uploadImage(formData) {
              console.log(formData.get('img'))
              var img = formData.get('img');
              // this.images.push({

              // })
            }
        }
    }
</script>
