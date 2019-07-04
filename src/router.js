import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入对应的路由组件
import Index from './components/Index.vue'
import First from './components/First/First'
import CouponList from './components/CouponList/CouponList'
import GoodsList from './components/GoodsList/GoodsList'
import Goods from './components/Goods/Goods'
import Supplier from './components/Supplier/Supplier'
import Carts from './components/Carts/Carts'
import Article from './components/Article/Article'
import Login from './components/Login/Login'
import WriteOrder from './components/WriteOrder/WriteOrder'
import SeeOrder from './components/SeeOrder/SeeOrder'
import AfterSale from './components/AfterSale/AfterSale'
import EvaluateForm from './components/EvaluateForm/EvaluateForm'
import Home from './components/Home/Home'
import OrderList from './components/Home/OrderList/OrderList'
import AddressList from './components/Home/AddressList/AddressList'
import UserCouponList from './components/Home/UserCouponList/UserCouponList'
import UserEvaluate from './components/Home/Evaluate/Evaluate'


export default new Router({
    routes: [
        {path: '/', redirect: '/index'},
        {
            path: '/index', component: Index, children: [
                {path: '/', redirect: '/first'},
                {path: '/first', component: First},
                {path: '/goodsList', component: GoodsList},
                {path: '/couponList', component: CouponList},
                {path: '/goods/:goods_id', component: Goods},
                {path: '/supplier', component: Supplier},
                {path: '/carts', component: Carts},
                {path: '/article/:article_id', component: Article},
                {path: '/login', component: Login},
                {path: '/writeOrder', component: WriteOrder},
                {path: '/seeOrder/:order_sn', component: SeeOrder},
                {path: '/afterSale/:order_sn', component: AfterSale},
                {path: '/evaluateForm', component: EvaluateForm},
                {
                    path: '/home', component: Home, children: [
                        {path: 'orderList', component: OrderList},
                        {path: 'addressList', component: AddressList},
                        {path: 'userCouponList', component: UserCouponList},
                        {path: 'userEvaluate', component: UserEvaluate},
                    ]
                },
            ]
        },
    ]
})
