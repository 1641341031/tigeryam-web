<script setup>
import {reactive, ref} from 'vue'
import search from '../components/Search.vue'
import { useRoute } from 'vue-router'
import product from '../components/Product.vue'


const route = useRoute()
const testValue = route.query.id;
console.log(testValue)

const generalIten = reactive(['综合', '最新上架', '评论最多'])
const notShowGeneralIten = ref(true)
const priceOrder = ref(true);
const changeGerneralStatus = ()=>{notShowGeneralIten.value = !notShowGeneralIten.value}
const changePriceOrderStatus = ()=>{priceOrder.value = !priceOrder.value}

</script>

<template>
    <div class="productListWrap">
        <search class="search"></search>
        <div class="orderList">
            <div class="general orderField">
                <div @click="changeGerneralStatus">综合<span>{{notShowGeneralIten ? '▼' : '▲'}}</span></div>
                <ul :class="{show: notShowGeneralIten ? true : false}">
                    <li v-for="item in generalIten">{{item}}<span style="margin-left: .8em;">{{'✔'}}</span></li>
                </ul>
            </div>
            <div class="sale orderField">销量</div>
            <div class="price orderField" @click="changePriceOrderStatus">价格<span>{{priceOrder ? '▼' : '▲'}}</span></div> 
            <div class="switch orderField">switch</div>
        </div>
        <product></product>
    </div>
</template>

<style scoped lang="scss">
.show{
    display: none;
}
.productListWrap {
    .search{
        width: 80vw;
        height: 60px;
        margin: 4px auto;
    }
    .orderList {
        margin-top: .5em;
        width: 100%;
        background-color: #eee;
        display: flex;
        justify-content: space-between;
        padding: 0.5em;
        .orderField {
            width: 60px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            border-radius: .5em;
            cursor: pointer;
            user-select: none;
        }
        .general{
            position: relative;
            ul{
                background-color: rgba(246, 243, 243, 0.808);
                top: 46px;
                width: 200px;
                position: absolute;
                text-align: start;
                list-style-type: none;
                li{
                    padding-left: .5em;
                    height: 3.125em;
                    line-height: 3.125em;
                    &:hover{background-color: #eee;}
                }
                & li + li{
                    border-top: 1px solid rgb(220, 218, 218);
                }
            }
        }
    }
}
</style>