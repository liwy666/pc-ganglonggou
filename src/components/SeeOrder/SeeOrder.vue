<template>
	<div class="see-order-main">
		<div class="base-middle base">
			<!--支付倒计时-->
			<countDown :end_time="order_info.invalid_pay_time"
				v-if="(new Date()).getTime() <= (order_info.invalid_pay_time)*1000 && order_info.order_state === 1"
				title="等待付款，超出时效订单将自动关闭">>
			</countDown>
			<Collapse v-model="collapse_value">
				<Panel name="address-box">
					收货地址
					<div class="address-box" v-if="load_flag" slot="content">
						<p>收件人：{{this.order_info.logistics_name}}</p>
						<p>地址：{{this.order_info.logistics_address}}</p>
						<p>收件人电话：{{this.order_info.logistics_tel}}</p>
					</div>
				</Panel>
				<Panel name="goods-list-box">
					商品列表
					<div class="goods-list-box" v-if="load_flag" slot="content">
						<goodsCard
							v-for="(item ,i) in order_info.mid_order"
							:key="i"
							:goods_img="item.img_url"
							:goods_name="item.goods_name"
							:goods_number="item.goods_number"
							:goods_price="item.mid_order_price"
							:goods_sku_desc="item.sku_desc"
							:goods_id="item.goods_id"
						/>
					</div>
				</Panel>
				<Panel name="order-info">
					订单详情
					<div class="order-info" v-if="load_flag" slot="content">
						<Row>
							<Col span="12"><p class="list-name">订单编号：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.order_sn}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">订单状态：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.order_state_name}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">支付方式：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.pay_name +
								this.order_info.bystages_val}}</p>
							</Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">下单时间：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.create_time}}</p></Col>
						</Row>
						<Row v-if="order_info.pay_time != null">
							<Col span="12"><p class="list-name">支付时间：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.pay_time}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">最后操作时间：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.upd_time}}</p></Col>
						</Row>
						<Row v-if="this.order_info.order_visible_note !=null">
							<Col span="6"><p class="list-name">商家提醒：</p></Col>
							<Col span="18"><p class="list-price">{{this.order_info.order_visible_note}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">发票类型：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_type}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_head != null">
							<Col span="12"><p class="list-name">发票抬头：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_head}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_phone != null">
							<Col span="12"><p class="list-name">手机号：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_phone}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_nsrsbh != null">
							<Col span="12"><p class="list-name">税号：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_nsrsbh}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_qymc != null">
							<Col span="12"><p class="list-name">企业名称：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_qymc}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_kpdz != null">
							<Col span="12"><p class="list-name">开票地址：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_kpdz}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_khh != null">
							<Col span="12"><p class="list-name">开户行：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_khh}}</p></Col>
						</Row>
						<Row v-if="order_info.invoice.invoice_yhzh != null">
							<Col span="12"><p class="list-name">银行账号：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invoice.invoice_yhzh}}</p></Col>
						</Row>
					</div>
				</Panel>
				<Panel name="logistics">
					物流详情
					<div class="logistics-info" slot="content" v-if="load_flag &&parseInt(order_info.order_state) >= 3">
						<Row>
							<Col span="12"><p class="list-name">快递类型：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.logistics_code_name}}</p></Col>
						</Row>
						<Row>
							<Col span="6"><p class="list-name">快递单号：</p></Col>
							<Col span="18">
								<p class="list-price"><span class="sn">{{this.order_info.logistics_sn}}</span>
									<Button  @click="viewLogistics">查看</Button>
								</p>
							</Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">发货时间：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.deliver_goods_time}}</p></Col>
						</Row>
						<Row v-if="this.order_info.invalid_sign_goods_time !=null">
							<Col span="12"><p class="list-name">签收时间：</p></Col>
							<Col span="12"><p class="list-price">{{this.order_info.invalid_sign_goods_time}}</p></Col>
						</Row>
					</div>
				</Panel>
				<Panel name="cost-info">
					费用详情
					<div class="cost-info" v-if="load_flag" slot="content">
						<Row>
							<Col span="12"><p class="list-name">订单总金额：</p></Col>
							<Col span="12"><p class="list-price">￥{{this.order_info.original_order_price == null ?
								this.order_info.order_price : this.order_info.original_order_price}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">使用优惠券减免：</p></Col>
							<Col span="12"><p class="list-price">-￥{{this.coupon_price}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">使用积分减免：</p></Col>
							<Col span="12"><p class="list-price">-￥{{this.integral_price}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">支付方式减免：</p></Col>
							<Col span="12"><p class="list-price">-￥{{this.pay_price}}</p></Col>
						</Row>
						<Row>
							<Col span="12"><p class="list-name">结算金额：</p></Col>
							<Col span="12"><p class="list-price" style="color: red;font-weight: bold">
								￥{{this.order_info.order_price}}</p>
							</Col>
						</Row>
					</div>
				</Panel>
			</Collapse>
			<orderOperation :order_info="order_info" v-if="load_flag"></orderOperation>
		</div>
	</div>
</template>
<script>
    import countDown from '../sub/countDown'
    import goodsCard from '../sub/horizontalGoodsCard'
    import orderOperation from './sub/orderOperation'

    export default {
        data() {
            return {
                order_sn: "",
                order_info: {},
                load_flag: false,
                collapse_value: ['address-box', 'goods-list-box', 'order-info', 'logistics', 'cost-info'],
            };
        },
        computed: {
            coupon_price: {
                get: function () {
                    return parseFloat(this.order_info.original_order_price - this.order_info.after_using_coupon_price).toFixed(2);
                }
            },
            integral_price: {
                get: function () {
                    return parseFloat(this.order_info.after_using_coupon_price - this.order_info.after_using_integral_price).toFixed(2);
                }
            },
            pay_price: {
                get: function () {
                    return parseFloat(this.order_info.after_using_integral_price - this.order_info.after_using_pay_price).toFixed(2);
                }
            },
        },
        created() {
            this.order_sn = this.$route.params.order_sn;
            this.getOrderInfo();
        },
        methods: {
            getOrderInfo() {
                this.$Spin.show();
                this.$fetch('user_get_one_order_info', {
                    user_token: this.$store.getters.getToken,
                    order_sn: this.order_sn
                })
                    .then((msg) => {
                        if (msg) {
                            this.order_info = msg;
                            this.load_flag = true;
                        }
                        this.$Spin.hide();
                    })
            },
            viewLogistics() {
                if(this.order_info.logistics_code === 'shunfeng'){
                    let url = 'https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/'+ this.order_info.logistics_sn;
                   window.open(url,'_blank')
                }else {
                    this.$notify('抱歉，暂不支持该物流的信息查看');
                }
            }
        },
        components: {
            countDown,
            goodsCard,
            orderOperation
        }
    };
</script>
<style lang="scss" scoped>
	.see-order-main {
		.base {
			margin-top: 10px;

			.order-info {

			}
		}
	}
</style>