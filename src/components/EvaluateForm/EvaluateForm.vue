<template>
	<div class="evaluate-form-main base-middle">
		<div class="goods-list-box">
			<goodsCard
				:goods_img="goods_info.img_url"
				:goods_name="goods_info.goods_name"
				:goods_number="goods_info.goods_number"
				:goods_price="goods_info.mid_order_price"
				:goods_sku_desc="goods_info.sku_desc"
				:goods_id="goods_info.goods_id"
			/>
		</div>
		<Form ref="formInline" :model="form_info" :rules="rule_form" votical>
			<FormItem prop="after_sale_type" label="商品评分：">
				<Rate v-model="form_info.rate"/>
			</FormItem>
			<FormItem prop="evaluate_text" label="评价内容：">
				<Input v-model="form_info.evaluate_text"
					placeholder="（选填480字）"
					style="width: 400px"/>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="putForm('formInline')">提交评价</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
    import goodsCard from '../sub/horizontalGoodsCard'

    export default {
        data() {
            return {
                goods_info: null,
                form_info: {
                    rate: 5,
                    evaluate_text: '',
                },
                rule_form: {
                    rate: [
                        {required: true, message: '填写您的评分', trigger: 'blur'}
                    ],
                    evaluate_text: [
                        {type: 'string', max: 480, message: '超出字数限制', trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {},
        created() {
            this.goods_info = JSON.parse(this.$route.query.goods_info);
        },
        methods: {
            putForm(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.form_info.evaluate_text.replace(/\s+/g, "") === '') {
                            this.form_info.evaluate_text = '该用户没有填写评价。';
                            this.$Spin.show();
                            this.$post('user_ins_evaluate', {
                                user_token: this.$store.getters.getToken,
                                evaluate_text: this.form_info.evaluate_text,
                                rate: this.form_info.rate,
                                id: this.goods_info.id,
                            }).then((msg) => {
                                if (msg) {
                                    //刷新用户信息
                                    let key = 'gl_user_info_' + this.$MyCommon.dateFtt('yyyy_MM_dd', new Date());
                                    this.$store.dispatch("getUserInfo", this.$store.getters.getToken)
                                        .then((user_info) => {
                                            localStorage.setItem(key, JSON.stringify(user_info));
                                        });
                                    this.$Notice.success({
										title:'提交评价成功'
									});
                                    this.$router.push('/home');
                                } else {
                                    this.$Notice.error({
                                        title: '提交评价失败'
                                    })
                                }
                                this.$Spin.hide();
                            })
                        }
                    }
                });


            }
        },
        components: {
            goodsCard
        }
    };
</script>
<style lang="scss" scoped>
	.evaluate-form-main {
		.goods-list-box {
			background-color: white;
			padding: 15px;
		}
	}
</style>