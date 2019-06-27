<template>
	<div class="main" @click="toGoods">
		<div class="goods-img"><img v-lazy="goods_info.goods_img" alt=""></div>
		<div class="goods-price-box">
			<span>￥{{goods_info.shop_price }}</span>
			<Tag color="error" v-if="parseInt(goods_info.shop_price) > 50">24期免息分期</Tag>
		</div>
		<div class="goods-name">{{this.goods_info.goods_name}}</div>
		<div class="supplier-box" v-if="!not_show_supplier">
			{{this.goods_info.supplier_name}}
		</div>
		<div class="product-status">
			<span>销量：<em class="sales">{{this.goods_info.goods_sales_volume}}</em></span>
			<span>评价：<em class="evaluate">{{this.goods_info.evaluate_count}}</em></span>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            goods_info: Object,
			not_show_supplier:Boolean,
        },
        computed: {},
        created() {

        },
        methods: {
            toGoods() {
                let data = this.$router.resolve({
                    path: "/goods/" + this.goods_info.goods_id
                });
                window.open(data.href, '_blank');
            }
        },
    };
</script>
<style lang="scss" scoped>
	.main {
		width: 100%;
		height: 100%;
		cursor: pointer;

		.goods-img {
			width: 100%;
			text-align: center;

			img {
				margin-top: 5%;
				width: 70%;
			}
		}

		.goods-name {
			margin-top: 5px;
			padding-left: 15px;
			padding-right: 15px;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 12px;
			text-align: left;
			line-height: 20px;
			height: 40px;
			color: rgb(62, 62, 62);
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.goods-price-box {
			display: flex;
			align-items: center;
			padding-left: 15px;
			margin-top: 5px;

			span {
				font-family: Arial;
				font-weight: 400;
				font-size: 20px;
				color: #ff0036;
				margin-right: 5px;
			}
		}

		.supplier-box {
			line-height: 20px;
			height: 20px;
			max-width: 144px;
			color: #999;
			text-decoration: underline;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding-left: 15px;
			margin-top: 5px;
		}

		.product-status {
			height: 30px;
			border: none;
			margin-bottom: 0;
			color: #999;
			margin-top: 5px;

			span {
				display: inline-block;
				width: 47%;
				line-height: 30px;
				text-align: center;

				em {
					margin-top: -8px;
					font-family: arial;
					font-size: 12px;
					font-weight: 700;
					font-style: normal;
				}

				.sales {
					margin-top: -8px;
				}

				.evaluate {
					color: #38b;

				}
			}
		}
	}

	.main:hover {

	}
</style>