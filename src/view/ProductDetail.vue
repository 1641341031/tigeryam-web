<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import DetailComment from '../components/ProdetailCommentHead.vue'
import Tools from '../components/Tool.vue'
import { getProduct } from '../api/product.js'
import { useRoute } from 'vue-router'

const route = useRoute();
const productId = route.params.id;

const images = reactive([]); // 四张小图
let main_aux_pic = ref(''); // 主图和副图的图片地址
let shareDataObj = ref('');

async function getData(productId) {
    let result = await getProduct(productId);
    setShareData(result)
}
getData(productId);


function setShareData(result){
    if (result.data.code === 200) {
        // 默认取出第一条数据获取商品公共信息部分
        let firstData = result.data.data[0];
        shareDataObj.value = firstData;
        let imageObj = JSON.parse(firstData.image);
        main_aux_pic.value = imageObj.image1;   // 默认显示第一张图
        images.push(...Object.values(imageObj));
    }
}

// 鼠标进入图片列表，主图和副图的地址切换为鼠标进入图片的地址
function switch_pic(address) {
    main_aux_pic.value = address;
}

let mainPic = ref(null);
let mask = ref(null);
let auxChart = ref(null);
let auxPic = ref(null);
let picRootWrap = ref(null);
onMounted(() => {
    mainPic = mainPic.value;
    mask = mask.value;
    auxChart = auxChart.value;
    auxPic = auxPic.value;
    picRootWrap = picRootWrap.value;
})


// 放大镜图片的脚本
// 鼠标经过的时候 显示 mask和auxChart ， 当鼠标离开box的时候隐藏mask和auxChart
function showMaskAuxChart() {
    mask.style.display = 'block';
    auxChart.style.display = 'block';
}

function hiddenMaskAuxChart() {
    mask.style.display = 'none';
    auxChart.style.display = 'none';
}

function maskMove(e) {
    //获取主图中的内边距,即mask也得加上这个内边距
    let padding = getComputedStyle(mainPic, null).padding;
    //遮罩层水平距离 = 当前鼠标水平距离 - 主图容器的左边空白距离 - 遮罩层一半（即鼠标居中）
    let maskX = e.pageX - mainPic.offsetLeft - 30 - mask.clientHeight / 2;
    // 遮罩层垂直距离 = 当前鼠标垂直距离 - 主图容器的顶边空白距离 - - 遮罩层一半（即鼠标居中）
    let maskY = e.pageY - mainPic.offsetTop - mask.clientHeight / 2;

    //限制遮罩层在盒子范围内
    maskX = maskX < 0 ? parseInt(padding) : maskX;
    maskY = maskY < 0 ? parseInt(padding) : maskY;

    let maskMax = mainPic.offsetWidth - mask.offsetWidth;
    maskX = maskX > maskMax ? maskMax - parseInt(padding) : maskX;
    maskY = maskY > mainPic.offsetHeight - mask.offsetHeight ? mainPic.offsetHeight - mask.offsetHeight - parseInt(padding) : maskY;
    mask.style.top = maskY + 'px';
    mask.style.left = maskX + 'px';


    let bigImageMax = auxPic.offsetWidth - auxChart.offsetWidth;
    let bigImageX = maskX * bigImageMax / maskMax;
    let bigImageY = maskY * bigImageMax / maskMax;
    auxPic.style.left = -bigImageX + 'px';
    auxPic.style.top = -bigImageY + 'px';
}
</script>

<template>
    <div class="root-wrap">
        <!-- 左边的大图和小图列表开始 -->
        <div class="pic-root-wrap" ref="picRootWrap">
            <div class="pic-main-wrap" ref="mainPic" @mouseenter="showMaskAuxChart" @mouseleave="hiddenMaskAuxChart"
                @mousemove="maskMove">
                <img :src="main_aux_pic" alt="">
                <div class="mask" ref="mask"></div>
            </div>
            <!-- 鼠标进入大图则显示副图 -->
            <div class="auxChart" ref="auxChart">
                <img :src="main_aux_pic" alt="" ref="auxPic">
            </div>
            <!-- 小图列表 -->
            <div class="pic-list-wrap">
                <ul>
                    <li v-for="item in images" @mouseenter="switch_pic(item)"><img :src="item" alt=""></li>
                </ul>
            </div>
        </div>
        <!-- 左边的大图和小图列表结束 -->
        <!-- 右边商品信息开始 -->
        <div class="pro-info-wrap">
            <div class="title-price-wrap">
                <div class="title">
                    <h1>{{ shareDataObj.title }}</h1>
                </div>
                <div class="price-wrap">
                    <div class="promotion-price"><em>￥</em><span>{{ shareDataObj.promotionPrice }}</span></div>
                    <div class="price"><em>￥</em>{{ shareDataObj.price }}</div>
                    <div class="sales">月售 {{ shareDataObj.sale }}</div>
                </div>
            </div>
            <div class="product-item-info">
                <div class="address-wrap">
                    <div class="address">
                        <span>配送: </span>福建厦门 至 广州市黄埔区
                    </div>
                </div>
                <div class="express-wrap">
                    <div class="express">
                        <span>快递：</span>免运费
                    </div>
                </div>
                <div class="spec-wrap">
                    test
                </div>
                <div class="count-wrap">
                    <span>数量：</span> <button>-</button><span class="count">1</span><button>+</button> <span>有货</span>
                </div>
            </div>
            <div class="buy-wrap">
                <div class="bt-group">
                    <button class="buy-bt">立即购买</button>
                    <button class="car-bt">加入购物车</button>
                </div>
                <span>|</span>
                <div class="collect-wrap"><button class="collect-bt">收藏</button></div>
            </div>
        </div>
        <!-- 右边商品信息结束 -->
        <Tools class="tools"></Tools>
        <DetailComment></DetailComment>
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
@import '../style/scss/productDetail.scss';

.tools {
    position: fixed;
    // right: 1.25em;
    right: 0;
    top: 70vh;
}
</style>