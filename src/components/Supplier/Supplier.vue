<template>
	<div class="supplier-main base-middle">
		<div class="head">
			<div class="head-img"><img :src="supplier_info.head_img" alt=""></div>
			<Card>
				<p slot="title">
					{{this.supplier_info.supplier_name}}
				</p>
				<div class="supplier-info-base">
					<div class="info-left">
						<div class="supplier-loge">
							<img :src="supplier_info.logo_img" alt="">
						</div>
						<li style="text-align: center">
							{{this.supplier_info.company_name}}
						</li>
					</div>
					<div class="info-right">
						<ul>
							<li>
								<span>宝贝描述:<Rate show-text allow-half disabled v-model="rate.describe_rate"/></span>
							</li>
							<li>
								<span>卖家服务:<Rate show-text allow-half disabled v-model="rate.service_rate"/></span>
							</li>
							<li>
								<span>物流服务:<Rate show-text allow-half disabled v-model="rate.logistics_rate"/></span>
							</li>
							<li>
								<span>服务热线:{{this.supplier_info.service_tel}}</span>
							</li>
							<li>
								<span>售后热线:{{this.supplier_info.after_sale_tel}}</span>
							</li>
						</ul>
					</div>
				</div>
			</Card>
			<div class="goods-list-box">
				<goodsList :goods_list="goods_list" not_show_supplier></goodsList>
			</div>
		</div>
	</div>
</template>
<script>
	import goodsList from '../sub/subGoodsList';
    export default {
        data() {
            return {
                supplier_info: Object,
            };
        },
        computed: {
            goods_list: {
                get: function () {
                    let result = [];
                    let goods_list = this.$store.state.goods_list;
                    goods_list.forEach(item => {
                        if (item.supplier_id === this.supplier_info.id) {
                            result.push(item)
                        }
                    });
                    return result;
                }
            },
            rate: {
                get: function () {
                    let result = Object;
                    result.describe_rate = parseFloat(this.supplier_info.describe_rate);
                    result.service_rate = parseFloat(this.supplier_info.service_rate);
                    result.logistics_rate = parseFloat(this.supplier_info.logistics_rate);
                    return result;
                }
            }
        },
        created() {
            this.supplier_info = JSON.parse(this.$route.query.supplier_info);
        },
        methods: {},
		components:{
            goodsList
		}
    };
</script>
<style lang="scss" scoped>
	.supplier-main {
		.head{
			li {
				list-style-type: none;
			}
			.head-img{
				width: 100%;
				img{
					width: 100%;
				}
			}
			.supplier-info-base{
				display: flex;
				justify-content: flex-start;
				.info-left{
					.supplier-loge {
						width: 100%;
						text-align: center;
						img {
							width: 80%;
						}
					}
				}
				.info-right{
					margin-left: 50px;
					ul {
						li {
							list-style-type: none;
						}
					}
				}
			}
		}


	}
</style>