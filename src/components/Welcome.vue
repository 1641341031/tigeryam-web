<script setup>
import { onMounted, reactive } from 'vue';
import {getCarousel} from '../api/carousel.js'

let data = reactive([])
onMounted(()=>{
  getCarousel().then( reps => {
    data.values = reps.data.data;
  })
})

</script>

<template>
    <el-carousel indicator-position="outside" height="450px">
      <el-carousel-item v-for="item in data.values" :key="item.id">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
img{
  width: 100%;
  height: 100%;
}
</style>