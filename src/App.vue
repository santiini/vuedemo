<template>
  <div id="app">
    <x-header v-show="header.isShown" :left-options="header.leftOption" :right-options="header.rightOption">{{header.title}}</x-header>
    <!--<x-header>keep-alive的测试</x-header>-->
    <!--<router-view></router-view>-->
    <!--keep-alive的两种形式-->

    <!--1.keep-alive的 include/exclude属性，参数是组件名称，适用于简单应用;-->
    <!--<keep-alive include="keep-alive,keep">
      <router-view></router-view>
    </keep-alive>-->

    <!--2.keep-alive 结合 v-if和 route.meta的判断, 适用于复杂项目-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    XHeader
  },
  computed: {
    ...mapGetters(['header'])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
