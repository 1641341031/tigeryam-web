<script setup>
import search from "../components/Search.vue";
import { reactive, ref } from "vue";
import product from '../components/Product.vue'
import productHeader from '../components/ProductHeader.vue'

const keys = reactive(['苹果手机', '数码产品', '女装', '男鞋', '辣条', 
'男装', '火锅食材', '饮料', '可乐', '啤酒', '水果', '蔬菜'])
const notShow = ref(true)
let changeStatus = () => {
    notShow.value = !notShow.value;
}
</script>

<template>
    <div>
        <search class="search"></search>
        <div class="recommendKey">
            <div class="title" style="user-select: none;">你对这些关键词感兴趣吗？</div>
            <div class="key1">
                <span v-for="item in keys.slice(0,5)">{{ item }}</span>
                <button @click="changeStatus">{{notShow ? '▼' : '▲'}}</button>
            </div>
            <div :class="{ShowKey: notShow ? true : false}">
                <span v-for="item in keys.slice(5,keys.length)">{{ item }}</span>
            </div>
        </div>
        <productHeader>为你推荐</productHeader>
        <product></product>
    </div>
</template>

<style lang="scss" scoped>
.ShowKey{
    display: none;
}
.search{
    width: 80vw;
    height: 60px;
    margin: .25em auto;
}

.recommendKey{
    width: 50%;
    margin-left: 10%;
    border: 1px solid var(--colororigin);
    // margin: 0 auto;
    border-radius: .5em;
    padding: .5em;
    span{
        background-color: #eee;
        display: inline-block;
        width: 6em;
        height: 26px;
        margin: .25em .25em;
        border-radius: 1em;
        text-align: center;
        line-height: 26px;
        &:hover{
            color: var(--colororigin);
            cursor: pointer;
        }
    }
    .key1{
        margin: .5em 0;
        button{
        width: 10%;
        height: 26px;
        border: none;
        border-radius: .5em;
        &:hover{
            background-color: var(--colororigin);
            cursor: pointer;
        }
    }
    }
}
</style>