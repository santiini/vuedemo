<template>
    <div class="">
        <group title="vux中的插件">
          <divider>vm.$vux.loading.show()</divider>
          <x-button type="primary" @click.native="showLoading">$vux.loading.show()/close()</x-button>

          <divider>vm.$vux.confirm()</divider>
          <x-button type="primary" @click.native="showConfirm">$vux.loading.confirm()</x-button>

          <divider>vm.$vux.toast()</divider>
          <x-button type="primary" @click.native="showToast">$vux.loading.toast()</x-button>

          <divider>vm.$vux.alert()</divider>
          <x-button type="primary" @click.native="showAlert">$vux.loading.alert()</x-button>

        </group>
    </div>
</template>

<style lang="less">

</style>

<script>
  import { XButton, Group, Divider } from 'vux';
  export default {
    name: 'vux-plugins',
    data() {
      return {

      }
    },
    components: {
      XButton, Group, Divider
    },
    methods: {
      // loading;
      showLoading() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 2000)
      },
      // confirm;
      showConfirm() {
          this.$vux.confirm.show({
            title: 'Title',   // 标题;
            content: 'Content',  // 内容;
            onShow () {
              // 出现回调;
              console.log('plugin show')
            },
            onHide () {
              console.log('plugin hide')
            },
            onCancel () {
              // 取消回调;
              console.log('plugin cancel')
            },
            onConfirm () {
              // 确认回调;
              console.log('plugin confirm')
            }
          })
      },
      // toast
      showToast() {
        this.$vux.toast.show({
          text: '提示文字',
          type: 'warn',    // success, warn, cancel, text
          time: 2000,
          width: '7.6em',
          position: 'default',  // 'default, top, middle, bottom'
          'is-show-mask': false
        })
      },
      // alert;
      showAlert() {
          this.$vux.alert.show({
            title: 'alert',
            content: '内容',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding now')
            }
          })
      }
    }
  }
</script>
