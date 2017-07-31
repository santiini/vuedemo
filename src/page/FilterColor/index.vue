<template>
  <div class="" style="padding: 29px;">
    <h4>测试filter 颜色</h4>
    <p><strong>原始图标</strong></p>
    <i class="icon icon-del"></i>
    <p><strong>可以变色的图标</strong></p>
    <i class="icon"><i class="icon icon-del changeColor"></i></i>
  </div>
</template>

<script>
  export default {
    name: 'filter-color'
  }
</script>

<style>
.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    overflow: hidden;
}
.icon-del {
    background: url(../../assets/logo.png) no-repeat center;
}
.icon > .icon {
    position: relative;
    left: -20px;
    border-right: 20px solid transparent;
    -webkit-filter: drop-shadow(20px 0);
    filter: drop-shadow(20px 0);
}
.changeColor {
  filter: drop-shadow(red 20px 0)!important;
}
</style>

