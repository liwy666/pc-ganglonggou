<template>
	<div class="goods-sku-box">
		<div class="goods-sku-top">
			<div class="goods_price_sn">
				<p class="goods_sn">
					商品编号：{{this.goods_info.goods_sn}}
				</p>
				<p class="goods_sn">
					库存：{{this.goods_info.goods_stock}}
				</p>
			</div>
		</div>
		<div class="goods-sku-body">
			<div class="goods-sku-row" v-for="(item,i) in goods_sku" :key="i">
				<p class="goods-sku-row-title">{{item.attribute_name}}:</p>
				<div class="goods-sku-row-item-box">
					<Button :type="item2.xz_flag ? 'primary':'default'"
						v-for="(item2,i2) in item.attribute_value"
						:key="i2" @click="replAttr(i,i2)">{{item2.name}}
					</Button>
				</div>
			</div>
		</div>
		<div class="by-stages-body" v-show="goods_info.goods_price > 50">
			<p class="title">分期方式:</p>
			<div class="by-stages-row-box">
				<Button @click="switchByStages(1)"
					:type="goods_info.by_stages_number === 1  ? 'primary':'default'">不分期
				</Button>
				<Button @click="switchByStages(12)"
					:type="goods_info.by_stages_number === 12 ? 'primary':'default'">12期
				</Button>
				<Button @click="switchByStages(24)"
					:type="goods_info.by_stages_number === 24 ? 'primary':'default'">24期
				</Button>
			</div>
		</div>
		<div class="goods-number">
			<p class="title">数量：</p>
			<InputNumber v-model="goods_number" :max="goods_info.goods_stock"
				:min="1"
				@on-change="updGoodsNumber"/>
		</div>
		<div class="list">
			<Card>
				<p><i class="list-name">折扣：</i><i class="list-desc">{{this.list_info.by_stages_fee}}</i></p>
				<p><i class="list-name">分期方式：</i><i class="list-desc">{{this.list_info.by_stages_name}}</i></p>
				<p><i class="list-name">手续费：</i><i class="list-desc">无手续费</i></p>
				<p><i class="list-name">实际支付：</i><i class="list-desc">￥{{this.list_info.payment_price}}</i></p>
				<p v-show="goods_info.by_stages_number !== 1"><i class="list-name">每期本金：</i><i class="list-desc">￥{{this.list_info.by_stages_price}}</i>
				</p>
				<p class="remarks">*每期金额仅供参考，实际金额以支付页面为准*</p>
			</Card>
		</div>
		<div class="button-box" v-show="goods_info.goods_stock > 0">
			<Button icon="ios-cart" size="large" type="warning" @click="addCart(goods_info)">加入购物车</Button>
			<Button icon="ios-redo" size="large" type="error" @click="nowPay(goods_info)">立即购买</Button>
		</div>
		<div class="button-box">
			<Button long type="primary" icon="d-sync" disabled v-show="goods_info.goods_stock === 0">已售罄</Button>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                goods_number: 1,
                list_info: {
                    by_stages_name: '不分期',
                    payment_price: '计算中...',
                    by_stages_price: '计算中...',
                    by_stages_fee: '计算中...',
                },

            };
        },
        computed: {
            goods_sku: {
                get: function () {
                    return this.$store.getters.getGoodsSku
                }
            },
            goods_info: {
                get: function () {
                    return this.$store.getters.getGoodsInfo
                }
            }
        },
        created() {

        },
        watch: {
            'goods_info': {
                handler: function () {
                    switch (this.goods_info.by_stages_number) {
                        case 1 :
                            this.$set(this, 'list_info', {
                                by_stages_name: '不分期',
                                payment_price: parseFloat(this.goods_info.goods_price * 0.95).toFixed(2),
                                by_stages_price: parseFloat(this.goods_info.goods_price * 0.95).toFixed(2),
                                by_stages_fee: '9.5折',
                            });
                            break;
                        case 12 :
                            this.$set(this, 'list_info', {
                                by_stages_name: '12期',
                                payment_price: parseFloat(this.goods_info.goods_price * 0.97).toFixed(2),
                                by_stages_price: parseFloat((this.goods_info.goods_price * 0.97) / 12).toFixed(2),
                                by_stages_fee: '9.7折',
                            });
                            break;
                        case 24 :
                            this.$set(this, 'list_info', {
                                by_stages_name: '24期',
                                payment_price: parseFloat(this.goods_info.goods_price).toFixed(2),
                                by_stages_price: parseFloat(this.goods_info.goods_price / 24).toFixed(2),
                                by_stages_fee: '无折扣',
                            });
                            break;
                    }
                },
                immediate: true,
                deep: true
            },

        },
        methods: {
            /*切换属性*/
            replAttr(key1, key2) {
                let key = {key1: key1, key2: key2};
                this.$store.commit("updGoodsSkuAttr", key);
            },
            switchByStages(number) {
                this.$set(this.$store.state.goods_info, 'by_stages_number', number);
            },
            /*切换数量*/
            updGoodsNumber(number) {
                this.$store.commit("updGoodsSkuNumber", number);
            }
            /*添加购物车*/
            , addCart(goods_info) {
                this.$store.commit('addCart', goods_info);
            }
            /*立即购买*/
            , nowPay(goods_info) {
                //     清空已选中列表
                this.$set(this.$store.state, 'carts_selected', []);
                //    把选中开关全部关闭
                this.$store.state.carts.forEach(item => {
                    item.selected = false;
                });
                //    添加当前商品到购物车
                this.$store.commit('addCart', goods_info);
                //更新购物车数量
                this.$store.commit("updCartNumber", goods_info);
                //打开此件商品开关
                this.$store.commit("openCartSelected", goods_info);
                //    跳转提交页面
                this.$router.push('/writeOrder');
            }
        },
    };
</script>
<style lang="scss" scoped>
	.goods-sku-box {
		.goods-sku-top {
			.goods_price_sn {
				display: flex;
				color: #6e6568;
				justify-content: flex-start;
				margin-top: 5px;

				p {
					margin-right: 30px;
				}
			}
		}

		.title {
			color: #444444;
			font-size: 14px;
			font-weight: 400;
			margin-bottom: 5px;
		}

		.goods-sku-body {
			.goods-sku-row {
				margin-top: 10px;

				.goods-sku-row-title {
					color: #444444;
					font-size: 14px;
					font-weight: 400;
					margin-bottom: 5px;
				}

				.goods-sku-row-item-box {
					button {
						margin-right: 5px;
						margin-bottom: 5px;
					}
				}
			}
		}

		.goods-number {
			display: flex;
			align-items: center;
			margin-top: 5px;

			p {
				margin-right: 15px;
			}
		}

		.by-stages-body {
			margin-top: 5px;

			.by-stages-row-box {
				button {
					margin-right: 5px;
					margin-bottom: 5px;
				}
			}
		}

		.list {
			margin-top: 5px;

			i {
				font-style: normal;
				font-size: 12px;
				color: #444444;
				transition: all 0.5s ease;
			}

			.remarks {
				color: #6e6568;
				font-size: 10px;
			}
		}

		.button-box {
			margin-top: 10px;

			button {
				margin-right: 10px;
			}
		}
	}
</style>