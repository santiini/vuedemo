<template>
  <div class="slick-container">
    <!-- <vue-slick></vue-slick> -->
    <slick ref="slick" :options="slickOptions">
      <div class="" v-for="(item,i) of list" :key="i">
        <h4>名称{{item.name}}</h4>
        <img :src="require('assets/logo.png')">
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import "node/slick-carousel/slick/slick.css"
import VueSlick from 'components/VueSlick'

export default {
  name: 'vue-slick-demo',
  components: {
    Slick, VueSlick
  },
  methods: {
    next() {
      this.$refs.slick.next()
    },
    prev() {
      this.$refs.slick.prev()
    },
    reInit() {
      this.$refs.slick.reSlick()
    }
  },
  mounted() {
    // 组件加载后执行;
  },
  data() {
    return {
      slickOptions: {
        autoplay: false,  // 自动播放
        dots: true,   // 提示远点：
        infinite: true, // 无限播放
        autoplaySpeed: 500, // 自动播放频率
        speed: 300,   // 动画速度
        slidesToShow: 2,  // 每一屏显示的slide数量;
        slidesToScroll: 2  // 每次滚动滚动的slide数量;
      },
      list: [
        { name: 1, id: 1 },
        { name: 2, id: 1 },
        { name: 3, id: 1 },
        { name: 4, id: 1 },
        { name: 5, id: 1 },
        { name: 6, id: 1 },
        { name: 7, id: 1 },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.slick-container {
  img: {
    width: 100%;
  }
}
</style>


