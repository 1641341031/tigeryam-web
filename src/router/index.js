import { createRouter, createWebHistory } from 'vue-router'

export const constantRouterMap = [
    {path: '/', component: () => import('../view/Home.vue'), meta:{keepAlive: true}},
    {path: '/login', component: () => import('../view/Login.vue')},
    {path: '/register', component: () => import('../view/Register.vue')},
    {path: '/productDetail/:id', 
    component: () => import('../view/ProductDetail.vue'),
    children:[
        {path: '', component: () => import('../components/Article.vue')},
        {path: 'article', component: () => import('../components/Article.vue')},
        {path: 'comment', component: () => import('../components/ProductComment.vue')}
    ]},
    {path: '/forgetPassword', component: () => import('../view/ForgetPassword.vue')},
    {path: '/category', component: () => import('../view/Category.vue'),
    children: [
        {path: '', component: () => import('../components/CategorySide.vue')},
        {path: ':id', component: () => import('../components/CategorySide.vue')}
    ]},
    {path: '/productList', component: () => import('../view/ProductList.vue')},
    {path: '/search', component: () => import('../view/SearchView.vue')},
]

export default createRouter({
    history: createWebHistory(),
    routes: constantRouterMap
  })