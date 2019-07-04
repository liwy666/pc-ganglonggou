<template>
	<div class="user-coupon-list-main">
		<couponCard v-for="item in coupon_list" :key="item.coupon_id" :view_number="false" :allow_get="false"
			:coupon_info="item"></couponCard>
	</div>
</template>
<script>
	import couponCard from '../../sub/couponCard'
    export default {
        data() {
            return {
                coupon_list:[]
			};
        },
        computed: {},
        created() {
			this.getCoupon();
        },
        methods: {
            getCoupon() {
                this.$store.dispatch('getUserCouponList', this.$store.getters.getToken)
                    .then((msg) => {
                        this.coupon_list = msg;
                    })
            },
		},
		components:{
            couponCard
		}
    };
</script>
<style lang="scss" scoped>
	.user-coupon-list-main{
		background-color: white;
		min-height: 400px;
		padding-top: 15px;
	}
</style>