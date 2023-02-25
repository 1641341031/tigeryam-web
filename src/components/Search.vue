<script setup>
import {ref} from 'vue'
let searchKey = ref('男鞋')
</script>

<template>
    <div class="search-wrapper">
        <input type="text" name="search" id="search" :placeholder="searchKey">
        <button type="submit">搜索</button>
    </div>
</template>

<style scoped lang="scss">
@import '../style/scss/search.scss'
</style>