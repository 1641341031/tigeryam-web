<script setup>
import { reactive } from 'vue';

let text= `<h1>这是评论页面</h1>`;
let comment = reactive(text);

</script>

<template>
    <div class="comment-wrap">
        <div class="comment" v-html="comment"></div>
    </div>
</template>

<style scoped lang="scss">
.comment-wrap{
    min-width: 300px;
    max-width: 1200px;
    width: 100%;
    height: 500px;
    margin: 0 auto;
    padding: .5em;
    .comment{
        height: 100%;
    }
}
</style>