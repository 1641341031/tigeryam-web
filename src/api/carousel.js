import service from '../utils/request.js'

export function getCarousel() {
    return service({
        url: '/t-carousel/listAll'
    })
}