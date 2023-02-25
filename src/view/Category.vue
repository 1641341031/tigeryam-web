<script setup>
import { reactive, ref } from 'vue';
import { getCategoryTree } from '../api/category.js'
import router from '../router/index.js'

let fatherLevel = reactive([]);
let activeIndex = ref(1);

function changeActiveIndex(index){
    activeIndex.value = index
}

function goTo(id){
    router.push("/category/"+id);
}
function switchItem(index){
    changeActiveIndex(index);
    goTo(index);
}

async function getData(parentId, arr){
    let result = await getCategoryTree(parentId);
    if(result.data.code === 200){
        result.data.data.forEach(i =>{
            arr.push(i);
        })
    }
}
getData(0, fatherLevel);


// 给定数组，递归找出指定的id对象
function handleTreeData(arr, specifyId) {
    let result = [];
    arr.forEach( i => {
        if (i.parentId === specifyId) {
            result.push(i);
            if (i.isParent === 1) {
                handleTreeData(i.id);
            }
        }
    })
    return result;
}
</script>

<template>
    <div class="category-wrap">
        <div class="main-wrap">
            <div class="category-item" :class="{active: activeIndex === item.id? true : false} " v-for="item in fatherLevel" 
            :key="item.id" @click="switchItem(item.id)">{{item.name}}</div>
        </div>
        <div class="second-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.active {
    color: var(--colororigin);
    border-left: 3px solid var(--colororigin);
    background-color: #fff !important;
}

.category-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;

    .main-wrap {
        background-color: #eee;
        width: 28vw;
        height: 100vh;
        overflow: hidden; //防止高度坍塌

        .category-item {
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid rgba(220, 217, 217, 0.849);
            cursor: pointer;

            &:hover {
                color: var(--colororigin);
                // background-color: rgb(34, 34, 35);
            }
        }
    }

    .second-wrap {
        width: 72vw;
        height: 100vh;
        padding: 4px;

        
    }
}
</style>