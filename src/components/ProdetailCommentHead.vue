<script setup>
import { onMounted } from 'vue';
let len;
onMounted(() =>{
    len = document.getElementsByClassName("headField");
    
})
function removeActive(){
    for(let i=0; i<len.length;i++){
        if(len[i].classList.contains("active")){
            len[i].classList.remove("active");
        }
    }
}
function addActive(index){
    removeActive();
    len[index].classList.add("active");
}

</script>

<template>
    <header class="detail-comment-wrap">
        <div @click="addActive(0)" class="headField detail active"><router-link class="detail-link" to="/productDetail/article">宝贝详情</router-link></div>
        <div @click="addActive(1)" class="headField comment"><router-link class="comment-link" to="/productDetail/comment">宝贝评价</router-link></div>
    </header>
</template>

<style scoped lang="scss">
.active{
    border-bottom: 2px solid #ff5000;
}
.detail-comment-wrap{
    min-width: 600px;
    max-width: 1200px;
    width: 1200px;
    height: 72px;
    display: flex;
    margin: 0 auto;
    line-height: 72px;
    padding: .5em;
    & div + div{
        margin-left: 1.5em;
    }
    .detail{
        .detail-link{
            text-decoration: none;
            color: #000;
        }
    }
    .comment{
        .comment-link{
            text-decoration: none;
            color: #000;
        }
    }
}

@media all and (max-width: 600px){
    .detail-comment-wrap{
        width: 414px;
    }
}

@media all and (min-width: 601px) and (max-width: 900px){
    .detail-comment-wrap{
        width: 750px;
    }
}
</style>