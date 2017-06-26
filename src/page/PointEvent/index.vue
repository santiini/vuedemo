<template>
  <div>
    <ul class="demo-container">
      <li class="grad_top poniter_event_none">
      </li>
      <li class="flex">
        <a href="#"  class="item-image">
          <img :src="require('assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="grad_bottom poniter_event_none"></li>
    </ul>
    <!--渐变-->
    <div class="linear-demo"></div>
  </div>
</template>

<style lang="less" scoped>
  @import '../../style/common.less';
  a {
    white-space: nowrap;
  }
  .item-image img {
    width: 50px;
    height: 50px;
  }
  .demo-container {
    position: relative;
    margin-top: 20px;
    li:not(:first-child) {
      margin-top: 10px;
    }
  }
  .grad_top, .grad_bottom {
    height: 80px;
    width: 100%;
    position: absolute;
    pointer-events: none;
  }
  .grad_top {
      /* 上渐变 */
    top: 0;
    // background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(rgba(255, 255, 255, 0)));
    // background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(rgba(255, 255, 255, 0)));
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(rgba(255, 255, 255, 0)));
  }
  .grad_bottom {
      /* 下渐变 */
      bottom: 0;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255, 255, 255, 0)), to(#fff));
  }
  .poniter_event_none {
    pointer-events: none;
  }
  .item-icon {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../assets/logo.png');
    height: 40px;
    max-width: 40px;
    width: 100%;
  }
  .linear-demo {
    width: 130px;
    height: 130px;
    border: 1px solid green;
    padding: 10px;
    background: -webkit-gradient(linear, left top, left bottom, from(#00abeb), to(#fff));
    -webkit-background-origin: padding;
    -webkit-background-clip: content;
  }
</style>

<script>
  import { XButton } from 'vux';
  export default {
    name: 'point-events',
    components: {
      XButton
    }
  }
</script>
