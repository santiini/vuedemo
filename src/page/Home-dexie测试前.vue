<template>
  <div>
    <!--<x-header :left-options="{showBack: false}">主页</x-header>-->
    <grid :rows="3">
      <grid-item
        v-for="(item, i) of menuList"
        v-if="item.meta && item.meta.isShown && item.meta.name"
        :key="i"
        :label="item.meta.name"
        :link="item.path"
      >
        <img slot="icon" :src="require('assets/grid_icon.png')">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Group, Cell, Grid, GridItem, XHeader } from 'vux'
import router from '../router';

export default {
  components: {
    Group,
    Cell,
    Grid,
    GridItem,
    XHeader
  },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    // 引用router.js 中的变量routes;
    // console.log(router.options.routes)
    this.menuList = router.options.routes

    // dexie  indexedDB的使用;
    console.log(this.$root)

    // header
    this.$store.dispatch('setHeader', {
      title: 'Vux学习',
      leftOption: {
        showBack: false
      }
    })
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
