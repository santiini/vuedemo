<template>
  <scroller
    v-show="!isAxiosing"
    ref="photoScroller"
    :on-infinite="fetchData"
    :snapping="true"
    :no-data-text="photoList.length > 0 ? '没有更多图片' : '暂无图片'"
  >
    <group gutter="0">
        <div v-show="photoList.length > 0" class="image-container" v-masonry transition-duration="0.3s" item-selector=".previewer-demo-img">
          <img
            v-masonry-tile
            class="previewer-demo-img"
            v-for="(item, index) of photoList"
            :ref="'img' + index"
            :key="index"
            :src="getImage(item.PhotoSrc)"
            width="100"
            @click="show(index)"
          >
          <div v-transfer-dom>
             <previewer :list="photoList" ref="photoWall" :options="options"></previewer>
          </div>
        </div>
        <!-- <div v-show="photoList.length < 1" class="tips-null">暂无照片！</div> -->
    </group>
  </scroller>
</template>

<script>
  import {Group, Cell, Previewer, TransferDom } from 'vux';
  import { getPhotos } from 'api/mock-meeting';
  import { getImageSize } from 'utils';
  export default {
    name: 'photo-wall',
    data () {
      return {
        photoList: [],
        meetingId: null,
        page: 1,
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        isMore: true,
        isAxiosing: true
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Group, Cell, Previewer
    },
    methods: {
      fetchData(done) {
        if (!this.isMore) return done(true)
        getPhotos(this.meetingId, this.page)
          .then(result => {
            // this.photoList = []
            this.photoList = this.photoList.concat(result.rows)
            this.photoList = this.photoList.map( el => {
              el.src = this.getImage(el.PhotoSrc)
              let image = document.createElement('img')
              image.src = el.src
              image.onload = function () {
                el.h = image.height
                el.w = image.width
              }
              return el
            })
            this.page += 1
            if (result.rows.length < 10) {
              this.isMore = false
              return done(true)
            } else {
              return done()
            }
          })
          .catch(err => {
            console.log(err)
          })
          .then(() => {
            this.isAxiosing = false
            this.$vux.loading.hide()
          })
      },
      show(index) {
        this.$refs.photoWall.show(index)
      }
    },
    created() {
      // this.$vux.loading.show()
      // const meeting = this.$route.params.meeting
      this.meetingId = 31
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  .image-container {
    img {
      width: 50%;
    }
  }
</style>
