<template>
	<div class="home-main">
		<div class="base-middle base">
			<Row>
				<Col span="8">
					<Menu theme="light" :active-name="active_name" @on-select="menuItemClick">
						<MenuItem name="order">我的订单</MenuItem>
						<MenuItem name="address">地址管理</MenuItem>
						<MenuItem name="coupon">持有优惠券</MenuItem>
						<MenuItem name="evaluate">待评价</MenuItem>
					</Menu>
				</Col>
				<Col span="16">
					<router-view/>
				</Col>
			</Row>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                active_name: 'order'
            };
        },
        computed: {},
        created() {

        },
        mounted() {
            this.$router.push('/home/orderList');
        },
        methods: {
            menuItemClick(active_name) {
                switch (active_name) {
                    case 'order':
                        this.$router.push('/home/orderList');
                        break;
                    case 'address':
                        this.$router.push('/home/addressList');
                        break;
                    case 'coupon':
                        this.$router.push('/home/userCouponList');
                        break;
                    case 'evaluate':
                        this.$router.push('/home/userEvaluate');
                        break;

                }
            }
        },
    };
</script>
<style lang="scss" scoped>
	.home-main {
		.ivu-menu {
			z-index: 0;
		}
	}
</style>