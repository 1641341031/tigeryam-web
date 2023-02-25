<script setup>
import { toRaw} from 'vue';


const arr = defineProps({
    array: {
        tyle: Array,
        default: []
    }
})
const data = toRaw(arr.array)
function mainPic(obj){
    if(obj !== undefined){
        let images = JSON.parse(obj.image);
        return images.image1;
    }
}
</script>

<template>
    <div class="productWrapper">
        <div class="productList">
            <a :href="/productDetail/+item.id" v-for="item in data" :key="item.id">
                <div class="product">
                    <div class="img-wrapper">
                        <img :src="mainPic(item)" alt=""/>
                    </div>
                    <div class="info-wrapper">
                        <div class="title">{{item.title}}</div>
                    </div>
                    <div class="discribe-wrapper">
                        <span>免运费险</span>
                    </div>
                    <div class="price-wrapper">
                        <span><em>￥</em>{{item.price}}</span>
                    </div>
                </div>
            </a>   
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../style/scss/product-scss.scss'
</style>