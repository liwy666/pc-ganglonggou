<template>
	<div class="evaluate-main">
		<div class="evaluate-card" v-for="(item) in evaluate_list" :key="item.midorder_id">
			<goodsCard
				:goods_name="item.goods_name"
				:goods_id="item.goods_id"
				:goods_sku_desc="item.sku_desc"
				:goods_price="item.mid_order_price"
				:goods_img="item.img_url"
				:to_goods="false"
				:goods_number="item.goods_number"
			/>
			<div class="floor">
				<Tag color="magenta" v-if="item.give_integral > 0">
					评价可得{{item.give_integral}}{{$store.state.integral_name}}
				</Tag>
				<Button type="primary" @click="toEvaluateForm(item)">前往评价</Button>
			</div>
		</div>
	</div>
</template>
<script>
    import goodsCard from '../../sub/horizontalGoodsCard'

    export default {
        data() {
            return {
                order_list: [],
            };
        },
        computed: {
            evaluate_list: {
                get: function () {
                    let result = [];
                    if (this.order_list.length > 0) {
                        this.order_list.forEach(item => {
                            item.mid_order.forEach(item2 => {
                                if (item.order_state === 4 && item2.is_evaluate === 0) {
                                    result.push(item2);
                                }
                            })
                        })
                    }
                    return result;
                }
            }
        },
        created() {
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                this.$store.dispatch('getOrderList', this.$store.getters.getToken)
                    .then((msg) => {
                        this.order_list = msg;
                    })
            },
            toEvaluateForm(goods_info) {
                let data = this.$router.resolve({
                    path: '/evaluateForm',
                    query: {
                        goods_info: JSON.stringify(goods_info)
                    }
                });
                window.open(data.href, '_blank')
            }
        },
        components: {
            goodsCard
        }
    };
</script>
<style lang="scss" scoped>
	.evaluate-main {
		background-color: white;
		padding: 15px;

		.evaluate-card {
			border: 1px solid rgba(0, 0, 0, .1);
			padding: 5px;

			.floor {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
</style>