import service from '../utils/request.js'

// 默认获取所以分类首级
export function getFatherLevel() {
    return service({
        url: '/pms-product-category/fatherLevel'
    })
}


export function getSubLevel(parentId){
    return service({
        url: '/pms-product-category/subLevel',
        method: 'post',
        data:{
            parentId
        }
    })
}

export function getCategoryTree(parentId){
    return service({
        url: '/pms-product-category/getCategory',
        params: {
            parentId
        }
    })
}