<template>
  <div class="">
    <group title="mock测试">
      <x-button @click.native="loginByName">登陆</x-button>
      <x-button >登出</x-button>
      <x-button @click.native="getUserList">获取用户列表</x-button>
      <x-button @click.native="getList">获取acticle</x-button>
    </group>
  </div>
</template>

<script>
import { XButton, Group, Cell } from 'vux'
import { loginByEmail, logout, getInfo } from 'api/mock'
import { getArticle, getList } from 'api/acticle'
import { getList as getUsers } from 'api/mock-user'

  export default {
    name: 'mock',
    components: {
      XButton, Group, Cell
    },
    methods: {
      // 登陆
      loginByName() {
        loginByEmail('admin', '123456')
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取列表;
      getList() {
        getList()
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取用户列表;
      getUserList() {
        getUsers()
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created() {
      this.$store.dispatch('setHeader', {
        title: 'Mock测试',
        leftOption: {
          showBack: true
        }
      })
    }
  }
</script>

<style lang="scss">

</style>

