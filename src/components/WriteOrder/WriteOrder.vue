<template>
	<div class="write-order-mani">
		<div class="base-middle base">
			<Collapse v-model="collapse_value">
				<Panel name="address-box">
					收货地址
					<div class="address-box" v-if="!address_load_flag" slot="content">
						<addressList :address_list="address_list" :dom_load.sync="address_dom_load_flag"></addressList>
					</div>
				</Panel>
				<Panel name="payment-box">
					付款方式
					<div class="payment-box" v-if="!payment_load_flag" slot="content">
						<switchPayment :payment_list="payment_list" ref="switchPayment"
							:dom_load.sync="payment_dom_load_flag"></switchPayment>
					</div>
				</Panel>
				<Panel name="goods-list-box">
					商品列表
					<div class="goods-list-box" slot="content">
						<goodsList :goods_list="goods_list"></goodsList>
					</div>
				</Panel>
				<Panel name="invoice-box">
					发票填写
					<div class="invoice-box" slot="content">
						<invoice ref="invoice" :dom_load.sync="invoice_dom_load_flag"></invoice>
					</div>
				</Panel>
				<Panel name="coupon-box">
					优惠券
					<div class="coupon-box" v-if="!coupon_load_flag" slot="content">
						<switchCoupon :coupon_list="coupon_list" ref="switchCoupon"
							:dom_load.sync="coupon_dom_load_flag"></switchCoupon>
					</div>
				</Panel>
				<!--积分-->
				<Panel name="integral-box">
					{{this.integral_title}}
					<div class="integral-box" v-if="!coupon_load_flag" slot="content">
						<useIntegral :goods_list="goods_list" :title.sync="integral_title"
							ref="useIntegral" :dom_load.sync="integral_dom_load_flag"></useIntegral>
					</div>
				</Panel>
			</Collapse>
			<!--价格清单-->
			<div class="order-price-list" v-if="!dom_load_flag">
				<p>订单总金额：<span>￥{{this.odl_order_price}}</span></p>
				<p>使用优惠券减免：<span>-￥{{this.coupon_price}}</span></p>
				<p>使用积分减免：<span>-￥{{this.integral_price}}</span></p>
				<p>支付方式减免：<span>-￥{{this.pay_price}}</span></p>
			</div>
			<!--按钮-->
			<div class="button-box" v-if="!dom_load_flag">
				<div class="button-box-l">总计：<span>￥</span>{{this.order_price}}</div>
				<div class="button-box-r">
					<Button type="error" size="large" @click="put_order">提交订单</Button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import addressList from '../sub/addressList'
    import switchPayment from './sub/switchPayment'
    import invoice from './sub/invoice'
    import switchCoupon from './sub/switchCoupon'
    import goodsList from './sub/goodsList'
    import useIntegral from './sub/useIntegral'

    export default {
        data() {
            return {
                user_token: '',
                address_load_flag: true,
                address_dom_load_flag: true,
                payment_load_flag: true,
                payment_dom_load_flag: true,
                coupon_load_flag: true,
                coupon_dom_load_flag: true,
                invoice_dom_load_flag: true,
                integral_dom_load_flag: true,
                user_load_flag: true,
                show_address_list: false,
                payment_list: [],
                coupon_list: [],
                user_info: null,
                collapse_value: ['address-box', 'payment-box', 'goods-list-box'],
                goods_list: this.$store.getters.getCartsSelected,
                integral_title: '',
            };
        },
        computed: {
            address_list: {
                get: function () {
                    return this.$store.getters.getAddressList;
                }
            },
            dom_load_flag: {
                get: function () {
                    if (!this.address_dom_load_flag
                        && !this.payment_dom_load_flag
                        && !this.coupon_dom_load_flag
                        && !this.integral_dom_load_flag
                        && !this.invoice_dom_load_flag) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            use_coupon_id: {
                get: function () {
                    if (!this.dom_load_flag) {
                        return this.$refs.switchCoupon.coupon_id;
                    } else {
                        return 0;
                    }

                }
            },
            use_pay_id: {
                get: function () {
                    if (!this.dom_load_flag) {
                        return this.$refs.switchPayment.payment_option_value[0];
                    } else {
                        return 0;
                    }

                }
            },
            use_bystages_id: {
                get: function () {
                    if (!this.dom_load_flag) {
                        return this.$refs.switchPayment.payment_option_value[1];
                    } else {
                        return 0;
                    }

                }
            },
            use_integral_number: {
                get: function () {
                    if (!this.dom_load_flag) {
                        return this.$refs.useIntegral.use_integral_number;
                    } else {
                        return 0;
                    }

                }
            },
            invoice_info: {
                get: function () {
                    let result = {};
                    if (!this.dom_load_flag) {
                        let refs_invoice = this.$refs.invoice;
                        result.invoice_type = refs_invoice.invoice_list[refs_invoice.idl_switch_index.invoice_type_index].name;
                        if (refs_invoice.invoice_list[refs_invoice.idl_switch_index.invoice_type_index].list.length > 0) {
                            result.invoice_head = refs_invoice.invoice_list[refs_invoice.idl_switch_index.invoice_type_index].list[refs_invoice.idl_switch_index.invoice_head_index[refs_invoice.idl_switch_index.invoice_type_index]].name;
                        } else {
                            result.invoice_head = "";
                        }
                        result.invoice_phone = refs_invoice.invoice_phone;
                        result.invoice_qymc = refs_invoice.invoice_qymc;
                        result.invoice_nsrsbh = refs_invoice.invoice_nsrsbh;
                        result.invoice_kpdz = refs_invoice.invoice_kpdz;
                        result.invoice_zj = refs_invoice.invoice_zj;
                        result.invoice_khh = refs_invoice.invoice_khh;
                        result.invoice_yhzh = refs_invoice.invoice_yhzh;
                    }

                    return result;
                }
            },
            odl_order_price: {
                get: function () {
                    return this.$store.getters.getCartsSelectedPrice;
                }

            },
            coupon_price: {
                get: function () {
                    let reslut = 0;
                    if (this.use_coupon_id !== 0) {
                        this.coupon_list.forEach(item => {
                            if (item.coupon_id === this.use_coupon_id) {
                                reslut = item.cut_sum;
                            }
                        })
                    }
                    return parseFloat(reslut).toFixed(2);
                }
            },
            integral_price: {
                get: function () {
                    return parseFloat(parseInt(this.use_integral_number) / 100).toFixed(2);
                }
            },
            pay_price: {
                get: function () {
                    let bystages_fee = 1;
                    this.payment_list.forEach(item => {
                        if (item.pay_id === this.use_pay_id) {
                            item.ByStages.forEach(item2 => {
                                if (item2.bystages_id === this.use_bystages_id) {
                                    bystages_fee = parseFloat(item2.bystages_fee);
                                }
                            })
                        }
                    });
                    return ((parseFloat(this.odl_order_price)
                        - (parseFloat(this.coupon_price)
                            + parseFloat(this.integral_price)))
                        - ((parseFloat(this.odl_order_price)
                            - (parseFloat(this.coupon_price)
                                + parseFloat(this.integral_price)))
                            * bystages_fee)).toFixed(2);
                }
            },
            order_price: {
                get: function () {
                    return parseFloat(parseFloat(this.odl_order_price) - (parseFloat(this.coupon_price) + parseFloat(this.integral_price) + parseFloat(this.pay_price))).toFixed(2);
                }
            }

        },
        created() {
            this.user_token = this.$store.getters.getToken;
            this.getAddress();
            this.getPayment();
            this.getCoupon();
            this.getUserInfo();
        },
        methods: {
            showAddAddress() {

            },
            getAddress() {
                this.$store.dispatch('getAddressList', this.user_token)
                    .then(() => {
                        this.address_load_flag = false;
                    })
            },
            getPayment() {
                this.$store.dispatch('getPaymentList', this.user_token)
                    .then((msg) => {
                        this.payment_load_flag = false;
                        this.payment_list = msg;
                    })
            },
            getCoupon() {
                this.$store.dispatch('getUserCouponList', this.user_token)
                    .then((msg) => {
                        this.coupon_load_flag = false;
                        this.coupon_list = msg;
                    })
            },
            getUserInfo() {
                this.$store.dispatch('getUserInfo', this.$store.state.user_token)
                    .then((msg) => {
                        this.user_load_flag = false;
                        let key = 'gl_user_info_' + this.$MyCommon.dateFtt('yyyy_MM_dd', new Date());
                        localStorage.setItem(key, JSON.stringify(msg));
                        this.user_info = msg;
                    });
            },
            put_order() {
                if (this.goods_list.length < 1) {
                    this.$Notice.error({
                        title: '暂无法提交该订单，请稍后再试。或您已提交过订单，请前往个人中心查看'
                    });
                    return false;
                }
                if (this.address_list.length < 1) {
                    this.$Notice.error({
                        title: '您需要添加一个收货地址'
                    });
                    return false;
                }
                if (parseInt(this.order_price) <= 50 && this.use_bystages_id.toString().indexOf('00') === -1) {
                    this.$Notice.error({
                        title: '分期付款，需要订单金额大于50'
                    });
                    return false;
                }
				let post_info={
                    user_token: this.user_token,
                    pay_id: this.use_pay_id,
                    bystages_id: this.use_bystages_id,
                    coupon_id: this.use_coupon_id,
                    invoice_info: this.invoice_info,
                    use_integral_number:this.use_integral_number,
                    goods_list: this.goods_list
				};
                this.$Spin.show();
                this.$post('user_submit_order',post_info)
                    .then((msg)=>{
                        if(msg){
                            //删除购物车
                            this.goods_list.forEach(item => {
                                this.$store.commit('delCart', item);
                            });
                            //刷新用户信息
                            let key = 'gl_user_info_' + this.$MyCommon.dateFtt('yyyy_MM_dd', new Date());
                            this.$store.dispatch("getUserInfo", this.$store.getters.getToken)
                                .then((user_info) => {
                                    localStorage.setItem(key, JSON.stringify(user_info));
                                });
                            this.$Notice.success({
                                title: '提交订单成功'
                            });
                            //导航到订单查看
                            this.$router.push('/seeOrder/' + msg);
						}else {
                            this.$Notice.error({
                                title: '提交订单失败'
                            });
						}
                        this.$Spin.hide();
                    })

            }
        },
        components: {
            addressList,
            switchPayment,
            invoice,
            switchCoupon,
            goodsList,
            useIntegral
        }
    };
</script>
<style lang="scss" scoped>
	.write-order-mani {
		.base {
			margin-top: 20px;
			padding: 15px;
			border: 1px red solid;

			.title {
				font-size: 16px;
				font-weight: 600;
				padding: 15px;
				margin-top: 10px;
			}

			.address-box {
				width: 980px;
				height: 200px;
				overflow-y: auto;
				background-color: white;
			}

			.invoice-box {
				background-color: white;
			}

			.payment-box {
				padding: 15px;
				background-color: white;
			}

			.coupon-box {
				background-color: white;
				padding: 5px;
				height: 200px;
				overflow-y: auto;
			}

			.goods-list-box {
				background-color: white;
			}

			.order-price-list {
				background-color: white;
				margin-top: 10px;
				padding: 15px;

				p {
					margin-bottom: 5px;

					span {
						color: #cc0001;
					}
				}
			}

			.button-box {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-top: 10px;

				.button-box-l {
					color: red;
					font-size: 18px;
					font-weight: 600;
					margin-right: 15px;

					span {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>