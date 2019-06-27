<template>
	<div class="login-main">
		<div class="base-middle base">
			<div class="left">
				<img :src="$store.state.img_url+ 'pc_login_left.png'" alt="">
			</div>
			<div class="right">
				<Card>
					<p slot="title" class="title">
						欢迎来到岗隆购
					</p>
					<p class="info">使用手机微信扫码登录</p>
					<div class="qr-code">
						<div class="shade" v-show="shade_flag" @click="startGetCode">
							<Icon type="ios-sync" size="80" color="white"/>
						</div>
						<qrcode-vue :value="qr_code_val" :size="200"></qrcode-vue>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>
<script>
    import QrcodeVue from 'qrcode.vue';

    export default {
        data() {
            return {
                shade_flag: true,
                qr_code_val: '',
                code: '',
                time_out_flag: null,
                interval_flag: null,
            };
        },
        computed: {},
        created() {
            this.startGetCode();
        },
        methods: {
            /*开始请求后台*/
            startGetCode() {
                this.$fetch('user_get_pc_login_code', {})
                    .then((msg) => {
                        if (msg) {
                            this.qr_code_val = this.$store.state.wx_login_url + '?gl_code=' + msg;
                            this.code = msg;
                            this.shade_flag = false;
                            if (this.time_out_flag) {
                                clearTimeout(this.time_out_flag);
                            }
                            this.getToken();
                            this.time_out_flag = setTimeout(() => {
                                this.shade_flag = true;
                            }, 180000)
                        }
                    });
            }
            /*轮询后端查看用户扫码情况*/
            , getToken() {
                if (this.interval_flag) {
                    clearInterval(this.interval_flag)
                }
                this.interval_flag = setInterval(() => {
                    if (!this.shade_flag) {
                        this.$fetch('pc_login_by_openid', {code: this.code})
                            .then((msg) => {
                                if (msg) {
                                    if (this.interval_flag) {
                                        clearInterval(this.interval_flag)
                                    }
                                    /*写入token*/
                                    let user_token_obj = {
                                        over_time: parseInt(new Date().getTime()) + this.$store.state.out_token_time,
                                        user_token: msg,
                                    };
                                    localStorage.setItem('user_token_obj', JSON.stringify(user_token_obj));
                                    this.$set(this.$store.state, 'user_token', msg);
                                    this.goBeforeLoginUrl();

                                }
                            });
                    } else {
                        clearInterval(this.interval_flag)
                    }
                }, 3000)
            },
            /*登录成功后跳转*/
            goBeforeLoginUrl() {
                let url = localStorage.getItem("beforeLoginUrl");
                if (!url || url.indexOf('/login') != -1) {
                    this.$router.push('/index')
                } else {
                    localStorage.setItem("beforeLoginUrl", "/index");
                    this.$router.push(url)
                }
            },
        },
        components: {
            QrcodeVue,
        }
    };
</script>
<style lang="scss" scoped>
	.login-main {
		.base {
			margin-top: 20px;
			display: flex;
			background-color: white;
			padding: 15px;

			.left {
				width: 500px;

				img {
					width: 100%;
				}
			}

			.right {
				width: 400px;
				margin-left: 15px;

				.title {
					color: #cc0001;
				}

				.info {
					text-align: center;
				}

				.qr-code {
					width: 200px;
					margin: 15px auto;
					position: relative;

					.shade {
						width: 100%;
						height: 100%;
						position: absolute;
						background-color: rgba(0, 0, 0, .8);
						text-align: center;
						line-height: 200px;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>