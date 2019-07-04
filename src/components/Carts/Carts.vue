<template>
	<div class="carts-box">
		<div class="goods-list">
			<verticalRecommendGoods></verticalRecommendGoods>
		</div>
		<div class="base-middle">
			<oneCart v-for="(item,i) in this.carts_list" :key="i" :cart_info="item"></oneCart>
			<!--没有购物车时显示-->
			<div class="not-cart" v-if="carts_count<1">
				<Icon type="ios-basket-outline" size="38"/>
				购物车空空的哦~，去看看心仪的商品吧~
				<p>
					<Button type="primary" @click="$router.push('/goodsList')">去购物</Button>
				</p>
			</div>
			<div class="settle-accounts-box">
				<div class="settle-accounts-price">合计：<span>￥{{this.$store.getters.getCartsSelectedPrice}}</span></div>
				<div class="settle-accounts-button">
					<Button @click="goSettleAccounts" type="error">
						去结算（{{this.$store.getters.getCartsSelectedCount}}）
					</Button>
				</div>
			</div>
			<p style="height: 60px"></p>
			<div class="page-box" v-if="carts_count>0">
				<Page :total="carts_count" :current.sync="page" :page-size="limit"/>
			</div>
		</div>
	</div>
</template>
<script>
    import oneCart from './sub/oneCart'
    import verticalRecommendGoods from '../sub/verticalRecommendGoods'
    export default {
        data() {
            return {
                page: 1,
                limit: 5,//每次获取购物车个数
                carts_count: this.$store.getters.getCartsCount,
            };
        },
        watch: {
            'page': function () {
                this.checkCarts();
            }
        },
        computed: {
            carts_list: {
                get: function () {
                    let result = new Array();
                    let carts_ = this.$store.state.carts;
                    result = carts_.slice((this.page * this.limit) - this.limit, this.page * this.limit);
                    return result;
                }
            }
        },
        created() {
            this.checkCarts();
        },
        methods: {
            checkCarts() {
                let carts_ = this.$store.state.carts;
                let get_carts = carts_.slice((this.page * this.limit) - this.limit, this.page * this.limit);
                this.$post('user_get_cart'
                    , {carts: get_carts})
                    .then((msg) => {
                        msg.forEach(item => {
                            this.$store.commit("updCart", item);
                        });
                    })
            }
            , goSettleAccounts() {
                if (this.$store.getters.getCartsSelectedCount > 0) {
                    let idl_carts_selected = this.$store.getters.getCartsSelected;
                    let flag = true;
                    idl_carts_selected.forEach(item => {
                        if (item.cart_is === false) {
                            this.$Notice.error({
                                title: '选购商品中有失效产品',
                            });
                            flag = false;
                        }
                    });
                    if (flag) {
                        this.$router.push({path: '/writeOrder', query: {is_init: true}});
                    }
                } else {
                    this.$Notice.error({
                        title: '还未选中商品哦~~',
                    });
                }
            }
        },
        components: {
            oneCart,
            verticalRecommendGoods,
        }
    };
</script>
<style lang="scss" scoped>
	.carts-box {
		display: flex;
		justify-content: center;
		.goods-list{
			width: 200px;
			background-color: white;
			margin-right: 15px;
		}
		.base-middle {
			height: 1000px;
			background-color: white;
			padding-top: 20px;
			position: relative;
			margin: 0;
			.page-box {
				position: absolute;
				bottom: 5px;
			}

			.not-cart {
				text-align: center;
				margin-top: 80px;
				font-size: 24px;
			}
			.settle-accounts-box {
				height: 50px;
				background-color: #f0f0f0;
				width: 100%;
				display: flex;
				border: 1px solid #f0f0f0;
				justify-content: flex-end;
				margin-top: 25px;
				.settle-accounts-price {
					line-height: 50px;
					font-size: 16px;
					margin-right: 15px;
					span {
						font-weight: bold;
						color: #cc0001;
					}
				}

				.settle-accounts-button {
					button{
						height: 100%;
						font-size: 16px;
						font-weight: bolder;
					}
				}
			}
		}
	}
</style>