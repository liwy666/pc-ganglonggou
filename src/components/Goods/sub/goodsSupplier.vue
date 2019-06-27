<template>
	<div class="goods-supplier-preview-main">
		<!--店铺介绍-->
		<Card>
			<p slot="title">
				{{this.supplier_preview_info.supplier_name}}
			</p>
			<a href="#" slot="extra" @click.prevent="toSupplier">
				进店逛逛
			</a>
			<ul>
				<div class="supplier-loge">
					<img :src="supplier_preview_info.logo_img" alt="">
				</div>
				<li style="text-align: center">
					{{this.supplier_preview_info.company_name}}
				</li>
				<li>
					<span>宝贝描述:<Rate allow-half disabled v-model="rate.describe_rate"/></span>
				</li>
				<li>
					<span>卖家服务:<Rate allow-half disabled v-model="rate.service_rate"/></span>
				</li>
				<li>
					<span>物流服务:<Rate allow-half disabled v-model="rate.logistics_rate"/></span>
				</li>
			</ul>
			<!--商品列表-->
			<div class="goods-list-box">
				<div class="goods-card" v-for="(item) in supplier_preview_info.goods_list" :key="item.goods_id">
					<goodsCard :goods_info="item" not_show_supplier></goodsCard>
				</div>
			</div>
		</Card>
	</div>
</template>
<script>
    import goodsCard from '../../sub/verticalGoodsCard'

    export default {
        data() {
            return {};
        },
        props: {
            supplier_preview_info: Object,
        },
        computed: {
            rate: {
                get: function () {
                    let result = Object;
                    result.describe_rate = parseFloat(this.supplier_preview_info.describe_rate);
                    result.service_rate = parseFloat(this.supplier_preview_info.service_rate);
                    result.logistics_rate = parseFloat(this.supplier_preview_info.logistics_rate);
                    return result;
                }
            }
        },
        created() {

        },
        methods: {
            toSupplier() {
                let supplier_info = JSON.parse(JSON.stringify(this.supplier_preview_info));
                delete supplier_info.goods_list;
                let data = this.$router.resolve({
                    path: '/supplier',
                    query: {supplier_info: JSON.stringify(supplier_info)}
                });
                window.open(data.href, '_blank')
            }
        },
        components: {
            goodsCard,
        }
    };
</script>
<style lang="scss" scoped>
	.goods-supplier-preview-main {
		width: 100%;
		ul {
			li {
				list-style-type: none;
			}

			.supplier-loge {
				width: 100%;
				text-align: center;

				img {
					width: 80%;
				}
			}
		}
		.goods-list-box {
			width: 100%;

			.goods-card {
				background-color: white;
			}
		}
	}
</style>