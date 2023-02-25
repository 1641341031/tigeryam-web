import { getToken } from './utils/auth.js'
import router from './router/index.js'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login', '/forgetPassword', '/register', '/'];
router.beforeEach((to, from, next) => {
    NProgress.start()
    if(getToken()){
        if(to.path === '/login' || to.path === '/register'){
            next('/');
            NProgress.done()
        }else{
            next();
        }
    }else {
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login');
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
  })