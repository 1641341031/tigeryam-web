<script setup>
import { reactive, watch } from 'vue';
import { getCategoryTree } from '../api/category.js'
import { useRoute } from 'vue-router'
import router from '../router/index.js'


const route = useRoute()
let secondLevel = reactive([]);

watch(
    () => route.params.id,
    async newId => {
        // 先将旧数据清空，再填充新数据
        secondLevel.length = 0;
        await getData(newId, secondLevel);
    }
)

async function getData(parentId, arr) {
    let result = await getCategoryTree(parentId);
    if (result.data.code === 200) {
        result.data.data.forEach(i => {
            arr.push(i);
        })
    }
}
const gotoProductList = (id) => {router.push({path: '/productList', query: {id}})}
getData(1, secondLevel);
</script>

<template>
    <div class="second_wrap-item" v-for="item in secondLevel">
        <h4> {{ item.name }} </h4>
        <div class="content-item" v-for="item1 in item.children" @click="gotoProductList(item1.id)">
            <img :src="item1.image" alt="">
            <div class="product-name">{{ item1.name }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.second_wrap-item {
    border-radius: .5em;
    margin: 6px;
    overflow: hidden; // 防止高度坍塌

    h4 {
        user-select: none;
        text-align: center;
        margin: 10px;
    }

    .content-item {
        padding: 4px;
        display: inline-block;
        margin: 5px 5px;
        cursor: pointer;

        img {
            padding: 4px;
            width: 80px;
            height: 80px;

            &:hover {
                transform: scale(1.2);
                box-shadow: .1em .1em .5em rgb(102, 107, 117);
            }
        }

        .product-name {
            font-size: .8em;
            height: 2.1em;
            line-height: 2.1em;
            text-align: center;
        }

        &:hover {
            color: var(--colororigin);
        }
    }
}
</style>