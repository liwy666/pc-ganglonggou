<template>
	<div class="order-list-main">
		<div class="base">
			<Tabs v-model="tab_name">
				<TabPane name="all" label="全部" icon="ios-albums-outline">
					<div class="order-list-box">
						<orderCard v-for="(item) in all" :key="item.order_sn" :order_info="item"></orderCard>
						<p v-if="all.length<1">
							暂无可用订单
						</p>
					</div>
				</TabPane>
				<TabPane name="wait_pay" label="待付款" icon="logo-yen">
					<div class="order-list-box">
						<orderCard v-for="(item) in wait_pay" :key="item.order_sn" :order_info="item"></orderCard>
						<p v-if="wait_pay.length<1">
							暂无可用订单
						</p>
					</div>
				</TabPane>
				<TabPane name="wait_sign" label="待收货" icon="md-thumbs-up">
					<div class="order-list-box">
						<orderCard v-for="(item) in wait_sign" :key="item.order_sn" :order_info="item"></orderCard>
						<p v-if="wait_sign.length<1">
							暂无可用订单
						</p>
					</div>
				</TabPane>
				<TabPane name="after_sale" label="退货/售后" icon="md-star">
					<div class="order-list-box">
						<orderCard v-for="(item) in after_sale" :key="item.order_sn" :order_info="item"></orderCard>
						<p v-if="after_sale.length<1">
							暂无可用订单
						</p>
					</div>
				</TabPane>
			</Tabs>
		</div>
	</div>
</template>
<script>
    import orderCard from './sub/orderCard'

    export default {
        data() {
            return {
                order_list: [],
                wait_pay: [],
                all: [],
                wait_sign: [],
                after_sale: [],
                tab_name: 'all',
            };
        },
        computed: {},
        created() {
            this.getOrderList();
        },
        methods: {

            /**
             * 时间字符串转时间戳
             * @param date_str
             * @returns {number}
             */
            dateStringConvert(date_str) {
                date_str = date_str.substring(0, 19);
                date_str = date_str.replace(/-/g, '/');
                return parseInt(new Date(date_str).getTime());
            },
            /**
             * 筛选订单
             * @param order_list
             * @param type_name
             * @returns {Array}
             */
            filterOrderList() {
                let order_list = this.order_list;
                //进行冒泡排序
                if (order_list.length > 0) {
                    for (let i = 0; i < order_list.length - 1; i++) {
                        for (let j = 0; j < order_list.length - i - 1; j++) {
                            if (this.dateStringConvert(order_list[j].upd_time) < this.dateStringConvert(order_list[j + 1].upd_time)) {
                                let max = order_list[j];
                                order_list[j] = order_list[j + 1];
                                order_list[j + 1] = max;
                            }
                        }
                    }
                }
                order_list.forEach(item => {
                    this.all.push(item);
                    if (item.order_state === 1) {
                        this.wait_pay.push(item);
                    } else if (item.order_state >= 2 && item.order_state <= 3) {
                        this.wait_sign.push(item);
                    } else if (item.order_state >= 6) {
                        this.after_sale.push(item);
                    }
                });
            },
            getOrderList() {
                this.$store.dispatch('getOrderList', this.$store.getters.getToken)
                    .then((msg) => {
                        this.order_list = msg;
                        this.filterOrderList();
                    })
            },
        },
        components: {
            orderCard,
        }
    };
</script>
<style lang="scss" scoped>
	.order-list-main{
		.base{
			min-height: 500px;
			background-color: white;
		}
	}
</style>