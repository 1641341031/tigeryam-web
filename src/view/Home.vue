<script setup>
import {reactive, ref} from 'vue'
import Nav from '../components/Nav.vue'
import WelcomeVue from '../components/Welcome.vue';
import ProductVue from '../components/Product.vue';
import productHeader from '../components/ProductHeader.vue'
import {getAllRecommend, getAllNew} from '../api/product.js'

const newProduct = ref('新品上市')
const recommendProduct = ref('为你推荐')
let productRecommend = reactive([])
let productNew = reactive([])

async function allRecommend(){
  let result =  await getAllRecommend();
  if(result.data.code === 200){
    result.data.data.forEach(i => {
      productRecommend.push(i);
    });
  }
}
allRecommend();

async function allNew(){
  let result =  await getAllNew();
  if(result.data.code === 200){
    result.data.data.forEach(i => {
      productNew.push(i);
    });
  }
}
allNew();
</script>

<template>
    <div class="container">
        <Nav class="navue"></Nav>
        <WelcomeVue class="welcomevue" style="margin-top: 3.7em;"></WelcomeVue>
        <productHeader>{{newProduct}}</productHeader>
        <ProductVue class="newProduct" :array="productNew" v-if="productNew.length > 0"></ProductVue>
        <productHeader>{{recommendProduct}}</productHeader>
        <ProductVue class="hotProduct" :array="productRecommend" v-if="productRecommend.length > 0"></ProductVue>
    </div>
</template>

<style scoped lang="scss">
.container{
  overflow: hidden; // 防止高度坍塌
  
  .hotProduct{
    margin-top: 0.5em;
  }
}
</style>