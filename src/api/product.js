import service from '../utils/request.js'

export function getProduct(productId){
    return service({
        url: '/pms-product/product/'+productId
    })
}

// 获取所有推荐的产品
export function getAllRecommend() {
    return service({
        url: '/pms-product/getAllRecommend'
    })
}

// 获取所有新产品
export function getAllNew() {
    return service({
        url: '/pms-product/getAllHot'
    })
}