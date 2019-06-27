import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入对应的路由组件
import Index from './components/Index.vue'
import First from './components/First/First'
import GoodsList from './components/GoodsList/GoodsList'
import Goods from './components/Goods/Goods'
import Supplier from './components/Supplier/Supplier'
import Carts from './components/Carts/Carts'
import Article from './components/Article/Article'
import Login from './components/Login/Login'

export default new Router({
    routes: [
        {path: '/', redirect: '/index'},
        {
            path: '/index', component: Index, children: [
                {path: '/', redirect: '/first'},
                {path: '/first', component: First},
                {path: '/goodsList', component: GoodsList},
                {path: '/goods/:goods_id', component: Goods},
                {path: '/supplier', component: Supplier},
                {path: '/carts', component: Carts},
                {path: '/article/:article_id', component: Article},
                {path: '/login', component: Login},
            ]
        },
    ]
})
