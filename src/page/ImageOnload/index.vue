<template>
  <div class="">
    <h4>图片上传</h4>
    <img :src="imgUrl" class="logo" @load="imgLoaded">
  </div>
</template>

<script>
  export default {
    name: 'image-onload',
    methods: {
      imgLoaded(e) {
        console.log(2222222222222222)
        console.log(e)
      }
    },
    created() {
      this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // setTimeout(() => {
      //   this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // }, 500)
      // this.imgUrl = require('assets/nav.jpg')
      console.log(1111111111111111)
    },
    data() {
      return {
        imgUrl: ''  // 图片地址
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    height: 100%;
  }
</style>

