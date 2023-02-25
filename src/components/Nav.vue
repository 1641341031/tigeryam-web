<script setup>
import { getToken, removeToken } from '../utils/auth.js'
import router from '../router/index.js'

const auth = getToken();

function logout(){
  removeToken();
  router.push({path:'/login'})
}

</script>

<template>
  <div class="navWrap">
    <nav>
      <div class="brand"><a href="/">TIGERYAM</a></div>
      <ul>
        <li>
          <a href="/">首页</a>
        </li>
        <li><a href="#">购物车</a></li>
        <li><a href="/category">商品分类</a></li>
        <li><a href="/search">搜索</a></li>
        <li><a href="#">关于我</a></li>
      </ul>
      
      <div class="lg-rg">
        <div v-if="!auth">
          <a href="/login">
            登录
          </a>
          <span>|</span>
          <a href="/register">注册</a>
        </div>
        <div v-else>
          <router-link to="#">个人中心</router-link>
          <router-link to="#" @click="logout">退出</router-link>
          <!-- <a href="#">个人中心</a>
          <a href="#" @click="logout">退出</a> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import "../style/nav.css"
</style>
