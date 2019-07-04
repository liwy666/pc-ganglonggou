<template>
	<div class="after-sale-main base-middle">
		<div class="goods-list-box" v-if="load_flag">
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
		<Form ref="formInline" :model="form_info" :rules="rule_form" votical>
			<FormItem prop="after_sale_type" label="售后类型：">
				<Select v-model="form_info.after_sale_type" style="width:200px">
					<Option value="全额退款">全额退款</Option>
				</Select>
			</FormItem>
			<FormItem prop="after_sale_cause" label="售后原因：">
				<Select v-model="form_info.after_sale_cause" style="width:200px">
					<Option value="卖家发错货">卖家发错货</Option>
					<Option value="包装/商品破损/污渍<">包装/商品破损/污渍</Option>
					<Option value="质量问题">质量问题</Option>
					<Option value="少件/漏发">少件/漏发</Option>
					<Option value="发票问题">发票问题</Option>
					<Option value="其他">其他</Option>
				</Select>
			</FormItem>
			<FormItem prop="after_sale_text" label="售后说明：">
				<Input v-model="form_info.after_sale_text"
					placeholder="（选填280字）"
					style="width: 400px"/>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="putForm('formInline')">提交申请</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
    import goodsCard from '../sub/horizontalGoodsCard'

    export default {
        data() {
            return {
                order_sn: '',
                order_info: null,
                load_flag: false,
                form_info: {
                    after_sale_type: '全额退款',
                    after_sale_cause: '其他',
                    after_sale_text: ''
                },
                rule_form: {
                    after_sale_type: [
                        {required: true, message: '填写您的售后类型', trigger: 'blur'}
                    ],
                    after_sale_cause: [
                        {required: true, message: '填写您的售后原因', trigger: 'blur'},
                    ],
                    after_sale_text: [
                        {type: 'string', max: 280, message: '超出字数限制', trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {},
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
            putForm(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Spin.show();
                        this.$post('user_submit_after_sale', {
                            user_token: this.$store.getters.getToken,
                            after_sale_type: this.form_info.after_sale_type,
                            after_sale_cause: this.form_info.after_sale_cause,
                            after_sale_text: this.form_info.after_sale_text,
                            order_sn: this.order_sn
                        })
                            .then((msg) => {
                                this.$Spin.hide();
                                if (msg) {
                                    this.$Notice.success({
                                        title: '提交售后成功'
                                    });
                                    this.$router.push('/home');
                                } else {
                                    this.$Notice.error({
                                        title: '提交售后失败'
                                    });
                                }
                            })
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
	.after-sale-main {
		padding: 15px;
		margin-top: 20px;

		.goods-list-box {
			background-color: white;
			margin-bottom: 20px;
		}
	}
</style>