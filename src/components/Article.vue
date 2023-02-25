<script setup>
import { reactive } from 'vue';

let vHtml = `product detail`
let article = reactive(vHtml);
</script>


<template>
    <div class="article-wrap">
        <div class="article" v-html="article"></div>
    </div>
</template>

<style scoped lang="scss">
.article-wrap{
    min-width: 300px;
    max-width: 1200px;
    width: 100%;
    height: 500px;
    margin: 0 auto;
    padding: .5em;
    .article{
        height: 100%;
    }
}
</style>