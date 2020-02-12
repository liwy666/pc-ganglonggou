import Vue from 'vue'
import Vuex from 'vuex'
import {Notice} from 'iview';
import router from './router';
import {fetch} from './http'

Vue.use(Vuex);

var carts_ = JSON.parse(localStorage.getItem('carts') || '[]');
var carts_selected_ = [];
/*初始化选中购物车*/
if (carts_.length > 0) {
    carts_.forEach(item => {
        if (item.selected === true) {
            carts_selected_.push(item);
        }
    })
}
/*初始化用户token*/
let user_token_obj = JSON.parse(localStorage.getItem('user_token_obj') || 'null');
//获取当前时间时间戳
let now_time = (new Date()).getTime();
var user_token = null;
if (user_token_obj && parseInt(now_time) <= parseInt(user_token_obj.over_time)) {
    user_token = user_token_obj.user_token;
}


export default new Vuex.Store({
    state: {
        ad_list: []
        , api_url: "https://test-api.ganglonggou.com"
        ,local_url:' http://192.168.0.158:3008/' //这里自己换成你的本地地址
        , wx_login_url: 'https://mate.ganglonggou.com/wx-test-ganglonggou/#/pcLogin'
        , img_url: 'https://test-img-api.ganglonggou.com/'
        // , api_url: "https://api.ganglonggou.com"
        // , wx_login_url: 'https://mate.ganglonggou.com/wx-ganglonggou/#/pcLogin'
        // ,local_url:'https://www.ganglonggou.com/'
        // , img_url: 'https://img-api.ganglonggou.com/'
        , user_token: user_token
        , user_info: null
        , out_token_time: 54000000
        , goods_list: []
        , classify_list: []
        , into_type: 'wx'
        , goods_info: {
            goods_gallery: [],//商品相册
            goods_sku_list: [],//sku表
            goods_number: 1,//商品数量
            goods_sn: '',
            goods_name: '',
            goods_id: 0,
            cat_id: 0,
            goods_head_name: '',
            goods_price: 0,//商品价格
            one_goods_price: 0,//商品单价
            market_price: 0,//划线价
            goods_stock: 0,//商品库存
            goods_sales_volume: 0,//销量（预约量）
            goods_attribute_img: '',//当前属性图片
            sku_id: 0,//所选属性id
            attr_desc: '',//所选属性详情
            is_promote: 0,//是否秒杀商品
            promote_number: 0,
            promote_start_date: 0,
            promote_end_date: 0,
            give_integral: 0,//返积分
            integral: 0,//用积分
            one_give_integral: 0,//返积分
            one_integral: 0,//用积分
            integral_desc: '',//积分描述
            by_stages_number: 1//分期期数
        }//单个商品信息
        , goods_sku_options: []//sku选项
        , goods_sku: []//单个商品规格
        , carts: carts_//购物车
        , carts_selected: carts_selected_ //选中的购物车
        , address_list: []
        ,integral_name:"岗隆积分"
    },
    mutations: {
        /**
         * 初始化商品详情
         * @param state
         * @param new_goods_info
         */
        initGoodsInfo(state, new_goods_info) {
            Vue.set(state, 'goods_info', {
                goods_gallery: [],//商品相册
                goods_sku_list: [],//sku表
                goods_number: 1,//商品数量
                goods_sn: '',
                goods_name: '',
                goods_id: 0,
                cat_id: 0,
                goods_head_name: '',
                goods_price: 0,//商品价格
                one_goods_price: 0,//商品单价
                market_price: 0,//划线价
                goods_stock: 0,//商品库存
                goods_sales_volume: 0,//销量（预约量）
                goods_attribute_img: '',//当前属性图片
                sku_id: 0,//所选属性id
                attr_desc: '',//所选属性详情
                is_promote: 0,//是否秒杀商品
                promote_number: 0,
                promote_start_date: 0,
                promote_end_date: 0,
                give_integral: 0,//返积分
                integral: 0,//用积分
                one_give_integral: 0,//返积分
                one_integral: 0,//用积分
                integral_desc: '',//积分描述
                by_stages_number: 1//分期期数
            });
            Vue.set(state.goods_info, 'goods_price', new_goods_info.shop_price);
            Vue.set(state.goods_info, 'market_price', new_goods_info.market_price);
            Vue.set(state.goods_info, 'goods_sn', new_goods_info.goods_sn);
            Vue.set(state.goods_info, 'goods_id', new_goods_info.goods_id);
            Vue.set(state.goods_info, 'goods_stock', new_goods_info.goods_stock);
            Vue.set(state.goods_info, 'cat_id', new_goods_info.cat_id);
            Vue.set(state.goods_info, 'goods_name', new_goods_info.goods_name);
            Vue.set(state.goods_info, 'goods_head_name', new_goods_info.goods_head_name);
            Vue.set(state.goods_info, 'goods_sales_volume', new_goods_info.goods_sales_volume);
            Vue.set(state.goods_info, 'is_promote', new_goods_info.is_promote);
            Vue.set(state.goods_info, 'promote_number', new_goods_info.promote_number);
            Vue.set(state.goods_info, 'promote_start_date', new_goods_info.promote_start_date);
            Vue.set(state.goods_info, 'promote_end_date', new_goods_info.promote_end_date);
            state.goods_info.goods_gallery.push(new_goods_info.goods_img);
        },
        /**
         * 初始化商品Sku
         * @param state
         * @param new_goods_info
         */
        initGoodsSkuOptions(state, new_goods_info) {
            state.goods_sku_options = [];
            if (new_goods_info !== "" && new_goods_info !== null) {
                new_goods_info.attribute.forEach((item) => {
                    let attribute_name = item.attribute_name;
                    let attribute_value = [];
                    item.attribute_value.forEach((item2, i2) => {
                        attribute_value.push({name: item2, xz_flag: i2 === 0 ? true : false})
                    });
                    console.log(attribute_value);
                    state.goods_sku_options.push({attribute_name: attribute_name, attribute_value: attribute_value});
                })
            }
            console.log(state.goods_sku_options);
        },
        /**
         * 切换商品属性
         * @param state
         * @param key
         */
        updGoodsSkuAttr(state, key) {
            if (state.goods_sku_options.length > 0) {
                //遍历对应goods_sku,将所有xz_flag赋值为false
                state.goods_sku_options[key.key1].attribute_value.forEach((item2, i2) => {
                    Vue.set(state.goods_sku_options[key.key1].attribute_value[i2], 'xz_flag', false)
                });
                //赋值对应xz_flag为true
                Vue.set(state.goods_sku_options[key.key1].attribute_value[key.key2], 'xz_flag', true);
                let goods_sku_ = state.goods_sku_options;
                state.goods_sku_options = [];
                state.goods_sku_options = goods_sku_;
                //更新goods_info
                this.dispatch('updGoodsInfo');
            }
        },
        /**
         * 切换商品数量
         * @param state
         * @param number
         */
        updGoodsSkuNumber(state, number) {
            let data = {};
            data.goods_number = parseInt(number);
            let obj = Object.assign({}, state.goods_info, data);
            state.goods_info = {};
            state.goods_info = obj;
            //更新goods_info
            this.dispatch('updGoodsInfo');
        },
        /**
         * 添加购物车
         * @param state
         * @param goods_info
         */
        addCart(state, goods_info) {
            let data = JSON.parse(JSON.stringify(state.carts));
            // 假设 在购物车中，没有找到对应的商品
            let flag = false;
            /* 购物车初始化*/
            goods_info.cart_is = true;//购物车有效
            goods_info.selected = true;//购物车被选中
            data.some(item => {
                if (item.goods_id === goods_info.goods_id && item.sku_id === goods_info.sku_id) {
                    item.goods_number = parseInt(item.goods_number) + parseInt(goods_info.goods_number);
                    flag = true;
                    return true
                }
            });

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                data.unshift(goods_info)
            }
            //假设数量检测通过
            let check_flag = true;
            //检查购物商品数量是否大于商品库存符合标准
            data.forEach(item => {
                if (item.goods_number > item.goods_stock) {
                    check_flag = false;
                }
            });


            if (check_flag) {
                state.carts = JSON.parse(JSON.stringify(data));
                //更新购物车价格
                state.carts_selected = [];
                state.carts.forEach(item => {
                    Vue.set(item, 'goods_price', (item.goods_number * item.one_goods_price).toFixed(2));
                    //遍历购物车，push到carts_selected中
                    if (item.selected) {
                        delete item.goods_desc;
                        delete item.goods_gallery;
                        delete item.goods_sku_list;
                        state.carts_selected.push(item);
                    }
                });
                // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
                localStorage.setItem('carts', JSON.stringify(state.carts));
                // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
                localStorage.setItem('carts', JSON.stringify(state.carts));
                Notice.success({
                    title: '已帮您将商品加入购物车',
                });
            } else {
                Notice.error({
                    title: '哎呀，库存不足了',
                });
            }
            return check_flag;
        },

        /**
         * 更新购物车
         * @param state
         * @param item
         */
        updCart(state, goods_info) {
            //更新购物车
            let data = JSON.parse(JSON.stringify(state.carts));
            data.forEach((item3, i3) => {
                if (item3.goods_id === goods_info.goods_id && item3.sku_id === goods_info.sku_id) {
                    data[i3].cart_is = goods_info.cart_is;
                    data[i3].goods_stock = parseInt(goods_info.goods_stock);
                    data[i3].goods_name = goods_info.goods_name;
                    data[i3].attr_desc = goods_info.attr_desc;
                    data[i3].give_integral = goods_info.give_integral;
                    data[i3].integral = goods_info.integral;
                    data[i3].one_give_integral = goods_info.one_give_integral;
                    data[i3].one_integral = goods_info.one_integral;
                    data[i3].goods_price = goods_info.goods_price;
                    data[i3].one_goods_price = goods_info.one_goods_price;
                }
            });
            state.carts = JSON.parse(JSON.stringify(data));
            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },

        /**
         * 更新购物车数量
         * @param state
         */
        updCartNumber(state, cart_info) {

            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.sku_id === cart_info.sku_id));
            Vue.set(state.carts[index], 'goods_number', cart_info.goods_number);
            //更新购物车价格,积分
            state.carts.forEach(item => {
                Vue.set(item, 'goods_price', (item.goods_number * item.one_goods_price).toFixed(2));
                Vue.set(item, 'give_integral', (item.goods_number * item.one_give_integral));
                Vue.set(item, 'integral', (item.goods_number * item.one_integral));
            });

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });
            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },

        /**
         * 删除购物车
         * @param state
         * @param cart_info
         */
        delCart(state, cart_info) {

            state.carts.splice(state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.sku_id === cart_info.sku_id), 1);

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            })

        },

        /**
         * 切换购物车选中状态
         * @param state
         * @param cart_info
         */
        updCartSelected(state, cart_info) {
            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.sku_id === cart_info.sku_id));
            cart_info.selected = !cart_info.selected;
            state.carts[index].selected = cart_info.selected;

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

        },

        /**
         * 开启购物车选中状态
         * @param state
         * @param cart_info
         */
        openCartSelected(state, cart_info) {
            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.sku_id === cart_info.sku_id));
            cart_info.selected = true;
            state.carts[index].selected = cart_info.selected;

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

        },


    },
    actions: {
        /**
         * 更新商品信息
         * @param context
         */
        updGoodsInfo(context) {
            /*拼接选中sku_desc*/
            let sku_desc_array = [];
            context.state.goods_sku_options.forEach(item => {
                item.attribute_value.forEach(item2 => {
                    if (item2.xz_flag) {
                        sku_desc_array.push(item2.name);
                    }
                })
            });
            let sku_desc = sku_desc_array.join(',');
            context.state.goods_info.goods_sku_list.forEach(item => {
                if (item.sku_desc === sku_desc) {
                    Vue.set(context.state.goods_info, 'one_goods_price', item.sku_shop_price);
                    Vue.set(context.state.goods_info, 'market_price', item.sku_market_price);
                    Vue.set(context.state.goods_info, 'goods_stock', item.sku_stock);
                    Vue.set(context.state.goods_info, 'goods_attribute_img', item.img_url);
                    Vue.set(context.state.goods_info, 'sku_id', item.sku_id);
                    Vue.set(context.state.goods_info, 'attr_desc', item.sku_desc);
                    Vue.set(context.state.goods_info, 'one_integral', item.integral);
                    Vue.set(context.state.goods_info, 'one_give_integral', item.give_integral);
                }
            });
            //商品价格
            Vue.set(context.state.goods_info, 'goods_price', parseFloat(context.state.goods_info.one_goods_price * context.state.goods_info.goods_number).toFixed(2));
            //获取积分
            Vue.set(context.state.goods_info, 'give_integral', parseInt(context.state.goods_info.one_give_integral * context.state.goods_info.goods_number));
            //使用积分
            Vue.set(context.state.goods_info, 'integral', parseInt(context.state.goods_info.one_integral * context.state.goods_info.goods_number));
            //积分描述
            Vue.set(context.state.goods_info, 'integral_desc', '购买可得' + parseInt(context.state.goods_info.give_integral) + context.state.integral_name);
        },

        /**
         * 获取收货地址
         * @param context
         * @param user_token
         * @returns {Promise<any>}
         */
        getAddressList(context, user_token) {
            return new Promise((resolve, reject) => {
                fetch('user_get_address', {user_token: user_token})
                    .then((msg) => {
                        //因为这里返回的msg可能为[]，所以不能用if(msg)
                        Vue.set(context.state, 'address_list', msg);
                        resolve(msg);
                    }).catch(() => {
                    reject();
                })
            });
        },

        /**
         * 获取用户信息
         * @param context
         * @param user_token
         * @returns {Promise<any>}
         */
        getUserInfo(context, user_token) {
            return new Promise((resolve, reject) => {
                fetch('user_get_user_info', {user_token: user_token})
                    .then((msg) => {
                        if (msg) {
                            Vue.set(context.state, 'user_info', msg);
                            resolve(msg);
                        }

                    }).catch(() => {
                    reject();
                })
            });
        },

        /**
         * 获取支付列表
         * @param context
         * @param user_token
         * @returns {Promise<any>}
         */
        getPaymentList(context, user_token) {
            return new Promise((resolve, reject) => {
                fetch('user_get_pay_list', {user_token: user_token})
                    .then((msg) => {
                        if (msg) {
                            resolve(msg);
                        }

                    }).catch(() => {
                    reject();
                })
            });
        },

        /**
         * 获取用户持有优惠券列表
         * @param context
         * @param user_token
         * @returns {Promise<any>}
         */
        getUserCouponList(context, user_token){
            return new Promise((resolve, reject) => {
                fetch('user_get_coupon_list', {user_token: user_token})
                    .then((msg) => {
                        if (msg) {
                            resolve(msg);
                        }

                    }).catch(() => {
                    reject();
                })
            });
        },

        getOrderList(context, user_token){
            return new Promise((resolve, reject) => {
                fetch('user_get_all_order', {user_token: user_token})
                    .then((msg) => {
                        resolve(msg);
                    }).catch(() => {
                    reject();
                })
            });
        }
    },
    getters: {
        getGoodsInfo(state) {
            return state.goods_info;
        },
        getGoodsSku(state) {
            return state.goods_sku_options;
        },
        /**
         * 返回购物车总数
         * @param state
         * @returns {number}
         */
        getCartsCount(state) {
            let c = 0;
            if (state.carts.length > 0) {
                state.carts.forEach(function () {
                    c++;
                });

            }
            return c
        },
        /**
         * 返回选中购物车总数
         * @param state
         * @returns {number}
         */
        getCartsSelectedCount(state) {
            let c = 0;
            if (state.carts_selected.length > 0) {
                state.carts_selected.forEach(function () {
                    c++;
                });
            }
            return c
        },

        /**
         * 返回选中商品总价
         * @param state
         * @returns {string}
         */
        getCartsSelectedPrice(state) {
            let c = 0;
            if (state.carts.length > 0) {
                state.carts.forEach(item => {
                    if (item.selected === true) {
                        c += parseFloat(item.goods_price);
                    }
                });
            }
            return parseFloat(c).toFixed(2);
        }
        /**
         * 返回选中商品
         * @param state
         * @returns {Array}
         */
        , getCartsSelected(state) {
            return state.carts_selected;
        },
        /* 返回用户token*/
        getToken(state) {
            if (state.user_token) {
                return state.user_token;
            } else {
                localStorage.setItem('beforeLoginUrl', router.app.$route.path);// 保存用户进入的url
                router.app.$router.push('/login');
            }
        },

        /**
         * 返回默认收货地址
         * @param state
         * @returns {string}
         */
        getDefaultAddress(state) {
            let result = null;
            if (state.address_list.length > 0) {
                state.address_list.forEach(item => {
                    if (item.is_default === 1) {
                        result = item;
                    }
                })
            }
            return result;
        },

        getAddressList(state) {
            return state.address_list;
        }

    }
})
