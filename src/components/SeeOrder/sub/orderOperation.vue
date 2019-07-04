<template>
	<div class="order-operation-main">
		<Button round v-if="order_info.order_state === 1" type="warning" @click="callOrder">取消订单</Button>
		<Button round v-if="order_info.order_state === 0" type="warning" @click="delOrder">删除订单</Button>
		<Button round v-if="order_info.order_state === 1" type="error" @click="goPay">立即支付</Button>
		<Button round v-if="order_info.order_state === 3" type="error" @click="takeOrder">确认收货</Button>
		<Button round v-if="order_info.order_state === 6" type="error" @click="callService">取消申请</Button>
		<Button round v-if="order_info.order_state === 4 ||order_info.order_state === 2" type="warning"
			@click="$router.push('/afterSale/'+order_info.order_sn)">申请售后
		</Button>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            order_info: Object
        },
        computed: {},
        created() {

        },
        methods: {
            /*立即支付*/
            goPay() {
                let success_url = encodeURIComponent(this.$store.state.local_url + "#/home");
                let back_url = encodeURIComponent(window.location.href);
                switch (this.order_info.son_into_type) {
                    case 'wx':
                        this.$Notice.warning({
                            title: '请至微信公众号岗隆购,支付该订单'
                        });
                        break;
                    case 'pc':
                        window.location.href = this.$store.state.api_url + "/api/v1/payment/user_order_payment?success_url=" + success_url
                            + "&back_url=" + back_url
                            + "&order_sn=" + this.order_info.order_sn
                            + "&user_token=" + this.$store.getters.getToken;
                        break;
                }
            },
            /*取消售后*/
            callService() {
                this.$Spin.show();
                this.$post('user_call_after_sale', {
                    user_token: this.$store.getters.getToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        this.$Spin.hide();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$Notice.error({
                                title: '取消售后申请失败'
                            });
                        }

                    })
            },
            /*取消订单*/
            callOrder() {
                this.$Spin.show();
                this.$post('user_call_order', {
                    user_token: this.$store.getters.getToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        this.$Spin.hide();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$Notice.error({
                                title: '取消订单失败'
                            });
                        }

                    })
            },
            /*删除订单*/
            delOrder() {
                this.$Spin.show();
                this.$post('user_del_order', {
                    user_token: this.$store.getters.getToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        this.$Spin.hide();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$Notice.error({
                                title: '删除订单失败'
                            });
                        }

                    })
            },
            /*签收订单*/
            takeOrder() {
                this.$Spin.show();
                this.$post('user_take_order', {
                    user_token: this.$store.getters.getToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        this.$Spin.hide();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$Notice.error({
                                title: '签收订单失败'
                            });
                        }

                    })
            }
        },
    };
</script>
<style lang="scss" scoped>
	.order-operation-main {
		background-color: white;
		height: 40px;
		margin-top: 5px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border: 1px solid rgba(0, 0, 0, .1);

		button {
			margin-left: 10px;
		}
	}
</style>