<template>
	<div class="coupon-list-main">
		<div class="random-goods-list">
			<verticalRecommendGoods></verticalRecommendGoods>
		</div>
		<div class="base-middle base">
			<div class="coupon-list-box" v-if="coupon_list">
				<couponCard v-for="item in coupon_list"
					:key="item.coupon_id"
					:coupon_info="item"
					allow_get
					view_number
				/>
			</div>
			<div class="not-coupon" v-else>
				还没有优惠券开始发放，看看别的吧！
			</div>
		</div>
	</div>
</template>
<script>
    import couponCard from '../sub/couponCard'
    import verticalRecommendGoods from '../sub/verticalRecommendGoods'
    export default {
        data() {
            return {
                coupon_list: null
            };
        },
        computed: {},
        created() {
            this.getCoupon();
        },
        methods: {
            getCoupon() {
                this.$Spin.show();
                this.$fetch('user_get_all_coupon_list', {
                    into_type: this.$store.state.into_type,
                })
                    .then((msg) => {
                        if (msg) {
                            this.coupon_list = msg;
                        }
                        this.$Spin.hide();
                    })
            }
        },
        components: {
            couponCard,
            verticalRecommendGoods,
        }
    };
</script>
<style lang="scss" scoped>
	.coupon-list-main{
		display: flex;
		justify-content: center;
		margin-top: 15px;
		.base {
			min-height: 500px;
			background-color: white;
			margin: 0;
			.coupon-list-box{
				padding-top: 15px;
			}
			.not-coupon {
				height: 500px;
				line-height: 500px;
				text-align: center;
				font-size: 18px;
			}
		}
		.random-goods-list{
			background-color: white;
			margin-right: 10px;
		}
	}

</style>